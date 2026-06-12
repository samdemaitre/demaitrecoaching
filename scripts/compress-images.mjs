// One-off image compression for site images. Originals are backed up to
// images-originals/ (outside public/, so they don't deploy).
// Usage: node scripts/compress-images.mjs
import sharp from "sharp";
import { mkdir, copyFile, stat, rename } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const imagesDir = path.join(root, "public", "images");
const backupDir = path.join(root, "images-originals");

// Only the images actually rendered on the site, sized for their largest display
const targets = [
  { file: "IMG_4818.jpg", maxWidth: 840 },                 // hero portrait, renders at 420px (2x retina)
  { file: "20220804054144_IMG_0024.JPG", maxWidth: 1920 }, // full-width lake band
];

await mkdir(backupDir, { recursive: true });

for (const { file, maxWidth } of targets) {
  const src = path.join(imagesDir, file);
  const backup = path.join(backupDir, file);
  const tmp = src + ".tmp.jpg";

  await copyFile(src, backup);
  const before = (await stat(src)).size;

  await sharp(src)
    .rotate() // bake in EXIF orientation
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality: 75, mozjpeg: true })
    .toFile(tmp);

  await rename(tmp, src);
  const after = (await stat(src)).size;
  console.log(`${file}: ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB`);
}
console.log("Done. Originals saved in images-originals/");
