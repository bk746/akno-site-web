import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ContactOverlayProvider } from "@/components/contact/contact-overlay-context";
import { introBootScript } from "@/components/intro/intro-boot";
import { IntroProvider } from "@/components/intro/intro-provider";
import { AknoMicroInteractions } from "@/components/motion/akno-micro-interactions";
import { AknoMotionRoot } from "@/components/motion/akno-motion-root";
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
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introBootScript }} />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html:not(.intro-complete) .site-shell { visibility: hidden; }
              html:not(.intro-complete) .site-intro-curtain { display: block; }
            `,
          }}
        />
        <noscript>
          <style>{`html .site-shell{visibility:visible!important}html .site-intro-curtain{display:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <IntroProvider>
          <ContactOverlayProvider>
            <AknoMotionRoot />
            <AknoMicroInteractions />
            {children}
          </ContactOverlayProvider>
        </IntroProvider>
      </body>
    </html>
  );
}
