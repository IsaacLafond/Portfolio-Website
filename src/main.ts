import './style.css'
import { setupTerminal } from './terminal'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// require webcomponents

// ========================
// ===== App Template =====
// ========================
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div id="terminal" style="height: 100vh; width"></div>
`

// ==========================
// ===== Component Test =====
// ==========================
// document.querySelector<HTMLDivElement>('#app')!.innerHTML = ``


setupTerminal()