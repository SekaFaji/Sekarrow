import { memo } from "react";
import { CASTLE, TOWER_SPOTS, WORM_POS, scaledPos } from "../../../game/config";
import { SPRITES } from "../../../game/sprites";
import { PixelSprite } from "../../../components/PixelSprite";
import { worldToScreenPercent } from "./WorldTerrain";

interface FortressDecorProps {
  zoom: number;
  scale: number;
  towers: number;
  mine: boolean;
  beacon: boolean;
  cata: boolean;
  barracks: boolean;
}

/** Static fortress additions; only construction state and zoom affect them. */
export const FortressDecor = memo(function FortressDecor({
  zoom, scale, towers, mine, beacon, cata, barracks,
}: FortressDecorProps) {
  const z = zoom;
  const castleScale = scale;
  const S = (value: number) => worldToScreenPercent(value, z);
  const enabled = { mine, beacon, cata, barracks };
  return (
    <>
      {/* towers flank the keep on the left and right — each adds unit slots */}
      {TOWER_SPOTS.slice(0, towers).map((p, i) => {
        const pos = scaledPos(p, castleScale);
        return (
          <div
            key={`tower-${i}`}
            className="absolute pointer-events-none"
            style={{
              left: `${S(pos.x)}%`,
              top: `${S(pos.y)}%`,
              transform: "translate(-50%,-100%)",
            }}
          >
            <PixelSprite sprite={SPRITES.tower} px={4 * castleScale * z} />
          </div>
        );
      })}

      {/* castle-town buildings rise around the keep as you build them */}
      {(
        [
          { k: "mine", s: { x: 12, y: 95 } },
          { k: "beacon", s: { x: 88, y: 95 } },
          { k: "cata", s: { x: 50, y: 97 } },
          { k: "barracks", s: { x: 30, y: 96 } },
        ] as const
      )
        .filter((b) => enabled[b.k])
        .map((b) => {
          const pos = scaledPos(b.s, castleScale);
          return (
            <div
              key={b.k}
              className="absolute pointer-events-none"
              style={{
                left: `${S(pos.x)}%`,
                top: `${S(pos.y)}%`,
                transform: "translate(-50%,-100%)",
              }}
            >
              <PixelSprite sprite={SPRITES[b.k]} px={3.5 * castleScale * z} />
            </div>
          );
        })}
    </>
  );
});

/** Static moat ring, kept after the animated guard in the existing layer order. */
export const MoatDecor = memo(function MoatDecor({
  zoom, scale, moat,
}: { zoom: number; scale: number; moat: boolean }) {
  const z = zoom;
  const castleScale = scale;
  const S = (value: number) => worldToScreenPercent(value, z);
  return (
    <>
      {moat && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: `${S(CASTLE.x)}%`,
            top: `${S(CASTLE.y)}%`,
            transform: "translate(-50%,-50%)",
            width: 200 * castleScale * z,
            height: 90 * castleScale * z,
            borderRadius: "50%",
            border: `${Math.max(1.5, 2.5 * z)}px solid #3d7ebf`,
            background: "rgba(64,148,255,0.18)",
            boxShadow: `0 0 ${8 * z}px rgba(64,148,255,0.35)`,
          }}
        />
      )}
    </>
  );
});

/** Stationary worm defenses; remain behind enemies and above the archers. */
export const WormDecor = memo(function WormDecor({
  zoom, scale, worms,
}: { zoom: number; scale: number; worms: number }) {
  const z = zoom;
  const castleScale = scale;
  const S = (value: number) => worldToScreenPercent(value, z);
  return (
    <>
      {/* earthworm turrets in the dirt — they hunt the tunnelers */}
      {Array.from({ length: worms }, (_, i) => {
        const wp = scaledPos(WORM_POS[i], castleScale);
        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${S(wp.x)}%`,
              top: `${S(wp.y)}%`,
              transform: "translate(-50%,-50%)",
            }}
          >
            <PixelSprite sprite={SPRITES.worm} px={4 * castleScale * z} />
          </div>
        );
      })}
    </>
  );
});
