import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { META_DEFAULT } from "../src/game/meta";
import { UpgradeCard } from "../src/components/UpgradeCard";
import { ArmoryOverlay, ConfirmQuitOverlay, PauseOverlay } from "../src/features/defense/ui/GameOverlays";
import { SettingsOverlay, PrivacyOverlay } from "../src/features/defense/ui/SettingsPanels";

test("game fills phone screens and uses a capped portrait frame on desktop", () => {
  const styles = readFileSync("src/index.css", "utf8");
  const game = readFileSync("src/features/defense/Sekarrow.tsx", "utf8");
  assert.match(game, /sekarrow-field relative w-full flex-1 min-h-0/);
  assert.match(styles, /\.sekarrow-field\s*\{\s*width:\s*100%;\s*height:\s*100%/);
  assert.match(styles, /@media \(min-width: 640px\)/);
  assert.match(styles, /aspect-ratio:\s*9\s*\/\s*16/);
  assert.match(styles, /width:\s*min\(430px, calc\(56\.25dvh - 49\.5px\)\)/);
});

test("between-wave menu buttons wrap instead of overflowing their panel", () => {
  const game = readFileSync("src/features/defense/Sekarrow.tsx", "utf8");
  assert.match(game, /className="flex w-full min-w-0 flex-wrap items-center justify-center gap-2"/);
  assert.match(game, /max-w-\[390px\] w-full max-h-full overflow-x-hidden overflow-y-auto/);
  const shop = readFileSync("src/features/defense/ui/KeepShopOverlay.tsx", "utf8");
  assert.match(shop, /h-\[min\(620px,100%\)\]/);
});

test("shared upgrade cards stack phone actions under readable descriptions", () => {
  const html = renderToStaticMarkup(createElement(UpgradeCard, {
    icon: "⛨",
    name: "A VERY LONG FORTRESS UPGRADE NAME",
    desc: "A lengthy explanation should wrap instead of being cut off by a fixed width action column.",
    cost: "180◆",
    action: "UPGRADE",
  }));
  assert.match(html, /sm:flex-row/);
  assert.match(html, /flex-col/);
  assert.match(html, /min-w-0/);
  assert.match(html, /overflow-wrap:anywhere/);
  assert.match(html, /A VERY LONG FORTRESS UPGRADE NAME/);
  assert.match(html, /UPGRADE/);
});

test("game overlays constrain their panels and keep armory close separate from the scroll list", () => {
  const pause = renderToStaticMarkup(createElement(PauseOverlay, {
    onResume: () => {}, onMainMenu: () => {},
  }));
  const confirm = renderToStaticMarkup(createElement(ConfirmQuitOverlay, {
    onKeepDefending: () => {}, onQuitToMenu: () => {},
  }));
  const armory = renderToStaticMarkup(createElement(ArmoryOverlay, {
    meta: { ...META_DEFAULT }, buyMeta: () => {}, onClose: () => {},
  }));
  for (const html of [pause, confirm, armory]) {
    assert.match(html, /sekarrow-modal/);
    assert.match(html, /max-h-full/);
    assert.match(html, /overflow-x-hidden/);
  }
  assert.match(armory, /min-h-0/);
  assert.match(armory, /flex-1/);
  assert.ok(armory.lastIndexOf("CLOSE") > armory.lastIndexOf("UPGRADE"));
});

test("settings and privacy use scrollable, phone-width dialog surfaces", () => {
  const settings = renderToStaticMarkup(createElement(SettingsOverlay, {
    settingsTab: "general",
    setSettingsTab: () => {},
    restorePurchases: () => {},
    restoreMsg: "",
    soundOn: true,
    toggleSound: () => {},
    ensureAudio: () => {},
    beep: () => {},
    onPrivacy: () => {},
    onClose: () => {},
  }));
  const privacy = renderToStaticMarkup(createElement(PrivacyOverlay, { onBack: () => {} }));
  for (const html of [settings, privacy]) {
    assert.match(html, /sekarrow-modal/);
    assert.match(html, /max-w-\[390px\]/);
    assert.match(html, /overflow-x-hidden/);
    assert.match(html, /overflow-y-auto/);
  }
});

test("all menu text inherits safe wrapping instead of being clipped horizontally", () => {
  const styles = readFileSync("src/index.css", "utf8");
  assert.match(styles, /\.sekarrow-modal\s*\{[^}]*overflow-wrap:\s*anywhere/s);
  assert.match(styles, /\.sekarrow-modal button\s*\{[^}]*white-space:\s*normal/s);
  assert.match(styles, /\.sekarrow-modal \.scrollbox\s*\{[^}]*overscroll-behavior:\s*contain/s);
});
