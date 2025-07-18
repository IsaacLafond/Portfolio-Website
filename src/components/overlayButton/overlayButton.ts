import overlayButtonTemplate from './overlayButton.template.html?raw';

export class OverlayButton extends HTMLElement {
    static observedAttributes = ['data-width', 'data-height', 'data-top', 'data-left']
    private buttonElem!: HTMLButtonElement

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.innerHTML = overlayButtonTemplate
        this.buttonElem = shadow.querySelector('button')!
    }
    
    attributeChangedCallback(name: string, _oldVal: string, newVal: string) {
        switch (name) {
            case 'data-width':
                this.updateWidth(newVal)
                break;
            case 'data-height':
                this.updateHeight(newVal)
                break;
            case 'data-top':
                this.updateTop(newVal)
                break;
            case 'data-left':
                this.updateLeft(newVal)
                break;
            default:
                console.log('Unknown attribute change')
                break;
        }
    }

    private updateWidth(newWidth: string) {
        this.buttonElem.style.width = newWidth
    }
    private updateHeight(newHeight: string) {
        this.buttonElem.style.height = newHeight
    }
    private updateTop(newTop: string) {
        const n = Number(newTop)
        if (!n) return
        this.buttonElem.style.top = newTop
    }
    private updateLeft(newleft: string) {
        const n = Number(newleft)
        if (!n) return
        this.buttonElem.style.left = newleft
    }
}