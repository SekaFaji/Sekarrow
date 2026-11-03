import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PixButton } from "../src/components/PixButton";
import { UpgradeCard } from "../src/components/UpgradeCard";
import { UpgradePanel } from "../src/features/defense/ui/UpgradePanel";
import { UPGRADE_TABS, type UpgradeDefinition } from "../src/features/defense/upgrades/upgradeShop";

function item(overrides: Partial<UpgradeDefinition> = {}): UpgradeDefinition {
  return {
    id: "power",
    cat: "bow",
    icon: "➤",
    short: "POWER",
    name: "BOW POWER",
    desc: "Stronger arrows make each shot deal more damage.",
    cost: 25,
    buyable: true,
    done: false,
    buy: () => {},
    ...overrides,
  };
}

function panel(upgrades: UpgradeDefinition[], selectedId: string | null = null) {
  return renderToStaticMarkup(createElement(UpgradePanel, {
    gold: 120,
    upgrades,
    tabs: UPGRADE_TABS,
    activeTab: "bow",
    selectedId,
    onTabChange: () => {},
    onSelect: () => {},
    onClose: () => {},
  }));
}

test("siege upgrade panel has clear navigation and a persistent detail area", () => {
  const markup = panel([item()], "power");
  assert.match(markup, /role="dialog"/);
  assert.match(markup, /aria-modal="true"/);
  assert.match(markup, /role="tablist"/);
  assert.match(markup, /BOW DEFENSES/);
  assert.match(markup, /CLOSE UPGRADES/);
  assert.match(markup, /Stronger arrows make each shot deal more damage/);
  assert.match(markup, /25 gold - READY/);
});

test("tile states describe locked, ready, and maxed upgrades", () => {
  const markup = panel([
    item(),
    item({ id: "locked", short: "SHIELD", name: "FORCE SHIELD", buyable: false, lockTxt: "BUILD A TOWER FIRST" }),
    item({ id: "done", short: "PIERCE", name: "PIERCING", buyable: false, done: true, doneTxt: "MAXED" }),
  ]);
  assert.match(markup, /Purchase now/);
  assert.match(markup, /BUILD A TOWER FIRST/);
  assert.match(markup, /Maxed/);
  assert.match(markup, /25g/);
});

test("upgrades in other branches do not appear in the active list", () => {
  const markup = panel([
    item(),
    item({ id: "mine", cat: "castle", name: "CASTLE MINE", short: "MINE" }),
  ]);
  assert.doesNotMatch(markup, /CASTLE MINE/);
  assert.match(markup, /BOW POWER/);
});

test("shared pixel buttons offer a keyboard-focus indicator and practical tap target", () => {
  const markup = renderToStaticMarkup(createElement(PixButton, { color: "#4caf50", small: true, onClick: () => {} }, "START"));
  assert.match(markup, /type="button"/);
  assert.match(markup, /min-h-\[42px\]/);
  assert.match(markup, /focus-visible:outline/);
});

test("upgrade cards preserve actions with legible description text", () => {
  const markup = renderToStaticMarkup(createElement(UpgradeCard, {
    icon: "⛨", name: "REINFORCED WALLS", desc: "Increase maximum castle health.",
    cost: "20◆", action: "UPGRADE",
  }));
  assert.match(markup, /REINFORCED WALLS/);
  assert.match(markup, /Increase maximum castle health/);
  assert.match(markup, /text-\[9px\]/);
  assert.match(markup, /UPGRADE/);
});

test("browser viewport allows accessible zoom while retaining the safe area", () => {
  const html = readFileSync("index.html", "utf8");
  assert.match(html, /viewport-fit=cover/);
  assert.doesNotMatch(html, /user-scalable=no/);
  assert.doesNotMatch(html, /maximum-scale=1/);
});
