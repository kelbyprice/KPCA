import type { Event } from "@/payload-types";

import { Arrow } from "@/components/atoms/Arrow";

type EventHeroProps = {
  event: Event;
};

const AUDIENCE_LABEL: Record<Event["audience"], string> = {
  capital: "Capital members",
  industry: "Industry members",
  both: "Both",
  public: "Public",
};

function formatEventDate(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.valueOf())) return value;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function EventHero({ event }: EventHeroProps) {
  return (
    <article
      className="featured-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 1fr",
        gap: 0,
        border: "1px solid var(--rule-strong)",
        marginBottom: 56,
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          padding: "clamp(28px, 4vw, 56px)",
          borderRight: "1px solid var(--rule)",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            ★ Featured
          </span>
          <span className="num">{AUDIENCE_LABEL[event.audience]}</span>
        </div>
        <h3
          className="h-section"
          style={{
            margin: 0,
            fontSize: "clamp(28px, 3.4vw, 44px)",
            fontWeight: 400,
          }}
        >
          {event.title}
        </h3>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.65,
            color: "var(--ink-2)",
            margin: 0,
          }}
        >
          {event.description}
        </p>
        <div
          style={{
            marginTop: "auto",
            paddingTop: 20,
            borderTop: "1px solid var(--rule)",
          }}
        >
          {event.rsvpUrl ? (
            <a
              href={event.rsvpUrl}
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>RSVP</span>
              <Arrow />
            </a>
          ) : (
            <span className="btn" aria-disabled="true">
              <span>RSVP</span>
              <Arrow />
            </span>
          )}
        </div>
      </div>

      <div
        style={{
          padding: "clamp(28px, 4vw, 56px)",
          background:
            "repeating-linear-gradient(135deg, var(--rule) 0 1px, transparent 1px 14px), var(--bg-elev)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 32,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 10,
            }}
          >
            Date
          </div>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(40px, 5vw, 64px)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              lineHeight: 1,
            }}
          >
            {formatEventDate(event.date)}
          </div>
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 10,
            }}
          >
            Where
          </div>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(28px, 3vw, 38px)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            {event.city}, {event.state ?? "KY"}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .featured-grid { grid-template-columns: 1fr !important; }
          .featured-grid > div { border-right: 0 !important; }
        }
      `}</style>
    </article>
  );
}
