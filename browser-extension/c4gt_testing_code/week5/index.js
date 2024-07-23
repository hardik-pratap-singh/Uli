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


function getAllTextNodes(node , uliStore) {
    // let uliStore = []
    if (node.nodeType === 3) {
        //If node.data contains just whitespaces and \n, then its a false text node

        // let whitespaces = (node.data.split(" ").length - 1);
        // console.log(node.data) ; 
        if (checkFalseTextNode(node.data, node.length) === false) {
            uliStore.push({ node: node, parent: node.parentNode });
        }
        // textNodes.push({ node: node, parent: node.parentNode });
        return;
    }

    let children = Array.from(node.childNodes);
    for (let i = 0; i < children.length; i++) {
        getAllTextNodes(children[i], uliStore);
    }

    // return uliStore ; 
}


/*                getAllTextNodes()  ENDS HERE                */


/*                 locateSlur()  STARTS HERE                  */

function findPositions(word, text) {
    let positions = {};

    let len = word.length
    let loc = []
    let index = text.toString().indexOf(word);
    while (index !== -1) {
        let obj = {} ; 
        loc.push([index , index + len]);
        index = text.toString().indexOf(word, index + 1);
    }


    if(loc.length !== 0){
        positions.slurText = word 
        positions.slurLocation = loc ;
    }
    return positions;
}


function locateSlur(uliStore, targetWords){
    let n = uliStore.length ;

    for(let i = 0 ; i < n ; i++){
        let store = uliStore[i] ;  //This will contain the textNode 
        let parentNode = store.parent 
        let text = store.node.textContent
        //We have to look into this store for all the slurWords 
        let slurs = [] ; 

        targetWords.forEach(targetWord => {
            let slurWord = targetWord ;
            let pos = findPositions(slurWord , text) ;
            if(Object.keys(pos).length !== 0){
                slurs.push(pos)
            }
        })
        uliStore[i].slurs = slurs ; 
    }
    return uliStore ; //This will return the final uliStore (after appending slurs)
}

function initializeMutationObserver(uliStore) {
    // Initial run to capture slur words from the current content
    // let uliStore = [] ; 
    const targetWords = ['crazy', 'stupid', 'mad', 'insane']; 
    getAllTextNodes(document.body , uliStore);
    locateSlur(uliStore, targetWords);
    // console.log("Initial uliStore:", uliStore);

    // Mutation observer to detect changes in the DOM (e.g., new elements added dynamically)
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(addedNode => {
                    if (addedNode.nodeType === 3) { // Text node
                        if (!checkFalseTextNode(addedNode.data, addedNode.length)) {
                            uliStore.push({ node: addedNode, parent: addedNode.parentNode });
                            locateSlur([{ node: addedNode, parent: addedNode.parentNode }], targetWords);
                            console.log("Updated uliStore:", uliStore);
                        }
                    } else {
                        getAllTextNodes(addedNode);
                        locateSlur(uliStore.filter(item => item.parent === addedNode), targetWords);
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

    return uliStore
}




export {locateSlur , findPositions, getAllTextNodes, checkFalseTextNode , initializeMutationObserver} ; 