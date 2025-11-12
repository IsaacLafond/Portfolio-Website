import { cat, cd, FileSystemRoot, ls, pwd } from "../../utils/fs";
import { renderAsciiWrapped } from "../../utils/terminalUtils";
import { Content } from "../../utils/content";

type CommandResult = {
  output: string;
  newPath?: string[]
}

export function processCommand(
  cmd: string,
  cols: number,
  currentPath: string[]
): CommandResult {
  const parts = cmd.trim().split(/\s+/)
  const command = parts[0] ?? ""
  const args = parts.slice(1)

  // NOTE: enventually support command chaining
  switch (command) {
    case 'man':
      // man: show available commmand and use (eventually support: "man <command>" to see command usage)
      if (args.length !== 0) return { output: "man: too many arguments\r\n" }
      return { output: Content.man.en+"\r\n" }

    case 'banner': // maybe eventually add message support like "banner text" ouputs ascii art of TEXT 
      // banner: show the intro banner (welcome! and use text)
      if (args.length !== 0) return { output: "banner: too many arguments\r\n" }
      return { output:
        "\x1b[32m"+renderAsciiWrapped(word, cols)+"\x1b[0m\r\n"+
        'Type "man" to view all available commands.\n\r\n'
        //  or click on the prompt arrow for the menu!\n')
      }
    
    case 'whoami':
      // whoami: show about info
      if (args.length !== 0) return { output: "whoami: too many arguments\r\n" }
      return { output: Content.whoami.en+"\n\r\n" }

    case 'env':
      // env: show info about tech stack in experience with technologies
      if (args.length !== 0) return { output: "env: too many arguments\r\n" }
      return { output: Content.env.en+"\r\n" }

    case 'pwd':
      if (args.length !== 0) return { output: "pwd: too many arguments\r\n" }
      return { output:
        `${pwd(currentPath)}\r\n`
      }
      
    case 'ls': // Don't forget ls takes arguments directory arguments!
      return { output:
        `${ls(currentPath, FileSystemRoot)}\r\n`
      }
      
    case 'cd':
      if (args.length === 0) {
        return { output: "cd: missing operand\r\n"}
      }
      const result = cd(currentPath, args[0], FileSystemRoot)
      return { 
        output: result.output ? result.output + "\r\n" : "",
        newPath: result.newPath
      }

    case 'cat':
      if (args.length === 0) {
        return { output: "cat: missing operand\r\n"}
      }
      return { output:
        `${cat(currentPath, args[0], FileSystemRoot)}\r\n`
      }

    case 'grep':
      // grep: text search of all the content on the site
      return { output: "Text search support coming soon...\r\n" }

    case 'lang':
      // lang: language select (-en for english and -fr for french)
      return { output: "Multilanguage support coming soon...\r\n" }
      
    case 'clear':
      if (args.length !== 0) return { output: "clear: too many arguments\r\n" }
      // \x1b[2J clear screen buffer \x1b[0f home cursor
      return { output:
        // "\x1b[2J\x1b[0f" // weird scrollback keeping behaviour
        "\x1b[3J\x1b[H\x1b[2J" // \x1b[3J clear scrollback
      }

    case '': // nothing just do nothing
      return { output: "" }

    default:
      return { output: `Unknown command: ${cmd}\r\n` }
  }
}


//   ██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗██╗
//   ██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝██║
//   ██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗  ██║
//   ██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝  ╚═╝
//   ╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗██╗
//    ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚═╝
const W = [
    "██╗    ██╗",
    "██║    ██║",
    "██║ █╗ ██║",
    "██║███╗██║",
    "╚███╔███╔╝",
    " ╚══╝╚══╝ "
]
const E = [
    "███████╗",
    "██╔════╝",
    "█████╗  ",
    "██╔══╝  ",
    "███████╗",
    "╚══════╝"
]
const L = [
    "██╗     ",
    "██║     ",
    "██║     ",
    "██║     ",
    "███████╗",
    "╚══════╝"
]
const C = [
    " ██████╗",
    "██╔════╝",
    "██║     ",
    "██║     ",
    "╚██████╗",
    " ╚═════╝"
]
const O = [
    " ██████╗ ",
    "██╔═══██╗",
    "██║   ██║",
    "██║   ██║",
    "╚██████╔╝",
    " ╚═════╝ "
]
const M = [
    "███╗   ███╗",
    "████╗ ████║",
    "██╔████╔██║",
    "██║╚██╔╝██║",
    "██║ ╚═╝ ██║",
    "╚═╝     ╚═╝"
]
const ex = [
    "██╗",
    "██║",
    "██║",
    "╚═╝",
    "██╗",
    "╚═╝"
]
const word = [W, E, L, C, O, M, E, ex]


// FLOW:
// file/dirs to see with ls/cd: projects (dir containing project README.md), experience.txt
// cd ls and cat to navigate and show the contents of files like projects and experience
// 
// projectx.md will just be a formatted README.md file of the project