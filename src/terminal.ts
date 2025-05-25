import { Terminal } from '@xterm/xterm'
import './xterm.css';

interface TerminalState {
  promptLine: string
  wd: string;
  currentCommand: string;
  transientPromptLine: number;
}

// ==========================
// ===== Terminal Logic =====
// ==========================
export function setupTerminal() {
  // init terminal
  const term = new Terminal({
    cursorBlink: true,
    theme: {
      background: "#000000",
      foreground: "#ffffff"
    }
  })
  let termState: TerminalState = {
    promptLine: "❯ ",
    wd: "~/Projects",
    currentCommand: "",
    transientPromptLine: 0
  }

  // init terminal UI
  term.open(document.getElementById('terminal')!); // add term to #terminal div
  term.write('Welcome to My Terminal UI\r\n'); // write welcome message
  showPrompt(term, termState) // write prompt

  // handle input
  term.onData((data) => {
    if (data.charCodeAt(0) === 13) { // Enter key
      term.write('\r\n');
      termState.currentCommand = termState.currentCommand.trim()
      processCommand(term, termState);
    } else if (data.charCodeAt(0) === 127) { // Backspace
      if (termState.currentCommand.length > 0) {
        termState.currentCommand = termState.currentCommand.slice(0, -1);
        term.write('\b \b');
      }
    } else {
      termState.currentCommand += data;
      term.write(data);
    }
  });
}

// handle command
function processCommand(term: Terminal, termState: TerminalState) {
  // capture command
  const cmd = termState.currentCommand
  // reset command
  termState.currentCommand = ''

  // TODO: remove transient state line
  //   term.write(`\x1b[1A\r\x1b[2K`); // ← move up, clear line

  if (cmd === 'hello') {
    term.writeln('Hello World!');
  } else if (cmd == 'clear') {
    term.clear()
  } else if (cmd !== '') {
    term.writeln(`Unknown command: ${cmd}`);
  }

  showPrompt(term, termState)
}

function showPrompt(term:Terminal, termState: TerminalState) {
  console.log(term)
  term.write(`${termState.wd}\r\n`);
  term.write(termState.promptLine);
}
