import type { Event } from "@/payload-types";

const AUDIENCE_LABEL: Record<Event["audience"], string> = {
  capital: "Capital members",
  industry: "Industry members",
  both: "Both",
  public: "Public",
};

function audienceColor(audience: Event["audience"]): string {
  if (audience === "capital") return "var(--accent)";
  if (audience === "industry") return "var(--ink)";
  return "var(--ink-2)";
}

function formatEventDate(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.valueOf())) return value;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

type EventRowProps = {
  event: Event;
  muted?: boolean;
};

export function EventRow({ event, muted }: EventRowProps) {
  return (
    <article
      className="card-hover event-row"
      style={{
        display: "grid",
        gridTemplateColumns: "180px 1fr 200px 140px",
        gap: "clamp(16px, 3vw, 40px)",
        padding: "clamp(28px, 3vw, 40px) 16px",
        borderBottom: "1px solid var(--rule)",
        alignItems: "start",
        opacity: muted ? 0.95 : 1,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(20px, 2vw, 26px)",
            letterSpacing: "-0.01em",
            fontWeight: 400,
          }}
        >
          {formatEventDate(event.date)}
        </div>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.12em",
            color: "var(--muted)",
            marginTop: 6,
          }}
        >
          {event.city.toUpperCase()}
        </div>
      </div>

      <div>
        <h4
          className="h-section"
          style={{
            margin: 0,
            fontSize: "clamp(22px, 2.2vw, 28px)",
            fontWeight: 400,
          }}
        >
          {event.title}
        </h4>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.6,
            color: "var(--ink-2)",
            margin: "10px 0 0",
            maxWidth: 620,
          }}
        >
          {event.description}
        </p>
      </div>

      <div
        style={{
          display: "inline-flex",
          alignSelf: "start",
          padding: "6px 12px",
          border: "1px solid var(--rule-strong)",
          fontFamily: "var(--mono)",
          fontSize: 10.5,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: audienceColor(event.audience),
          justifySelf: "start",
        }}
      >
        {AUDIENCE_LABEL[event.audience]}
      </div>

      <div style={{ justifySelf: "end" }}>
        {muted ? (
          <span className="link-arrow" style={{ fontSize: 13, opacity: 0.7 }}>
            Recap
          </span>
        ) : event.rsvpUrl ? (
          <a
            href={event.rsvpUrl}
            className="link-arrow"
            style={{ fontSize: 13 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            RSVP
          </a>
        ) : (
          <span className="link-arrow" style={{ fontSize: 13, opacity: 0.7 }}>
            RSVP
          </span>
        )}
      </div>
    </article>
  );
}
