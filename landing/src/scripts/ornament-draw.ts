const drawDelayStepMs = 110;
const maxDrawDelayMs = 520;

export function prepareOrnamentPaths(): void {
  document.querySelectorAll<SVGPathElement>(".ornament path").forEach((path, index) => {
    const length = Math.ceil(path.getTotalLength());
    path.style.setProperty("--path-length", String(length));
    path.style.setProperty("--draw-delay", `${Math.min(index * drawDelayStepMs, maxDrawDelayMs)}ms`);
  });
}
