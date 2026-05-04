import type { ReactNode } from "react";

type BoxedStatementProps = {
  eyebrow: string;
  body: ReactNode;
  dark?: boolean;
};

export function BoxedStatement({ eyebrow, body, dark }: BoxedStatementProps) {
  return (
    <div
      style={{
        padding: "clamp(36px, 4vw, 64px)",
        background: dark ? "var(--ink)" : "var(--bg-elev)",
        color: dark ? "var(--bg)" : "var(--ink)",
        border: "1px solid " + (dark ? "var(--ink)" : "var(--rule-strong)"),
        minHeight: 360,
        display: "flex",
        flexDirection: "column",
        gap: 32,
      }}
    >
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: dark ? "rgba(255,255,255,0.6)" : "var(--muted)",
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(20px, 2vw, 26px)",
          lineHeight: 1.45,
          fontWeight: 300,
          textWrap: "pretty",
        }}
      >
        {body}
      </div>
    </div>
  );
}
