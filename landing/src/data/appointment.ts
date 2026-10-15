import type { FormFieldConfig, FormMessages, SectionIntro, VaultNoteContent } from "@interfaces/index";

export const appointmentIntro: SectionIntro = {
  id: "appointment",
  eyebrow: "Private viewing",
  title: "Ask us to lay out the tray.",
  description:
    "Tell us what you are looking for. We will reply with available pieces, provenance notes, and viewing times before anything is listed publicly.",
};

export const reserveNote: VaultNoteContent = {
  label: "Wax-sealed reserve",
  value: "Two weeks",
  caption: "No pressure, no public listing while the piece is held.",
  ariaLabel: "Private reserve policy",
};

export const appointmentFields: FormFieldConfig[] = [
  {
    id: "name",
    label: "Name",
    kind: "text",
    autocomplete: "name",
    required: true,
    isFullWidth: false,
  },
  {
    id: "email",
    label: "Email",
    kind: "email",
    autocomplete: "email",
    required: true,
    isFullWidth: false,
  },
  {
    id: "piece",
    label: "What should we prepare?",
    kind: "select",
    required: true,
    isFullWidth: true,
    options: [
      { value: "", label: "Choose a tray" },
      { value: "chains", label: "Gold chains" },
      { value: "signets", label: "Signet rings" },
      { value: "lockets", label: "Lockets and cuffs" },
      { value: "gift", label: "A gift consultation" },
    ],
  },
  {
    id: "note",
    label: "Useful details",
    kind: "textarea",
    required: false,
    isFullWidth: true,
    rows: 4,
    placeholder: "Era, budget, ring size, gift date, or a piece you already own.",
  },
];

export const submitLabel = "Request appointment";

export const formMessages: FormMessages = {
  required: "This field is required.",
  requiredSelect: "Choose a tray to prepare.",
  invalidEmail: "Enter a working email address.",
  summaryError: "Please correct the marked details before we prepare the tray.",
  success: (trayLabel) =>
    `Appointment request noted for ${trayLabel}. We will reply with available pieces and viewing times.`,
};
