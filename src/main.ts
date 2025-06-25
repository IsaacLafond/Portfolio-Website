import './style.css'
import { setupTerminal } from './components/terminal/terminal'
import { TerminalHeader } from "./components/header/header";
import { TerminalPrompt } from "./components/prompt/prompt"
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// define webcomponents
customElements.define("terminal-header", TerminalHeader)
customElements.define("terminal-prompt", TerminalPrompt)

// ========================
// ===== App Template =====
// ========================
// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
// <div style="
//     height: 100vh;
//     width: 100vw;
//     display: flex;
//     align-items: center;
//     justify-content: center;">
//     <div id="terminal-window" style="
//         height: 97vh;
//         width: 97vw;
//         overflow: hidden;
//         border-radius: 15px;
//         border: solid 1px rgba(255, 255, 255, 0.25);">
//         <terminal-header data-working-dir='isaaclafond' data-dimensions='420x69'></terminal-header>
//     </div>
// </div>
// `

// function updateDims() {
//     const header = document.querySelector('terminal-header')
//     if (header) {
//         header.setAttribute('data-dimensions', `${window.innerWidth}x${window.innerHeight}`)
//     }
// }

// window.addEventListener('resize', () => {
//     updateDims()
// })
// updateDims()

// ==========================
// ===== Component Test =====
// ==========================
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `<terminal-prompt></terminal-prompt>`


setupTerminal()