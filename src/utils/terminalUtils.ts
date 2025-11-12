// ==========================
// ===== Ascii Art Wrap =====
// ==========================
type AsciiLetter = string[];
export function renderAsciiWrapped(
  asciiLetters: AsciiLetter[],
  maxWidth: number
): string {
    const letterHeight = asciiLetters[0].length;
    let lines: string[] = [];

    let currentBlock = Array(letterHeight).fill("");
    let currentWidth = 0;

    for (const asciiLetter of asciiLetters) {
        const letterWidth = asciiLetter[0].length;

        if (currentWidth + letterWidth > maxWidth) {
            lines.push(...currentBlock);
            currentBlock = Array(letterHeight).fill("");
            currentWidth = 0;
        }

        for (let i = 0; i < letterHeight; i++) {
            currentBlock[i] += asciiLetter[i];
        }

        currentWidth += letterWidth;
    }

    // Flush last block
    lines.push(...currentBlock);

    return lines.join("\n\r");
}

// =====================
// ===== OSC Links =====
// =====================
export function makeOSC8Link(text: string, url: string) {
  return `\x1b]8;;${url}\x07${text}\x1b]8;;\x07`;
}

