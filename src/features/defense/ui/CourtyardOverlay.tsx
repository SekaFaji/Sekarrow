import type { Meta } from "../../../game/types";
import { TOWN_BLDGS, type TownKey } from "../../../game/meta";
import { SPRITES } from "../../../game/sprites";
import { PixButton } from "../../../components/PixButton";
import { PixelSprite } from "../../../components/PixelSprite";
import { UpgradeCard } from "../../../components/UpgradeCard";

interface CourtyardOverlayProps {
  meta: Meta;
  selectedTown: TownKey | null;
  onSelectTown: (key: TownKey) => void;
  onBuyTown: (key: TownKey) => void;
  onClose: () => void;
}

/** Presentation only. Parent screen owns state, purchases and persistence. */
export function CourtyardOverlay({ meta, selectedTown, onSelectTown, onBuyTown, onClose }: CourtyardOverlayProps) {
  return (
    <div
      className="sekarrow-modal absolute inset-0 flex items-center justify-center bg-black/90 p-2 sm:p-4"
      style={{ zIndex: 47 }}
    >
      <div
        className="scrollbox flex w-full min-w-0 max-w-[390px] max-h-full flex-col items-center gap-2 overflow-x-hidden overflow-y-auto border-4 border-black p-3"
        style={{ background: "#1c2138" }}
      >
        <div className="text-[#ffd24a] text-[12px]" style={{ textShadow: "0 2px 0 #000" }}>
          🏚 THE COURTYARD
        </div>
        <div className="text-[8px] text-white/75 text-center leading-[15px]">
          Your town lives inside the castle walls. Buildings survive every defeat.
        </div>
        <div className="text-[9px] text-[#ffd24a]">⛁ {meta.gold} META GOLD</div>
        <div className="text-[8px] text-[#7be58e] text-center leading-[14px]">{TOWN_BLDGS.filter((b) => meta[b.key] > 0).length}/{TOWN_BLDGS.length} STRUCTURES BUILT</div>

        {/* the courtyard scene: walled yard, keep at the top, building plots */}
        <div
          className="relative w-full min-w-0 shrink-0 border-4 border-black overflow-hidden"
          style={{ height: 180, background: "#2c4a26" }}
        >
          <div
            className="absolute inset-1 border-4"
            style={{ borderColor: "#565d63", boxShadow: "inset 0 0 0 2px #000" }}
          />
          {/* corner watchtowers */}
          {[
            { left: 2, top: 2 },
            { right: 2, top: 2 },
            { left: 2, bottom: 2 },
            { right: 2, bottom: 2 },
          ].map((c, i) => (
            <div key={"ctow" + i} className="absolute" style={c}>
              <PixelSprite sprite={SPRITES.tower} px={2} />
            </div>
          ))}
          {/* the keep */}
          <div
            className="absolute"
            style={{ left: "50%", top: 6, transform: "translateX(-50%)" }}
          >
            <PixelSprite sprite={SPRITES.castle} px={4} />
          </div>
          {/* building plots */}
          {TOWN_BLDGS.map((b) => {
            const lvl = meta[b.key];
            const cost = b.base * Math.pow(2, lvl);
            const maxed = lvl >= 4;
            return (
              <button
                key={b.key}
                type="button"
                aria-pressed={selectedTown === b.key}
                aria-label={`${b.name}, level ${lvl} of 4. ${maxed ? "Maxed" : `${cost} meta gold to upgrade`}`}
                title={b.name}
                onClick={() => onSelectTown(b.key)}
                className="absolute flex flex-col items-center justify-center gap-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd24a]"
                style={{
                  left: `${b.plot.x}%`,
                  top: `${b.plot.y}%`,
                  width: 52,
                  height: 44,
                  border:
                    selectedTown === b.key
                      ? "2px solid #ffd24a"
                      : lvl > 0
                      ? "2px solid transparent"
                      : "2px dashed rgba(255,255,255,0.4)",
                  background: lvl > 0 ? "transparent" : "rgba(0,0,0,0.25)",
                }}
              >
                {lvl > 0 ? (
                  <>
                    {b.key === "townMoat" ? (
                      <div
                        style={{
                          width: 40,
                          height: 12,
                          borderRadius: "50%",
                          background: "#3b5bdc",
                          border: "2px solid #14171c",
                          boxShadow: "0 0 3px #1c2f8a",
                        }}
                      />
                    ) : (
                      <PixelSprite sprite={SPRITES[b.sprite!]} px={3} />
                    )}
                    <span className="text-[8px] leading-[11px]">
                      <span className="text-[#ffd24a]">{"●".repeat(lvl)}</span>
                      <span className="text-white/30">{"●".repeat(4 - lvl)}</span>
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-[12px] leading-[14px] opacity-70">
                      {b.icon}
                    </span>
                    <span className="text-[7px] text-white/90 leading-[10px] text-center break-words">
                      {b.name}
                    </span>
                    <span
                      className="text-[7px] leading-[10px]"
                      style={{
                        color: meta.gold >= cost ? "#ffd24a" : "#8d99ae",
                      }}
                    >
                      {maxed ? "MAX" : `${cost}◆`}
                    </span>
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* selected building card */}
        {selectedTown ? (
          (() => {
            const def = TOWN_BLDGS.find((b) => b.key === selectedTown)!;
            const lvl = meta[def.key];
            const maxed = lvl >= 4;
            const cost = def.base * Math.pow(2, lvl);
            return (
              <UpgradeCard
                icon={def.icon}
                name={`${def.name} — ${"●".repeat(lvl)}${"○".repeat(4 - lvl)}`}
                desc={
                  lvl > 0
                    ? `Now: ${def.fx(lvl)}${maxed ? "." : `. Next: ${def.fx(lvl + 1)}.`} ${def.desc}`
                    : `${def.desc} ${def.fx(1)}.`
                }
                cost={maxed ? "" : `${cost}◆`}
                disabled={maxed || meta.gold < cost}
                done={maxed ? "MAXED" : undefined}
                action={lvl > 0 ? "UPGRADE" : "BUILD"}
                onClick={() => onBuyTown(def.key)}
              />
            );
          })()
        ) : (
          <div className="text-[8px] text-white/75 text-center leading-[14px]">Select a building plot to inspect its permanent benefit and cost.</div>
        )}

        <div className="sticky bottom-0 z-10 flex w-full shrink-0 justify-center border-t-2 border-black bg-[#1c2138] px-2 pt-2 pb-1">
          <PixButton
            color="#d9433b"
            onClick={onClose}
          >
            CLOSE
          </PixButton>
        </div>
      </div>
    </div>
  );
}
