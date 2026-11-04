import { PixButton } from "../../../components/PixButton";
import { PixelIcon, type PixelIconName } from "../../../components/PixelIcon";

const HELP_ITEMS: { icon: PixelIconName; text: string }[] = [
  { icon: "bow", text: "HOLD & DRAG anywhere - arrows fly toward your finger and stop when they hit something." },
  { icon: "pierce", text: "RED ARROWS are distance crits: 2x damage and 2x range." },
  { icon: "cloud", text: "SKY enemies dive from above. Turrets love them. GRUNTS march the grass; archers hunt them." },
  { icon: "tunnel", text: "TUNNELERS strike from below in later waves. Only EARTHWORM turrets can shoot them underground." },
  { icon: "boss", text: "BOSSES come every 5 waves and drop rubies. Spend rubies in the SHOP on permanent perks." },
  { icon: "elite", text: "ELITE foes glow gold: 2.2x HP but double bounty. Chain kills for COMBO gold." },
  { icon: "crate", text: "SUPPLY CRATES drift down mid-wave. Tap one out of the sky for bonus gold." },
  { icon: "warning", text: "From wave 3, every wave rolls a MODIFIER (SIEGE, SWIFT, BOUNTY). Read the banner." },
  { icon: "gear", text: "Between waves, spend gold in UPGRADES: arrows, shields, turrets, archers and worms." },
];

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
          <span className="inline-flex items-center gap-2"><PixelIcon name="blade" size={20} /> HOW TO DEFEND THE KEEP</span>
        </div>
        {HELP_ITEMS.map(({ icon, text }) => (
          <div key={text} className="flex w-full min-w-0 items-start gap-2">
            <span className="flex w-5 shrink-0 justify-center"><PixelIcon name={icon} size={18} /></span>
            <span className="min-w-0 flex-1 text-[8px] text-white/85 leading-[15px]">{text}</span>
          </div>
        ))}
        <PixButton color="#4caf50" onClick={onContinue}>
          GOT IT - DEFEND THE KEEP!
        </PixButton>
      </div>
    </div>
  );
}
