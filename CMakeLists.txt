cmake_minimum_required(VERSION 3.16...3.30)
project(audiopad VERSION 1.1.1 DESCRIPTION "A crossplatform soundboard")

set(FULL_VERSION_STRING "1.1.1")
option(EMBED_PATH "The path used for embedding" "OFF")
option(USE_FLATPAK "Allows the program to run under flatpak" OFF)
option(AUDIOPAD_BUILD_TESTS "Build playback/asset/callback-budget regression tests and the latency benchmark" ON)
# IPO/LTO is deliberately opt-in: measure Release vs RelWithDebInfo first (binary
# size, startup time, callback budgets — see tests/README and the benchmark
# target) and only enable it when the numbers justify it.
option(AUDIOPAD_ENABLE_IPO "Enable interprocedural optimizations (LTO/IPO) after measuring its effects" OFF)

# Static CRT for every configuration via the CMP0091 policy instead of rewriting
# cached CMAKE_CXX_FLAGS_* variables: the old string-replace approach leaked the
# /MT rewrite into every later target in the cache (including third-party
# subdirectories) and fought generator expressions.
if (MSVC)
    set(CMAKE_MSVC_RUNTIME_LIBRARY "MultiThreaded$<$<CONFIG:Debug>:Debug>")
endif()

file(GLOB src
    "src/*.cpp"
    "src/*/*.cpp"
    "src/*/*/*.cpp"
    "src/*/*/*/*.cpp"
    "src/*/*/*/*/*.cpp"
)

if (WIN32)
    add_executable(audiopad WIN32 ${src} "assets/icon.rc")

    if (MSVC)
        set_target_properties(audiopad PROPERTIES LINK_FLAGS "/MANIFESTUAC:\"level='requireAdministrator' uiAccess='false'\"")
    endif()

    target_compile_definitions(audiopad PRIVATE WIN32_LEAN_AND_MEAN=1)
    target_compile_options(audiopad PRIVATE /W4)
else()
    add_executable(audiopad ${src})

    if (CMAKE_BUILD_TYPE STREQUAL "Debug")
        message(STATUS "Enabling warning and error flags for debug build")
        target_compile_options(audiopad PRIVATE -Wall -Werror -Wextra -pedantic -Wno-unused-lambda-capture -Wno-gnu)
    endif()
endif()

target_compile_definitions(audiopad PRIVATE AUDIOPAD_VERSION="${FULL_VERSION_STRING}" WNCK_I_KNOW_THIS_IS_UNSTABLE=1)
target_include_directories(audiopad SYSTEM PRIVATE "src")
target_include_directories(audiopad SYSTEM PRIVATE "lib/miniaudio")
target_include_directories(audiopad SYSTEM PRIVATE "lib/semver/include")
target_include_directories(audiopad SYSTEM PRIVATE "lib/fancypp/include")
target_include_directories(audiopad SYSTEM PRIVATE "lib/json/single_include")

set(THREADS_PREFER_PTHREAD_FLAG ON)
find_package(Threads REQUIRED)
target_link_libraries(audiopad PRIVATE Threads::Threads ${CMAKE_DL_LIBS})

if (UNIX)
    list(APPEND CMAKE_MODULE_PATH ${CMAKE_CURRENT_SOURCE_DIR})
    find_package(PipeWire REQUIRED)

    find_package(PulseAudio)
    find_package(X11 REQUIRED)
    target_include_directories(audiopad SYSTEM PRIVATE ${X11_INCLUDE_DIR} ${PULSEAUDIO_INCLUDE_DIR} ${PipeWire_INCLUDE_DIRS} ${Spa_INCLUDE_DIRS})

    # Optional artwork decoder (sound images). When absent, image imports fall
    # back to a strictly bounded pass-through instead of downscaling.
    find_package(PkgConfig REQUIRED)
    pkg_check_modules(GDK_PIXBUF gdk-pixbuf-2.0)
    if (GDK_PIXBUF_FOUND)
        target_include_directories(audiopad SYSTEM PRIVATE ${GDK_PIXBUF_INCLUDE_DIRS})
        # Links gdk-pixbuf and its transitive requires (gobject/glib) — the
        # artwork module calls them directly.
        target_link_libraries(audiopad PRIVATE ${GDK_PIXBUF_LIBRARIES})
        target_compile_definitions(audiopad PRIVATE AUDIOPAD_HAVE_GDK_PIXBUF=1)
    else()
        message(STATUS "gdk-pixbuf not found — artwork imports will not be downscaled, only size-bounded")
    endif()

    pkg_check_modules(WNCK libwnck-3.0)
    # Link order: the XInput archive pulls objects that reference libXext
    # (XextAddDisplay & friends), and Debian-family linkers default to
    # --as-needed — an earlier libXext would be dropped before anything
    # references it. XInput/XTest first, then the X11 aggregate (which carries
    # libXext), so the dependency direction matches the command line.
    target_link_libraries(audiopad PRIVATE ${X11_Xinput_LIB} ${X11_XTest_LIB} ${X11_LIBRARIES})
endif()
if (WIN32)
    target_compile_definitions(audiopad PRIVATE _CRT_SECURE_NO_WARNINGS=1 _SILENCE_ALL_CXX17_DEPRECATION_WARNINGS=1 UNICODE=1 _UNICODE=1)
    # WIC (artwork decoding/downscaling) + COM runtime
    target_link_libraries(audiopad PRIVATE windowscodecs ole32)
endif()

add_subdirectory(src/ui/impl/webview/lib/webviewpp EXCLUDE_FROM_ALL)
add_subdirectory(lib/nativefiledialog-extended EXCLUDE_FROM_ALL)
add_subdirectory(lib/tiny-process-library EXCLUDE_FROM_ALL)
if (WIN32)
    set(STACK_DETAILS_AUTO_DETECT FALSE CACHE BOOL "Disable auto-detect on Windows" FORCE)
endif()
add_subdirectory(lib/backward-cpp EXCLUDE_FROM_ALL)
add_subdirectory(lib/traypp EXCLUDE_FROM_ALL)
add_subdirectory(lib/guardpp)
add_subdirectory(lib/lockpp)

add_backward(audiopad)

if (WIN32)
    set(OPENSSL_USE_STATIC_LIBS TRUE)
    set(OPENSSL_MSVC_STATIC_RT  TRUE)
    set(BROTLI_USE_STATIC_LIBS TRUE)
endif()

set(HTTPLIB_REQUIRE_OPENSSL ON)
add_subdirectory(lib/cpp-httplib EXCLUDE_FROM_ALL)
target_include_directories(audiopad SYSTEM PRIVATE "lib/cpp-httplib")

target_link_libraries(audiopad PRIVATE webview nfd tiny-process-library tray guardpp httplib lockpp)

if (${EMBED_PATH} STREQUAL "OFF")
    # [[ Web UI assets ]]
    #  > Fail fast when the prebuilt frontend is missing instead of shipping an
    #    executable that cannot find its UI.
    set(AUDIOPAD_UI_DIR "${CMAKE_CURRENT_SOURCE_DIR}/src/ui/impl/webview/lib/audiopad-ui")
    if (NOT EXISTS "${AUDIOPAD_UI_DIR}/index.html")
        message(FATAL_ERROR "Web UI assets are missing: '${AUDIOPAD_UI_DIR}/index.html' not found. "
                            "Fetch the submodules first: git submodule update --init --recursive")
    endif()

    #  > Stage the assets once beside the build target, for every generator and
    #    every configuration (MSVC, Ninja, Makefiles, multi-config). The runtime
    #    resolves them relative to the executable, so this matches both
    #    build-tree runs and installed layouts.
    add_custom_command(TARGET audiopad POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy_directory
            "${AUDIOPAD_UI_DIR}"
            "$<TARGET_FILE_DIR:audiopad>/dist"
        COMMENT "Staging web UI assets beside the audiopad target"
        VERBATIM)
else()
    message("Using embed path " ${EMBED_PATH})
    target_include_directories(webview PUBLIC ${EMBED_PATH})
    target_compile_definitions(audiopad PRIVATE IS_EMBEDDED=1)
endif()

if (AUDIOPAD_ENABLE_IPO)
    include(CheckIPOSupported)
    check_ipo_supported(RESULT AUDIOPAD_IPO_SUPPORTED OUTPUT AUDIOPAD_IPO_DIAGNOSTIC)
    if (AUDIOPAD_IPO_SUPPORTED)
        set_property(TARGET audiopad PROPERTY INTERPROCEDURAL_OPTIMIZATION TRUE)
        message(STATUS "IPO/LTO enabled for audiopad — compare Release vs RelWithDebInfo before keeping it")
    else()
        message(WARNING "IPO requested but not supported: ${AUDIOPAD_IPO_DIAGNOSTIC}")
    endif()
endif()

target_compile_features(audiopad PRIVATE cxx_std_17)
set_target_properties(audiopad PROPERTIES
                      CXX_STANDARD 17
                      CXX_EXTENSIONS OFF
                      CXX_STANDARD_REQUIRED ON)

set_target_properties(audiopad PROPERTIES VERSION ${PROJECT_VERSION})
set_target_properties(audiopad PROPERTIES PROJECT_NAME ${PROJECT_NAME})

if(USE_FLATPAK)
    target_compile_definitions(audiopad PRIVATE USE_FLATPAK)
    target_link_libraries(audiopad PRIVATE ${PULSEAUDIO_LIBRARY})

    install(TARGETS audiopad DESTINATION bin)
    if (${EMBED_PATH} STREQUAL "OFF")
        install(DIRECTORY "${AUDIOPAD_UI_DIR}/" DESTINATION bin/dist)
    endif()
else()
  set(CMAKE_INSTALL_PREFIX "/opt/audiopad" CACHE PATH "Install path prefix, prepended onto install directories." FORCE)
  install(TARGETS audiopad DESTINATION .)
  if (${EMBED_PATH} STREQUAL "OFF")
      install(DIRECTORY "${AUDIOPAD_UI_DIR}/" DESTINATION dist)
  endif()
  install(FILES "${CMAKE_SOURCE_DIR}/deployment/audiopad.desktop" DESTINATION /usr/share/applications)
  install(FILES "${CMAKE_SOURCE_DIR}/deployment/appstream/io.github.Audiopad.metainfo.xml" DESTINATION /usr/share/metainfo)
  install(FILES "${CMAKE_SOURCE_DIR}/assets/audiopad.png" DESTINATION /usr/share/pixmaps)
endif()

if (AUDIOPAD_BUILD_TESTS)
    enable_testing()
    add_subdirectory(tests)
endif()
