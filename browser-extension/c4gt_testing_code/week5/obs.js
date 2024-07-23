let uliStore = [];
const targetWords = ['crazy', 'stupid', 'mad', 'insane']; // Replace with your list of target words

// Function to check if a text node contains only whitespace and newline characters

// let uliStore = [] ; 
function checkFalseTextNode(text, actualLengthOfText) {
    let totalNewlineAndWhitespaces = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === "\n" || text[i] === " ") {
            totalNewlineAndWhitespaces++;
        }
    }
    return totalNewlineAndWhitespaces === actualLengthOfText;
}

// Function to recursively get all text nodes under a given node
function getAllTextNodes(node) {
    if (node.nodeType === 3) { // Text node
        if (!checkFalseTextNode(node.data, node.length)) {
            uliStore.push({ node: node, parent: node.parentNode });
        }
    } else {
        let children = Array.from(node.childNodes);
        children.forEach(child => getAllTextNodes(child));
    }
}

// Function to find positions of a word in a given text node
function findPositions(word, text) {
    let positions = [];
    let index = text.indexOf(word);
    while (index !== -1) {
        positions.push([index, index + word.length]);
        index = text.indexOf(word, index + 1);
    }
    return positions;
}

// Function to locate slur words in uliStore
function locateSlur(uliStore) {
    uliStore.forEach(item => {
        let text = item.node.textContent;
        let slurs = [];
        targetWords.forEach(targetWord => {
            let positions = findPositions(targetWord, text);
            if (positions.length > 0) {
                slurs.push({ slurText: targetWord, slurLocation: positions });
            }
        });
        item.slurs = slurs;
    });
}

// Initial run to capture slur words from the current content
getAllTextNodes(document.body);
locateSlur(uliStore);
console.log("Initial uliStore:", uliStore);

// Mutation observer to detect changes in the DOM (e.g., new elements added dynamically)
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(addedNode => {
                if (addedNode.nodeType === 3) { // Text node
                    if (!checkFalseTextNode(addedNode.data, addedNode.length)) {
                        uliStore.push({ node: addedNode, parent: addedNode.parentNode });
                        locateSlur([{ node: addedNode, parent: addedNode.parentNode }]);
                        console.log("Updated uliStore:", uliStore);
                    }
                } else {
                    getAllTextNodes(addedNode);
                    locateSlur(uliStore.filter(item => item.parent === addedNode));
                    console.log("Updated uliStore:", uliStore);
                }
            });
        }
    });
});

// Configure and start observing mutations in the document body
observer.observe(document.body, {
    childList: true, // Watch for changes in the child nodes
    subtree: true    // Watch for changes in the entire subtree
});


