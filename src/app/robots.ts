import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/manage", "/siswa/*"],
      disallow: "/api/*",
    },
    sitemap: "https://santrib.mbss.sch.id/sitemap.xml",
  };
}
