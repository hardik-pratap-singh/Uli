let textNodes = []
let body = document.querySelector("body");
const iconSrc = './info.svg';
const iconAlt = 'Icon description';
const targetWords = ['crazy', 'stupid', 'mad']; // Replace with your list of target words

function checkFalseTextNode(text, actualLengthOfText) {
    let n = text.length;
    let totalNewlineAndWhitespaces = 0;
    for (let i = 0; i < n; i++) {
        if (text[i] === "\n") {
            totalNewlineAndWhitespaces += 1;
        }

        else if (text[i] === " ") {
            totalNewlineAndWhitespaces += 1;
        }

    }
    if (totalNewlineAndWhitespaces === actualLengthOfText) {
        //False Text Node Confirmed
        return true;
    }
    else {
        //True Text Node Confirmed
        return false;
    }
}


function getAllTextNodes(node) {
    if (node.nodeType === 3) {
        //If node.data contains just whitespaces and \n, then its a false text node

        // let whitespaces = (node.data.split(" ").length - 1);
        // console.log(node.data) ; 
        if (checkFalseTextNode(node.data, node.length) === false) {
            textNodes.push({ node: node, parent: node.parentNode });
        }
        // textNodes.push({ node: node, parent: node.parentNode });
        return;
    }

    let children = Array.from(node.childNodes);
    for (let i = 0; i < children.length; i++) {
        getAllTextNodes(children[i]);
    }
}

// setTimeout(() => {
//     getAllTextNodes(body);
//     console.log(textNodes)
// }, 0);

getAllTextNodes(body);
console.log(textNodes)

// for(let i = 0 ; i < textNodes.length ; i++){
//     console.log(textNodes[i].node.data.length ) ; 
// }

// let s1 = "\n\n    " ; 
// console.log(s1.length)
// for(let i = 0 ; i < s1.length ; i++){
//     if(s1[i] == "\n"){
//         console.log("got new line char")
//     }
//     console.log(s1[i])
// }

let checkbox = document.getElementById('injectSVG');

checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
        injectSVG();
    } else {
        removeSVG();
    }
});



function injectSVG() {
    for (let i = 0; i < textNodes.length; i++) {
        let text = textNodes[i];
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
}

function removeSVG() {
    targetWords.forEach(targetWord => {
        let elements = Array.from(document.querySelectorAll(`.icon-container-${targetWord}`))
        console.log(elements); 
        elements.forEach(element => {
            element.remove(); 
        })
    })
}