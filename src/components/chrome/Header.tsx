import Link from "next/link";

type NavItem = {
  href: string;
  label: string;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/membership", label: "Membership" },
  { href: "/members", label: "Members" },
  { href: "/events", label: "Events" },
  { href: "/advocacy", label: "Advocacy" },
  { href: "/about", label: "About" },
];

function KPCABug({ size = 26, color }: { size?: number; color?: string }) {
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

export function Header() {
  return (
    <header className="site-header">
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
          gap: 24,
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontFamily: "var(--serif)",
            fontSize: 22,
            letterSpacing: "-0.01em",
            fontWeight: 500,
          }}
        >
          <KPCABug size={26} />
          <span>KPCA</span>
        </Link>

        <nav
          aria-label="Primary"
          className="primary-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(4px, 1.4vw, 28px)",
          }}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
              style={{
                fontFamily: "var(--sans)",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--ink-2)",
                padding: "8px 4px",
                borderBottom: "1px solid transparent",
                transition: "border-color .2s ease, color .2s ease",
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/membership"
            className="btn"
            style={{ padding: "10px 18px", marginLeft: 8 }}
          >
            <span>Apply</span>
            <Arrow />
          </Link>
        </nav>
      </div>
    </header>
  );
}
