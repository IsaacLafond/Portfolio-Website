import overlayMenuTemplate from "./overlayMenu.template.html?raw";

export class OverlayMenu extends HTMLElement {
    static observedAttributes = ['data-display']
    private menuElem!: HTMLDivElement
    // private menuElem!: HTMLSlotElement

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.innerHTML = overlayMenuTemplate
        this.menuElem = shadow.querySelector('div')!
    }
    
    attributeChangedCallback(name: string, _oldVal: string, newVal: string) {
        switch (name) {
            case 'data-display':
                this.updateDisplay(newVal)
                break;
            default:
                console.log('Unknown attribute change')
                break;
        }
    }

    private updateDisplay(newDisplay: string) {
        this.menuElem.style.display = newDisplay
    }
}