// Initialize variables and generate grid on page load
const container = document.querySelector(".container");
const gridSizeInput = document.querySelector("#gridSizeInput");
const rainbowColorButton = document.querySelector("#rainbowColor");
const darkColorButton = document.querySelector("#darkColor");
const eraseButton = document.querySelector("#erase");
let isDrawing = false;
//const pick = document.querySelector("#pick");

getGrid();
showGrid();
setRainbowColor();

function getGrid() {
    let gridSize = parseInt(gridSizeInput.value) || 16;
    gridSize = Math.min(Math.max(gridSize, 4), 50);
    container.innerHTML = "";
    
    for (let i=0; i<gridSize*gridSize; i++) {
        let box = document.createElement("div");
        box.classList.add("box");
        box.style.width= "calc(100% /" + gridSize + ")";
        box.style.height= "calc(100% /" + gridSize + ")";
        box.style.backgroundColor= "white";
        container.appendChild(box);
    }
    showGrid();
    // Attach event listeners
    container.addEventListener("mouseover", handleColorMode);
    container.addEventListener("click", handleColorMode);
    container.addEventListener("mousedown", () => { isDrawing = true; });
    container.addEventListener("mouseup", () => { isDrawing = false; });
    container.addEventListener("mousemove", handleMouseMove);

    rainbowColorButton.addEventListener("click", setRainbowColor);
    darkColorButton.addEventListener("click", setDarkColor);
    eraseButton.addEventListener("click", setEraser);
}      

function handleColorMode(event) {
    const box = event.target;
    if (!box.classList.contains("box")) return;

    if (container.classList.contains("rainbow")) {
        handleRainbowMode(box);
    } else if (container.classList.contains("dark")) {
        handleDarkMode(box);
    } else if (container.classList.contains("eraser")) {
        handleEraserMode(box);
    }
}

function handleRainbowMode(box) {
    if (!isDrawing && box.style.backgroundColor === "white") {
        box.style.backgroundColor = randomColor();
        setTimeout(() => {
            box.style.backgroundColor = "white";
        }, 200);
    }
}

function handleDarkMode(box) {
    if (!isDrawing && box.style.backgroundColor === "white") {
        box.style.backgroundColor = generateGrayShade();
        setTimeout(() => {
            box.style.backgroundColor = "white";
        }, 200);
    }
}

function handleEraserMode(box) {
    if (!isDrawing && box.style.backgroundColor !== "white") {
        box.style.backgroundColor = "white";
    }
}

function handleMouseMove(event) {
    if (!isDrawing) return;
    const box = event.target;
    if (!box.classList.contains("box")) return;

    if (container.classList.contains("rainbow") && box.style.backgroundColor === "white") {
        box.style.backgroundColor = randomColor();
    } else if (container.classList.contains("dark") && box.style.backgroundColor === "white") {
        box.style.backgroundColor = generateGrayShade();
    } else if (container.classList.contains("eraser") && box.style.backgroundColor !== "white") {
        box.style.backgroundColor = "white";
    }
}

function setRainbowColor() {
    container.classList.remove("dark", "eraser");
    container.classList.add("rainbow", "brush");
}

function setDarkColor() {
    container.classList.remove("rainbow", "eraser");
    container.classList.add("dark", "brush");
}

function setEraser() {
    container.classList.remove("rainbow", "dark", "brush");
    container.classList.add("eraser");
}

function reset() {
    const boxes = container.querySelectorAll(".box");
    boxes.forEach(box => {
        box.style.backgroundColor = "white";
    });
}

function showGrid() {
    const boxes = container.querySelectorAll(".box");
    boxes.forEach(box => {
        box.style.border = "1px solid black";
    });
}

function clearGrid() {
    const boxes = container.querySelectorAll(".box");
    boxes.forEach(box => {
        box.style.border = "0px";
    });
}
document.querySelector("#reset").addEventListener("click", reset);
document.querySelector("#showGrid").addEventListener("click", showGrid);
document.querySelector("#clearGrid").addEventListener("click", clearGrid);

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

document.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        getGrid();
    }
});
