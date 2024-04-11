let container = document.querySelector(".container");
let gridSize = 16;
    getGrid();

document.querySelector("#gridSizeInput").addEventListener("change", function() {
    gridSize = parseInt(this.value); 
    getGrid(); 
});

function getGrid(){

    if(gridSize > 100){
        gridSize = 100;
    }
    if(gridSize < 4){
        gridSize = 4;
    }

    container.innerHTML = '';

    for (let i=0; i<gridSize*gridSize; i++) {
        let box = document.createElement("div");
        box.style.width= "calc(100% /" + gridSize + ")";
        box.style.height= "calc(100% /" + gridSize + ")";

        box.addEventListener("mouseover", () => {
            box.style.backgroundColor=randomColor();
        });
        box.addEventListener("mouseout", () => {
            setTimeout(() => {
            box.style.backgroundColor = "white";
            }, 200); 
        });
        box.addEventListener("click", () => {
            box.style.backgroundColor = "black";
        });
        box.classList.add("box");
        container.appendChild(box);
        
        

    }
}


function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return "rgb(" +r+ "," + g + "," + b + ")";
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        getGrid();
    }
}
