import { test } from "node:test";
import assert from "node:assert/strict";
import { menuFadeAnimation } from "../src/features/defense/ui/menuTransition";

test("initial menu entrance stays synchronized with the startup splash", () => {
  assert.equal(menuFadeAnimation(true), "fadein 0.7s ease-out 2.6s both");
});

test("returning to menu after a run skips the 2.6-second startup delay", () => {
  assert.equal(menuFadeAnimation(false), "fadein 0.16s ease-out both");
  assert.doesNotMatch(menuFadeAnimation(false), /2\.6s/);
});
