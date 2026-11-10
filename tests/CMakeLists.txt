# Regression tests and the latency benchmark for the Audiopad engine rework.
# Methodology, tuning guidance and sanitizer instructions: tests/README.md.

# --- shared sources ---------------------------------------------------------
# The helpers under test (paths / URI encoding, atomic writes, debounced
# commits, bounded artwork) compiled independently from the app target so the
# tests do not pull in the GUI. The engine is compiled separately per binary
# (engine.cpp carries MINIAUDIO_IMPLEMENTATION exactly once per executable).

add_library(audiopad_test_support STATIC
    ${CMAKE_SOURCE_DIR}/src/helper/paths/paths.cpp
    ${CMAKE_SOURCE_DIR}/src/helper/debounce_writer/debounce_writer.cpp
    ${CMAKE_SOURCE_DIR}/src/helper/base64/base64.cpp
    ${CMAKE_SOURCE_DIR}/src/helper/artwork/artwork.cpp
)
target_include_directories(audiopad_test_support SYSTEM PUBLIC
    ${CMAKE_SOURCE_DIR}/src
    ${CMAKE_SOURCE_DIR}/lib/json/single_include
)
target_compile_features(audiopad_test_support PUBLIC cxx_std_17)

if (WIN32)
    # artwork decoding via WIC + COM (mirrors the app target)
    target_link_libraries(audiopad_test_support PUBLIC windowscodecs ole32)
endif()

add_library(audiopad_test_engine STATIC
    ${CMAKE_SOURCE_DIR}/src/helper/audio/engine.cpp
)
target_include_directories(audiopad_test_engine SYSTEM PUBLIC
    ${CMAKE_SOURCE_DIR}/src
    ${CMAKE_SOURCE_DIR}/lib/miniaudio
)
target_compile_features(audiopad_test_engine PUBLIC cxx_std_17)
if (WIN32)
    # engine.cpp resolves decoder paths through Helpers::widen()
    target_sources(audiopad_test_engine PRIVATE ${CMAKE_SOURCE_DIR}/src/helper/misc/misc.cpp)
    # misc.cpp includes fancy.hpp and process.hpp and uses TinyProcessLib, so it
    # needs the same dependencies the app target gets (the app target sets these
    # on itself, which the test targets do not inherit).
    target_include_directories(audiopad_test_engine SYSTEM PRIVATE
        ${CMAKE_SOURCE_DIR}/lib/fancypp/include
    )
    target_link_libraries(audiopad_test_engine PRIVATE tiny-process-library)
endif()

# --- test executables -------------------------------------------------------

function(audiopad_add_test name)
    add_executable(${name} ${name}.cpp)
    target_compile_features(${name} PRIVATE cxx_std_17)
    target_include_directories(${name} SYSTEM PRIVATE
        ${CMAKE_SOURCE_DIR}/src
        ${CMAKE_CURRENT_SOURCE_DIR}
    )
    target_link_libraries(${name} PRIVATE audiopad_test_support audiopad_test_engine)
    add_test(NAME ${name} COMMAND ${name})
    if (NOT MSVC)
        target_compile_options(${name} PRIVATE -Wall -Wextra)
    endif()
endfunction()

audiopad_add_test(test_playback)
audiopad_add_test(test_callback_budget)
audiopad_add_test(test_assets)

# Board arrangement regression — pure model logic (manual folder ordering and
# the whole-board loop sequence), no audio dependency.
add_executable(test_ordering test_ordering.cpp ${CMAKE_SOURCE_DIR}/src/core/objects/ordering.cpp)
target_compile_features(test_ordering PRIVATE cxx_std_17)
target_include_directories(test_ordering SYSTEM PRIVATE
    ${CMAKE_SOURCE_DIR}/src
    ${CMAKE_CURRENT_SOURCE_DIR}
)
target_link_libraries(test_ordering PRIVATE audiopad_test_support)
add_test(NAME test_ordering COMMAND test_ordering)
if (NOT MSVC)
    target_compile_options(test_ordering PRIVATE -Wall -Wextra)
endif()

# Informational harness — always exits 0, labelled for selective runs:
#   ctest -L benchmark
#   (see the add_test LABELS property below)
add_executable(benchmark_latency benchmark_latency.cpp)
target_compile_features(benchmark_latency PRIVATE cxx_std_17)
target_include_directories(benchmark_latency SYSTEM PRIVATE
    ${CMAKE_SOURCE_DIR}/src
    ${CMAKE_CURRENT_SOURCE_DIR}
)
target_link_libraries(benchmark_latency PRIVATE audiopad_test_support audiopad_test_engine)
add_test(NAME benchmark_latency COMMAND benchmark_latency)
set_tests_properties(benchmark_latency PROPERTIES LABELS "benchmark")