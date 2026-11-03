import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement, isValidElement } from "react";
import { WorldTerrain, worldToScreenPercent } from "../src/features/defense/world/WorldTerrain";
import { FortressDecor, MoatDecor, WormDecor } from "../src/features/defense/world/FortressDecor";

test("world coordinate projection preserves the camera center at all zoom levels", () => {
  for (const zoom of [1, 0.8, 0.5, 0.28]) {
    assert.equal(worldToScreenPercent(50, zoom), 50);
    assert.ok(Math.abs(worldToScreenPercent(20, zoom) - (50 - 30 * zoom)) < 1e-9);
  }
});

test("non-animated battlefield elements use memoized independent components", () => {
  for (const element of [WorldTerrain, FortressDecor, MoatDecor, WormDecor]) {
    assert.equal(element.$$typeof, Symbol.for("react.memo"));
  }
});

test("static scenery can be composed without owning mutable game state", () => {
  // The component receives zoom as a primitive; no Game ref or frame callback.
  const scene = createElement(WorldTerrain, { zoom: 0.75 });
  assert.ok(isValidElement(scene));
  assert.deepEqual(Object.keys(scene.props), ["zoom"]);
});
