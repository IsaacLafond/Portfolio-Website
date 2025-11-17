// Base imports
import './style.css'

// Page imports
import AboutPage from './pages/about.html?raw'
import ProjectsPage from './pages/projects.html?raw'
import ExperiencePage from './pages/experience.html?raw'

// Component imports
import { TerminalHeader } from "./components/header/header";
import { AsciiTreeMenu } from "./components/asciiTreeMenu/asciiTreeMenu";

// Asset imports
import topojpeg from "./assets/TopoBackground.jpg";
import { updateHeaderDimensions } from './utils/stateUpdates';


// def webcomponent custom elems
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
            
            <div id="terminal" style="height: 100%; width: 100%; overflow: scroll;">

                <section>${AboutPage}</section>
                <br>

                <section>${ProjectsPage}</section>
                <br>
                
                <section>${ExperiencePage}</section>
                <br>
                
            </div>
            
        </div>
            
    </div>
            
</div>
`

// Run the update header dimensions here to set initial dims
const term = getTermRowCol()
updateHeaderDimensions(term.rows, term.cols)

window.addEventListener('resize', () => {
    const term = getTermRowCol()
    updateHeaderDimensions(term.rows, term.cols)
})

function getTermRowCol(): {rows:number , cols:number} {
    // TODO: calculate based on terminal size
    return {rows: 420, cols: 69}
}