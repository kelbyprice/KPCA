import { Eyebrow } from "@/components/chrome/Eyebrow";

type SectionNumProps = {
  n: number;
  total: number;
};

function SectionNum({ n, total }: SectionNumProps) {
  return (
    <span className="num">
      {String(n).padStart(2, "0")}{" "}
      <span style={{ opacity: 0.5 }}>/ {String(total).padStart(2, "0")}</span>
    </span>
  );
}

type PageTitleProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  num?: number;
  total?: number;
};

export function PageTitle({ eyebrow, title, subtitle, num, total }: PageTitleProps) {
  return (
    <header
      className="container"
      style={{
        paddingTop: "clamp(48px, 8vw, 110px)",
        paddingBottom: "clamp(36px, 5vw, 72px)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px 1fr",
          gap: "clamp(16px, 4vw, 56px)",
          alignItems: "start",
        }}
      >
        <div style={{ paddingTop: 8 }}>
          {num != null && total != null && <SectionNum n={num} total={total} />}
        </div>
        <div>
          {eyebrow && <Eyebrow noRule>{eyebrow}</Eyebrow>}
          <h1
            className="display"
            style={{
              fontSize: "clamp(56px, 9vw, 128px)",
              margin: "16px 0 0",
              fontWeight: 400,
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="lede"
              style={{
                fontSize: "clamp(18px, 1.7vw, 24px)",
                maxWidth: 760,
                marginTop: 28,
                marginBottom: 0,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
