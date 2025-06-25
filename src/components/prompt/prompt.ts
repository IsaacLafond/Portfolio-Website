import promptTemplate from './prompt.template.html?raw';

export class TerminalPrompt extends HTMLElement {
    static observedAttributes = ['data-working-dir']
    private transientElem!: HTMLElement
    private leftElem!: HTMLSpanElement
    private cursorElem!: HTMLSpanElement
    private rightElem!: HTMLSpanElement
    private inputElem!: HTMLTextAreaElement

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.innerHTML = promptTemplate

        this.transientElem = shadow.getElementById('transient-line')!
        this.leftElem = shadow.getElementById('left')!
        this.cursorElem = shadow.getElementById('cursor')!
        this.rightElem = shadow.getElementById('right')!
    }

    connectedCallback() {
        // add event listeners
        return
    }

    attributeChangedCallback(name: string, _oldVal: string, newVal: string) {
        switch (name) {
            case 'data-working-dir':
                this.updateTransientWorkingDir(newVal)
                break;
            default:
                console.log('Unknown attribute change')
                break;
        }
    }

    private updateTransientWorkingDir(newDir: string) {
        this.transientElem.textContent = newDir
    }
}