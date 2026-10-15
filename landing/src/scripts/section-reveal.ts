import { prefersReducedMotion } from "@scripts/motion-preferences";

const visibleClass = "is-visible";

export function observeSections(): void {
  const observedSections = document.querySelectorAll<HTMLElement>(".section-observed");

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    observedSections.forEach((section) => section.classList.add(visibleClass));
    return;
  }

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(visibleClass);
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
