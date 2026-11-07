#if defined(__linux__)
#include "forward.hpp"
#include <dlfcn.h>
#include <fancy.hpp>

bool Audiopad::LibWnck::setup()
{
    auto *libWnck = dlopen("libwnck-3.so.0", RTLD_LAZY);

    if (libWnck)
    {
        getWindowPID = reinterpret_cast<decltype(getWindowPID)>(dlsym(libWnck, "wnck_window_get_pid"));
        getWindowIcon = reinterpret_cast<decltype(getWindowIcon)>(dlsym(libWnck, "wnck_window_get_icon"));
        forceUpdate = reinterpret_cast<decltype(forceUpdate)>(dlsym(libWnck, "wnck_screen_force_update"));
        getDefaultScreen = reinterpret_cast<decltype(getDefaultScreen)>(dlsym(libWnck, "wnck_screen_get_default"));
        getScreenWindows = reinterpret_cast<decltype(getScreenWindows)>(dlsym(libWnck, "wnck_screen_get_windows"));
        getWindowName = reinterpret_cast<decltype(getWindowName)>(dlsym(libWnck, "wnck_window_get_name"));
        getWindowClassInstanceName = reinterpret_cast<decltype(getWindowClassInstanceName)>(
            dlsym(libWnck, "wnck_window_get_class_instance_name"));
        isSkipTasklist = reinterpret_cast<decltype(isSkipTasklist)>(dlsym(libWnck, "wnck_window_is_skip_tasklist"));

        Fancy::fancy.logTime().success() << "LibWnck found - Icon support is enabled" << std::endl;
        return true;
    }

    return false;
}
#endif