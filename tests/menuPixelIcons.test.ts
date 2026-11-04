import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { META_DEFAULT } from "../src/game/meta";
import { PixelIcon, PIXEL_ICON_PATTERNS } from "../src/components/PixelIcon";
import { KeepShopOverlay } from "../src/features/defense/ui/KeepShopOverlay";
import { SettingsOverlay, PrivacyOverlay } from "../src/features/defense/ui/SettingsPanels";
import { ArmoryOverlay, PauseOverlay, ConfirmQuitOverlay } from "../src/features/defense/ui/GameOverlays";
import { HowToPlayOverlay } from "../src/features/defense/ui/HowToPlayOverlay";

const countIcons = (markup: string) => (markup.match(/<svg\b/g) || []).length;

test("all code-drawn menu glyphs use exactly 8x8 valid palette cells", () => {
  for (const [name, rows] of Object.entries(PIXEL_ICON_PATTERNS)) {
    assert.equal(rows.length, 8, name);
    for (const row of rows) {
      assert.equal(row.length, 8, name);
      assert.match(row, /^[ksdgrbpwn.]+$/, name);
    }
  }
  assert.ok(Object.keys(PIXEL_ICON_PATTERNS).length >= 40);
  const markup = renderToStaticMarkup(createElement(PixelIcon, { name: "shop", size: 18 }));
  assert.match(markup, /<svg/);
  assert.match(markup, /shape-rendering="crispEdges"/);
});

test("shop uses pixel icons for packs and all perks without losing Buy buttons", () => {
  const props = {
    meta: { ...META_DEFAULT },
    activeTab: "rubies" as const,
    onTabChange: () => {},
    onBuyRubyPack: () => {},
    onBuyPerk: () => {},
    onClose: () => {},
  };
  const packs = renderToStaticMarkup(createElement(KeepShopOverlay, props));
  const perks = renderToStaticMarkup(createElement(KeepShopOverlay, { ...props, activeTab: "perks" }));
  assert.ok(countIcons(packs) >= 6);
  assert.ok(countIcons(perks) >= 8);
  assert.match(packs, /FREE TEST/);
  assert.match(packs, /BUY/);
  assert.match(perks, /RUBIES/);
  assert.match(perks, /disabled=""/);
  assert.ok(packs.lastIndexOf("CLOSE") > packs.lastIndexOf("FREE TEST"));
});

test("settings, help, privacy and armory render pixel icons and retain controls", () => {
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
  const help = renderToStaticMarkup(createElement(HowToPlayOverlay, { onContinue: () => {} }));
  const armory = renderToStaticMarkup(createElement(ArmoryOverlay, {
    meta: { ...META_DEFAULT }, buyMeta: () => {}, onClose: () => {},
  }));
  assert.ok(countIcons(settings) >= 6);
  assert.ok(countIcons(privacy) >= 1);
  assert.ok(countIcons(help) >= 9);
  assert.ok(countIcons(armory) >= 6);
  assert.match(settings, /RESTORE PURCHASES/);
  assert.match(settings, /PRIVACY POLICY/);
  assert.match(help, /GOT IT/);
  assert.match(armory, /REINFORCED WALLS/);
  assert.match(armory, /CLOSE/);
});

test("pause and quit actions keep accessible text with new icons", () => {
  const paused = renderToStaticMarkup(createElement(PauseOverlay, {
    onResume: () => {}, onMainMenu: () => {},
  }));
  const quit = renderToStaticMarkup(createElement(ConfirmQuitOverlay, {
    onKeepDefending: () => {}, onQuitToMenu: () => {},
  }));
  assert.ok(countIcons(paused) >= 3);
  assert.ok(countIcons(quit) >= 1);
  assert.match(paused, /RESUME/);
  assert.match(quit, /QUIT TO MENU/);
});

test("menu presentation code avoids platform emoji across every extracted panel", () => {
  const paths = [
    "src/features/defense/ui/KeepShopOverlay.tsx",
    "src/features/defense/ui/CourtyardOverlay.tsx",
    "src/features/defense/ui/SettingsPanels.tsx",
    "src/features/defense/ui/GameOverlays.tsx",
    "src/features/defense/ui/HowToPlayOverlay.tsx",
  ];
  for (const path of paths) {
    const source = readFileSync(path, "utf8");
    assert.doesNotMatch(source, /[\u{1F300}-\u{1FAFF}]/u, path);
    assert.match(source, /PixelIcon/, path);
  }
});
