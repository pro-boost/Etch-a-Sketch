// Initialize variables and generate grid on page load
let container = document.querySelector(".container");
const pick = document.querySelector("#pick");
let gridSize = 16;

getGrid();

document.querySelector("#gridSizeInput").addEventListener("change", function() {
    gridSize = parseInt(this.value); 
    getGrid(); 
});




function getGrid() {
    if(gridSize > 50){
        gridSize = 50;
    }
    if(gridSize < 4){
        gridSize = 4;
    }
    if (isNaN(gridSize)) {
        gridSize = 16;
    }

    container.innerHTML = "";
    for (let i=0; i<gridSize*gridSize; i++) {

        let box = document.createElement("div");
        box.style.width= "calc(100% /" + gridSize + ")";
        box.style.height= "calc(100% /" + gridSize + ")";
        box.style.backgroundColor= "white";
        box.classList.add("box");
        container.appendChild(box);


        showGrid();

        let rainbowColorButton = document.querySelector("#rainbowColor");
        let darkColorButton = document.querySelector("#darkColor");
        let isDrawing = false;
        
        function handleColorMode(event) {
            const box = event.target;
            if (box.classList.contains('box')) {
                if (container.classList.contains('rainbow')) {
                    if (!isDrawing && box.style.backgroundColor === 'white') {
                        box.style.backgroundColor = randomColor();
                        setTimeout(() => {
                            box.style.backgroundColor = 'white';
                        }, 200);
                    }
                } else if (container.classList.contains('dark')) {
                    if (!isDrawing && box.style.backgroundColor === 'white') {
                        box.style.backgroundColor = generateGrayShade();
                        setTimeout(() => {
                            box.style.backgroundColor = 'white';
                        }, 200);
                    }
                }
            }
        }
        
        container.addEventListener('mouseover', handleColorMode);
        container.addEventListener('click', handleColorMode);
        container.addEventListener('mousedown', () => {
            isDrawing = true;
        });
        container.addEventListener('mouseup', () => {
            isDrawing = false;
        });
        container.addEventListener('mousemove', event => {
            const box = event.target;
            if (isDrawing && box.classList.contains('box') && box.style.backgroundColor === 'white') {
                if (container.classList.contains('rainbow')) {
                    box.style.backgroundColor = randomColor();
                } else if (container.classList.contains('dark')) {
                    box.style.backgroundColor = generateGrayShade();
                }
            }
        });
        
        function setRainbowColor() {
            container.classList.remove('dark');
            container.classList.add('rainbow');
            container.classList.add("brush");
            container.classList.remove('eraser');
        }
        
        rainbowColorButton.addEventListener('click', setRainbowColor);
        rainbowColorButton.click();
        
        function setDarkColor() {
            container.classList.remove('rainbow');
            container.classList.add('dark');
            container.classList.add("brush");
            container.classList.remove('eraser');
        }
        
        darkColorButton.addEventListener('click', setDarkColor);
        


// Erase and reset buttons
let eraseButton = document.querySelector("#erase");

function erase() {
    container.classList.remove("brush");
    container.classList.add('eraser');
    // Remove the event listener
    container.classList.remove('rainbow');
    container.classList.remove('dark');

    container.addEventListener('click', event => {
        const box = event.target;
        if (box.classList.contains('box') && box.style.backgroundColor !== "white") {
            box.style.backgroundColor = "white";
        }
    });

    container.addEventListener('mousedown', () => {
        isDrawing = true;
    });

    container.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    container.addEventListener('mousemove', event => {
        const box = event.target;
        if (isDrawing && box.classList.contains('box') && box.style.backgroundColor !== 'white') {
            box.style.backgroundColor = 'white';
        }
    });  
}

eraseButton.addEventListener("click", erase);



        let resetButton = document.querySelector("#reset");
        function reset(){
            box.style.backgroundColor = "white";
        }
        resetButton.addEventListener("click", reset);


// Show and clear grid        
        let showGridButton = document.querySelector("#showGrid");
        function showGrid(){
        box.style.border="1px solid black"
        }
        showGridButton.addEventListener("click", showGrid);

        let clearGridButton = document.querySelector("#clearGrid");
        function clearGrid(){
        box.style.border="0px"
        }
        clearGridButton.addEventListener("click", clearGrid);
    }
}



// Generate black and white shades
function generateGrayShade() {
    let Rnum = Math.floor(Math.random() * 200); 
    return "rgb(" + Rnum +"," + Rnum + "," + Rnum + ")";
}


// Generate random RGB color
function randomColor() {
    let r = Math.floor(Math.random() * 230);
    let g = Math.floor(Math.random() * 230);
    let b = Math.floor(Math.random() * 230);
    return "rgb(" + r + "," + g + "," + b + ")";
}


document.addEventListener('keypress', handleKeyPress);

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        getGrid();
    }
}