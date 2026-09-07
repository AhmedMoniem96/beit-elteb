import { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    paths = ["", "/services", "/about", "/contact", "/book"];
  return (["en", "ar"] as const).flatMap((locale) =>
    paths.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency:
        path === "" ? "weekly" : ("monthly" as "weekly" | "monthly"),
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: { en: `${base}/en${path}`, ar: `${base}/ar${path}` },
      },
    })),
  );
}
