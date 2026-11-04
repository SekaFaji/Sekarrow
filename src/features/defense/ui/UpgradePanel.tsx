import { PixButton } from "../../../components/PixButton";
import { PixelIcon, type PixelIconName } from "../../../components/PixelIcon";
import type { UpgradeCategory, UpgradeDefinition } from "../upgrades/upgradeShop";

interface UpgradePanelProps {
  gold: number;
  upgrades: UpgradeDefinition[];
  tabs: { key: UpgradeCategory; icon: PixelIconName; name: string }[];
  activeTab: UpgradeCategory;
  selectedId: string | null;
  onTabChange: (tab: UpgradeCategory) => void;
  onSelect: (id: string) => void;
  onClose: () => void;
}

const stateLabel = (upgrade: UpgradeDefinition) => {
  if (upgrade.done) return "MAXED";
  if (upgrade.lockTxt) return "LOCKED";
  if (upgrade.buyable) return "READY";
  return "SAVE GOLD";
};

/**
 * Presentation only. Selecting a tile only highlights it.
 * Buying requires the explicit button in the bottom detail panel.
 * The detail pane stays outside the scrolling grid so descriptions remain visible.
 */
export function UpgradePanel({
  gold, upgrades, tabs, activeTab, selectedId, onTabChange, onSelect, onClose,
}: UpgradePanelProps) {
  const visible = upgrades.filter((upgrade) => upgrade.cat === activeTab);
  const selected = visible.find((upgrade) => upgrade.id === selectedId);
  const readyCount = visible.filter((upgrade) => upgrade.buyable).length;

  return (
    <div className="sekarrow-modal absolute inset-0 z-[44] flex min-h-0 items-center justify-center bg-black/90 p-2 sm:p-4">
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Siege upgrades"
        className="scrollbox flex h-[min(680px,100%)] min-h-0 min-w-0 w-full max-w-[420px] flex-col gap-2 overflow-x-hidden overflow-y-auto border-4 border-black bg-[#1c2138] p-2 sm:p-3 shadow-[0_6px_0_#000]"
      >
        <header className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-2">
          <h2 className="text-[12px] text-[#f7a41d]" style={{ textShadow: "0 2px 0 #000" }}>
            UPGRADES
          </h2>
          <span className="border-2 border-black bg-[#262b44] px-2 py-2 text-[9px] text-[#ffd24a]">
            ◆ {gold} GOLD
          </span>
        </header>

        <p className="text-[8px] leading-[15px] text-white/75">
          Select an upgrade to inspect it. Buy from the info panel when ready.
        </p>

        <nav aria-label="Upgrade branches" className="grid grid-cols-3 gap-1 sm:grid-cols-5">
          {tabs.map((tab) => {
            const active = activeTab === tab.key;
            const affordable = upgrades.some((upgrade) => upgrade.cat === tab.key && upgrade.buyable);
            return (
              <button
                type="button"
                key={tab.key}
                aria-pressed={active}
                onClick={() => onTabChange(tab.key)}
                className="relative flex min-h-[44px] min-w-0 flex-col items-center justify-center gap-1 border-2 border-black px-1 py-1 text-[8px] leading-[13px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd24a]"
                style={{ background: active ? "#ffd24a" : "#202642", color: active ? "#000" : "#e0e5f0" }}
              >
                <PixelIcon name={tab.icon} size={20} />
                <span>{tab.name}</span>
                {affordable && (
                  <span
                    aria-label="Affordable upgrades available"
                    className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#4caf50] shadow-[0_0_4px_#4caf50]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div
          role="region"
          aria-label="Available siege upgrades"
          className="scrollbox min-h-[112px] flex-1 overflow-y-auto overscroll-contain border-2 border-black bg-[#262b44] p-2"
        >
          <div className="mb-2 flex items-center justify-between gap-2 text-[8px] leading-[14px]">
            <span className="text-white/80">{tabs.find((tab) => tab.key === activeTab)?.name} DEFENSES</span>
            <span className={readyCount ? "text-[#7be58e]" : "text-white/55"}>{readyCount} READY</span>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {visible.map((upgrade) => {
              const active = selectedId === upgrade.id;
              const status = stateLabel(upgrade);
              return (
                <button
                  key={upgrade.id}
                  type="button"
                  aria-pressed={active}
                  aria-label={`${upgrade.name}. ${upgrade.done ? "Maxed" : upgrade.lockTxt ? upgrade.lockTxt : `${upgrade.cost} gold. ${upgrade.buyable ? "Select to buy" : "Not enough gold"}`}`}
                  title={upgrade.desc}
                  onClick={() => onSelect(upgrade.id)}
                  className="flex min-h-[102px] min-w-0 flex-col items-center justify-between gap-1 border-2 px-1 py-2 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd24a]"
                  style={{
                    background: active ? "#303d60" : upgrade.done ? "#191f32" : "#202642",
                    borderColor: active ? "#ffd24a" : upgrade.buyable ? "#4caf50" : "#090b15",
                    opacity: upgrade.lockTxt ? 0.72 : 1,
                  }}
                >
                  <PixelIcon name={upgrade.lockTxt ? "lock" : upgrade.icon} size={24} />
                  <span className="w-full min-w-0 text-[8px] leading-[13px] text-white [overflow-wrap:anywhere]">{upgrade.short}</span>
                  <span className="text-[8px] leading-3 text-[#aab2cb]">{upgrade.levelLabel}</span>
                  <span
                    className="text-[8px] leading-3"
                    style={{ color: upgrade.done ? "#7be58e" : upgrade.lockTxt ? "#d3b76c" : upgrade.buyable ? "#7be58e" : "#aab2cb" }}
                  >
                    {upgrade.done ? "MAX" : upgrade.lockTxt ? "LOCKED" : `${upgrade.cost}g`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="min-h-[118px] min-w-0 shrink-0 border-2 border-black bg-[#181d2f] px-3 py-2"
          aria-live="polite"
        >
          {selected ? (
            <div className="flex min-h-[100px] flex-col gap-2">
              <div className="flex min-w-0 items-start gap-2">
                <PixelIcon name={selected.icon} size={20} />
                <div className="min-w-0 flex-1">
                  <div className="text-[9px] leading-[15px] text-white [overflow-wrap:anywhere]">{selected.name}</div>
                  <div className="pt-1 text-[8px] leading-[14px] text-[#aab2cb]">CURRENT: {selected.levelLabel}</div>
                </div>
              </div>
              <div className="text-[8px] leading-[14px] text-white/80 [overflow-wrap:anywhere]">{selected.desc}</div>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0 flex-1 text-[8px] leading-[14px] text-[#ffd24a] [overflow-wrap:anywhere]">
                  {selected.done
                    ? selected.doneTxt || "MAXED"
                    : selected.lockTxt
                    ? `LOCKED - ${selected.lockTxt}`
                    : `${selected.cost} gold - ${stateLabel(selected)}`}
                </div>
                {!selected.done && !selected.lockTxt && (
                  <PixButton
                    small
                    color={selected.buyable ? "#4caf50" : "#555c73"}
                    onClick={selected.buy}
                    disabled={!selected.buyable}
                  >
                    BUY UPGRADE
                  </PixButton>
                )}
              </div>
            </div>
          ) : (
            <div className="flex min-h-[92px] flex-col justify-center gap-2 text-[8px] leading-[15px] text-white/75">
              <span>Select an upgrade tile to inspect its effect and current level.</span>
              <span className="text-[#ffd24a]">Green border = ready to buy from the info panel.</span>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="min-h-[44px] shrink-0 border-4 border-black bg-[#d9433b] px-3 py-2 text-[11px] font-bold text-black shadow-[0_3px_0_#000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd24a] active:translate-y-[2px]"
        >
          CLOSE UPGRADES
        </button>
      </section>
    </div>
  );
}
