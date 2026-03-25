# Embershard — Project Context

## Game Concept
- **Genre:** Top-down 2D adventure (Zelda NES style)
- **Perspective:** Overhead, tile-based movement
- **Influences:** The Legend of Zelda (NES) — dungeons, overworld exploration, relics, combat

## Tech Stack Decision

### Evaluated Engines (Rejected)
| Engine | Reason Rejected |
|--------|-----------------|
| Unity | Not web-native, C# not preferred, overkill for 2D scope |
| MonoGame | C#, desktop-focused, not web-native |
| GameMaker | Proprietary language (GML), licensing cost, not TypeScript |
| Phaser.js | JavaScript-first (TS support is secondary), less opinionated structure |

### Chosen: Excalibur.js
**Why Excalibur.js over Phaser.js:**
- Written entirely in TypeScript (not a JS lib with TS bolted on)
- First-class TypeScript types and architecture
- Has a tilemap plugin (`@excaliburjs/plugin-tiled`) for Tiled map editor integration — critical for Zelda-style tile-based worlds
- Evaluated as suitable for Zelda NES style game: supports tile-based scenes, sprite animation, collision, scene management, and entity-component patterns

## Excalibur.js Engine Evaluation (v0.32.0, March 2026)

All core requirements confirmed supported. Gotchas reviewed and resolved:

| Gotcha | Resolution |
|--------|------------|
| Rooms smaller than viewport (camera flicker) | Non-issue — all rooms are a fixed standard size, always >= viewport |
| Pre-1.0 breaking changes | Pin exact versions with `--save-exact` on install; check changelog before upgrading |
| No built-in animation state machine | Will build our own per-entity (planned dev work) |
| No audio bus/channel grouping | Track music and SFX instances manually; not a blocker |
| Browser autoplay blocked until user interaction | Title screen "Press any key to start" handles this naturally |

## Planned Delivery
- Browser-based primary target
- PC executable via Electron (planned, not immediate)

## Key Links
- Excalibur.js docs: https://excaliburjs.com/docs/
- Tiled plugin: https://github.com/excaliburjs/excalibur-tiled
