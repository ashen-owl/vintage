import type { ImageContent, Link, SectionIntro, VaultNoteContent } from "@interfaces/index";

export const heroIntro: SectionIntro = {
  id: "top",
  eyebrow: "Private ledger · Vintage gold jewellery",
  title: "Gold with a century under its skin.",
  description:
    "Rare 18k pieces, restored by hand, documented like archive objects, and presented by appointment before they return to the vault.",
};

export const heroActionsAriaLabel = "Primary actions";

export const heroActions: { primary: Link; secondary: Link } = {
  primary: { label: "Request a private viewing", href: "#appointment" },
  secondary: { label: "Open the collection", href: "#collection" },
};

export const heroImage: ImageContent = {
  src: "/assets/images/hero-necklace-on-velvet.webp",
  alt: "Antique gold necklace resting on an ivory velvet presentation tray",
};

export const heroVaultNote: VaultNoteContent = {
  label: "Vault note",
  value: "No. 07",
  caption: "Edwardian collar · 18k yellow gold · hand-restored clasp",
  ariaLabel: "Featured piece details",
};

export const heroPromisesAriaLabel = "House promises";

export const heroPromises: string[] = ["Hallmarked", "Hand restored", "Reserved privately"];
