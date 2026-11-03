import type { Meta } from "../../../game/types";
import { META_UPGRADES } from "../../../game/meta";
import { PixButton } from "../../../components/PixButton";
import { UpgradeCard } from "../../../components/UpgradeCard";

/** Paused-run overlay; presentation only, actions remain owned by the screen. */
export function PauseOverlay({ onResume, onMainMenu }: {
  onResume: () => void;
  onMainMenu: () => void;
}) {
  return (
    <div
      className="sekarrow-modal absolute inset-0 flex items-center justify-center bg-black/90 p-2 sm:p-4"
      style={{ zIndex: 50 }}
    >
      <div className="scrollbox flex w-full min-w-0 max-w-[390px] max-h-full flex-col items-center gap-3 overflow-x-hidden overflow-y-auto border-4 border-black bg-[#1c2138] p-3 sm:p-4">
        <div className="text-center text-[12px] text-[#ffd24a]" style={{ textShadow: "0 2px 0 #000" }}>
          ⏸ PAUSED
        </div>
        <p className="text-center text-[8px] leading-[15px] text-white/75">
          The siege holds its breath - enemies, turrets and arrows all wait for you.
        </p>
        <PixButton color="#4caf50" onClick={onResume}>▶ RESUME</PixButton>
        <PixButton color="#d9433b" small onClick={onMainMenu}>⌂ MAIN MENU</PixButton>
      </div>
    </div>
  );
}

/** Confirm losing the current run before leaving. */
export function ConfirmQuitOverlay({ onKeepDefending, onQuitToMenu }: {
  onKeepDefending: () => void;
  onQuitToMenu: () => void;
}) {
  return (
    <div
      className="sekarrow-modal absolute inset-0 flex items-center justify-center bg-black/90 p-2 sm:p-4"
      style={{ zIndex: 52 }}
    >
      <div className="scrollbox flex w-full min-w-0 max-w-[390px] max-h-full flex-col items-center gap-3 overflow-x-hidden overflow-y-auto border-4 border-black bg-[#1c2138] p-3 sm:p-4">
        <div className="text-center text-[12px] text-[#ff8fa3]" style={{ textShadow: "0 2px 0 #000" }}>
          ⚠ LEAVE THIS RUN?
        </div>
        <p className="text-center text-[8px] leading-[15px] text-white/80">
          Quitting to the main menu will lose your current run - score, gold, upgrades
          and wave progress from this siege are gone for good.
        </p>
        <PixButton color="#4caf50" small onClick={onKeepDefending}>KEEP DEFENDING</PixButton>
        <PixButton color="#d9433b" small onClick={onQuitToMenu}>QUIT TO MENU</PixButton>
      </div>
    </div>
  );
}

/**
 * Permanent upgrade catalog. The header and close button stay accessible
 * while the cards scroll inside the available height of a phone screen.
 */
export function ArmoryOverlay({ meta, buyMeta, onClose }: {
  meta: Meta;
  buyMeta: (key: keyof Omit<Meta, "gold">) => void;
  onClose: () => void;
}) {
  return (
    <div className="sekarrow-modal absolute inset-0 flex items-center justify-center bg-black/90 p-2 sm:p-4">
      <div
        className="flex h-[min(680px,100%)] max-h-full min-h-0 w-full min-w-0 max-w-[390px] flex-col gap-2 overflow-hidden border-4 border-black bg-[#1c2138] p-3 sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-label="The armory"
      >
        <div className="shrink-0 text-center text-[12px] text-[#ffd24a]" style={{ textShadow: "0 2px 0 #000" }}>
          ◆ THE ARMORY
        </div>
        <div className="shrink-0 text-center text-[9px] text-[#ffd24a]">◆ {meta.gold} META GOLD</div>
        <p className="shrink-0 text-center text-[8px] leading-[15px] text-white/75">
          Score from every run converts to meta gold. These upgrades are permanent.
        </p>
        <div className="scrollbox flex min-h-0 min-w-0 flex-1 flex-col gap-2 overflow-x-hidden overflow-y-auto overscroll-contain border-2 border-black bg-[#262b44] p-2">
          {META_UPGRADES.map((upgrade) => {
            const level = meta[upgrade.key];
            const maxed = level >= upgrade.costs.length;
            const cost = maxed ? 0 : upgrade.costs[level];
            return (
              <UpgradeCard
                key={upgrade.key}
                icon={
                  upgrade.key === "walls" ? "⛨" :
                  upgrade.key === "fletcher" ? "➤" :
                  upgrade.key === "longbow" ? "➶" :
                  upgrade.key === "eagle" ? "✦" :
                  upgrade.key === "chest" ? "⛁" : "⟠"
                }
                name={`${upgrade.name} - ${"●".repeat(level)}${"○".repeat(upgrade.costs.length - level)}`}
                desc={upgrade.desc}
                cost={`${cost}◆`}
                action="UPGRADE"
                disabled={meta.gold < cost}
                done={maxed ? "MAXED" : undefined}
                onClick={() => buyMeta(upgrade.key)}
              />
            );
          })}
        </div>
        <div className="flex shrink-0 justify-center pt-1">
          <PixButton color="#d9433b" onClick={onClose}>CLOSE</PixButton>
        </div>
      </div>
    </div>
  );
}
