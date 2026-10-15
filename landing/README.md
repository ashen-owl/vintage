# Aurelia & Thorn | Vintage Gold Jewellery

Static Astro landing page for a fictional private vintage gold jewellery house. Migrated from the single-file `index.html` / `styles.css` / `script.js` prototype kept in `../references/`.

## Commands

```bash
npm install
npm run dev        # local server at http://localhost:4321
npm run build      # static build into ./dist
npm run preview    # preview the production build
npm run typecheck  # astro check, TypeScript strict
```

## Structure

```
src/
├── components/        Section components, one per page block
│   └── ui/            Reusable primitives (button, image panel, ornament, form field, ...)
├── data/              All copy, links, form config and ornament paths
├── interfaces/        Shared TypeScript types
├── layouts/           BaseLayout: <head>, fonts, skip link, sparkle field, scripts
├── pages/index.astro  Thin composition of the sections
├── scripts/           Ornament drawing, heading split, section reveal, form validation
└── styles/
    ├── global.css     Tailwind import, @theme tokens, base typography, shared classes
    └── motion.css     Reveal, split-heading, draw-line and ornament motion system
public/                Shipped assets: favicon and optimised WEBP images
design-assets/         Raw generations and processing tools, not shipped
docs/                  Brand guidelines and asset notes
```

Copy lives only in `src/data/`; components import the data file of their own section.

## Styling

Cascade layers are declared once in `global.css`:

```
theme → base → components → utilities → motion
```

- Brand palette, fonts, spacing, radii, easing and breakpoints are `@theme` tokens (`bg-porcelain`, `font-utility`, `px-gutter`, `py-section`, `rounded-soft`, `tablet:`, `desktop:`).
- Layout, spacing and responsive behaviour use Tailwind utilities in markup.
- Self-contained visuals (gold wave button, image panels, vault notes, cards, paper, form controls) are scoped `<style>` blocks inside `@layer components`, so utilities can override them.
- `motion.css` is global and sits in the last layer because its state selectors span components (`.section-observed.is-visible .reveal`) and runtime-created nodes (`.char`, `.word`).

Breakpoints: `tablet` starts at 721px, `desktop` at 1021px.

## Assets

Place raw generations in `design-assets/raw/` and export optimised WEBP files into `public/assets/images/`:

```bash
bash design-assets/tools/process-assets.sh
```

or, with Sharp installed:

```bash
node design-assets/tools/process-assets-sharp.mjs
```

See `docs/asset-processing.md` and `docs/assets-needed.md` for names, sizes and crop notes.
