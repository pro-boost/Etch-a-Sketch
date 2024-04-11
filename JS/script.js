// Initialize variables and generate grid on page load
let container = document.querySelector(".container");
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

    container.innerHTML = '';

    for (let i=0; i<gridSize*gridSize; i++) {
        let box = document.createElement("div");
        box.style.width= "calc(100% /" + gridSize + ")";
        box.style.height= "calc(100% /" + gridSize + ")";
        rainbowColor();
        showGrid();
        box.classList.add("box");
        container.appendChild(box);




        let rainbowColorButton = document.querySelector("#rainbowColor");
        let isMouseOverEnabled = true;


        function rainbowColor(){
            box.addEventListener("mouseover", function() {
                if (isMouseOverEnabled) {
                    box.style.backgroundColor=randomColor();
                            setTimeout(() => {
                                box.style.backgroundColor = "white";
                                }, 200);
                }
            });
            box.addEventListener("click", () => {
                isMouseOverEnabled = false;
                box.style.backgroundColor = randomColor();

            });
        }
        rainbowColorButton.addEventListener("click", rainbowColor);       

        let darkColorButton = document.querySelector("#darkColor");
        function  darkColor(){
            
            box.addEventListener("click", () => {
                isMouseOverEnabled = false;
                box.style.backgroundColor = "black";
            });
            box.addEventListener("mouseover", () => {
                if (isMouseOverEnabled) {
                box.style.backgroundColor=generateGrayShade();
                setTimeout(() => {
                    box.style.backgroundColor = "white";
                    }, 200); 
                }
            });
        }
        darkColorButton.addEventListener("click", darkColor);

        let eraseButton = document.querySelector("#erase");
        function erase (){
            box.addEventListener("click", () => {
                isMouseOverEnabled = false;
                box.style.backgroundColor = "white";
            });
        }
        eraseButton.addEventListener("click", erase);

        let resetButton = document.querySelector("#reset");
        function reset(){
            box.style.backgroundColor = "white";
        }
        resetButton.addEventListener("click", reset);




        
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
    let Rnum = Math.floor(Math.random() * 220);
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
