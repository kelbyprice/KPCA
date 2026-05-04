"use client";

import { useState } from "react";
import { Eyebrow } from "./Eyebrow";

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`arr ${className}`.trim()}
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 1L13 5L9 9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="square"
      />
      <path
        d="M0 5H13"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="square"
      />
    </svg>
  );
}

type NewsletterProps = {
  onDark?: boolean;
};

export function Newsletter({ onDark = false }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email) setDone(true);
      }}
      style={{ width: "100%", maxWidth: 520 }}
    >
      <Eyebrow noRule>Newsletter</Eyebrow>
      <h3
        className="h-section"
        style={{
          fontSize: "clamp(28px, 3vw, 38px)",
          margin: "12px 0 14px",
          fontWeight: 400,
          color: onDark ? "var(--bg)" : "var(--ink)",
        }}
      >
        Substantive. No filler.
      </h3>
      <p
        style={{
          fontFamily: "var(--sans)",
          fontSize: 15,
          lineHeight: 1.6,
          color: onDark ? "rgba(255,255,255,0.72)" : "var(--ink-2)",
          margin: "0 0 24px",
          maxWidth: 460,
        }}
      >
        We publish what&apos;s actually moving in Kentucky&apos;s private capital
        economy: deal activity, policy developments, member news, and the
        occasional thing worth your attention. Sign up.
      </p>

      {done ? (
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: onDark ? "rgba(255,255,255,0.85)" : "var(--ink)",
            padding: "16px 0",
            borderTop: onDark
              ? "1px solid rgba(255,255,255,0.25)"
              : "1px solid var(--rule-strong)",
          }}
        >
          Thanks! Check your inbox.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 0,
            borderTop: onDark
              ? "1px solid rgba(255,255,255,0.25)"
              : "1px solid var(--rule-strong)",
            borderBottom: onDark
              ? "1px solid rgba(255,255,255,0.25)"
              : "1px solid var(--rule-strong)",
          }}
        >
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              border: 0,
              padding: "16px 0",
              background: "transparent",
              color: onDark ? "var(--bg)" : "var(--ink)",
              fontSize: 15,
            }}
          />
          <button
            type="submit"
            style={{
              border: 0,
              padding: "0 20px",
              background: "transparent",
              cursor: "pointer",
              color: onDark ? "var(--bg)" : "var(--ink)",
              fontFamily: "var(--sans)",
              fontWeight: 500,
              fontSize: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Subscribe <Arrow />
          </button>
        </div>
      )}
    </form>
  );
}
