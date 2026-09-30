import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ContactOverlayProvider } from "@/components/contact/contact-overlay-context";
import { AknoClientShell } from "@/components/motion/akno-client-shell";
import { scrollBootScript } from "@/lib/scroll-boot";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site-config";

import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  preload: false,
});

const interDisplay = Inter({
  variable: "--font-hero-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "Stratégie, design et développement pour des sites qui ramènent des demandes.",
    locale: "fr_FR",
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "Stratégie, design et développement pour des sites qui ramènent des demandes.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${interDisplay.variable} intro-complete h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: scrollBootScript }} />
      </head>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <ContactOverlayProvider>
          <AknoClientShell />
          {children}
        </ContactOverlayProvider>
      </body>
    </html>
  );
}
