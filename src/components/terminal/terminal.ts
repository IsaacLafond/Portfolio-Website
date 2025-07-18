import { Terminal } from '@xterm/xterm'
import { FitAddon } from "@xterm/addon-fit";
import { Readline } from "xterm-readline";
import { processCommand, showBanner } from "./processCommand";
import './xterm.css';

// ==========================
// ===== Terminal Logic =====
// ==========================
export function setupTerminal() {
  // init terminal
  const term = new Terminal({
    cursorBlink: true,
    theme: {
      background: "#20202A",
      foreground: "#C6D0E9",
      cursor: "#B8DCEB",
      black: "#44495E",
      red: "#EBB9B9",
      green: "#CAF6BB",
      yellow: "#EBE3B9",
      blue: "#CDDBF9",
      magenta: "#F6BBE7",
      cyan: "#B8DCEB",
      white: "#C6D0E9",
      brightBlack: "#3B3B4D",
      brightRed: "#CC9B9D",
      brightGreen: "#A3CCAD",
      brightYellow: "#D1BA97",
      brightBlue: "#B8C9EA",
      brightMagenta: "#C497B3",
      brightCyan: "#95C2D1",
      brightWhite: "#63718B"
    }
  })
  // init addons
  const fitAddon = new FitAddon()
  const readline = new Readline()
  
  // init terminal UI/add addons
  term.loadAddon(fitAddon)
  term.loadAddon(readline)
  term.open(document.getElementById('terminal')!); // add term to #terminal div
  // fit terminal and update dimensions
  fitAddon.fit()
  updateHeaderDimensions(term)

  // write to terminal
  // term.writeln(` ____ ____ ____ ____ ____ ____ ____ ____ \r\n||W |||e |||l |||c |||o |||m |||e |||! ||\r\n||__|||__|||__|||__|||__|||__|||__|||__||\r\n|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|\n`); // write welcome message 41 cols needed
  showBanner(term)
  term.writeln('Type "help" to view all available commands or click on the prompt arrow for the menu!\n')
  // write prompt
  // term.write("\x1b[34m~/Projects/many/more/nested/dirs\x1b[32m\r\n❯ \x1b[0m")

  window.addEventListener('resize', () => {
    fitAddon.fit()
    updateHeaderDimensions(term)
  })

  
  // let transientLine = "~"
  function readLoop() {
    updateOverlayButton(getCellSize(term), term.buffer.active.cursorY, term.buffer.active.cursorX)
    readline.read(`\x1b[32m❯ \x1b[0m`)
    // readline.read(`${transientLine}\n\r\x1b[32m❯ \x1b[0m`)
    .then((cmd) => {
      // clear prompt lines and write the basic command history
      processCommand(term, cmd) // to process command and write the output
      setTimeout(readLoop) // new read line prompt
    })
  }

  readLoop()
}


// ██╗   ██╗████████╗██╗██╗     ███████╗
// ██║   ██║╚══██╔══╝██║██║     ██╔════╝
// ██║   ██║   ██║   ██║██║     ███████╗
// ██║   ██║   ██║   ██║██║     ╚════██║
// ╚██████╔╝   ██║   ██║███████╗███████║
//  ╚═════╝    ╚═╝   ╚═╝╚══════╝╚══════╝

function updateHeaderDimensions(term: Terminal) {
  const header = document.querySelector("terminal-header")
  if (header) {
    header.setAttribute("data-dimensions", `${term.cols}x${term.rows}`)
  }
}

function updateOverlayButton(
  size: { width: number, height: number } = { width: 15, height: 15 },
  row: number,
  col: number = 0) {
  const overButton = document.querySelector("overlay-button")
  if (overButton) {
    overButton.setAttribute("data-width", `${size.width}px`)
    overButton.setAttribute("data-height", `${size.height}px`)
    overButton.setAttribute("data-top", `${size.height * row}`)
    overButton.setAttribute("data-left", `${size.width * col}`)
  }
}

function getCellSize(term: Terminal): { width: number; height: number } | undefined {
  const charSize = (term as any)._core._charSizeService
  if (charSize) return {
    width: charSize.width,
    height: charSize.height
  }
}
