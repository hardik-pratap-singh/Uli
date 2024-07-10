let textNodes = [];
let body = document.querySelector("body");
const iconSrc = './info.svg';
const iconAlt = 'Icon description';
const targetWords = ['crazy', 'stupid', 'mad'];

function getAllTextNodes(node) {
    if (node.nodeType === 3) {
        textNodes.push({ node: node, parent: node.parentNode });
        return;
    }

    let children = Array.from(node.childNodes);
    for (let i = 0; i < children.length; i++) {
        getAllTextNodes(children[i]);
    }
}
getAllTextNodes(body);

console.log("textNodes  ", textNodes);


let text = textNodes[3];
console.log(text)

let text1 = textNodes[8];
console.log("text1", text1)

let newText = []
newText.push(text);
newText.push(text1);

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


//This is causing problem, because a lot of empty textNodes are getting inside the textNodes array
//and creating issues
//However it works well with minified version of HTML

// console.log(textNodes) ; 
// for (let i = 0; i < textNodes.length; i++) {
//     let text = textNodes[i];
//     let parentNode = text.parent;
//     let textNode = text.node;

//     targetWords.forEach(targetWord => {
//         if (parentNode.innerHTML.includes(targetWord)) {
//             const className = `icon-container-${targetWord}`;
//             const parts = parentNode.innerHTML.split(targetWord);
//             const replacedHTML = parts.join(`${targetWord}<span class="${className}">**</span>`);
//             parentNode.innerHTML = replacedHTML
//         }
//     })
// }
