import fs from 'fs';
import routes from './src/routes';

const PUBLIC_URL = 'https://data.norge.no';

const lastModDate: Date = new Date();
const lastMod = `${lastModDate.getFullYear()}-${
  lastModDate.getMonth() + 1
}-${lastModDate.getDate()}`;

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...new Set(Object.keys(routes).flatMap(k => routes[k]))]
  .filter(path => !path.includes(':'))
  .map(
    path =>
      `<url>
        <loc>${PUBLIC_URL}${path}</loc>
        <lastmod>${lastMod}</lastmod>
    </url>`
  )
  .join('')}
</urlset>
`;

const buildPath = './sitemap/sitemap.xml';

fs.writeFileSync(buildPath, xml);

// eslint-disable-next-line no-console
console.info(`> ✔️ Sitemap successfully generated at ${buildPath}`);
