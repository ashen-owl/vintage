export interface SiteMeta {
  title: string;
  description: string;
  ogImage: string;
  lang: string;
}

export interface BrandName {
  script: string;
  small: string;
}

export interface Link {
  label: string;
  href: string;
}

export interface SectionIntro {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
}

export interface VaultNoteContent {
  label: string;
  value: string;
  caption: string;
  ariaLabel: string;
}

export interface ImageContent {
  src: string;
  alt: string;
}

export type PieceVariant = "chain" | "signet" | "locket";
export type RevealDirection = "left" | "center" | "right";

export interface Piece {
  variant: PieceVariant;
  revealFrom: RevealDirection;
  revealDelayMs: number;
  isTall?: boolean;
  image: ImageContent;
  kicker: string;
  title: string;
  description: string;
  metal: string;
  price: string;
}

export interface LedgerEntry {
  term: string;
  detail: string;
}

export interface CraftStep {
  number: string;
  title: string;
  description: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export type FormFieldKind = "text" | "email" | "select" | "textarea";

export interface FormFieldConfig {
  id: string;
  label: string;
  kind: FormFieldKind;
  autocomplete?: string;
  required: boolean;
  isFullWidth: boolean;
  placeholder?: string;
  rows?: number;
  options?: SelectOption[];
}

export interface FormMessages {
  required: string;
  requiredSelect: string;
  invalidEmail: string;
  summaryError: string;
  success: (trayLabel: string) => string;
}

export interface OrnamentShape {
  viewBox: string;
  paths: string[];
}
