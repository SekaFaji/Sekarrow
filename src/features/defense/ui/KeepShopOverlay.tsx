import type { Meta } from "../../../game/types";
import { PERKS, RUBY_PACKS } from "../../../game/meta";
import { PixButton } from "../../../components/PixButton";
import { UpgradeCard } from "../../../components/UpgradeCard";

export type KeepShopTab = "rubies" | "perks";

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
          ⛒ KEEP SHOP
        </div>
        <div className="shrink-0 text-[9px] text-[#ff8fa3] text-center">♦ {meta.rubies} RUBIES</div>
        <div className="flex shrink-0 flex-wrap gap-2 justify-center py-1">
          <PixButton
            small
            color={activeTab === "rubies" ? "#ffd24a" : "#8d99ae"}
            onClick={() => onTabChange("rubies")}
          >
            ♦ PACKS
          </PixButton>
          <PixButton
            small
            color={activeTab === "perks" ? "#ffd24a" : "#8d99ae"}
            onClick={() => onTabChange("perks")}
          >
            ★ PERKS
          </PixButton>
        </div>
        <div className="scrollbox flex min-h-0 min-w-0 flex-1 flex-col items-center gap-2 overflow-x-hidden overflow-y-auto overscroll-contain border-4 border-black px-2 py-2" style={{ background: "#262b44" }}>
          {activeTab === "rubies" ? (
            <>
              <p className="min-w-0 text-center text-[8px] leading-[15px] text-white/80">
                Packs are free while we test — they will cost real money at launch.
                No payment is charged. Bosses also drop rubies.
              </p>
              {RUBY_PACKS.map((p) => (
                <UpgradeCard
                  key={p.name}
                  icon={p.name.startsWith("POUCH") ? "🎒" : p.name.startsWith("CHEST") ? "🧰" : "🏦"}
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
                Permanent unlocks paid in rubies — yours forever.
              </p>
              {PERKS.map((p) => {
                const owned = meta[p.key] > 0;
                return (
                  <UpgradeCard
                    key={p.key}
                    icon="★"
                    name={p.name}
                    desc={p.desc}
                    cost={`${p.cost} ♦`}
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
