import { PixButton } from "../../../components/PixButton";

interface HowToPlayOverlayProps {
  onContinue: () => void;
}

/** Presentation only. Parent screen owns state, purchases and persistence. */
export function HowToPlayOverlay({ onContinue }: HowToPlayOverlayProps) {
  return (
    <div className="sekarrow-modal absolute inset-0 flex items-center justify-center bg-black/90 p-2 sm:p-4">
      <div
        className="scrollbox flex min-w-0 flex-col items-center gap-3 border-4 border-black p-3 sm:p-4 max-w-[390px] w-full max-h-full overflow-x-hidden overflow-y-auto"
        style={{ background: "#1c2138" }}
      >
        <div
          className="text-[#ffd24a] text-[12px] text-center"
          style={{ textShadow: "0 2px 0 #000" }}
        >
          ⚔ HOW TO DEFEND THE KEEP
        </div>
        {[
          ["🏹", "HOLD & DRAG anywhere — arrows fly toward your finger and stop only when they hit something"],
          ["🔴", "RED ARROWS are distance crits: ×2 damage and ×2 range"],
          ["☁️", "SKY enemies dive from above — turrets love them. GRUNTS march the grass — archers hunt them"],
          ["🕳️", "TUNNELERS strike from below in mid/late game — only EARTHWORM turrets can shoot them underground"],
          ["⭐", "BOSSES come every 5 waves and drop rubies — spend them in the SHOP on permanent perks"],
          ["✨", "ELITE foes glow gold: 2.2× HP but double bounty. Chain kills within 2.5s for COMBO gold!"],
          ["📦", "SUPPLY CRATES drift down mid-wave — tap one out of the sky for bonus gold!"],
          ["⚔", "From wave 3, every wave rolls a MODIFIER (SIEGE, SWIFT, BOUNTY…) — read the banner and adapt!"],
          ["⚒️", "Between waves, spend gold in UPGRADES: arrows, shields, turrets, archers & worms"],
        ].map(([icon, txt]) => (
          <div key={txt} className="flex w-full min-w-0 items-start gap-2">
            <span className="w-5 shrink-0 text-center text-sm">{icon}</span>
            <span className="min-w-0 flex-1 text-[8px] text-white/85 leading-[15px]">{txt}</span>
          </div>
        ))}
        <PixButton color="#4caf50" onClick={onContinue}>
          GOT IT — DEFEND THE KEEP!
        </PixButton>
      </div>
    </div>
  );
}
