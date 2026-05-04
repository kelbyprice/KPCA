import { Eyebrow } from "@/components/chrome/Eyebrow";

type SectionHeaderProps = {
  eyebrow?: string;
  title?: string;
  lede?: string;
  kicker?: string;
};

export function SectionHeader({ eyebrow, title, lede, kicker }: SectionHeaderProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(160px, 200px) 1fr",
        gap: "clamp(16px, 4vw, 64px)",
        alignItems: "start",
        marginBottom: "clamp(40px, 5vw, 64px)",
      }}
      className="section-header-grid"
    >
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        {kicker && (
          <div className="num" style={{ marginTop: 12 }}>
            {kicker}
          </div>
        )}
      </div>
      <div>
        {title && (
          <h2
            className="h-section"
            style={{
              fontSize: "clamp(34px, 4.6vw, 60px)",
              margin: 0,
              maxWidth: 900,
              fontWeight: 400,
            }}
          >
            {title}
          </h2>
        )}
        {lede && (
          <p
            className="lede"
            style={{
              fontSize: "clamp(18px, 1.5vw, 22px)",
              maxWidth: 720,
              marginTop: 20,
              marginBottom: 0,
            }}
          >
            {lede}
          </p>
        )}
      </div>
    </div>
  );
}
