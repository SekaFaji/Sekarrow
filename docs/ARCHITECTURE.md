# Architecture

Sekarrow is a React/TypeScript browser fortress-defense game with a custom simulation loop. The planned fortress-progression redesign is separate from the completed product renaming. Source, browser title, project links, and build path now use the Sekarrow name.

## Source layout

```text
src/
├── main.tsx                       # Browser bootstrap
├── Sekarrow.tsx                  # Stable compatibility entry point
├── features/
│   └── defense/
│       ├── Sekarrow.tsx          # Active game screen and UI composition
│       ├── useGameLoop.ts         # Animation frame scheduler
│       ├── combat/controller.ts   # Combat simulation and wave lifecycle
│       ├── input/defenseInput.ts  # Pointer handling and coordinate mapping
│       ├── audio/useGameAudio.ts  # Web Audio sound effects
│       ├── upgrades/upgradeShop.ts # In-run upgrade catalog and purchase rules
│       ├── upgrades/permanentPurchases.ts # Persistent upgrade transactions
│       ├── ui/GameOverlays.tsx  # Reusable pause, quit and armory panels
│       ├── ui/SettingsPanels.tsx # Settings and privacy presentation
│       ├── ui/UpgradePanel.tsx  # Responsive, data-driven in-run upgrade UI
│       ├── ui/KeepShopOverlay.tsx # Ruby packs and permanent perks UI
│       ├── ui/CourtyardOverlay.tsx # Permanent town rendering
│       ├── ui/HowToPlayOverlay.tsx # First-run instruction panel
│       └── world/               # Memoized static terrain and fortress decor
├── game/
│   ├── types.ts                   # Shared game and save-state types
│   ├── sprites.ts                 # Pixel art source data
│   ├── config.ts                  # World layout and camera configuration
│   ├── enemies.ts                 # Enemy catalog, scaling and selection
│   ├── state.ts                   # New-run state factory
│   ├── meta.ts                    # Permanent progression and persistence
│   └── storage.ts                 # Save migration and browser storage
└── components/
    ├── PixelSprite.tsx            # Cached sprite rasterizer
    ├── PixButton.tsx              # Shared pixel-style button
    └── UpgradeCard.tsx            # Shared upgrade card
```

## Runtime boundaries

- **Game data:** type definitions, enemy data, world configuration and sprite source live in `src/game`. They do not import React.
- **Presentation:** shared visual components live in `src/components`. They should not own combat rules or persistence.
- **Feature:** `src/features/defense/Sekarrow.tsx` owns UI state and world composition; its frame driver, combat controller, input adapter, audio hook, upgrade catalog, purchase operations, and basic overlays live in separate modules.
- **Simulation:** `src/features/defense/combat/controller.ts` uses injected mutable references and callbacks to avoid coupling combat rules to React.
- **Input:** pure coordinate helpers are exported alongside the pointer event adapters so they can be independently tested.
- **Persistence:** `src/game/storage.ts` stores Sekarrow saves and migrates pre-rename browser values on first read. The meta progression model remains in `src/game/meta.ts`. Old storage identifiers are intentionally retained only in the migration adapter.

## Intentional limitations of the first cleanup

The screen component is **still large** and includes menu orchestration, combat HUD, intermission screen, and animated world rendering; the courtyard, ruby shop, first-run help, upgrade catalogs, purchase operations, settings/privacy panels, static terrain and fortress decor are now separate. The simulation and frame scheduler are now extracted, but the combat controller is still imperative and uses injected callbacks. Further decomposition of UI, isolating state transitions, expanding automated tests, expanding lint rules and test depth remain follow-up work. UI polish is now being handled separately without changing combat mechanics.

## Rendering boundary (Patch 2)

- `WorldTerrain` and the static fortress decoration components are `React.memo` components with primitive zoom, scale, and construction-state props. They are not passed the mutable `Game` object, so frame-driven UI refreshes do not rerender them after zoom settles unless a relevant building changes.
- Animated enemies, arrows, the castle's hit feedback, guard motion and UI overlays retain their original update behavior and DOM order. This is a limited optimization rather than a new renderer.
- Settings and privacy markup live in `SettingsPanels.tsx`. Storage, audio, and state transitions still belong to the main feature component.
- Tests cover camera projection, memoized boundaries, and the extracted settings panels. CI still runs the existing combat and persistence checks.
- The main screen continues to request a React update each animation frame. A more substantial renderer refactor should be benchmarked before altering animation cadence or combat behavior.

## UI readability boundary (Patch 3)

- The data-driven `UpgradePanel` receives purchase callbacks from `upgradeShop.ts`. P5 changed tile interaction to select-first and a separate **BUY UPGRADE** action in its persistent detail panel. The grid still uses the existing catalog and buying logic.
- Five upgrade categories now fit in a responsive grid; tiles and costs use larger text, focus indicators and clearer locked/ready/maxed states. This does not change costs or unlock conditions.
- The permanent courtyard shows its constructed-building count and exposes plot names, levels and costs to assistive technology. Local meta saves and purchases are unchanged.
- Reusable pixel buttons and upgrade cards have larger tap targets and more readable labels. The viewport no longer disables browser zoom. A full browser/device layout check is still recommended.
- Ruby-pack UI explicitly describes free testing packs, without changing the existing test-only grant behavior.

## Phone stage and menu containment (mobile layout fix)

- The battlefield fills the available phone viewport. At widths of 640px or more, `src/index.css` constrains it to a centered 9:16 portrait frame, up to 430px wide. The existing pointer-to-field coordinate mapping uses the actual field rectangle, so controls remain aligned at both sizes.
- Dialogs use a `sekarrow-modal` text-wrapping boundary. Narrow panels cannot force long pixel-font labels outside the game field, and short screens scroll the content rather than clipping it.
- `touch-action: none` is applied to the interactive battlefield layer rather than the parent field; modal pointers are ignored by `defenseInput.ts` so swiping a scrollable menu does not aim or fire.
- Shared upgrade cards stack their purchase buttons below the descriptions on phones; their existing horizontal layout remains on larger screens.
- The shop and armory keep their close buttons outside their scroll lists. The courtyard keeps its map height and uses a sticky close action. Between-wave menu buttons wrap instead of exceeding panel width.
- This patch does not change the simulation, upgrades, save keys, or game progression. Verify actual viewport layouts on a narrow phone and a short landscape screen in addition to CI.

## Compact informational typography

- Informational copy uses an intentionally compact pixel-font scale (mostly 8px body text and 9px labels). Submenu headings sit around 12px, with the main title and gameplay cues intentionally remaining prominent.
- This is a presentation-only adjustment to existing panels, including the HUD, armory, courtyard, shop, tutorial, settings, and run summaries. No gameplay pricing or mechanics change.
- Interactive pixel buttons retain their existing minimum tap target sizes; text wrapping and scrollable mobile panels from the previous patch remain enabled.
- Because pixel fonts are unusually wide, review on a real 320px-wide phone before further increasing the font size.

## Screen composition cleanup (UI extraction)

- `Sekarrow.tsx` is smaller by roughly 240 lines. It now composes `HowToPlayOverlay`, `CourtyardOverlay` and `KeepShopOverlay` rather than containing their large inline JSX trees.
- These components are presentational only. The main game screen still owns the selected town plot, tab selection, first-run flag, purchase callbacks, sounds and close actions. No purchase validation, saved-state fields or combat rules were moved.
- All three overlays retain their mobile scroll and text-wrapping styles, and their relative rendering order and visibility conditions remain the same.
- Regression tests cover the displayed tutorials, Ruby pack and perk catalogs, and five courtyard building plots. Existing layout tests now inspect the component that actually renders each panel.
- This is a targeted extraction, not a completed architecture audit. The frame-level render of the main screen, large combat controller and remaining in-game HUD are still candidates for future measured refactoring.

## Siege upgrade confirmation and pixel icons (P5)

- `UpgradePanel` separates selection from purchasing. A tile tap only opens its detail; a deliberate `BUY UPGRADE` action calls the existing purchase callback. No costs, caps, or saved-state keys change.
- Every upgrade definition reports a `levelLabel` for the selected detail and grid tile, including repeatable levels, unit slots, and repair HP state.
- `PixelIcon` renders original 8x8 SVG pixel art for in-run upgrade tabs and tiles. This replaces device-dependent emoji in this panel while keeping icon definitions outside the simulation.
- Shared `UpgradeCard` uses a non-shrinking vertical card and separate footer for the price and action. This prevents shop cards collapsing against adjacent cards on short phone screens.
- Tests check the select/buy separation, icon data and mobile card layout. Manually check the ruby packs, perks, and upgrade level changes on a real device.

## Changes requiring care

- Any future save-key or schema changes must preserve existing progress and be tested as migrations.
- Treat `src/game/types.ts` and `src/game/state.ts` as a pair: the factory must initialize the complete required game state.
- The project uses a hand-authored pixel sprite format; preserve the cached rasterizer when refactoring rendering.
- The repository and GitHub Pages base path are `Sekarrow` and `/Sekarrow/`. The web server and GitHub Pages settings must point to the renamed repository.
- Run `npm run check` before merging; the CI command now runs type checking, Node-based TypeScript regression tests and the production build. Review a playable browser run for behavior-specific validation.

## Checks

```bash
npm ci
npm run check
```

The `check` script runs ESLint correctness checks, TypeScript's `tsc --noEmit`, regression tests using `tsx --test`, and a Vite production build. CI uses `npm ci` with the committed `package-lock.json`. A GitHub Actions workflow runs the same checks for pull requests.
