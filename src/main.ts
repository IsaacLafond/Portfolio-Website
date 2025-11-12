import './style.css'
import { TerminalHeader } from "./components/header/header";
import { AsciiTreeMenu } from "./components/asciiTreeMenu/asciiTreeMenu";
import topojpeg from "./assets/TopoBackground.jpg";

// require webcomponents
customElements.define("terminal-header", TerminalHeader)
customElements.define("ascii-tree-menu", AsciiTreeMenu)


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
        <div style="position: relative; display: flex; align-items: center; justify-content: center; height: calc(100% - 30px); width: 100%; padding: 5px; background-color: #20202A;">
            
            <div id="terminal" style="height: 100%; width: 100%;"></div>
        </div>
    </div>
</div>
`
            // <overlay-menu data-display='block' style="background-color: #20202A;">
            //     <ascii-tree-menu style="color: #C6D0E9;"></ascii-tree-menu>
            // </overlay-menu>

// setupTerminal()

window.addEventListener('resize', () => {
    // fitAddon.fit()
    // updateHeaderDimensions(term.rows, term.cols)
})