// Selecting elements
const container = document.querySelector(".container");
const gridSizeInput = document.querySelector("#gridSizeInput");
const rainbowColorButton = document.querySelector("#rainbowColor");
const darkColorButton = document.querySelector("#darkColor");
const choseColorButton = document.querySelector("#choseColor");
const eraseButton = document.querySelector("#erase");
const pick = document.querySelector("#pick");

// Variable to track drawing state
let isDrawing = false;
let chosenColor = ""; // Initialize variable to store chosen color

// Initialize grid and set initial color mode
getGrid();
showGrid();
setRainbowColor();

// Function to generate the grid
function getGrid() {
    let gridSize = parseInt(gridSizeInput.value) || 16;
    gridSize = Math.min(Math.max(gridSize, 4), 50);
    container.innerHTML = "";

    for (let i = 0; i < gridSize * gridSize; i++) {
        let box = document.createElement("div");
        box.classList.add("box");
        box.style.width = `calc(100% / ${gridSize})`;
        box.style.height = `calc(100% / ${gridSize})`;
        box.style.backgroundColor = "white";
        container.appendChild(box);
    }

    // Attach event listeners
    container.addEventListener("mouseover", handleMouseOverMode);
    container.addEventListener("click", handleClickMode);
    container.addEventListener("mousedown", () => { isDrawing = true; });
    container.addEventListener("mouseup", () => { isDrawing = false; });
    container.addEventListener("mousemove", handleMouseMove);

    rainbowColorButton.addEventListener("click", setRainbowColor);
    darkColorButton.addEventListener("click", setDarkColor);
    choseColorButton.addEventListener("click", setColor);
    eraseButton.addEventListener("click", setEraser);
}

// Function to handle color changes based on the current mode
function handleMouseOverMode(event) {
    const box = event.target;
    if (!box || !box.classList || !box.classList.contains("box")) return;
    if (container.classList.contains("rainbow")) {
        handleRainbowMode(box);
    } else if (container.classList.contains("dark")) {
        handleDarkMode(box);
    } else if (container.classList.contains("color")) {
        handleColorPickerMode(box);
    }
}

function handleClickMode(event) {
    const box = event.target;
    if (!box || !box.classList || !box.classList.contains("box")) return;
    if (container.classList.contains("rainbow")) {
        handleRainbowMode(box);
    } else if (container.classList.contains("dark")) {
        handleDarkMode(box);
    } else if (container.classList.contains("color")) {
        handleColorPickerMode(box);
    } else if (container.classList.contains("eraser")) {
        handleEraserMode(box);
    }
}

// Function to handle rainbow color mode
function handleRainbowMode(box) {
    if (!isDrawing && box.style.backgroundColor === "white") {
        box.style.backgroundColor = randomColor();
        setTimeout(() => {
            box.style.backgroundColor = "white";
        }, 200);
    }
}

// Function to handle dark color mode
function handleDarkMode(box) {
    if (!isDrawing && box.style.backgroundColor === "white") {
        box.style.backgroundColor = generateDarkShade();
        setTimeout(() => {
            box.style.backgroundColor = "white";
        }, 200);
    }
}

// Function to handle color picker mode
function handleColorPickerMode(box) {
    if (!isDrawing && box.style.backgroundColor === "white") {
        box.style.backgroundColor = chosenColor;
        setTimeout(() => {
            box.style.backgroundColor = "white";
        }, 200);
    }
}

// Function to handle eraser mode
function handleEraserMode(box) {
    if (!isDrawing && box.style.backgroundColor !== "white") {
        box.style.backgroundColor = "white";
    }
}

// Function to handle mouse move event
function handleMouseMove(event) {
    if (!isDrawing) return;
    const box = event.target;
    if (!box.classList.contains("box")) return;

    if (container.classList.contains("rainbow") && box.style.backgroundColor === "white") {
        box.style.backgroundColor = randomColor();
    } else if (container.classList.contains("dark") && box.style.backgroundColor === "white") {
        box.style.backgroundColor = generateDarkShade();
    } else if (container.classList.contains("color") && box.style.backgroundColor === "white") {
        box.style.backgroundColor = chosenColor;
    } else if (container.classList.contains("eraser") && box.style.backgroundColor !== "white") {
        box.style.backgroundColor = "white";
    }
}

// Function to set rainbow color mode
function setRainbowColor() {
    container.classList.remove("dark", "eraser", "color");
    container.classList.add("rainbow","brush");
}

// Function to set dark color mode
function setDarkColor() {
    container.classList.remove("rainbow", "eraser", "color");
    container.classList.add("dark","brush");
}

// Function to set color picker mode
function setColor() {
    container.classList.remove("rainbow", "dark", "eraser");
    container.classList.add("color","brush");
}

// Function to set eraser mode
function setEraser() {
    container.classList.remove("rainbow", "dark", "color","brush");
    container.classList.add("eraser");
}

// Function to reset grid
function reset() {
    const boxes = container.querySelectorAll(".box");
    boxes.forEach(box => {
        box.style.backgroundColor = "white";
    });
}

// Function to show grid borders
function showGrid() {
    const boxes = container.querySelectorAll(".box");
    boxes.forEach(box => {
        box.style.border = "1px solid black";
    });
}

// Function to clear grid borders
function clearGrid() {
    const boxes = container.querySelectorAll(".box");
    boxes.forEach(box => {
        box.style.border = "0px";
    });
}

// Event listeners for reset, show grid, and clear grid buttons
document.querySelector("#reset").addEventListener("click", reset);
document.querySelector("#showGrid").addEventListener("click", showGrid);
document.querySelector("#clearGrid").addEventListener("click", clearGrid);

// Event listener for color picker input change
pick.addEventListener("input", () => {
    chosenColor = pick.value;
});

// Generate black and white shades
function generateDarkShade() {
    let Rnum = Math.floor(Math.random() * 200);
    return `rgb(${Rnum},${Rnum},${Rnum})`;
}

// Generate random RGB color
function randomColor() {
    let r = Math.floor(Math.random() * 230);
    let g = Math.floor(Math.random() * 230);
    let b = Math.floor(Math.random() * 230);
    return `rgb(${r},${g},${b})`;
}
