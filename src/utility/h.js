/**
 *
 * @param {String} name - имя элемента, например div, h1, a
 * @param {{}} attrs - объект с атрибутами
 * @param {[HTMLElement]|String} children - Массив элементов или textContent
 * @returns {HTMLElement}
 */
export default function h(name, attrs = null, children = null){
    let elem = document.createElement(name)

    if(attrs){
        for (const attrsKey in attrs) {
            elem.setAttribute(attrsKey, attrs[attrsKey])
        }
    }

    if(children){
        if (typeof children === 'string' || children instanceof String){
            elem.textContent = children;
        }else if(Array.isArray(children)){
            for (let i = 0; i < children.length; i++) {
                elem.appendChild(children[i])
            }
        }
    }

    return elem
}