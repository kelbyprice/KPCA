import type { CSSProperties } from "react";

type StripePlaceholderProps = {
  width?: number | string;
  height?: number | string;
  label?: string;
  style?: CSSProperties;
};

export function StripePlaceholder({
  width = "100%",
  height = 80,
  label = "LOGO",
  style = {},
}: StripePlaceholderProps) {
  return (
    <div
      className="stripe-placeholder"
      style={{ width, height, ...style }}
      aria-hidden="true"
    >
      <span>{label}</span>
    </div>
  );
}
