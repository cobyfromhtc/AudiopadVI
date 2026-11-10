#pragma once
#include <core/global/globals.hpp>
#include <helper/apps/apps.hpp>
#include <helper/audio/windows/winsound.hpp>
#include <helper/version/check.hpp>
#include <nlohmann/json.hpp>
#include <fancy.hpp>

namespace Audiopad
{
    namespace traits
    {
        template <typename T> struct is_optional
        {
          private:
            static std::uint8_t test(...);
            template <typename O> static auto test(std::optional<O> *) -> std::uint16_t;

          public:
            static const bool value = sizeof(test(reinterpret_cast<std::decay_t<T> *>(0))) == sizeof(std::uint16_t);
        };
    } // namespace traits
} // namespace Audiopad

namespace nlohmann
{
    template <typename T> struct adl_serializer<std::optional<T>>
    {
        static void to_json(json &j, const std::optional<T> &obj)
        {
            if (obj)
            {
                j = *obj;
            }
            else
            {
                j = nullptr;
            }
        }
        static void from_json(const json &j, const std::optional<T> &obj)
        {
            if (!j.is_null())
            {
                obj = j.get<T>();
            }
        }
    }; // namespace nlohmann
    template <> struct adl_serializer<Audiopad::Objects::Sound>
    {
        static void to_json(json &j, const Audiopad::Objects::Sound &obj)
        {
            j = {
                {"name", obj.name},
                {"hotkeys", obj.hotkeys},
                {"hotkeySequence",
                 Audiopad::Globals::gHotKeys.getKeySequence(obj.hotkeys)}, //* For frontend and config readability
                {"id", obj.id},
                {"path", obj.path},
                {"isFavorite", obj.isFavorite},
                {"image", obj.image},
                {"localVolume", obj.localVolume},
                {"remoteVolume", obj.remoteVolume},
                {"modifiedDate", obj.modifiedDate},
                {"displayName", obj.displayName},
                {"tags", obj.tags},
                {"triggerMode", obj.triggerMode},
                {"loopByDefault", obj.loopByDefault},
                {"stopOthers", obj.stopOthers},
                {"muteOthers", obj.muteOthers},
                {"muteVoice", obj.muteVoice},
                {"voicePreset", obj.voicePreset},
            };
        }
        static void from_json(const json &j, Audiopad::Objects::Sound &obj)
        {
            j.at("name").get_to(obj.name);
            j.at("hotkeys").get_to(obj.hotkeys);
            j.at("id").get_to(obj.id);
            j.at("path").get_to(obj.path);
            j.at("modifiedDate").get_to(obj.modifiedDate);
            if (j.find("isFavorite") != j.end())
            {
                j.at("isFavorite").get_to(obj.isFavorite);
            }
            if (j.find("image") != j.end())
            {
                j.at("image").get_to(obj.image);
            }
            if (j.find("localVolume") != j.end())
            {
                if (j.at("localVolume").is_number())
                {
                    obj.localVolume = j.at("localVolume").get<int>();
                }
            }
            if (j.find("remoteVolume") != j.end())
            {
                if (j.at("remoteVolume").is_number())
                {
                    obj.remoteVolume = j.at("remoteVolume").get<int>();
                }
            }
            if (j.find("displayName") != j.end() && !j.at("displayName").is_null() && j.at("displayName").is_string())
            {
                obj.displayName = j.at("displayName").get<std::string>();
            }
            if (j.find("tags") != j.end() && j.at("tags").is_array())
            {
                obj.tags.clear();
                for (const auto &tag : j.at("tags"))
                {
                    if (tag.is_string())
                    {
                        auto text = tag.get<std::string>();
                        if (!text.empty())
                        {
                            obj.tags.emplace_back(std::move(text));
                        }
                    }
                }
            }
            if (j.find("triggerMode") != j.end() && j.at("triggerMode").is_number())
            {
                const auto raw = j.at("triggerMode").get<std::uint8_t>();
                if (raw <= static_cast<std::uint8_t>(Audiopad::Enums::TriggerMode::PushToLoop))
                {
                    obj.triggerMode = static_cast<Audiopad::Enums::TriggerMode>(raw);
                }
            }
            if (j.find("loopByDefault") != j.end() && j.at("loopByDefault").is_boolean())
            {
                obj.loopByDefault = j.at("loopByDefault").get<bool>();
            }
            if (j.find("stopOthers") != j.end() && j.at("stopOthers").is_boolean())
            {
                obj.stopOthers = j.at("stopOthers").get<bool>();
            }
            if (j.find("muteOthers") != j.end() && j.at("muteOthers").is_boolean())
            {
                obj.muteOthers = j.at("muteOthers").get<bool>();
            }
            if (j.find("muteVoice") != j.end())
            {
                if (j.at("muteVoice").is_boolean())
                {
                    obj.muteVoice = j.at("muteVoice").get<bool>();
                }
                //* null / missing = inherit the global setting
            }
            if (j.find("voicePreset") != j.end() && !j.at("voicePreset").is_null() && j.at("voicePreset").is_string())
            {
                obj.voicePreset = j.at("voicePreset").get<std::string>();
            }
        }
    };
    template <> struct adl_serializer<Audiopad::Objects::AudioDevice>
    {
        static void to_json(json &j, const Audiopad::Objects::AudioDevice &obj)
        {
            j = {{"name", obj.name}, {"isDefault", obj.isDefault}, {"id", obj.name}, {"guid", obj.name}, {"application", obj.name}};
        }
        static void from_json(const json &j, Audiopad::Objects::AudioDevice &obj)
        {
            j.at("name").get_to(obj.name);
            j.at("isDefault").get_to(obj.isDefault);
        }
    };
    template <> struct adl_serializer<Audiopad::Objects::PlayingSound>
    {
        static void to_json(json &j, const Audiopad::Objects::PlayingSound &obj)
        {
            j = {
                {"sound", obj.sound},           {"id", obj.id},
                {"length", obj.length},         {"paused", obj.paused.load()},
                {"lengthInMs", obj.lengthInMs}, {"repeat", obj.repeat.load()},
                {"readFrames", obj.readFrames}, {"readInMs", obj.readInMs.load()},
            };
        }
        static void from_json(const json &j, Audiopad::Objects::PlayingSound &obj)
        {
            j.at("id").get_to(obj.id);
            j.at("sound").get_to(obj.sound);
            j.at("length").get_to(obj.length);
            j.at("readFrames").get_to(obj.readFrames);
            j.at("lengthInMs").get_to(obj.lengthInMs);

            obj.paused.store(j.at("paused").get<bool>());
            obj.repeat.store(j.at("repeat").get<bool>());
            obj.readInMs.store(j.at("readInMs").get<std::uint64_t>());
        }
    };
    template <> struct adl_serializer<Audiopad::Objects::Settings>
    {
        static void to_json(json &j, const Audiopad::Objects::Settings &obj)
        {
            j = {
                {"theme", obj.theme},
                {"outputs", obj.outputs},
                {"viewMode", obj.viewMode},
                {"language", obj.language},
                {"stopHotkey", obj.stopHotkey},
                {"syncVolumes", obj.syncVolumes},
                {"selectedTab", obj.selectedTab},
                {"localVolume", obj.localVolume},
                {"remoteVolume", obj.remoteVolume},
                {"soundBoost", obj.soundBoost},
                {"audioBackend", obj.audioBackend},
                {"deleteToTrash", obj.deleteToTrash},
                {"pushToTalkKeys", obj.pushToTalkKeys},
                {"tabHotkeysOnly", obj.tabHotkeysOnly},
                {"minimizeToTray", obj.minimizeToTray},
                {"allowOverlapping", obj.allowOverlapping},
                {"muteDuringPlayback", obj.muteDuringPlayback},
                {"useAsDefaultDevice", obj.useAsDefaultDevice},
                {"allowMultipleOutputs", obj.allowMultipleOutputs},
                {"targetWindow", obj.targetWindow},
                {"hearMyself", obj.hearMyself},
                {"overlayEnabled", obj.overlayEnabled},
                {"overlayPosition", obj.overlayPosition},
                {"remoteControlEnabled", obj.remoteControlEnabled},
                {"remotePin", obj.remotePin},
                {"remotePort", obj.remotePort},
                {"micMuteHotkey", obj.micMuteHotkey},
                {"hearMyselfHotkey", obj.hearMyselfHotkey},
                {"overlayHotkey", obj.overlayHotkey},
                {"overlayPositionHotkey", obj.overlayPositionHotkey},
            };
        }

        template <typename T> static void get_to_safe(const json &j, const std::string &key, T &member) noexcept
        {
            if (j.find(key) != j.end())
            {
                if constexpr (Audiopad::traits::is_optional<T>::value)
                {
                    if (j.at(key).type_name() == nlohmann::basic_json(typename T::value_type{}).type_name())
                    {
                        if (!j.at(key).is_null())
                        {
                            try
                            {
                                member = j.at(key).get<typename T::value_type>();
                            }
                            catch (const std::exception &e)
                            {
                                Fancy::fancy.logTime().failure() << "Failed to parse optional key '" << key << "': " << e.what()
                                                                 << " | JSON: " << j.at(key).dump() << std::endl;
                            }
                        }
                    }
                }
                else
                {
                    if (j.at(key).type_name() == nlohmann::basic_json(T{}).type_name())
                    {
                        try
                        {
                            j.at(key).get_to(member);
                        }
                        catch (const std::exception &e)
                        {
                            Fancy::fancy.logTime().failure() << "Failed to parse key '" << key << "': " << e.what()
                                                             << " | JSON: " << j.at(key).dump() << std::endl;
                        }
                    }
                }
            }
        }

        static void from_json(const json &j, Audiopad::Objects::Settings &obj)
        {
            get_to_safe(j, "theme", obj.theme);
            get_to_safe(j, "outputs", obj.outputs);
            get_to_safe(j, "language", obj.language);
            get_to_safe(j, "viewMode", obj.viewMode);
            get_to_safe(j, "stopHotkey", obj.stopHotkey);
            get_to_safe(j, "localVolume", obj.localVolume);
            get_to_safe(j, "soundBoost", obj.soundBoost);
            get_to_safe(j, "selectedTab", obj.selectedTab);
            get_to_safe(j, "syncVolumes", obj.syncVolumes);
            get_to_safe(j, "audioBackend", obj.audioBackend);
            get_to_safe(j, "remoteVolume", obj.remoteVolume);
            get_to_safe(j, "deleteToTrash", obj.deleteToTrash);
            get_to_safe(j, "pushToTalkKeys", obj.pushToTalkKeys);
            get_to_safe(j, "minimizeToTray", obj.minimizeToTray);
            get_to_safe(j, "tabHotkeysOnly", obj.tabHotkeysOnly);
            get_to_safe(j, "allowOverlapping", obj.allowOverlapping);
            get_to_safe(j, "useAsDefaultDevice", obj.useAsDefaultDevice);
            get_to_safe(j, "muteDuringPlayback", obj.muteDuringPlayback);
            get_to_safe(j, "allowMultipleOutputs", obj.allowMultipleOutputs);
            get_to_safe(j, "targetWindow", obj.targetWindow);
            get_to_safe(j, "hearMyself", obj.hearMyself);
            get_to_safe(j, "overlayEnabled", obj.overlayEnabled);
            get_to_safe(j, "overlayPosition", obj.overlayPosition);
            get_to_safe(j, "remoteControlEnabled", obj.remoteControlEnabled);
            get_to_safe(j, "remotePin", obj.remotePin);
            get_to_safe(j, "remotePort", obj.remotePort);
            get_to_safe(j, "micMuteHotkey", obj.micMuteHotkey);
            get_to_safe(j, "hearMyselfHotkey", obj.hearMyselfHotkey);
            get_to_safe(j, "overlayHotkey", obj.overlayHotkey);
            get_to_safe(j, "overlayPositionHotkey", obj.overlayPositionHotkey);
        }
    };
    template <> struct adl_serializer<Audiopad::Objects::AppWindow>
    {
        static void to_json(json &j, const Audiopad::Objects::AppWindow &obj)
        {
            j = {{"title", obj.title}, {"processName", obj.processName}, {"pid", obj.pid}};
        }
    };
    template <> struct adl_serializer<Audiopad::Objects::Folder>
    {
        static void to_json(json &j, const Audiopad::Objects::Folder &obj)
        {
            j = {{"id", obj.id}, {"name", obj.name}, {"path", obj.path},
                 {"sounds", obj.sounds}, {"folders", obj.folders}};
        }
        static void from_json(const json &j, Audiopad::Objects::Folder &obj)
        {
            j.at("id").get_to(obj.id);
            j.at("name").get_to(obj.name);
            j.at("path").get_to(obj.path);

            if (j.find("sounds") != j.end())
            {
                j.at("sounds").get_to(obj.sounds);
            }
            if (j.find("folders") != j.end())
            {
                j.at("folders").get_to(obj.folders);
            }
        }
    };
    template <> struct adl_serializer<Audiopad::Objects::Tab>
    {
        static void to_json(json &j, const Audiopad::Objects::Tab &obj)
        {
            j = {{"id", obj.id},
                 {"name", obj.name},
                 {"path", obj.path},
                 {"sounds", obj.sounds},
                 {"folders", obj.folders},
                 {"sortMode", obj.sortMode},
                 {"boost", obj.boost},
                 {"icon", obj.icon},
                 {"soundOrder", obj.soundOrder},
                 {"folderOrder", obj.folderOrder}};
        }
        static void from_json(const json &j, Audiopad::Objects::Tab &obj)
        {
            j.at("id").get_to(obj.id);
            j.at("name").get_to(obj.name);
            j.at("path").get_to(obj.path);
            j.at("sounds").get_to(obj.sounds);

            if (j.find("folders") != j.end())
            {
                j.at("folders").get_to(obj.folders);
            }

            if (j.find("sortMode") != j.end())
            {
                j.at("sortMode").get_to(obj.sortMode);
            }
            if (j.find("boost") != j.end() && j.at("boost").is_number())
            {
                j.at("boost").get_to(obj.boost);
            }
            if (j.find("icon") != j.end() && j.at("icon").is_string())
            {
                j.at("icon").get_to(obj.icon);
            }
            if (j.find("soundOrder") != j.end() && j.at("soundOrder").is_array())
            {
                obj.soundOrder.clear();
                for (const auto &entry : j.at("soundOrder"))
                {
                    if (entry.is_number_unsigned())
                    {
                        obj.soundOrder.emplace_back(entry.get<std::uint32_t>());
                    }
                }
            }
            if (j.find("folderOrder") != j.end() && j.at("folderOrder").is_array())
            {
                obj.folderOrder.clear();
                for (const auto &entry : j.at("folderOrder"))
                {
                    if (entry.is_number_unsigned())
                    {
                        obj.folderOrder.emplace_back(entry.get<std::uint32_t>());
                    }
                }
            }
        }
    };
    template <> struct adl_serializer<Audiopad::Objects::Data>
    {
        static void to_json(json &j, const Audiopad::Objects::Data &obj)
        {
            j = {{"height", obj.height},
                 {"width", obj.width},
                 {"tabs", obj.tabs},
                 {"soundIdCounter", obj.soundIdCounter},
                 {"folderIdCounter", obj.folderIdCounter}};
        }
        static void from_json(const json &j, Audiopad::Objects::Data &obj)
        {
            j.at("soundIdCounter").get_to(obj.soundIdCounter);
            j.at("height").get_to(obj.height);
            j.at("width").get_to(obj.width);
            j.at("tabs").get_to(obj.tabs);

            if (j.find("folderIdCounter") != j.end() && j.at("folderIdCounter").is_number())
            {
                j.at("folderIdCounter").get_to(obj.folderIdCounter);
            }
        }
    };
    template <> struct adl_serializer<Audiopad::Objects::Config>
    {
        static void to_json(json &j, const Audiopad::Objects::Config &obj)
        {
            j = {{"data", obj.data}, {"settings", obj.settings}};
        }
        static void from_json(const json &j, Audiopad::Objects::Config &obj)
        {
            j.at("data").get_to(obj.data);
            j.at("settings").get_to(obj.settings);
        }
    };
    template <> struct adl_serializer<Audiopad::Objects::VersionStatus>
    {
        static void to_json(json &j, const Audiopad::Objects::VersionStatus &obj)
        {
            j = {{"current", obj.current}, {"latest", obj.latest}, {"outdated", obj.outdated}};
        }
        static void from_json(const json &j, Audiopad::Objects::VersionStatus &obj)
        {
            j.at("latest").get_to(obj.latest);
            j.at("current").get_to(obj.current);
            j.at("outdated").get_to(obj.outdated);
        }
    };
#if defined(__linux__)
    template <> struct adl_serializer<std::shared_ptr<Audiopad::Objects::IconRecordingApp>>
    {
        static void to_json(json &j, const std::shared_ptr<Audiopad::Objects::IconRecordingApp> &obj)
        {
            j = {
                {"name", obj->name},
                {"appIcon", obj->appIcon},
                {"application", obj->application},
            };
        }
        static void from_json(const json &j, std::shared_ptr<Audiopad::Objects::IconRecordingApp> &obj)
        {
            if (obj)
            {
                j.at("name").get_to(obj->name);
                j.at("appIcon").get_to(obj->appIcon);
                j.at("application").get_to(obj->application);
            }
        }
    };
    template <> struct adl_serializer<std::shared_ptr<Audiopad::Objects::IconPlaybackApp>>
    {
        static void to_json(json &j, const std::shared_ptr<Audiopad::Objects::IconPlaybackApp> &obj)
        {
            j = {
                {"name", obj->name},
                {"appIcon", obj->appIcon},
                {"application", obj->application},
            };
        }
        static void from_json(const json &j, std::shared_ptr<Audiopad::Objects::IconPlaybackApp> &obj)
        {
            if (obj)
            {
                j.at("name").get_to(obj->name);
                j.at("appIcon").get_to(obj->appIcon);
                j.at("application").get_to(obj->application);
            }
        }
    };
#elif defined(_WIN32)
    template <> struct adl_serializer<Audiopad::Objects::RecordingDevice>
    {
        static void to_json(json &j, const Audiopad::Objects::RecordingDevice &obj)
        {
            j = {
                {"name", obj.getName()},
                {"guid", obj.getGUID()},
                {"id", obj.getGUID()},
            };
        }
    };
#endif
} // namespace nlohmann