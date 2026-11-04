import React from "react";
import { PixButton } from "./PixButton";

/**
 * Shared card for permanent upgrades and the ruby shop.
 * Keep the description and footer in separate, non-shrinking rows so prices
 * and Buy buttons never overlap adjacent cards on narrow mobile screens.
 */
export function UpgradeCard({
  icon,
  name,
  desc,
  cost,
  disabled,
  done,
  locked,
  action,
  onClick,
}: {
  icon: React.ReactNode;
  name: string;
  desc: string;
  cost: string;
  disabled?: boolean;
  done?: string;
  locked?: string;
  action?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className="sekarrow-upgrade-card flex w-full min-w-0 shrink-0 flex-col overflow-hidden border-2 border-black"
      style={{ background: "#202642", minHeight: 118 }}
    >
      <div className="min-w-0 flex-1 px-3 py-2">
        <div className="flex min-w-0 items-start gap-2">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center text-sm leading-4" aria-hidden="true">{icon}</span>
          <span className="min-w-0 flex-1 text-[9px] leading-[16px] text-white [overflow-wrap:anywhere]">
            {name}
          </span>
        </div>
        <div className="pt-1 text-[8px] leading-[15px] text-white/80 [overflow-wrap:anywhere]">
          {desc}
        </div>
      </div>
      <div className="flex min-h-[54px] min-w-0 shrink-0 items-center gap-2 border-t-2 border-black bg-[#1a1f33] px-3 py-2">
        {locked ? (
          <span className="w-full min-w-0 text-center text-[9px] leading-[15px] text-[#ffd76e] [overflow-wrap:anywhere]">
            LOCKED - {locked}
          </span>
        ) : done ? (
          <span className="w-full min-w-0 text-center text-[9px] leading-[15px] text-[#7be58e] [overflow-wrap:anywhere]">
            {done}
          </span>
        ) : (
          <>
            <span className="min-w-0 flex-1 text-left text-[9px] leading-[15px] text-[#ffd76e] [overflow-wrap:anywhere]">
              {cost}
            </span>
            <div className="shrink-0">
              <PixButton small color={disabled ? "#555c73" : "#4caf50"} onClick={onClick} disabled={disabled}>
                {action || "BUY"}
              </PixButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
