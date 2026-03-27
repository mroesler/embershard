# Changelog

All notable changes to Embershard will be documented here.

---

## [0.2.0] — 2026-03-27

### First Playable

The hero walks. The world loads. The HUD watches over it all.

### Added

- **Playable character** — move with WASD, attack with Space. The player spawns at the center of the map and is clamped to the playfield boundaries.
- **Overworld map** — the Tiled map loads and renders via the Excalibur Tiled plugin. The camera is positioned so the playfield sits between the HUD strips.
- **Canvas HUD** — HP and MP bars plus a bottom inventory strip are now rendered directly on the game canvas as Excalibur ScreenElements. No HTML overlays.
- **Crisp rendering at 3× zoom** — the engine renders at 3× internally so canvas text and UI elements stay pixel-sharp at any display size.

### Changed

- Canvas dimensions now derived from a single source of truth in `TileConfig` — `CANVAS_WIDTH`, `CANVAS_HEIGHT`, `HUD_TOP_HEIGHT`, `HUD_BOTTOM_HEIGHT`, and camera position constants.
- Player spawn and movement bounds updated from camera-centered coordinates to map-origin (0, 0) coordinates.

---

## [0.1.0] — 2026-03-26

### Welcome to Embershard

This is the very first release of Embershard — a top-down 2D adventure game inspired by the original Legend of Zelda. The world has shattered. The ember still glows.

No playable game yet — this release marks the foundation being laid. Everything needed to build, test, and ship the game is now in place.

### What's included

- The project is up and running. You can launch a development build locally with a single command.
- The game window opens at the correct NES-style resolution (256×240) with pixel-perfect rendering.
- Automatic releases: when a new version is ready, a downloadable build is published here on GitHub automatically.
- The codebase is protected against common mistakes — code is checked for quality and correctness before anything is accepted.

### What's coming

The first playable content — a hero, a world to explore, and something worth fighting for.

---
