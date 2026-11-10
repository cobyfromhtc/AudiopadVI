#pragma once
#include <atomic>
#include <string>
#include <thread>
#include <vector>

namespace Audiopad
{
    namespace Objects
    {
        class Hotkeys
        {
            std::thread listener;
            std::atomic<bool> kill = false;
            std::atomic<bool> notify = false;

            std::vector<int> pressedKeys;
            std::vector<int> keysToPress;
#if defined(_WIN32)
            std::thread keyPressThread;
            std::atomic<bool> shouldPressKeys = false;
#endif

            //* Push-to-Loop sessions started from the keyboard: the triggered
            //* sound loops until any key of its hotkey combination is released.
            struct ActiveHold
            {
                std::vector<int> keys;
                std::uint32_t soundId;
            };
            std::vector<ActiveHold> activeHolds;

          private:
            void listen();

          public:
            void init();
            void stop();
            void shouldNotify(bool);

            void onKeyUp(int);
            void onKeyDown(int);

            void pressKeys(const std::vector<int> &);
            void releaseKeys(const std::vector<int> &);

            std::string getKeyName(const int &);
            std::string getKeySequence(const std::vector<int> &);
        };
    } // namespace Objects
} // namespace Audiopad