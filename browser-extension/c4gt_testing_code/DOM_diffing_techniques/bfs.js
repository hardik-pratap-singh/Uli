let textNodes = [];
let body = document.querySelector("body");
const iconSrc = './info.svg';
const iconAlt = 'Icon description';
const targetWords = ['crazy', 'stupid', 'mad'];

function getAllTextNodes(node) {
    let queue = [node];
    // let textNodes = [];

    while (queue.length > 0) {
        let currentNode = queue.shift();

        if (currentNode.nodeType === 3) {
            textNodes.push({ node: currentNode, parent: currentNode.parentNode });
        } else {
            let children = Array.from(currentNode.childNodes);
            queue.push(...children);
        }
    }
}
getAllTextNodes(body);

console.log(textNodes) ; 

let text = textNodes[12];
console.log(text)

let text1 = textNodes[13];
console.log("text1", text1)

let newText = []
newText.push(text);
newText.push(text1);

console.log(newText)


for (let i = 0; i < newText.length; i++) {
    let text = newText[i];
    let parentNode = text.parent;
    let textNode = text.node;

    targetWords.forEach(targetWord => {
        if (parentNode.innerHTML.includes(targetWord)) {
            const className = `icon-container-${targetWord}`;
            const parts = parentNode.innerHTML.split(targetWord);
            const replacedHTML = parts.join(`${targetWord}<span class="${className}"></span>`);
            parentNode.innerHTML = replacedHTML

            const iconContainers = parentNode.querySelectorAll(`.${className}`);
            iconContainers.forEach(container => {
                const icon = document.createElement('img');
                icon.src = iconSrc;
                icon.alt = iconAlt;
                container.appendChild(icon);

            });
        }
    })
}


