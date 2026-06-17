import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDir = path.resolve("public/media/source");
const outputDir = path.resolve("public/media");
const widths = [720, 1200, 1800];

await mkdir(outputDir, { recursive: true });
const files = (await readdir(sourceDir)).filter((file) =>
  /\.(jpe?g|png|webp)$/i.test(file),
);

await Promise.all(
  files.flatMap((file) => {
    const basename = path.parse(file).name;
    return widths.flatMap((width) => [
      sharp(path.join(sourceDir, file))
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(path.join(outputDir, `${basename}-${width}.webp`)),
      sharp(path.join(sourceDir, file))
        .resize({ width, withoutEnlargement: true })
        .avif({ quality: 58 })
        .toFile(path.join(outputDir, `${basename}-${width}.avif`)),
    ]);
  }),
);

console.log(`Optimized ${files.length} images at ${widths.length} widths.`);
