import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Every static page plus every blog post, so new pages are picked up automatically
const pages = import.meta.glob('./**/*.astro');

export const GET: APIRoute = async ({ site }) => {
  const pagePaths = Object.keys(pages)
    .filter((file) => !file.includes('['))
    .map((file) => file.slice(1).replace(/\.astro$/, '').replace(/\/index$/, '') + '/');
  const postPaths = (await getCollection('blog')).map((post) => `/blog/${post.id}/`);

  const urls = [...pagePaths, ...postPaths]
    .map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`)
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
