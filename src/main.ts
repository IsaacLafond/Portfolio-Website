import './style.css'
import { TerminalHeader } from "./components/header/header";
import { setupTerminal } from './components/terminal/terminal'
import { OverlayButton } from "./components/overlayButton/overlayButton";
import topojpeg from "./assets/TopoBackground.jpg";

// require webcomponents
customElements.define("terminal-header", TerminalHeader)
customElements.define("overlay-button", OverlayButton)

// ========================
// ===== App Template =====
// ========================
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div style="
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background: black url(${topojpeg}) no-repeat center/cover;">
    <div id="terminal-window" style="
        height: 97vh;
        width: 97vw;
        overflow: hidden;
        border-radius: 15px;
        border: solid 1px #5B5B5B;">
        <terminal-header data-working-dir='isaaclafond' data-dimensions='420x69'></terminal-header>
        <div id="terminal" style="position: relative; height: calc(100% - 30px); width: 100%; padding: 5px; background-color: #20202A;">
            <overlay-button data-width="15" data-height="15" data-top="0" data-left="0"></overlay-button>
        </div>
    </div>
</div>
`
setupTerminal()