import React from "react";

export function PixButton({
  children,
  color,
  onClick,
  disabled,
  small,
}: {
  children: React.ReactNode;
  color: string;
  onClick?: () => void;
  disabled?: boolean;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={
        "border-4 border-black font-bold tracking-wide text-black " +
        (small ? "min-h-[42px] px-2 py-2 text-[10px] " : "min-h-[44px] px-4 py-3 text-[11px] ") +
        "shadow-[0_4px_0_#000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd24a] active:translate-y-1 active:shadow-[0_1px_0_#000] transition-transform disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:active:translate-y-0"
      }
      style={{ background: color, touchAction: "manipulation" }}
    >
      {children}
    </button>
  );
}


