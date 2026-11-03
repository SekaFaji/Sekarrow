import { memo } from "react";
import { PINES, ROCKS, TUNNELS } from "../../../game/config";
import { SPRITES } from "../../../game/sprites";
import { PixelSprite } from "../../../components/PixelSprite";

/** Convert a world coordinate into a percentage on the zoomed battlefield. */
export const worldToScreenPercent = (value: number, zoom: number) =>
  value * zoom + 50 * (1 - zoom);

/**
 * Non-animated scenery. A wave's camera zoom is the only render dependency.
 * Memoization keeps the terrain and its many sprite instances out of the
 * per-frame React reconciliation work once the camera has settled.
 */
export const WorldTerrain = memo(function WorldTerrain({ zoom }: { zoom: number }) {
  const z = zoom;
  const S = (value: number) => worldToScreenPercent(value, z);
  return (
    <>
      {/* ground & underground — real world space the camera reveals as you progress */}
      <div
        className="absolute"
        style={{
          left: `${S(-280)}%`,
          top: `${S(82)}%`,
          width: `${660 * z}%`,
          height: `${8 * z}%`,
          background: "#1d4d2b",
          borderTop: `${6 * z}px solid #0e2416`,
        }}
      />
      <div
        className="absolute"
        style={{
          left: `${S(-280)}%`,
          top: `${S(90)}%`,
          width: `${660 * z}%`,
          height: `${320 * z}%`,
          background: "linear-gradient(#4a3020 0%, #332014 35%, #1a1009 100%)",
        }}
      />
      {/* pines scattered across the widening land */}
      {PINES.map((t, i) => (
        <div
          key={"pine" + i}
          className="absolute"
          style={{
            left: `${S(t.x)}%`,
            top: `${S(87)}%`,
            transform: "translate(-50%,-100%)",
          }}
        >
          <PixelSprite sprite={SPRITES.pine} px={t.px * z} />
        </div>
      ))}
      {/* rocks buried in the dirt */}
      {ROCKS.map((r, i) => (
        <div
          key={"rock" + i}
          className="absolute"
          style={{
            left: `${S(r.x)}%`,
            top: `${S(r.y)}%`,
            width: r.s * z,
            height: r.s * z,
            background: "#241206",
            transform: "translate(-50%,-50%)",
          }}
        />
      ))}
      {/* sealed tunnels — foreshadowing the underground army */}
      {TUNNELS.map((t, i) => (
        <div
          key={"tunnel" + i}
          className="absolute"
          style={{
            left: `${S(t.x)}%`,
            top: `${S(t.y)}%`,
            width: t.s * z,
            height: t.s * 0.72 * z,
            background: "#0a0705",
            border: `${3 * z}px solid #3a2417`,
            borderRadius: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
      ))}
    </>
  );
});
