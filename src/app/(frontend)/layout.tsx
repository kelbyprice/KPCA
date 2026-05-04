import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kentucky Private Capital Association | KPCA",
  description:
    "The organized home for private capital and early-stage innovation in Kentucky. Capital members govern; industry members stay proximate. Two membership classes, one Commonwealth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
