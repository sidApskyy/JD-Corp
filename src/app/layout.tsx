import type { Metadata } from "next";
import { Manrope, Instrument_Serif } from "next/font/google";
import { Header } from "@/components/header";
import { ScrollProgress } from "@/components/motion-ui";
import { Footer } from "@/components/footer";
import { site } from "@/data/site";
import "./globals.css";
import "./luxury-theme.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], variable: "--font-serif", weight: "400", style: ["normal", "italic"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "JD CORP — Business Beyond Boundaries", template: "%s | JD CORP" },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { title: "JD CORP — Business Beyond Boundaries", description: site.description, siteName: site.name, type: "website", images: ["/images/hero-walnut-wall.jpg"] },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${manrope.variable} ${instrument.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
