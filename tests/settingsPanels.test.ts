import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { SettingsOverlay, PrivacyOverlay } from "../src/features/defense/ui/SettingsPanels";

const props = {
  settingsTab: "general" as const,
  setSettingsTab: () => {},
  restorePurchases: () => {},
  restoreMsg: "",
  soundOn: true,
  toggleSound: () => {},
  ensureAudio: () => {},
  beep: () => {},
  onPrivacy: () => {},
  onClose: () => {},
};

test("settings component preserves general settings and purchase controls", () => {
  const html = renderToStaticMarkup(createElement(SettingsOverlay, props));
  assert.match(html, /SETTINGS/);
  assert.match(html, /RESTORE PURCHASES/);
  assert.match(html, /PRIVACY POLICY/);
  assert.match(html, /CLOSE/);
});

test("sound settings remain accessible after separating presentation", () => {
  const html = renderToStaticMarkup(createElement(SettingsOverlay, { ...props, settingsTab: "sound" }));
  assert.match(html, /TEST SOUND/);
  assert.match(html, /MUTE/);
});

test("privacy disclosure remains visible in its own panel", () => {
  const html = renderToStaticMarkup(createElement(PrivacyOverlay, { onBack: () => {} }));
  assert.match(html, /PRIVACY POLICY/);
  assert.match(html, /BACK/);
});
