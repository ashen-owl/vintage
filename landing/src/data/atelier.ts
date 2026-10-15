import type { CraftStep, ImageContent, SectionIntro } from "@interfaces/index";

export const atelierIntro: SectionIntro = {
  id: "atelier",
  eyebrow: "Restoration etiquette",
  title: "We make the jewel safe to wear, not new to look at.",
  description:
    "Old gold carries tool marks, softened edges, and tiny asymmetries. Those are not flaws. They are the proof of time, so our repairs stay quiet.",
};

export const atelierImage: ImageContent = {
  src: "/assets/images/atelier-restoration-bench.webp",
  alt: "Jeweller's bench with vintage tools and a gold ring under repair",
};

export const craftStepsAriaLabel = "Restoration sequence";

export const craftSteps: CraftStep[] = [
  {
    number: "01",
    title: "Inspect the stress points",
    description:
      "Clasps, hinges, bezels, and solder seams are checked before any polish touches the surface.",
  },
  {
    number: "02",
    title: "Repair under magnification",
    description:
      "Only structural issues are corrected. Engraving, patina, and hand-finished edges remain intact.",
  },
  {
    number: "03",
    title: "Prepare for ownership",
    description:
      "The piece leaves with care notes, sizing guidance, and a record of work completed.",
  },
];
