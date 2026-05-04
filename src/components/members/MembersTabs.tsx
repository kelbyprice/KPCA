"use client";

import { useEffect, useMemo, useState } from "react";

import type { Company, Organization } from "@/payload-types";

import { DirectorySection } from "@/components/members/DirectorySection";
import { PortfolioStrip } from "@/components/members/PortfolioStrip";

type Filter = "capital" | "industry" | "all";

type MembersTabsProps = {
  members: Organization[];
  companies: Company[];
};

const TAB_OPTIONS: { key: Filter; label: string }[] = [
  { key: "capital", label: "Capital" },
  { key: "industry", label: "Industry" },
  { key: "all", label: "All members" },
];

function filterFromHash(hash: string): Filter | null {
  const cleaned = hash.replace(/^#/, "").toLowerCase();
  if (cleaned === "capital" || cleaned === "industry" || cleaned === "all") {
    return cleaned;
  }
  return null;
}

export function MembersTabs({ members, companies }: MembersTabsProps) {
  const [filter, setFilter] = useState<Filter>("capital");

  useEffect(() => {
    const sync = () => {
      const fromHash = filterFromHash(window.location.hash);
      if (fromHash) setFilter(fromHash);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const capitalMembers = useMemo(
    () => members.filter((m) => m.kind === "capital"),
    [members],
  );
  const industryMembers = useMemo(
    () => members.filter((m) => m.kind === "industry"),
    [members],
  );
  const allMembersAlpha = useMemo(
    () => [...members].sort((a, b) => a.name.localeCompare(b.name)),
    [members],
  );

  const totalCount = members.length;
  const capitalCount = capitalMembers.length;
  const industryCount = industryMembers.length;

  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 72,
          zIndex: 20,
          background: "color-mix(in oklab, var(--bg) 92%, transparent)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 0",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            Filter
          </div>
          <div
            role="tablist"
            aria-label="Member directory filter"
            style={{ display: "flex", gap: 4 }}
          >
            {TAB_OPTIONS.map(({ key, label }) => {
              const active = filter === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setFilter(key);
                    if (typeof window !== "undefined") {
                      history.replaceState(null, "", `#${key}`);
                    }
                  }}
                  style={{
                    fontFamily: "var(--sans)",
                    fontSize: 13,
                    fontWeight: active ? 600 : 500,
                    padding: "10px 16px",
                    background: active ? "var(--ink)" : "transparent",
                    color: active ? "var(--bg)" : "var(--ink)",
                    border:
                      "1px solid " +
                      (active ? "var(--ink)" : "var(--rule-strong)"),
                    cursor: "pointer",
                    borderRadius: 0,
                    transition: "all .2s ease",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              color: "var(--muted)",
            }}
          >
            {totalCount} total · {capitalCount} capital · {industryCount}{" "}
            industry
          </div>
        </div>
      </div>

      {filter === "capital" && (
        <DirectorySection
          eyebrow="Capital members"
          title="Capital members"
          lede="Funds, angels, family offices, and corporate venture arms deploying capital into Kentucky's early-stage economy."
          members={capitalMembers}
        />
      )}

      {filter === "industry" && (
        <DirectorySection
          eyebrow="Industry members"
          title="Industry members"
          lede="Established Kentucky companies staying proximate to the innovation being built in their sectors."
          members={industryMembers}
          alt
        />
      )}

      {filter === "all" && (
        <DirectorySection
          eyebrow="All members"
          title="All members"
          lede="Capital and industry members of KPCA, listed together. Filtering by sector, region, and Hub affiliation coming soon."
          members={allMembersAlpha}
        />
      )}

      {filter !== "industry" && <PortfolioStrip companies={companies} />}
    </>
  );
}
