// One-shot image optimization: converts JPG/PNG in assets/images to WebP
// and prints natural dimensions so we can set explicit width/height in HTML.
// Run: node scripts/convert-images.js
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, parse } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = join(__dirname, '..', 'assets', 'images');
const SOURCE_EXTS = new Set(['.jpg', '.jpeg', '.png']);
const SKIP_PREFIXES = ['favicon'];

const files = await readdir(IMAGES_DIR);

console.log('Image optimization report');
console.log('-------------------------');

for (const file of files) {
    const { name, ext } = parse(file);
    if (!SOURCE_EXTS.has(ext.toLowerCase())) continue;
    if (SKIP_PREFIXES.some(p => name.startsWith(p))) continue;

    const srcPath = join(IMAGES_DIR, file);
    const webpPath = join(IMAGES_DIR, `${name}.webp`);

    const img = sharp(srcPath);
    const meta = await img.metadata();

    // Convert to WebP (quality 82 — visually indistinguishable, ~40-60% smaller)
    await img.webp({ quality: 82, effort: 6 }).toFile(webpPath);

    const srcSize = (await stat(srcPath)).size;
    const webpSize = (await stat(webpPath)).size;
    const savings = (((srcSize - webpSize) / srcSize) * 100).toFixed(1);

    console.log(
        `${file.padEnd(28)} ${meta.width}x${meta.height}  ` +
        `${(srcSize / 1024).toFixed(1).padStart(6)} KB -> ` +
        `${(webpSize / 1024).toFixed(1).padStart(6)} KB  (${savings}% smaller)`
    );
}
console.log('-------------------------');
console.log('Done. Commit the generated .webp files.');
