const characterDelayStepMs = 18;

function createWordSpan(word: string, firstCharacterIndex: number): HTMLSpanElement {
  const wordSpan = document.createElement("span");
  wordSpan.className = "word";
  wordSpan.setAttribute("aria-hidden", "true");

  [...word].forEach((character, offset) => {
    const characterSpan = document.createElement("span");
    characterSpan.className = "char";
    characterSpan.style.setProperty("--char-delay", `${(firstCharacterIndex + offset) * characterDelayStepMs}ms`);
    characterSpan.textContent = character;
    wordSpan.appendChild(characterSpan);
  });

  return wordSpan;
}

function splitHeading(heading: HTMLElement): void {
  const text = (heading.textContent ?? "").replace(/\s+/g, " ").trim();

  if (!text) return;

  heading.setAttribute("aria-label", text);
  heading.dataset.splitHeading = "ready";
  heading.replaceChildren();

  let characterIndex = 0;
  const words = text.split(" ");

  words.forEach((word, wordIndex) => {
    heading.appendChild(createWordSpan(word, characterIndex));
    characterIndex += [...word].length;

    if (wordIndex < words.length - 1) {
      heading.appendChild(document.createTextNode(" "));
      characterIndex += 1;
    }
  });
}

export function splitHeadings(): void {
  document.querySelectorAll<HTMLElement>("[data-split]").forEach(splitHeading);
}
