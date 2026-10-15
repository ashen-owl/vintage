import type { Piece, SectionIntro } from "@interfaces/index";

export const collectionIntro: SectionIntro = {
  id: "collection",
  eyebrow: "The current tray",
  title: "Three kinds of gold, each with a different past life.",
  description:
    "The collection is deliberately small. We would rather show fewer pieces with cleaner provenance than fill a page with lookalikes.",
};

export const pieces: Piece[] = [
  {
    variant: "chain",
    revealFrom: "left",
    revealDelayMs: 90,
    image: {
      src: "/assets/images/collection-chain.webp",
      alt: "Vintage gold chain necklace on cream silk",
    },
    kicker: "Soft shine · daily heirloom",
    title: "Rope chains with lived-in light",
    description: "Substantial links, warm patina, and clasps rebuilt to survive another generation.",
    metal: "18k yellow gold",
    price: "From $2,800",
  },
  {
    variant: "signet",
    revealFrom: "center",
    revealDelayMs: 300,
    isTall: true,
    image: {
      src: "/assets/images/collection-signet.webp",
      alt: "Oval vintage gold signet ring with worn engraving",
    },
    kicker: "Wax seal character",
    title: "Signets that still feel slightly secret",
    description:
      "Rings selected for weight, hand engraving, and the small irregularities that prove the work.",
    metal: "14k to 22k gold",
    price: "From $1,950",
  },
  {
    variant: "locket",
    revealFrom: "right",
    revealDelayMs: 510,
    image: {
      src: "/assets/images/collection-locket.webp",
      alt: "Antique gold locket with engraved border",
    },
    kicker: "Portrait-ready pieces",
    title: "Lockets and cuffs with room for ritual",
    description:
      "Hinges are tested, interiors cleaned, and engraving is preserved unless you ask us to add yours.",
    metal: "Documented era note",
    price: "From $3,400",
  },
];
