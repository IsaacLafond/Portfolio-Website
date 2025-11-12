import { Terminal } from '@xterm/xterm'
import { FitAddon } from "@xterm/addon-fit";
import { Readline } from "xterm-readline";
import { processCommand } from "./processCommand";
import { updateHeaderDimensions } from "../../utils/stateUpdates";
import { makeOSC8Link } from "../../utils/terminalUtils";
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
  let currentPath: string[] = []
  // init addons
  const fitAddon = new FitAddon()
  const readline = new Readline()
  
  // init terminal UI/add addons
  term.loadAddon(fitAddon)
  term.loadAddon(readline)
  term.open(document.getElementById('terminal')!); // add term to #terminal div
  // fit terminal and update dimensions
  fitAddon.fit()
  updateHeaderDimensions(term.rows, term.cols)

  // show intro banner
  term.write(processCommand('banner', term.cols, currentPath).output)
  
  // let transientLine = "~"
  function readLoop() {
    // const prompt = makeOSC8Link('❯', '')
    // readline.read(`\x1b[32m${prompt} \x1b[0m`)
    readline.read(`\x1b[32m❯ \x1b[0m`)
    .then((cmd) => {
      // clear prompt lines and write the basic command history
      const { output, newPath } = processCommand(cmd, term.cols, currentPath) // to process command and write the output
      console.log(output)
      readline.print(output)
      if (newPath) currentPath = newPath
      setTimeout(readLoop) // new read line prompt
    })
  }

  readLoop()

  window.addEventListener('resize', () => {
    fitAddon.fit()
    updateHeaderDimensions(term.rows, term.cols)
  })
}
