console.log("here")
const iconSrc = './info.svg';
const iconAlt = 'Icon description';
const targetWords = ['crazy', 'stupid', 'mad']; // Replace with your list of target words

let checkbox = document.getElementById('injectSVG');

checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
        injectSVG();
    } else {
        removeSVG();
    }
});

function injectSVG() {

   

    setTimeout(() => {
        document.querySelectorAll('*').forEach(element => {
            targetWords.forEach(targetWord => {
                // setTimeout(() => {
                if (element.innerHTML.includes(targetWord)) {
                    const className = `icon-container-${targetWord}`;
                    // Split the innerHTML into parts to handle replacements
                    const parts = element.innerHTML.split(targetWord);
                    const replacedHTML = parts.join(`${targetWord}<span class="${className}"></span>`);

                    // Update the element with the replaced content
                    element.innerHTML = replacedHTML;

                    // Add icon after each occurrence of the target word
                    setTimeout(() => {
                        const iconContainers = element.querySelectorAll(`.${className}`);
                        iconContainers.forEach(container => {
                            const icon = document.createElement('img');
                            icon.classList.add(`img-${targetWord}`)
                            icon.src = iconSrc;
                            icon.alt = iconAlt;
                            container.appendChild(icon);
                        });
                    }, 0);

                }
                // }, 1);

            });
        });
    }, 2);

    checkbox.checked = true 
    
}

function removeSVG() {
    const svgElements = document.querySelectorAll('.img-crazy, .img-stupid, .img-mad');
    svgElements.forEach(element => {
        element.parentNode.removeChild(element);
    });
}