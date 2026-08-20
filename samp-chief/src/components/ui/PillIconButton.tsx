import React from "react";

import { cn } from "@/lib/utils";

const PILL_BUTTON_BASE =
  "flex items-center justify-center rounded-full border border-white text-white cursor-pointer transition-all duration-300 hover:bg-black hover:bg-opacity-40 hover:border-transparent";

type PillIconButtonProps = {
  ariaLabel: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
} & (
  | { as: "a"; href: string; onClick?: never }
  | { as?: "button"; href?: never; onClick: () => void }
);

export default function PillIconButton({
  ariaLabel,
  className,
  style,
  children,
  ...props
}: PillIconButtonProps) {
  if (props.as === "a") {
    return (
      <a
        href={props.href}
        aria-label={ariaLabel}
        className={cn(PILL_BUTTON_BASE, className)}
        style={style}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={props.onClick}
      aria-label={ariaLabel}
      className={cn(PILL_BUTTON_BASE, className)}
      style={style}
    >
      {children}
    </button>
  );
}
