import Link from "next/link";
import { Newsletter } from "./Newsletter";

function KPCABug({ size = 32, color }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        fill="none"
        stroke={color || "currentColor"}
        strokeWidth="1"
      />
      <path
        d="M9 8 L9 24 M9 16 L19 8 M9 16 L19 24"
        stroke={color || "currentColor"}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="square"
      />
    </svg>
  );
}

type FooterColProps = {
  title: string;
  items: ReadonlyArray<{ label: string; href: string }>;
};

function FooterCol({ title, items }: FooterColProps) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.5)",
          marginBottom: 18,
        }}
      >
        {title}
      </div>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "grid",
          gap: 10,
        }}
      >
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: 14,
                fontFamily: "var(--sans)",
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div
        className="container"
        style={{
          paddingTop: "clamp(72px, 9vw, 120px)",
          paddingBottom: "clamp(36px, 4vw, 56px)",
        }}
      >
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
            gap: "clamp(24px, 4vw, 64px)",
            alignItems: "start",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 24,
              }}
            >
              <KPCABug size={32} color="var(--bg)" />
              <span
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 26,
                  color: "var(--bg)",
                }}
              >
                KPCA
              </span>
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.72)",
                fontSize: 14,
                lineHeight: 1.6,
                maxWidth: 320,
                margin: 0,
              }}
            >
              The Kentucky Private Capital Association.
            </p>
            <address
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 13,
                lineHeight: 1.6,
                maxWidth: 320,
                margin: "20px 0 0",
                fontStyle: "normal",
                fontFamily: "var(--sans)",
              }}
            >
              KPCA, c/o KSTC
              <br />
              PO Box 1049
              <br />
              Lexington, KY 40588-1049
            </address>
          </div>

          <FooterCol
            title="Membership"
            items={[
              { label: "Capital members", href: "/membership" },
              { label: "Industry members", href: "/membership" },
              { label: "Tiers and benefits", href: "/membership" },
            ]}
          />
          <FooterCol
            title="Programs"
            items={[
              { label: "Events", href: "/events" },
              { label: "Advocacy", href: "/advocacy" },
              { label: "Research", href: "/advocacy" },
            ]}
          />
          <FooterCol
            title="Contact"
            items={[
              { label: "Newsletter signup", href: "#newsletter" },
              { label: "Press inquiries", href: "mailto:press@kpca.org" },
              { label: "General contact", href: "mailto:hello@kpca.org" },
            ]}
          />
        </div>

        <div
          id="newsletter"
          className="footer-newsletter-grid"
          style={{
            marginTop: "clamp(72px, 8vw, 120px)",
            paddingTop: "clamp(48px, 6vw, 80px)",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(24px, 4vw, 64px)",
            alignItems: "start",
          }}
        >
          <div>
            <Newsletter onDark />
          </div>
          <div
            className="footer-quote"
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(20px, 2vw, 28px)",
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.78)",
              fontWeight: 300,
              fontStyle: "italic",
              maxWidth: 460,
              justifySelf: "end",
              textWrap: "pretty",
            }}
          >
            &ldquo;Capital, companies, and opportunity don&apos;t stop at state
            lines. But the work of building an ecosystem does have a home, and
            Kentucky&apos;s belongs here.&rdquo;
          </div>
        </div>

        <div
          style={{
            marginTop: "clamp(60px, 6vw, 88px)",
            paddingTop: 28,
            borderTop: "1px solid rgba(255,255,255,0.2)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "rgba(255,255,255,0.55)",
            fontSize: 12,
            fontFamily: "var(--mono)",
            letterSpacing: "0.06em",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>© 2026 Kentucky Private Capital Association</div>
          <div>hello@kpca.org · Lexington, KY</div>
        </div>
      </div>
    </footer>
  );
}
