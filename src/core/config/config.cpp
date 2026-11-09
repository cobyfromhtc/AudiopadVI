#include "config.hpp"
#include <chrono>
#include <core/global/globals.hpp>
#include <fancy.hpp>
#include <filesystem>
#include <fstream>
#include <helper/artwork/artwork.hpp>
#include <helper/debounce_writer/debounce_writer.hpp>
#include <helper/json/bindings.hpp>
#include <helper/paths/paths.hpp>
#include <string>

namespace Audiopad::Objects
{
    const std::string Config::path = Audiopad::Helpers::configFilePath().string();

    namespace
    {
        //* Debounce window: long enough to coalesce a slider drag or a bulk image
        //* update, short enough that a settings flip is on disk almost immediately.
        constexpr auto kDebounceDelay = std::chrono::milliseconds(400);

        Helpers::DebouncedWriter &configWriter()
        {
            static Helpers::DebouncedWriter writer(
                kDebounceDelay,
                [] {
                    //* Runs on the schedule() caller's thread: snapshot the live
                    //* model, then swap inline artwork data URLs for compact managed
                    //* references (storing the payload once, content-addressed).
                    nlohmann::json snapshot = {
                        {"data", Globals::gData},
                        {"settings", Globals::gSettings},
                    };
                    Helpers::Artwork::compactImagesForDisk(snapshot);
                    return snapshot.dump();
                },
                [](const std::string &content) {
                    if (!Helpers::atomicWriteFile(Audiopad::Helpers::configFilePath(), content))
                    {
                        Fancy::fancy.logTime().failure() << "Failed to write config" << std::endl;
                    }
                    else
                    {
                        Fancy::fancy.logTime().success() << "Config written" << std::endl;
                    }
                });
            return writer;
        }
    } // namespace

    void Config::save()
    {
        configWriter().schedule();
    }

    void Config::flush()
    {
        configWriter().flush();
    }

    void Config::load()
    {
        try
        {
            if (!std::filesystem::exists(path))
            {
                Fancy::fancy.logTime().warning() << "Config not found" << std::endl;
                return;
            }

            std::ifstream configStream(path);
            std::string content((std::istreambuf_iterator<char>(configStream)), std::istreambuf_iterator<char>());
            configStream.close();

            auto json = nlohmann::json::parse(content, nullptr, false);
            if (json.is_discarded())
            {
                Fancy::fancy.logTime().failure() << "Config seems corrupted" << std::endl;
            }
            else
            {
                //* Managed artwork references (managed://<hash>) expand back into
                //* inline data URLs so the UI model never sees storage details.
                Helpers::Artwork::expandImagesFromDisk(json);

                try
                {
                    auto conf = json.get<Config>();
                    data.set(conf.data);
                    settings = conf.settings;
                    Fancy::fancy.logTime().success() << "Config read" << std::endl;
                }
                catch (...)
                {
                    Fancy::fancy.logTime().warning()
                        << "Found possibly old config format, moving old config..." << std::endl;

                    std::filesystem::path configFile(path);
                    std::filesystem::rename(
                        path,
                        configFile.parent_path() /
                            ("config_old_" +
                             std::to_string(std::chrono::system_clock::now().time_since_epoch().count()) + ".json"));
                }
            }
        }
        catch (const std::exception &e)
        {
            Fancy::fancy.logTime().warning() << "Failed to read config: " << e.what() << std::endl;
        }
        catch (...)
        {
            Fancy::fancy.logTime().warning() << "Failed to read config" << std::endl;
        }
    }
} // namespace Audiopad::Objects
