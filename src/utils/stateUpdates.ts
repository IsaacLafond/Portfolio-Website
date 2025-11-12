export function updateHeaderDimensions(rows: number, cols: number) {
  const header = document.querySelector("terminal-header")
  if (header) {
    header.setAttribute("data-dimensions", `${cols}x${rows}`)
  }
}
