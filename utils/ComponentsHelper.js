export default {
    
    elementMultiplier(type, attributes, selectElement, data) {
        data.forEach(item => {
            let optionElement = document.createElement(type);
            attributes.forEach(element => {
                optionElement.setAttribute(element, item);
            });
            optionElement.classList.add(selectElement.classList[0] + "-" + type);
            selectElement.appendChild(optionElement);
        })
    },

    parseElement(element) {
        let container = document.createElement("div");
        container.innerHTML = element;
        return container.firstChild.content.cloneNode(true);
    },
}