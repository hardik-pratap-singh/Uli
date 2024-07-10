console.log("here")
let checkbox = document.getElementById('injectSVG');

checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
        injectSVG();
    } else {
        removeSVG();
    }
});

function injectSVG() {
    targetWords.forEach(targetWord => {
        let className = `icon-container-${targetWord}`;
        let targetWordSlurs = Array.from(document.querySelectorAll(`.${className}`))
        targetWordSlurs.forEach(element => {
            element.style.display = 'inline';
        });
    })
}

function removeSVG() {
    targetWords.forEach(targetWord => {
        let className = `icon-container-${targetWord}`;
        let targetWordSlurs = Array.from(document.querySelectorAll(`.${className}`))
        targetWordSlurs.forEach(element => {
            element.style.display = 'none';
        });
    })
}