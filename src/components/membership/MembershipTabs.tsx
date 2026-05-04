"use client";

import { useEffect, useState, type ReactNode } from "react";

type Tab = "capital" | "industry";

type MembershipTabsProps = {
  capitalSection: ReactNode;
  industrySection: ReactNode;
};

const TABS: {
  key: Tab;
  letter: string;
  title: string;
  sub: string;
  bg: string;
}[] = [
  {
    key: "capital",
    letter: "A",
    title: "Capital members → voice",
    sub: "Funds, angels, family offices, CVCs.",
    bg: "var(--bg)",
  },
  {
    key: "industry",
    letter: "B",
    title: "Industry members → proximity",
    sub: "Established Kentucky companies.",
    bg: "var(--bg-elev)",
  },
];

function tabFromHash(hash: string): Tab | null {
  const cleaned = hash.replace(/^#/, "").toLowerCase();
  if (cleaned === "industry") return "industry";
  if (cleaned === "capital") return "capital";
  return null;
}

export function MembershipTabs({
  capitalSection,
  industrySection,
}: MembershipTabsProps) {
  const [tab, setTab] = useState<Tab>("capital");

  // Honor #capital / #industry deep-links on mount and on hashchange
  useEffect(() => {
    const sync = () => {
      const fromHash = tabFromHash(window.location.hash);
      if (fromHash) setTab(fromHash);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <>
      <section
        role="tablist"
        aria-label="Membership type"
        style={{
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div
          className="container"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
        >
          {TABS.map((t, i) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`panel-${t.key}`}
                onClick={() => {
                  setTab(t.key);
                  if (typeof window !== "undefined") {
                    history.replaceState(
                      null,
                      "",
                      `#${t.key}`,
                    );
                    window.scrollTo({ top: 0, behavior: "instant" });
                  }
                }}
                className={
                  "picker-tab" + (active ? " picker-tab--active" : "")
                }
                style={{
                  textAlign: "left",
                  cursor: "pointer",
                  font: "inherit",
                  color: "inherit",
                  padding:
                    "clamp(28px, 3vw, 40px) clamp(16px, 2vw, 24px)",
                  background: t.bg,
                  border: 0,
                  borderRight: i === 0 ? "1px solid var(--rule)" : 0,
                  borderTop: active
                    ? "3px solid var(--ink)"
                    : "3px solid transparent",
                  opacity: active ? 1 : 0.55,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  transition:
                    "opacity .2s ease, border-color .2s ease",
                }}
              >
                <span className="num">{t.letter}</span>
                <span
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "clamp(20px, 2vw, 26px)",
                    fontWeight: active ? 500 : 400,
                  }}
                >
                  {t.title}
                </span>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>
                  {t.sub}
                </span>
              </button>
            );
          })}
        </div>
        <style>{`
          .picker-tab:hover { opacity: 1; }
          .picker-tab:focus-visible { outline: 2px solid var(--ink); outline-offset: -2px; }
        `}</style>
      </section>

      <div
        id="panel-capital"
        role="tabpanel"
        hidden={tab !== "capital"}
      >
        {tab === "capital" && capitalSection}
      </div>
      <div
        id="panel-industry"
        role="tabpanel"
        hidden={tab !== "industry"}
      >
        {tab === "industry" && industrySection}
      </div>
    </>
  );
}
