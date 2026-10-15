import type { LedgerEntry, SectionIntro } from "@interfaces/index";

export const provenanceIntro: SectionIntro = {
  id: "provenance",
  eyebrow: "Paper trail before romance",
  title: "A piece is only desirable when its story can be handled.",
  description:
    "Every jewel is catalogued as an object first: hallmarks, repairs, setting condition, sizing limits, and the kind of wear a buyer should expect.",
};

export const provenanceLedger: LedgerEntry[] = [
  {
    term: "Hallmark",
    detail: "Photographed, decoded, and included in the appointment notes.",
  },
  {
    term: "Metal",
    detail: "Acid-tested when marks are unclear. Gold purity is stated plainly.",
  },
  {
    term: "Restoration",
    detail: "Clasps, hinges, and settings are repaired without polishing away age.",
  },
  {
    term: "Reserve",
    detail: "A chosen piece can be held for two weeks while you decide.",
  },
];
