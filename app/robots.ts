import type { MetadataRoute } from "next";

import { isProductionIndexing, SITE_URL } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  if (!isProductionIndexing()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
