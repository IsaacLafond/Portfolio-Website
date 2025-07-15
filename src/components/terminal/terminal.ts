import { Terminal } from '@xterm/xterm'
import { FitAddon } from "@xterm/addon-fit";
import './xterm.css';

interface TerminalState {
  wd: string;
  inputBuffer: string;
  cursorPosition: number;
}

// ██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗██╗
// ██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝██║
// ██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗  ██║
// ██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝  ╚═╝
// ╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗██╗
//  ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚═╝

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
  // let termState: TerminalState = {
  //   wd: "~/Projects",
  //   inputBuffer: "",
  //   cursorPosition: 0
  // }
  const fitAddon = new FitAddon()
  
  // init terminal UI
  term.loadAddon(fitAddon)
  term.open(document.getElementById('terminal')!); // add term to #terminal div
  fitAddon.fit()
  updateHeaderDimensions(term)
  
  console.log(getCellSize(term))
  // write to terminal
  // term.write('Welcome to My Terminal UI\r\n'); // write welcome message
  term.writeln(` ____ ____ ____ ____ ____ ____ ____ ____ \r\n||W |||e |||l |||c |||o |||m |||e |||! ||\r\n||__|||__|||__|||__|||__|||__|||__|||__||\r\n|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|\n`); // write welcome message 41 cols needed
  term.writeln('Type "help" to view all available commands or click on the prompt arrow for the menu!\n')
  // write prompt
  term.write("\x1b[34m~/Projects/many/more/nested/dirs\x1b[32m\r\n❯ \x1b[0m")

  // handle input
  term.onData((data) => {
    console.log(term.buffer.active.cursorY, term.buffer.active.cursorX)
    if (data === '\r') { // Enter
      term.write('Enter')
      term.write(`\x1b[58G`)
      
    } else if (data === '\x7f') { // Backspace
      // term.write('\b \b')
      const prev = getPrevPosition(
        term.buffer.active.cursorY,
        term.buffer.active.cursorX,
        term.cols
      )
      term.write(`\x1b[${prev.row+1};${prev.col+1}H `)
      term.write(`\x1b[${prev.row+1};${prev.col+1}H`)
      
    } else if (data === '\x1b[D') { // Left Arrow
      const prev = getPrevPosition(
        term.buffer.active.cursorY,
        term.buffer.active.cursorX,
        term.cols
      )
      term.write(`\x1b[${prev.row+1};${prev.col+1}H`)
      
    } else if (data === '\x1b[C') { // Right Arrow
      const next = getNextPosition(
        term.buffer.active.cursorY,
        term.buffer.active.cursorX,
        term.cols
      )
      term.write(`\x1b[${next.row+1};${next.col+1}H`)
      
    } else { // Any other char
      term.write(data)
    }
    console.log(term.buffer.active.cursorY, term.buffer.active.cursorX)
  })
  // term.onData((data) => {
  //   if (data.charCodeAt(0) === 13) { // Enter key
  //     term.write('\r\n');
  //     processCommand(term, termState);
  //   } else if (data.charCodeAt(0) === 127) { // Backspace
  //     if (termState.currentCommand.length > 0) {
  //       termState.currentCommand = termState.currentCommand.slice(0, -1);
  //       term.write('\b \b');
  //     }
  //   } else {
  //     termState.currentCommand += data;
  //     term.write(data);
  //   }
  // });
  window.addEventListener('resize', () => {
    fitAddon.fit()
    updateHeaderDimensions(term)
  })
}

function updateHeaderDimensions(term: Terminal) {
  const header = document.querySelector("terminal-header")
  if (header) {
    header.setAttribute("data-dimensions", `${term.cols}x${term.rows}`)
  }
}

function getNextPosition(
  row: number,
  col: number,
  maxCols: number,
  minCols: number = 0): {row: number, col: number} {
  if (col + 1 >= maxCols) {
    return { row: row+1, col: minCols }
  } else {
    return { row: row, col: col+1 }
  }
}
function getPrevPosition(
  row: number,
  col: number,
  maxCols: number,
  minCols: number = 0): {row: number, col: number} {
    console.log(`${col} - 1 < ${minCols} = ${col - 1 < minCols}`)
  if (col - 1 < minCols) {
    return { row: row-1, col: maxCols-1 }
  } else {
    console.log(`row ${row} col ${col}`)
    return { row: row, col: col-1 }
  }
}

function getCellSize(term: Terminal): { width: number; height: number } | null {
  const container = term.element;
  if (!container) return null;
  console.log((term as any)._core._charSizeService.width)
    // .getCellSizePixels)

  const cell = document.createElement("span");
  cell.textContent = "M"; // a typical wide character
  // cell.style.position = "absolute";
  cell.style.visibility = "hidden";
  cell.style.fontFamily = getComputedStyle(container).fontFamily;
  cell.style.fontSize = getComputedStyle(container).fontSize;
  document.body.appendChild(cell);

  const rect = cell.getBoundingClientRect();
  // document.body.removeChild(cell);

  return {
    width: rect.width,
    height: rect.height,
  };
}


// handle command
function processCommand(term: Terminal, cmd: string) {
  // capture command
  // const cmd = termState.inputBuffer
  // reset command
  // termState.inputBuffer = ''

  // TODO: remove transient state line
  //   term.write(`\x1b[1A\r\x1b[2K`); // ← move up, clear line

  if (cmd === 'hello') {
    term.writeln('Hello World!');
  } else if (cmd == 'clear') {
    term.clear()
  } else if (cmd !== '') {
    term.writeln(`Unknown command: ${cmd}`);
  }

  // showPrompt(term, termState)
}
