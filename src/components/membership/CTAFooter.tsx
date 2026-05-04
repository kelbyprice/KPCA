import Link from "next/link";
import { Arrow } from "@/components/atoms/Arrow";

type CTAFooterProps = {
  label: string;
  href: string;
};

export function CTAFooter({ label, href }: CTAFooterProps) {
  return (
    <div
      style={{
        marginTop: "clamp(48px, 6vw, 80px)",
        paddingTop: 32,
        borderTop: "1px solid var(--rule)",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Link href={href} className="btn">
        <span>{label}</span>
        <Arrow />
      </Link>
    </div>
  );
}
