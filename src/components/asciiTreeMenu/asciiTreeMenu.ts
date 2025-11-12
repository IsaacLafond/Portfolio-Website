import treeTemplate from './asciiTreeMenu.template.html?raw';

export class AsciiTreeMenu extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.innerHTML = treeTemplate
    }

    connectedCallback() {
        const anchors = this.shadowRoot!.querySelectorAll('a')
        anchors.forEach(anchor => {
            // check if the anchor already has a span (no double wrapping)
            if (!anchor.querySelector('span')) {
                const text = anchor.textContent || ""

                // clear anchor text
                anchor.textContent = ""

                // create span with text deco
                const span = document.createElement('span')
                span.style.textDecoration = 'underline'
                span.textContent = text
                // append span in anchor
                anchor.appendChild(span)
            }
        })
    }
}