import { getAllProducts } from '../lib/products';
import type { GetServerSideProps } from 'next';
import type { Product } from '../types/domain';

function generateSitemap(products: Product[]): string {
  const base = 'https://virajglobalmachinery.com';
  const staticPages = ['', '/products', '/#about', '/#contact', '/auth', '/cart', '/privacy-policy', '/terms'];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(p => `  <url><loc>${base}${p}</loc><changefreq>weekly</changefreq><priority>${p===''?'1.0':'0.8'}</priority></url>`).join('\n')}
${products.map(p => `  <url><loc>${base}/products/${p.id}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`).join('\n')}
</urlset>`;
}

export default function Sitemap() { return null; }

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = generateSitemap(getAllProducts());
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
  return { props: {} };
};
