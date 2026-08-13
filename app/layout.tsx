import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://veymea.eu"),
  title: { default: "Veymea", template: "%s · Veymea" },
  description: "Sexual wellness para dois. Intimacy. Discovery. Connection.",
  icons: { icon: "/brand/veymea-logo.png" },
  openGraph: {
    title: "Veymea — Intimacy. Discovery. Connection.",
    description: "Descubram novas sensações, ao vosso ritmo.",
    type: "website",
    locale: "pt_PT",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Veymea — Intimacy. Discovery. Connection." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veymea — Intimacy. Discovery. Connection.",
    description: "Descubram novas sensações, ao vosso ritmo.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt"><body className={`${display.variable} ${sans.variable}`}>{children}</body></html>;
}
