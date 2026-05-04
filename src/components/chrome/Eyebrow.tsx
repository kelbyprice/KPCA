import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  noRule?: boolean;
};

export function Eyebrow({ children, className = "", noRule = false }: EyebrowProps) {
  const classes = ["eyebrow", noRule ? "no-rule" : "", className]
    .filter(Boolean)
    .join(" ");
  return <div className={classes}>{children}</div>;
}
