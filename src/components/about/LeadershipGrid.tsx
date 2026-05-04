import type { Leadership } from "@/payload-types";

import { StripePlaceholder } from "@/components/atoms/StripePlaceholder";

type LeadershipGridProps = {
  entries: Leadership[];
};

function formatRole(p: Leadership): string {
  const role = p.externalRole ?? "";
  const aff = p.affiliation ?? "";
  if (role && aff) return `${role} · ${aff}`;
  return role || aff;
}

export function LeadershipGrid({ entries }: LeadershipGridProps) {
  if (entries.length === 0) return null;
  return (
    <div
      className="leadership-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        borderTop: "1px solid var(--rule-strong)",
        borderLeft: "1px solid var(--rule)",
      }}
    >
      {entries.map((p) => (
        <article
          key={p.id}
          style={{
            padding: "clamp(20px, 2vw, 32px)",
            borderRight: "1px solid var(--rule)",
            borderBottom: "1px solid var(--rule)",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            minHeight: 320,
          }}
        >
          <StripePlaceholder height={200} label="PHOTO" />
          <div>
            <h4
              className="h-section"
              style={{ margin: 0, fontSize: 22, fontWeight: 500 }}
            >
              {p.name}
            </h4>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginTop: 6,
              }}
            >
              {formatRole(p)}
            </div>
            {p.bio && (
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "var(--ink-2)",
                  margin: "14px 0 0",
                }}
              >
                {p.bio}
              </p>
            )}
          </div>
        </article>
      ))}
      <style>{`
        @media (max-width: 1100px) { .leadership-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 880px) { .leadership-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .leadership-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
