/**
 * The cinematic menu entrance is only for the initial studio splash.
 * Returning from pause, intermission or game over should never wait for
 * that 2.6-second startup delay a second time.
 */
export function menuFadeAnimation(initialSplashVisible: boolean): string {
  return initialSplashVisible
    ? "fadein 0.7s ease-out 2.6s both"
    : "fadein 0.16s ease-out both";
}
