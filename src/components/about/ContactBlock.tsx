import type { ReactNode } from "react";

type ContactColProps = {
  label: string;
  value: ReactNode;
  href?: string;
  border?: boolean;
};

function ContactCol({ label, value, href, border }: ContactColProps) {
  return (
    <div
      style={{
        padding: "clamp(28px, 3vw, 48px) clamp(20px, 2vw, 32px)",
        borderLeft: border ? "1px solid var(--rule)" : "0",
      }}
    >
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: 16,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(20px, 2vw, 26px)",
          letterSpacing: "-0.01em",
          lineHeight: 1.4,
        }}
      >
        {href ? (
          <a
            href={href}
            style={{ borderBottom: "1px solid var(--rule-strong)" }}
          >
            {value}
          </a>
        ) : (
          value
        )}
      </div>
    </div>
  );
}

export function ContactBlock() {
  return (
    <div
      className="contact-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        borderTop: "1px solid var(--rule-strong)",
        borderBottom: "1px solid var(--rule-strong)",
      }}
    >
      <ContactCol
        label="General"
        value="hello@kpca.org"
        href="mailto:hello@kpca.org"
      />
      <ContactCol
        label="Press"
        value="press@kpca.org"
        href="mailto:press@kpca.org"
        border
      />
      <ContactCol
        label="Mailing"
        border
        value={
          <>
            KPCA, c/o KSTC
            <br />
            PO Box 1049
            <br />
            Lexington, KY 40588-1049
          </>
        }
      />
      <style>{`
        @media (max-width: 820px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .contact-grid > div { border-left: 0 !important; border-top: 1px solid var(--rule) !important; }
          .contact-grid > div:first-child { border-top: 0 !important; }
        }
      `}</style>
    </div>
  );
}
