#pragma once
#include <core/objects/data.hpp>
#include <core/objects/settings.hpp>
#include <string>

namespace Audiopad
{
    namespace Objects
    {
        struct Config
        {
            Data data;
            Settings settings;

            //* Debounced save: snapshots the live globals (artwork images are
            //* compacted to managed references on the way out) and commits
            //* atomically once the burst of changes settled. Callers on the UI path
            //* only pay for the snapshot, never for file I/O.
            void save();

            //* Synchronous commit of everything scheduled so far (exit paths,
            //* explicit savepoints).
            void flush();

            void load();
            static const std::string path;
        };
    } // namespace Objects
} // namespace Audiopad
