const fs = require('fs')
const globby = require('globby')
function addPage(page) {
  const path = page.replace(/^(src\/pages\/)|(.tsx)*/g, '')
  const route = path === 'index' ? '' : path
  return `  <url>
    <loc>${`${process.env.WEBSITE_URL}${route}`}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`
}
async function generateSitemap() {
  console.log({ d: process.env })
  const pages = await globby(['src/pages', '!src/pages/_*', '!src/pages/api/*'])
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(addPage).join('\n')}
</urlset>`
  fs.writeFileSync('public/sitemap.xml', sitemap)
}
generateSitemap()
