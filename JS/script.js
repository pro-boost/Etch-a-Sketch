let container = document.querySelector(".container");
let gridSize = 20;
for (let i=0; i<gridSize*gridSize; i++) {
  let box = document.createElement("div");
  box.style.width= "calc(100% / 20)";
  box.style.height= "calc(100% / 20)";
  box.addEventListener("mouseover", () => {
    box.style.backgroundColor=randomColor();
  });
  box.addEventListener("mouseout", () => {
    box.style.backgroundColor= "white";
  });
  box.addEventListener("click", () => {
    box.style.backgroundColor="black";
  });
  
  box.classList.add("box");
  container.appendChild(box);
}




//fonction to generate random RGB color
function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return "rgb(" +r+ "," + g + "," + b + ")";
}

