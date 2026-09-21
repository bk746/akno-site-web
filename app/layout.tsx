import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ContactOverlayProvider } from "@/components/contact/contact-overlay-context";
import { introBootScript } from "@/components/intro/intro-boot";
import { IntroProvider } from "@/components/intro/intro-provider";
import { AknoMotionRoot } from "@/components/motion/akno-motion-root";

import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://akno.fr"),
  title: {
    default: "AKNO — Sites qui convertissent",
    template: "%s | AKNO",
  },
  description:
    "On conçoit ton site, on analyse tes données, et on pousse ton trafic au maximum.",
  openGraph: {
    title: "AKNO — Sites qui convertissent",
    description:
      "Stratégie, design et développement pour des sites qui ramènent des demandes.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
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
      <body className="flex min-h-full flex-col scroll-smooth" suppressHydrationWarning>
        <IntroProvider>
          <ContactOverlayProvider>
            <AknoMotionRoot />
            {children}
          </ContactOverlayProvider>
        </IntroProvider>
      </body>
    </html>
  );
}
