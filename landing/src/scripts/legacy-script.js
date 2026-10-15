const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll(".ornament path").forEach((path, index) => {
  const length = Math.ceil(path.getTotalLength());
  path.style.setProperty("--path-length", length);
  path.style.setProperty("--draw-delay", `${Math.min(index * 110, 520)}ms`);
});

document.querySelectorAll("main h1, main h2, .piece-card h3, .craft-steps strong").forEach((heading) => {
  const text = heading.textContent.replace(/\s+/g, " ").trim();

  if (!text) return;

  heading.setAttribute("aria-label", text);
  heading.dataset.splitHeading = "ready";
  heading.innerHTML = "";

  let characterIndex = 0;

  text.split(" ").forEach((word, wordIndex, words) => {
    const wordSpan = document.createElement("span");
    wordSpan.className = "word";
    wordSpan.setAttribute("aria-hidden", "true");

    [...word].forEach((character) => {
      const span = document.createElement("span");
      span.className = "char";
      span.style.setProperty("--char-delay", `${characterIndex * 18}ms`);
      span.textContent = character;
      wordSpan.appendChild(span);
      characterIndex += 1;
    });

    heading.appendChild(wordSpan);

    if (wordIndex < words.length - 1) {
      heading.appendChild(document.createTextNode(" "));
      characterIndex += 1;
    }
  });
});

const observedSections = document.querySelectorAll(".section-observed");

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  observedSections.forEach((section) => section.classList.add("is-visible"));
} else {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          sectionObserver.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -34% 0px",
    },
  );

  observedSections.forEach((section) => sectionObserver.observe(section));
}

const appointmentForm = document.querySelector(".appointment-form");

if (appointmentForm) {
  const status = appointmentForm.querySelector(".form-status");

  const setError = (field, message) => {
    const error = appointmentForm.querySelector(`[data-error-for="${field.id}"]`);
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) error.textContent = message;
  };

  appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const fields = [
      appointmentForm.elements.name,
      appointmentForm.elements.email,
      appointmentForm.elements.piece,
    ];

    let firstInvalid = null;

    fields.forEach((field) => {
      let message = "";

      if (!field.value.trim()) {
        message = field.tagName === "SELECT" ? "Choose a tray to prepare." : "This field is required.";
      } else if (field.type === "email" && !field.validity.valid) {
        message = "Enter a working email address.";
      }

      setError(field, message);
      if (message && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      status.textContent = "Please correct the marked details before we prepare the tray.";
      firstInvalid.focus();
      return;
    }

    const selectedTray = appointmentForm.elements.piece.options[appointmentForm.elements.piece.selectedIndex].text;
    status.textContent = `Appointment request noted for ${selectedTray}. We will reply with available pieces and viewing times.`;
    appointmentForm.reset();
    fields.forEach((field) => setError(field, ""));
  });
}
