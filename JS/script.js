const container = document.querySelector(".container");
const gridSizeInput = document.querySelector("#gridSizeInput");
const rainbowColorButton = document.querySelector("#rainbowColor");
const darkColorButton = document.querySelector("#darkColor");
const choseColorButton = document.querySelector("#choseColor");
const eraseButton = document.querySelector("#erase");
const pick = document.querySelector("#pick");

let isDrawing = false;
let chosenColor = ""; 

getGrid();
showGrid();
setRainbowColor();
gridSizeInput.focus();


function getGrid() {
    let gridSize = parseInt(gridSizeInput.value) || 16;
    gridSize = Math.min(Math.max(gridSize, 4), 50);
    container.innerHTML = "";
    gridSizeInput.value = "";

    for (let i = 0; i < gridSize * gridSize; i++) {
        let box = document.createElement("div");
        box.classList.add("box");
        box.style.width = `calc(100% / ${gridSize})`;
        box.style.height = `calc(100% / ${gridSize})`;
        box.style.backgroundColor = "white";
        box.style.border = "1px solid black";
        container.appendChild(box);
    }
   
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
        box.style.backgroundColor = generateDarkShade();
        setTimeout(() => {
            box.style.backgroundColor = "white";
        }, 200);
    }
}

function handleColorPickerMode(box) {
    if (!isDrawing && box.style.backgroundColor === "white") {
        box.style.backgroundColor = chosenColor;
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
        box.style.backgroundColor = generateDarkShade();
    } else if (container.classList.contains("color") && box.style.backgroundColor === "white") {
        box.style.backgroundColor = chosenColor;
    } else if (container.classList.contains("eraser") && box.style.backgroundColor !== "white") {
        box.style.backgroundColor = "white";
    }
}

function setRainbowColor() {
    container.classList.remove("dark", "eraser", "color");
    container.classList.add("rainbow","brush");
}

function setDarkColor() {
    container.classList.remove("rainbow", "eraser", "color");
    container.classList.add("dark","brush");
}

function setColor() {
    container.classList.remove("rainbow", "dark", "eraser");
    container.classList.add("color","brush");
}

function setEraser() {
    container.classList.remove("rainbow", "dark", "color","brush");
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

function randomColor() {
    let randomColor = "";
    randomColor = `hsl(${Math.random() * 360},100%,50%)`;
    return randomColor;
}

function generateDarkShade() {
    let Rnum = Math.floor(Math.random() * 200);
    return `rgb(${Rnum},${Rnum},${Rnum})`;
}

pick.addEventListener("input", () => {
    chosenColor = pick.value;
});

gridSizeInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getGrid();

    }
});