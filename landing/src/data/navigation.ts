import type { Link } from "@interfaces/index";

export const headerAriaLabel = "Aurelia & Thorn site header";

export const brandHomeLink: Link = {
  label: "Aurelia & Thorn home",
  href: "#top",
};

export const navAriaLabel = "Primary navigation";

export const primaryNav: Link[] = [
  { label: "Collection", href: "#collection" },
  { label: "Provenance", href: "#provenance" },
  { label: "Restoration", href: "#atelier" },
  { label: "Private viewing", href: "#appointment" },
];

export const headerCta: Link = {
  label: "Reserve the tray",
  href: "#appointment",
};

export const menuOpenLabel = "Open menu";

export const menuCloseLabel = "Close menu";
