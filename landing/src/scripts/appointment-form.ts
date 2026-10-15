import { appointmentFields, formMessages } from "@data/appointment";

type ValidatedControl = HTMLInputElement | HTMLSelectElement;

function isValidatedControl(element: Element | RadioNodeList | null): element is ValidatedControl {
  return element instanceof HTMLInputElement || element instanceof HTMLSelectElement;
}

function getRequiredControls(form: HTMLFormElement): ValidatedControl[] {
  return appointmentFields
    .filter((field) => field.required)
    .map((field) => form.elements.namedItem(field.id))
    .filter(isValidatedControl);
}

function getValidationMessage(control: ValidatedControl): string {
  if (!control.value.trim()) {
    return control instanceof HTMLSelectElement ? formMessages.requiredSelect : formMessages.required;
  }

  if (control instanceof HTMLInputElement && control.type === "email" && !control.validity.valid) {
    return formMessages.invalidEmail;
  }

  return "";
}

function setFieldError(form: HTMLFormElement, control: ValidatedControl, message: string): void {
  const error = form.querySelector(`[data-error-for="${control.id}"]`);
  control.setAttribute("aria-invalid", message ? "true" : "false");
  if (error) error.textContent = message;
}

function getSelectedTrayLabel(form: HTMLFormElement): string {
  const traySelect = form.elements.namedItem("piece");
  if (!(traySelect instanceof HTMLSelectElement)) return "";
  return traySelect.options[traySelect.selectedIndex]?.text ?? "";
}

function handleSubmit(form: HTMLFormElement, status: HTMLElement, event: SubmitEvent): void {
  event.preventDefault();

  const controls = getRequiredControls(form);
  let firstInvalid: ValidatedControl | null = null;

  for (const control of controls) {
    const message = getValidationMessage(control);
    setFieldError(form, control, message);
    if (message && !firstInvalid) firstInvalid = control;
  }

  if (firstInvalid) {
    status.textContent = formMessages.summaryError;
    firstInvalid.focus();
    return;
  }

  status.textContent = formMessages.success(getSelectedTrayLabel(form));
  form.reset();
  controls.forEach((control) => setFieldError(form, control, ""));
}

export function initAppointmentForm(): void {
  const form = document.querySelector<HTMLFormElement>("[data-appointment-form]");
  const status = form?.querySelector<HTMLElement>("[data-form-status]");

  if (!form || !status) return;

  form.addEventListener("submit", (event) => handleSubmit(form, status, event));
}
