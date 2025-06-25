import headerTemplate from './header.template.html?raw';

export class TerminalHeader extends HTMLElement {
    static observedAttributes = ['data-working-dir', 'data-dimensions']
    private workingDirElem!: HTMLSpanElement
    private dimensionsElem!: HTMLSpanElement

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.innerHTML = headerTemplate
        this.workingDirElem = shadow.getElementById('workingDir')!
        this.dimensionsElem = shadow.getElementById('dimensions')!
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
        this.workingDirElem.textContent = newDir
    }
    private updateDimensions(newDimensions: string) {
        this.dimensionsElem.textContent = newDimensions
    }
}