/**
 * Minimaler Static-Server zum lokalen Prüfen der Website.
 * Aufruf: node _build/serve.mjs [port]
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', 'web');
const port = Number(process.argv[2] || 4173);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

http
  .createServer((req, res) => {
    const url = decodeURIComponent((req.url || '/').split('?')[0]);
    let file = path.join(root, url);
    if (url.endsWith('/')) file = path.join(file, 'index.html');
    if (!file.startsWith(root)) {
      res.writeHead(403).end('Forbidden');
      return;
    }
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      const alt = path.join(file, 'index.html');
      if (fs.existsSync(alt)) file = alt;
      else {
        const notFound = path.join(root, '404.html');
        res.writeHead(404, { 'Content-Type': types['.html'] });
        res.end(fs.existsSync(notFound) ? fs.readFileSync(notFound) : 'Not found');
        return;
      }
    }
    res.writeHead(200, {
      'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, () => {
    console.log(`Website: http://localhost:${port}/`);
    console.log('Beenden mit Strg+C');
  });
