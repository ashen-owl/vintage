import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const rawDir = path.join(root, "design-assets", "raw");
const outputDir = path.join(root, "public", "assets", "images");

const assets = [
  {
    rawName: "raw-parchment-grain",
    outputName: "parchment-grain.webp",
    width: 1200,
    height: 1200,
    quality: 86,
    position: "center",
  },
  {
    rawName: "raw-hero-necklace-on-velvet",
    outputName: "hero-necklace-on-velvet.webp",
    width: 1800,
    height: 2300,
    quality: 88,
    position: "center",
  },
  {
    rawName: "raw-collection-chain",
    outputName: "collection-chain.webp",
    width: 1400,
    height: 1900,
    quality: 88,
    position: "center",
  },
  {
    rawName: "raw-collection-signet",
    outputName: "collection-signet.webp",
    width: 1400,
    height: 2100,
    quality: 88,
    position: "center",
  },
  {
    rawName: "raw-collection-locket",
    outputName: "collection-locket.webp",
    width: 1400,
    height: 1900,
    quality: 88,
    position: "center",
  },
  {
    rawName: "raw-atelier-restoration-bench",
    outputName: "atelier-restoration-bench.webp",
    width: 1700,
    height: 2200,
    quality: 88,
    position: "center",
  },
];

const allowedExtensions = new Set([".png", ".jpg", ".jpeg", ".webp"]);

async function findRawFile(rawName) {
  const entries = await fs.readdir(rawDir, { withFileTypes: true });
  const match = entries.find((entry) => {
    const parsed = path.parse(entry.name);
    return entry.isFile() && parsed.name === rawName && allowedExtensions.has(parsed.ext.toLowerCase());
  });

  return match ? path.join(rawDir, match.name) : null;
}

await fs.mkdir(outputDir, { recursive: true });

const missing = [];

for (const asset of assets) {
  const input = await findRawFile(asset.rawName);

  if (!input) {
    missing.push(asset.rawName);
    continue;
  }

  const output = path.join(outputDir, asset.outputName);

  await sharp(input)
    .rotate()
    .resize(asset.width, asset.height, {
      fit: "cover",
      position: asset.position,
    })
    .webp({ quality: asset.quality })
    .toFile(output);

  console.log(`Created ${path.relative(root, output)} from ${path.relative(root, input)}`);
}

if (missing.length) {
  console.warn("Missing raw files:");
  missing.forEach((name) => console.warn(`- ${name}.png/.jpg/.jpeg/.webp`));
  process.exitCode = 1;
}
