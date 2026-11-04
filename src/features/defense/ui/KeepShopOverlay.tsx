import type { Meta } from "../../../game/types";
import { PERKS, RUBY_PACKS } from "../../../game/meta";
import { PixButton } from "../../../components/PixButton";
import { UpgradeCard } from "../../../components/UpgradeCard";
import { PixelIcon, type PixelIconName } from "../../../components/PixelIcon";

export type KeepShopTab = "rubies" | "perks";

const PERK_ICONS: Record<(typeof PERKS)[number]["key"], PixelIconName> = {
  speed: "bolt",
  x3: "bolt",
  autoshoot: "archer",
  autonext: "arrow",
  x2gold: "coin",
  secondwind: "shield",
};

interface KeepShopOverlayProps {
  meta: Meta;
  activeTab: KeepShopTab;
  onTabChange: (tab: KeepShopTab) => void;
  onBuyRubyPack: (rubies: number) => void;
  onBuyPerk: (key: (typeof PERKS)[number]["key"], cost: number) => void;
  onClose: () => void;
}

/** Presentation only. Parent screen owns state, purchases and persistence. */
export function KeepShopOverlay({ meta, activeTab, onTabChange, onBuyRubyPack, onBuyPerk, onClose }: KeepShopOverlayProps) {
  return (
    <div className="sekarrow-modal absolute inset-0 flex items-center justify-center bg-black/90 p-2 sm:p-4">
      <div
        className="flex h-[min(620px,100%)] min-h-0 w-full min-w-0 max-w-[390px] flex-col gap-2 overflow-hidden border-4 border-black p-3 sm:p-4"
        style={{ background: "#1c2138" }}
      >
        <div className="shrink-0 text-[#ffd24a] text-[12px] text-center" style={{ textShadow: "0 2px 0 #000" }}>
          <span className="inline-flex items-center justify-center gap-2"><PixelIcon name="shop" size={20} /> KEEP SHOP</span>
        </div>
        <div className="flex shrink-0 items-center justify-center gap-1 text-[9px] text-[#ff8fa3]"><PixelIcon name="ruby" size={14} /> {meta.rubies} RUBIES</div>
        <div className="flex shrink-0 flex-wrap gap-2 justify-center py-1">
          <PixButton
            small
            color={activeTab === "rubies" ? "#ffd24a" : "#8d99ae"}
            onClick={() => onTabChange("rubies")}
          >
            <span className="inline-flex items-center gap-2"><PixelIcon name="pack" size={18} /> PACKS</span>
          </PixButton>
          <PixButton
            small
            color={activeTab === "perks" ? "#ffd24a" : "#8d99ae"}
            onClick={() => onTabChange("perks")}
          >
            <span className="inline-flex items-center gap-2"><PixelIcon name="perk" size={18} /> PERKS</span>
          </PixButton>
        </div>
        <div className="scrollbox flex min-h-0 min-w-0 flex-1 flex-col items-center gap-2 overflow-x-hidden overflow-y-auto overscroll-contain border-4 border-black px-2 py-2" style={{ background: "#262b44" }}>
          {activeTab === "rubies" ? (
            <>
              <p className="min-w-0 text-center text-[8px] leading-[15px] text-white/80">
                Packs are free while testing. Real-money purchases are not enabled.
                No payment is charged. Bosses also drop rubies.
              </p>
              {RUBY_PACKS.map((p) => (
                <UpgradeCard
                  key={p.name}
                  icon={<PixelIcon name={p.name.startsWith("POUCH") ? "pack" : p.name.startsWith("CHEST") ? "chest" : "vault"} size={20} />}
                  name={p.name}
                  desc={`+${p.rubies} rubies for perks and premium toggles.`}
                  cost="FREE TEST"
                  onClick={() => onBuyRubyPack(p.rubies)}
                />
              ))}
            </>
          ) : (
            <>
              <p className="min-w-0 text-center text-[8px] leading-[15px] text-white/80">
                Permanent unlocks paid in rubies, kept between runs.
              </p>
              {PERKS.map((p) => {
                const owned = meta[p.key] > 0;
                return (
                  <UpgradeCard
                    key={p.key}
                    icon={<PixelIcon name={PERK_ICONS[p.key]} size={20} />}
                    name={p.name}
                    desc={p.desc}
                    cost={`${p.cost} RUBIES`}
                    disabled={meta.rubies < p.cost}
                    done={owned ? "OWNED" : undefined}
                    onClick={() => onBuyPerk(p.key, p.cost)}
                  />
                );
              })}
            </>
          )}
        </div>
        <div className="flex shrink-0 justify-center pt-1">
          <PixButton color="#d9433b" onClick={onClose}>
            CLOSE
          </PixButton>
        </div>
      </div>
    </div>
  );
}
