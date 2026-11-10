#include "hotkeys.hpp"
#include <algorithm>
#include <core/global/globals.hpp>
#include <cstdint>

namespace Audiopad
{
    namespace traits
    {
        template <typename T> struct is_pair
        {
          private:
            static std::uint8_t test(...);
            template <typename O>
            static auto test(O *) -> decltype(std::declval<O>().first, std::declval<O>().second, std::uint16_t{});

          public:
            static const bool value = sizeof(test(reinterpret_cast<T *>(0))) == sizeof(std::uint16_t);
        };
    } // namespace traits
    namespace Objects
    {
        void Hotkeys::init()
        {
            listener = std::thread([this] { listen(); });
        }
        void Hotkeys::shouldNotify(bool status)
        {
            pressedKeys.clear();
            notify = status;
        }
        void Hotkeys::onKeyUp(int key)
        {
            //* Push-to-Loop: releasing any key of the held hotkey stops the loop.
            if (!activeHolds.empty())
            {
                std::vector<std::uint32_t> toStop;
                for (auto it = activeHolds.begin(); it != activeHolds.end();)
                {
                    const bool belongs = std::find(it->keys.begin(), it->keys.end(), key) != it->keys.end();
                    if (belongs)
                    {
                        toStop.push_back(it->soundId);
                        it = activeHolds.erase(it);
                    }
                    else
                    {
                        ++it;
                    }
                }
                for (const auto soundId : toStop)
                {
                    if (Globals::gGui)
                    {
                        Globals::gGui->stopSound(soundId);
                    }
                }
            }

            if (notify && !pressedKeys.empty() &&
                std::find(pressedKeys.begin(), pressedKeys.end(), key) != pressedKeys.end())
            {
                Globals::gGui->onHotKeyReceived(pressedKeys);
                pressedKeys.clear();
            }
            else
            {
                pressedKeys.erase(std::remove_if(pressedKeys.begin(), pressedKeys.end(),
                                                 [key](const auto &item) { return key == item; }),
                                  pressedKeys.end());
            }
        }
        bool isCloseMatch(const std::vector<int> &pressedKeys, const std::vector<int> &keys)
        {
            if (pressedKeys.size() >= keys.size())
            {
                bool allMatched = true;
                for (const auto &key : keys)
                {
                    if (std::find(pressedKeys.begin(), pressedKeys.end(), key) == pressedKeys.end())
                    {
                        allMatched = false;
                    }
                }
                return allMatched;
            }
            return false;
        }
        template <typename T> std::optional<Sound> getBestMatch(const T &list, const std::vector<int> &pressedKeys)
        {
            std::optional<Sound> rtn;

            for (const auto &_sound : list)
            {
                const auto &sound = [&] {
                    if constexpr (traits::is_pair<std::decay_t<decltype(_sound)>>::value)
                    {
                        return _sound.second.get();
                    }
                    else
                    {
                        return _sound;
                    }
                }();

                if (sound.hotkeys.empty())
                    continue;

                if (sound.hotkeys == pressedKeys)
                {
                    rtn = sound;
                    break;
                }

                if (rtn && rtn->hotkeys.size() > sound.hotkeys.size())
                {
                    continue;
                }

                if (isCloseMatch(pressedKeys, sound.hotkeys))
                {
                    rtn = sound;
                }
            }
            return rtn;
        }
        void Hotkeys::onKeyDown(int key)
        {
            if (std::find(keysToPress.begin(), keysToPress.end(), key) != keysToPress.end())
            {
                return;
            }
            if (std::find(pressedKeys.begin(), pressedKeys.end(), key) == pressedKeys.end())
            {
                pressedKeys.emplace_back(key);
            }
            else
            {
                return;
            }

            if (notify)
            {
                return;
            }

            const auto matchesHotkey = [&](const std::vector<int> &keys) {
                return !keys.empty() && (pressedKeys == keys || isCloseMatch(pressedKeys, keys));
            };

            if (!Globals::gSettings.stopHotkey.empty() &&
                matchesHotkey(Globals::gSettings.stopHotkey))
            {
                Globals::gGui->stopSounds();
                return;
            }

            //* Additional global controls: microphone mute, "hear myself"
            //* monitoring and the now-playing overlay (show/hide + position).
            if (matchesHotkey(Globals::gSettings.micMuteHotkey))
            {
                Globals::gGui->toggleMicMute();
                return;
            }
            if (matchesHotkey(Globals::gSettings.hearMyselfHotkey))
            {
                Globals::gGui->toggleHearMyself();
                return;
            }
            if (matchesHotkey(Globals::gSettings.overlayHotkey))
            {
                Globals::gGui->toggleOverlay();
                return;
            }
            if (matchesHotkey(Globals::gSettings.overlayPositionHotkey))
            {
                Globals::gGui->cycleOverlayPosition();
                return;
            }

            std::optional<Sound> bestMatch;

            if (Globals::gSettings.tabHotkeysOnly)
            {
                if (Globals::gData.isOnFavorites)
                {
                    auto sounds = Globals::gData.getFavorites();
                    bestMatch = getBestMatch(sounds, pressedKeys);
                }
                else
                {
                    auto tab = Globals::gData.getTab(Globals::gSettings.selectedTab);
                    if (tab)
                    {
                        //* Include sounds nested inside subfolders of the category so
                        //* their hotkeys keep working with this restriction enabled.
                        bestMatch = getBestMatch(Globals::gData.getFlatSounds(*tab), pressedKeys);
                    }
                }
            }
            else
            {
                auto scopedSounds = Globals::gSounds.scoped();
                bestMatch = getBestMatch(*scopedSounds, pressedKeys);
            }

            if (bestMatch)
            {
                auto pSound = Globals::gGui->playSound(bestMatch->id);
                if (pSound)
                {
                    Globals::gGui->onSoundPlayed(*pSound);
                }

                //* Push-to-Loop: remember the trigger keys so the key-up handler
                //* can stop the looping clip again.
                if (bestMatch->triggerMode == Enums::TriggerMode::PushToLoop && !bestMatch->voicePreset)
                {
                    ActiveHold hold;
                    hold.keys = pressedKeys;
                    hold.soundId = bestMatch->id;
                    activeHolds.emplace_back(std::move(hold));
                }
            }
        }
        std::string Hotkeys::getKeySequence(const std::vector<int> &keys)
        {
            std::string rtn;
            for (const auto &key : keys)
            {
                rtn += getKeyName(key) + " + ";
            }
            if (!rtn.empty())
            {
                return rtn.substr(0, rtn.length() - 3);
            }
            return "";
        }
    } // namespace Objects
} // namespace Audiopad