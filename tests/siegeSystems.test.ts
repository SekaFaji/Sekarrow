import { test } from "node:test";
import assert from "node:assert/strict";
import { makeGame } from "../src/game/state";
import { META_DEFAULT } from "../src/game/meta";
import type { Enemy } from "../src/game/types";
import { createCombatController } from "../src/features/defense/combat/controller";

function setup() {
  const game = makeGame();
  const gRef = { current: game };
  const metaRef = { current: { ...META_DEFAULT } };
  const controller = createCombatController({
    gRef,
    idRef: { current: 1 },
    metaRef,
    aspectRef: { current: 4 / 3 },
    fieldRef: { current: null },
    tabRef: { current: "none" as const },
    pausedRef: { current: false },
    setMeta: (next) => { metaRef.current = next; },
    setTab: () => {},
    setPhase: () => {},
    setDice: () => {},
    beep: () => {},
  });
  // Keep a wave active, but avoid spawning unrelated enemies during these tests.
  game.remaining = 1;
  game.nextSpawn = Number.POSITIVE_INFINITY;
  game.crateAt = Number.POSITIVE_INFINITY;
  return { game, controller };
}

function target(): Enemy {
  return {
    id: 1,
    kind: "goblin",
    x: 50,
    y: 45,
    hp: 100,
    maxHp: 100,
    speed: 0,
    dmg: 0,
    gold: 0,
    atkCd: 1,
    atkAt: 0,
    hitAt: 0,
    dying: null,
    face: 1,
    phase: 0,
    path: 0,
    pamp: 0,
    pfreq: 0,
    turn: 0,
    elite: false,
  };
}

test("gold mine produces gold without a masonry repair upgrade", () => {
  const { game, controller } = setup();
  game.hp = game.maxHp;
  game.repairLvl = 0;
  game.mine = true;
  game.mineTick = 0;
  controller.update(2, 0.05);
  assert.equal(game.gold, 2);
});

test("catapult attacks at full castle health without masonry repair", () => {
  const { game, controller } = setup();
  game.hp = game.maxHp;
  game.repairLvl = 0;
  game.cata = true;
  game.cataAt = 0;
  const enemy = target();
  game.enemies.push(enemy);
  controller.update(2, 0.05);
  assert.ok(enemy.hp < 100, "catapult should damage a target regardless of masonry");
});

test("automatic volleys are independent of masonry upgrades", () => {
  const { game, controller } = setup();
  game.hp = game.maxHp;
  game.repairLvl = 0;
  game.volleyLvl = 1;
  game.volleyAt = 0;
  game.enemies.push(target());
  controller.update(2, 0.05);
  assert.ok(game.arrows.length > 0, "volley should fire without masonry");
});

test("supply crates land, remain collectible, and eventually expire", () => {
  const { game, controller } = setup();
  game.hp = game.maxHp;
  game.repairLvl = 0;
  game.crates.push({ id: 42, x: 50, y: -6, rest: 40, born: 1 });
  for (let i = 0; i < 30; i++) {
    controller.update(1 + i * 0.1, 0.1);
  }
  assert.equal(game.crates.length, 1);
  assert.equal(game.crates[0].y, 40, "crate should have reached its resting position");
  controller.update(11.1, 0.05);
  assert.equal(game.crates.length, 1, "landed crate should remain collectible after 10 seconds");
  controller.update(16.1, 0.05);
  assert.equal(game.crates.length, 0, "crate expires after 15 seconds");
});
