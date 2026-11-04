/**
 * Original, code-drawn 8x8 pixel art for upgrade and menu interfaces.
 * Using SVG rects avoids platform emoji and keeps icons sharp on all devices.
 * These are UI assets only, not gameplay definitions.
 */
export const PIXEL_ICON_PATTERNS = {
  "bow": [
    "...gg...",
    "..g..g..",
    ".g....g.",
    ".g....g.",
    ".g....g.",
    "..g..g..",
    "...gg...",
    "...s...."
  ],
  "turret": [
    "..ssss..",
    "..skks..",
    "...ss...",
    ".ssssss.",
    "..ssss..",
    "..sdds..",
    ".ssssss.",
    "........"
  ],
  "archer": [
    "....s...",
    "...ssg..",
    "..s..g..",
    ".s...g..",
    ".s...g..",
    "..s..g..",
    "...ssg..",
    "....s..."
  ],
  "worm": [
    "........",
    "..ppp...",
    ".ppwpp..",
    ".p...pp.",
    "..pp..p.",
    ".pp..pp.",
    "..pppp..",
    "........"
  ],
  "castle": [
    ".r....r.",
    "rrr..rrr",
    ".s....s.",
    ".ssssss.",
    ".s.gg.s.",
    ".ssssss.",
    ".ssddss.",
    "........"
  ],
  "blade": [
    "...s....",
    "...s....",
    "..sss...",
    ".sssss..",
    "..sss...",
    "...s....",
    "..ggg...",
    "...n...."
  ],
  "arrow": [
    "......gg",
    ".....ggg",
    "ssssssgg",
    "dddddggg",
    "ssssssgg",
    ".....ggg",
    "......gg",
    "........"
  ],
  "eye": [
    "........",
    "..dddd..",
    ".dwwwwd.",
    "dwwbwwwd",
    ".dwwwwd.",
    "..dddd..",
    "........",
    "........"
  ],
  "pierce": [
    "......gg",
    ".....ggg",
    "sssssggg",
    "ddddddgg",
    "sssssggg",
    ".....ggg",
    "......gg",
    "........"
  ],
  "bolt": [
    "....gg..",
    "...gg...",
    "..ggg...",
    "...gg...",
    "..ggg...",
    "..gg....",
    ".gg.....",
    "........"
  ],
  "double": [
    ".ssss...",
    ".s..s...",
    ".s..s...",
    ".ssss...",
    "...ssss.",
    "...s..s.",
    "...s..s.",
    "...ssss."
  ],
  "burst": [
    "...r....",
    ".r.g.r..",
    "..ggg...",
    "rgggggr.",
    "..ggg...",
    ".r.g.r..",
    "...r....",
    "........"
  ],
  "volley": [
    "g...g...",
    ".g...g..",
    "..g...g.",
    "...g...g",
    "...s.s..",
    "..s.s...",
    ".s.s....",
    "........"
  ],
  "heavy": [
    "...s....",
    "..sss...",
    ".sssss..",
    "...s....",
    "...s....",
    "...s....",
    "..ddd...",
    "........"
  ],
  "gear": [
    "...s....",
    "..sds...",
    ".sddds..",
    "sddkdds.",
    ".sddds..",
    "..sds...",
    "...s....",
    "........"
  ],
  "fortify": [
    ".ssssss.",
    ".sg..gs.",
    ".ssssss.",
    ".sg..gs.",
    ".ssssss.",
    ".sg..gs.",
    ".ssssss.",
    "........"
  ],
  "repair": [
    "........",
    "...gg...",
    "...gg...",
    ".ggwwgg.",
    ".ggwwgg.",
    "...gg...",
    "...gg...",
    "........"
  ],
  "brick": [
    ".nnn.nnn",
    ".rrr.rrr",
    ".nnnnnnn",
    ".rrr.rrr",
    ".nnn.nnn",
    ".rrr.rrr",
    ".nnnnnnn",
    "........"
  ],
  "shield": [
    "..ssss..",
    ".ssbbss.",
    ".sbggbs.",
    ".sbggbs.",
    "..sbbs..",
    "..sbbs..",
    "...ss...",
    "........"
  ],
  "thorn": [
    "g...g...",
    ".g.g....",
    "..g..g..",
    "...gg...",
    "..g..g..",
    ".g.g....",
    "g...g...",
    "........"
  ],
  "lookout": [
    "....d...",
    "...ddd..",
    "..ddddd.",
    ".dwwgwwd",
    "..ddddd.",
    "...ddd..",
    "....d...",
    "........"
  ],
  "lock": [
    "..gggg..",
    ".gg..gg.",
    ".gg..gg.",
    ".ssssss.",
    ".sggggs.",
    ".sg..gs.",
    ".ssssss.",
    "........"
  ],
  "shop": [
    "gggggggg",
    "gwwwwwwg",
    "gggggggg",
    "nnnnnnnn",
    "nwwwswwn",
    "nwwwswwn",
    "nwwwwwwn",
    "nnnnnnnn"
  ],
  "pack": [
    "........",
    "..nnnn..",
    ".nnggnn.",
    ".nnggnn.",
    ".nnnnnn.",
    ".nnggnn.",
    "..nnnn..",
    "........"
  ],
  "chest": [
    "........",
    ".nnnnnn.",
    ".nnggnn.",
    ".dddddd.",
    ".nnggnn.",
    ".nnnnnn.",
    ".nnnnnn.",
    "........"
  ],
  "vault": [
    "..ssss..",
    ".swwwws.",
    ".sdddds.",
    ".sdggds.",
    ".sdggds.",
    ".sdddds.",
    ".ssssss.",
    "........"
  ],
  "perk": [
    "...g....",
    "...g....",
    ".g.g.g..",
    "..ggg...",
    "ggggggg.",
    "..ggg...",
    ".g.g.g..",
    "...g...."
  ],
  "ruby": [
    "...p....",
    "..ppp...",
    "..pwp...",
    "ppwwpp..",
    ".pppp...",
    "..pp....",
    "...p....",
    "........"
  ],
  "coin": [
    "..gggg..",
    ".ggwwgg.",
    "ggwwwwgg",
    "ggwwwwgg",
    "ggwwwwgg",
    "ggwwwwgg",
    ".ggwwgg.",
    "..gggg.."
  ],
  "town": [
    "...gg...",
    "..gggg..",
    ".gggggg.",
    "nnnnnnnn",
    "nwwsswwn",
    "nwwsswwn",
    "nwwsswwn",
    "nnnnnnn."
  ],
  "settings": [
    "..s.ss..",
    ".ssssss.",
    "sssksss.",
    "sskksss.",
    ".ssssss.",
    "..ssss..",
    "...ss...",
    "........"
  ],
  "sound": [
    "..ss....",
    "..sss...",
    "ssssw...",
    "ssssww..",
    "ssssw...",
    "..sss...",
    "..ss....",
    "........"
  ],
  "document": [
    ".ssssss.",
    ".swwwws.",
    ".swddws.",
    ".swwwws.",
    ".swddws.",
    ".swwwws.",
    ".ssssss.",
    "........"
  ],
  "restore": [
    "...ggg..",
    "..g...g.",
    ".g....g.",
    "gg...g..",
    "g...g...",
    "g...g...",
    "..ggg...",
    "........"
  ],
  "pause": [
    "........",
    ".ss..ss.",
    ".ss..ss.",
    ".ss..ss.",
    ".ss..ss.",
    ".ss..ss.",
    ".ss..ss.",
    "........"
  ],
  "play": [
    "s.......",
    "sss.....",
    "sssss...",
    "sssssss.",
    "sssssss.",
    "sssss...",
    "sss.....",
    "s......."
  ],
  "warning": [
    "...gg...",
    "..gggg..",
    "..gggg..",
    ".gggggg.",
    ".gggggg.",
    "gggkkggg",
    "gggggggg",
    "........"
  ],
  "star": [
    "...g....",
    ".g.g.g..",
    "..ggg...",
    "ggggggg.",
    "..ggg...",
    ".g.g.g..",
    "...g....",
    "........"
  ],
  "crate": [
    "nnnnnnnn",
    "nwwnnwwn",
    "nwwnnwwn",
    "nwwnnwwn",
    "nwwnnwwn",
    "nwwnnwwn",
    "nwwnnwwn",
    "nnnnnnnn"
  ],
  "cloud": [
    "........",
    "..ssss..",
    ".ssssss.",
    "ssssssss",
    "ssssssss",
    ".ssssss.",
    "........",
    "........"
  ],
  "tunnel": [
    "nnnnnnnn",
    "nnnnnnnn",
    "nnn..nnn",
    "nn....nn",
    "n......n",
    "n......n",
    "........",
    "........"
  ],
  "boss": [
    "..gggg..",
    ".gggggg.",
    "ggswwsgg",
    "ggsggsgg",
    "ggsggsgg",
    "gggggggg",
    ".gggggg.",
    "..gggg.."
  ],
  "elite": [
    "..gggg..",
    ".gwwwwg.",
    "gwwggwwg",
    "gwwggwwg",
    "gwwggwwg",
    ".gwwwwg.",
    "..gggg..",
    "........"
  ],
  "flag": [
    "..r.....",
    "..rrrr..",
    "..rwwrr.",
    "..rrrr..",
    "..r.....",
    "..r.....",
    "..r.....",
    "..r....."
  ],
  "exit": [
    "nnnnnnnn",
    "nwwwwwwn",
    "nwwwgwwn",
    "nwwgggwn",
    "nwgwwwwn",
    "nwwgggwn",
    "nwwwgwwn",
    "nnnnnnnn"
  ],
  "heart": [
    "........",
    ".rr..rr.",
    "rrrrrrrr",
    "rrrrrrrr",
    ".rrrrrr.",
    "..rrrr..",
    "...rr...",
    "........"
  ]
} as const;

export type PixelIconName = keyof typeof PIXEL_ICON_PATTERNS;

const palette: Record<string, string> = {
  k: "#14171c",
  s: "#aab2cb",
  d: "#565d63",
  g: "#ffd24a",
  r: "#d9433b",
  b: "#3b5bdc",
  p: "#ff8fa3",
  w: "#eef3ff",
  n: "#8d6742",
};

export function PixelIcon({
  name,
  size = 20,
  className,
}: {
  name: PixelIconName;
  size?: number;
  className?: string;
}) {
  const pattern = PIXEL_ICON_PATTERNS[name];
  return (
    <svg
      className={className}
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 8 8"
      width={size}
      height={size}
      shapeRendering="crispEdges"
      style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle" }}
    >
      {pattern.flatMap((row, y) =>
        [...row].map((color, x) =>
          color === "." ? null : (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={palette[color]} />
          ),
        ),
      )}
    </svg>
  );
}
