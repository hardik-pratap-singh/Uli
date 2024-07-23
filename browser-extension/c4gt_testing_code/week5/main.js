import {locateSlur , findPositions, getAllTextNodes, checkFalseTextNode, initializeMutationObserver} from "./index.js" ; 

let targetWords = ["stupid" , "crazy"]

// let body = document.querySelector("body")
// let abc = [] ; 
// getAllTextNodes(body , abc) ;
// console.log(abc) ; 

// uliStore = locateSlur(abc, targetWords);
// console.log(uliStore) 
let uliStore = [] ; 
let getSlurs = initializeMutationObserver(uliStore);
console.log(getSlurs)
// setTimeout(() => {
    
//     console.log(getSlurs)
// }, 0);
