import overlayButtonTemplate from './overlayButton.template.html?raw';

export class OverlayButton extends HTMLElement {
    static observedAttributes = []
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.innerHTML = overlayButtonTemplate
        // this.workingDirElem = shadow.getElementById('workingDir')!
        // this.dimensionsElem = shadow.getElementById('dimensions')!
    }
    
    attributeChangedCallback(name: string, _oldVal: string, newVal: string) {
        switch (name) {
            case 'data-working-dir':
                this.updateWorkingDir(newVal)
                break;
            case 'data-dimensions':
                this.updateDimensions(newVal)
                break;
            default:
                console.log('Unknown attribute change')
                break;
        }
    }

    private updateWorkingDir(newDir: string) {
        // this.workingDirElem.textContent = newDir
    }
    private updateDimensions(newDimensions: string) {
        // this.dimensionsElem.textContent = newDimensions
    }
}