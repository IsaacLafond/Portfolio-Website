// import '../xterm.css';

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
  let termState: TerminalState = {
    promptLine: "❯ ",
    wd: "~/Projects",
    currentCommand: "",
    transientPromptLine: 0
  }
}

// handle command
function processCommand(termState: TerminalState) {
  // capture command
  const cmd = termState.currentCommand
  // reset command
  termState.currentCommand = ''

  // TODO: remove transient state line
  //   term.write(`\x1b[1A\r\x1b[2K`); // ← move up, clear line

  if (cmd === 'hello') {
    console.log('Hello World!');
  } else if (cmd == 'clear') {
    console.log('clear');
  } else if (cmd !== '') {
    console.log(`Unknown command: ${cmd}`);
  }

  // show prompt
}
