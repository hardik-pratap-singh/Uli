import {locateSlur , findPositions, getAllTextNodes, checkFalseTextNode, initializeMutationObserver} from "./index.js" ; 

let targetWords = ["stupid" , "crazy"]

let body = document.querySelector("body")
let abc = [] ; 
getAllTextNodes(body , abc) ;
// console.log(abc) ; 

uliStore = locateSlur(abc, targetWords);
// console.log(uliStore) 

uliStore = initializeMutationObserver(uliStore , targetWords, getAllTextNodes , locateSlur);
console.log(uliStore)