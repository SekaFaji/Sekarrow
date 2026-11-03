import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { META_DEFAULT, TOWN_BLDGS, PERKS, RUBY_PACKS } from "../src/game/meta";
import { HowToPlayOverlay } from "../src/features/defense/ui/HowToPlayOverlay";
import { KeepShopOverlay } from "../src/features/defense/ui/KeepShopOverlay";
import { CourtyardOverlay } from "../src/features/defense/ui/CourtyardOverlay";

test("first-run help retains its controls and concise instructions", () => {
  const html = renderToStaticMarkup(createElement(HowToPlayOverlay, { onContinue: () => {} }));
  assert.match(html, /HOW TO DEFEND THE KEEP/);
  assert.match(html, /HOLD &amp; DRAG/);
  assert.match(html, /GOT IT/);
  assert.match(html, /sekarrow-modal/);
  assert.match(html, /max-h-full/);
});

test("keep shop renders all test ruby packs and keeps its close control outside scrolling content", () => {
  const html = renderToStaticMarkup(createElement(KeepShopOverlay, {
    meta: { ...META_DEFAULT },
    activeTab: "rubies",
    onTabChange: () => {},
    onBuyRubyPack: () => {},
    onBuyPerk: () => {},
    onClose: () => {},
  }));
  assert.match(html, /KEEP SHOP/);
  assert.match(html, /FREE TEST/);
  for (const pack of RUBY_PACKS) assert.ok(html.includes(pack.name));
  assert.match(html, /overflow-y-auto/);
  assert.ok(html.lastIndexOf("CLOSE") > html.lastIndexOf("FREE TEST"));
});

test("keep shop retains purchased perk display and purchase gating", () => {
  const html = renderToStaticMarkup(createElement(KeepShopOverlay, {
    meta: { ...META_DEFAULT, speed: 1, rubies: 0 },
    activeTab: "perks",
    onTabChange: () => {},
    onBuyRubyPack: () => {},
    onBuyPerk: () => {},
    onClose: () => {},
  }));
  for (const perk of PERKS) assert.ok(html.includes(perk.name));
  assert.match(html, /OWNED/);
  assert.match(html, /disabled=""/);
  assert.match(html, /PERKS/);
});

test("courtyard exposes all five building plots, their costs and the selected building detail", () => {
  // PixelSprite is a canvas-backed component. A test-only stub lets us render
  // the real React markup without a browser or a canvas dependency in Node.
  const originalDocument = globalThis.document;
  Object.defineProperty(globalThis, "document", {
    configurable: true,
    value: {
      createElement: () => ({
        width: 0,
        height: 0,
        getContext: () => ({ fillStyle: "", fillRect: () => {} }),
        toDataURL: () => "data:image/png;base64,",
      }),
    },
  });
  try {
    const html = renderToStaticMarkup(createElement(CourtyardOverlay, {
      meta: { ...META_DEFAULT, gold: 500 },
      selectedTown: "townMine",
      onSelectTown: () => {},
      onBuyTown: () => {},
      onClose: () => {},
    }));
    for (const building of TOWN_BLDGS) {
      assert.match(html, new RegExp(`aria-label="${building.name}, level 0 of 4`));
    }
    assert.match(html, /GOLD MINE/);
    assert.match(html, /BUILD/);
    assert.match(html, /THE COURTYARD/);
    assert.match(html, /CLOSE/);
  } finally {
    Object.defineProperty(globalThis, "document", {
      configurable: true,
      value: originalDocument,
    });
  }
});
