import { Terminal } from "@xterm/xterm";

export function processCommand(term: Terminal, cmd: string) {

  if (cmd === 'hello') {
    term.writeln('Hello World!');
  } else if (cmd == 'clear') {
    term.clear()
  } else if (cmd !== '') {
    term.writeln(`Unknown command: ${cmd}`);
  }

}

export function showBanner(term: Terminal): number {
  const W = [
    "██╗    ██╗",
    "██║    ██║",
    "██║ █╗ ██║",
    "██║███╗██║",
    "╚███╔███╔╝",
    " ╚══╝╚══╝ "
  ]
  // ██╗    ██╗
  // ██║    ██║
  // ██║ █╗ ██║
  // ██║███╗██║
  // ╚███╔███╔╝
  //  ╚══╝╚══╝ 
  const E = [
    "███████╗",
    "██╔════╝",
    "█████╗  ",
    "██╔══╝  ",
    "███████╗",
    "╚══════╝"
  ]
  // ███████╗
  // ██╔════╝
  // █████╗  
  // ██╔══╝  
  // ███████╗
  // ╚══════╝
  const L = [
    "██╗     ",
    "██║     ",
    "██║     ",
    "██║     ",
    "███████╗",
    "╚══════╝"
  ]
  // ██╗     
  // ██║     
  // ██║     
  // ██║     
  // ███████╗
  // ╚══════╝
  const C = [
    " ██████╗",
    "██╔════╝",
    "██║     ",
    "██║     ",
    "╚██████╗",
    " ╚═════╝"
  ]
  //  ██████╗
  // ██╔════╝
  // ██║     
  // ██║     
  // ╚██████╗
  //  ╚═════╝
  const O = [
    " ██████╗ ",
    "██╔═══██╗",
    "██║   ██║",
    "██║   ██║",
    "╚██████╔╝",
    " ╚═════╝ "
  ]
  //  ██████╗ 
  // ██╔═══██╗
  // ██║   ██║
  // ██║   ██║
  // ╚██████╔╝
  //  ╚═════╝ 
  const M = [
    "███╗   ███╗",
    "████╗ ████║",
    "██╔████╔██║",
    "██║╚██╔╝██║",
    "██║ ╚═╝ ██║",
    "╚═╝     ╚═╝"
  ]
  // ███╗   ███╗
  // ████╗ ████║
  // ██╔████╔██║
  // ██║╚██╔╝██║
  // ██║ ╚═╝ ██║
  // ╚═╝     ╚═╝
  const ex = [
    "██╗",
    "██║",
    "██║",
    "╚═╝",
    "██╗",
    "╚═╝"
  ]
  // ██╗
  // ██║
  // ██║
  // ╚═╝
  // ██╗
  // ╚═╝
  const word = [W, E, L, C, O, M, E, ex]
  // console.log(word)
  // TODO: write the ascii art letter with wrapping

  const txt = "██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗██╗\n\r██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝██║\n\r██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗  ██║\n\r██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝  ╚═╝\n\r╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗██╗\n\r ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚═╝"
  
  term.writeln("\x1b[32m"+txt+"\x1b[0m")

  return 6 // return the number of lines used to track
}

// Commands to support:
// man: show available commmand and use
// banner: show the intro banner (welcome! and use text)
// whoami: show about info
// env: show info about tech stack in experience with technologies
// ls
// cd
// cat
// lang: language select (-en for english and -fr for french)
// clear: clear the terminal

// NOTE: enventually support command chaining

// FLOW:
// file/dirs to see with ls/cd: projects (dir containing project README.md), experience.txt
// cd ls and cat to navigate and show the contents of files like projects and experience
// experience.txt is an ascii art timeline:
// |
// O---- Position 1: Location - Date
// |       *responsibility
// |       *responsibility
// |       *responsibility
// |
// O---- Position 2: Location - Date
// |       *responsibility
// |       *responsibility
// |       *responsibility
// |
// |
// 
// projectx.md will just be a formatted README.md file of the project