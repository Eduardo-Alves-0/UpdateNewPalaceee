import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const propertiesFile = path.join(rootDir, "src/data/properties.ts");
const outputDir = path.join(rootDir, "public");

const siteUrl = (process.env.VITE_SITE_URL || "https://www.imobiliarianewpalace.com.br").replace(/\/$/, "");
const propertiesSource = fs.readFileSync(propertiesFile, "utf8");
const linkMatches = [...propertiesSource.matchAll(/link:\s*"(\/[^"]+)"/g)].map((match) => match[1]);
const uniquePaths = [...new Set(linkMatches)].sort();

const today = new Date().toISOString().slice(0, 10);

const urls = [
    { loc: `${siteUrl}/`, changefreq: "weekly", priority: "1.0" },
    ...uniquePaths.map((pathname) => ({
        loc: `${siteUrl}${pathname}`,
        changefreq: "monthly",
        priority: "0.8",
    })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
    .map(
        (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join("\n")}
</urlset>
`;

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, "sitemap.xml"), sitemap, "utf8");

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

fs.writeFileSync(path.join(outputDir, "robots.txt"), robots, "utf8");

console.log(`[seo] sitemap.xml gerado com ${urls.length} URLs`);
console.log(`[seo] robots.txt gerado`);
