import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { META_DEFAULT } from "../src/game/meta";
import { UpgradeCard } from "../src/components/UpgradeCard";
import { PixButton } from "../src/components/PixButton";
import { PauseOverlay, ConfirmQuitOverlay, ArmoryOverlay } from "../src/features/defense/ui/GameOverlays";
import { SettingsOverlay, PrivacyOverlay } from "../src/features/defense/ui/SettingsPanels";

test("shared upgrade cards use compact information text and keep wrapping", () => {
  const html = renderToStaticMarkup(createElement(UpgradeCard, {
    icon: "⚒", name: "DEFENSIVE WALL", desc: "Long descriptions wrap inside the card.",
    cost: "125 gold", action: "UPGRADE",
  }));
  assert.match(html, /text-\[9px\] leading-\[16px\] text-white/);
  assert.match(html, /text-\[8px\] leading-\[15px\] text-white\/80/);
  assert.match(html, /overflow-wrap:anywhere/);
  assert.match(html, /UPGRADE/);
});

test("pause, quit and armory explanations use compact body copy", () => {
  const pause = renderToStaticMarkup(createElement(PauseOverlay, {
    onResume: () => {}, onMainMenu: () => {},
  }));
  const quit = renderToStaticMarkup(createElement(ConfirmQuitOverlay, {
    onKeepDefending: () => {}, onQuitToMenu: () => {},
  }));
  const armory = renderToStaticMarkup(createElement(ArmoryOverlay, {
    meta: { ...META_DEFAULT }, buyMeta: () => {}, onClose: () => {},
  }));
  for (const html of [pause, quit, armory]) {
    assert.match(html, /text-\[8px\] leading-\[15px\]/);
    assert.match(html, /max-h-full/);
  }
});

test("settings and privacy paragraphs use matching compact text sizes", () => {
  const props = {
    settingsTab: "general" as const, setSettingsTab: () => {},
    restorePurchases: () => {}, restoreMsg: "", soundOn: true,
    toggleSound: () => {}, ensureAudio: () => {}, beep: () => {},
    onPrivacy: () => {}, onClose: () => {},
  };
  const settings = renderToStaticMarkup(createElement(SettingsOverlay, props));
  const privacy = renderToStaticMarkup(createElement(PrivacyOverlay, { onBack: () => {} }));
  assert.match(settings, /text-\[8px\] text-white\/75 text-center leading-\[15px\]/);
  assert.match(privacy, /text-\[8px\] text-white\/85 leading-\[15px\]/);
});

test("game information is compact without reducing button touch targets", () => {
  const source = readFileSync("src/features/defense/Sekarrow.tsx", "utf8");
  const upgrade = readFileSync("src/features/defense/ui/UpgradePanel.tsx", "utf8");
  assert.match(source, /text-\[8px\] text-white\/85 leading-\[15px\]/);
  assert.match(source, /text-\[8px\] text-white\/70 text-center leading-\[15px\]/);
  assert.match(source, /text-\[9px\] text-white\/85 leading-\[17px\]/);
  assert.match(upgrade, /text-\[8px\] leading-\[14px\] text-white\/80/);
  const button = renderToStaticMarkup(createElement(PixButton, {
    color: "#4caf50", small: true,
  }, "START"));
  assert.match(button, /min-h-\[42px\]/);
  assert.match(button, /text-\[10px\]/);
});
