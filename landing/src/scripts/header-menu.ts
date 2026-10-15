const inlineMenuQuery = "(width >= 62rem)";

export function initHeaderMenu(): void {
  const menu = document.querySelector<HTMLElement>("[data-site-menu]");

  if (!menu) return;

  const closeMenu = (): void => {
    if (menu.matches(":popover-open")) menu.hidePopover();
  };

  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  window.matchMedia(inlineMenuQuery).addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });
}
