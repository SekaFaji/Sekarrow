import React from "react";
import { PixButton } from "./PixButton";

/**
 * Shared upgrade card used by the shop, armory, settings and courtyard.
 * On phones the action sits beneath the description so neither column
 * collapses to the point of clipping words. Desktop retains the side action.
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
  icon: string;
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
      className="sekarrow-upgrade-card flex w-full min-w-0 flex-col items-stretch border-2 border-black sm:flex-row"
      style={{ background: "#202642", minHeight: 108 }}
    >
      <div className="min-w-0 flex-1 px-3 py-2">
        <div className="flex min-w-0 items-start gap-2">
          <span className="shrink-0 text-sm leading-4" aria-hidden="true">{icon}</span>
          <span className="min-w-0 flex-1 text-[10px] leading-[18px] text-white [overflow-wrap:anywhere]">
            {name}
          </span>
        </div>
        <div className="pt-1 text-[9px] leading-[17px] text-white/80 [overflow-wrap:anywhere]">
          {desc}
        </div>
      </div>
      <div
        className="flex w-full min-w-0 shrink-0 flex-row items-center justify-between gap-2 border-t-2 border-black bg-[#1a1f33] px-2 py-1.5 sm:w-[114px] sm:flex-col sm:justify-center sm:border-l-2 sm:border-t-0"
      >
        {locked ? (
          <span className="min-w-0 text-center text-[10px] leading-4 text-[#ffd76e] [overflow-wrap:anywhere]">
            🔒 {locked}
          </span>
        ) : done ? (
          <span className="min-w-0 text-center text-[10px] leading-4 text-[#7be58e] [overflow-wrap:anywhere]">
            ✓ {done}
          </span>
        ) : (
          <>
            {cost !== "" && (
              <span className="min-w-0 text-center text-[10px] leading-4 text-[#ffd76e] [overflow-wrap:anywhere]">
                {cost}
              </span>
            )}
            <PixButton small color={disabled ? "#555c73" : "#4caf50"} onClick={onClick} disabled={disabled}>
              {action || "BUY"}
            </PixButton>
          </>
        )}
      </div>
    </div>
  );
}
