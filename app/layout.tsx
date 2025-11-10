import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://pynn.ai"),
  title: {
    default: "Pynn | Innovation Intelligence Platform for Europe's Startups, Investors & Accelerators",
    template: "%s | Pynn",
  },
  description:
    "Pynn is the intelligence layer of European innovation. Connect startups with investors across 44 countries. Manage deal flow, portfolio, and data rooms in one white-label platform. Join 1000+ startups, investors, accelerators, and innovation organizations.",
  keywords: [
    "innovation platform",
    "startup platform",
    "investor platform",
    "European startups",
    "innovation ecosystem",
    "startup funding",
    "deal flow management",
    "portfolio management",
    "white-label platform",
    "startup incubators",
    "startup accelerators",
    "venture capital",
    "early-stage funding",
    "startup investors",
    "innovation intelligence",
    "deal flow software",
    "portfolio tracking",
    "data room management",
    "startup community",
    "European innovation",
  ],
  authors: [{ name: "Pynn AI SL" }],
  creator: "Pynn AI SL",
  publisher: "Pynn AI SL",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pynn.ai",
    siteName: "Pynn",
    title: "Pynn | The Intelligence Layer of European Innovation",
    description:
      "Connect Europe's fragmented innovation ecosystem. Join 1000+ startups, investors, and accelerators. Manage deal flow, portfolio, and data rooms in one white-label platform. Apply in 5 minutes.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://pynn.ai"}/img/logo-pynn.svg`,
        width: 1200,
        height: 630,
        alt: "Pynn - Innovation Intelligence Platform connecting Europe's startup ecosystem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pynn | The Intelligence Layer of European Innovation",
    description:
      "Connect Europe's fragmented innovation ecosystem. Join 1000+ startups, investors, and accelerators. Manage deal flow, portfolio, and data rooms in one platform.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL || "https://pynn.ai"}/img/logo-pynn.svg`],
    creator: "@pynn_ai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="UTF-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${montserrat.variable} ${inter.variable} min-h-screen flex flex-col`}>
        <SkipLink />
        <Header />
        <main id="main-content" className="relative z-0 flex-grow flex flex-col pt-20 lg:pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
