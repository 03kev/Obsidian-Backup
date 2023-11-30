// in vault at scripts/coolString.js
class Blockquote {
    async invoke() {
        let elems = Array.from(document.querySelectorAll("div.HyperMD-quote"))
        let indent, padding
        for (var i = 0;i < elems.length; i++){
            indent = elems[i].computedStyleMap().get('text-indent').value
            padding = elems[i].computedStyleMap().get('padding-inline-start').value + 4
            elems[i].setAttribute('style', `padding-inline-start: ${padding}px !important`)
            elems[i].setAttribute('style', `text-indent: ${indent}px !important`)
            console.log(i, indent, padding, " ah")
        }
        console.log("there async ok")     
    }

    quotePadding() {
        let elems = Array.from(document.querySelectorAll("div.HyperMD-quote"))
        let indent, padding
        for (var i = 0;i < elems.length; i++){
            indent = elems[i].computedStyleMap().get('text-indent').value
            padding = elems[i].computedStyleMap().get('padding-inline-start').value + 4
            elems[i].setAttribute('style', `padding-inline-start: ${padding}px !important`)
            elems[i].setAttribute('style', `text-indent: ${indent}px !important`)
            console.log(i, indent, padding, " ah")
        }
        console.log("there ok")
    }
}