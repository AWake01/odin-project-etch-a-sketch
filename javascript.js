const gridSizePx = 700;
let gridSize = 16;  //Square grid

const gridFrame = document.getElementById("gridFrame");
const sizeBtn = document.getElementById("sizeBtn");
const modeBtn = document.getElementById("modeBtn");
const resetColorBtn = document.getElementById("resetColorBtn");
const colorPicker = document.getElementById("colorPicker");
let colorMode = "solid";       //solid, rainbow, shade
modeBtn.innerText = "Solid Mode";
colorPicker.value = "#808080";  //Grey



function generateGrid(rowCount, colCount) {
    for(let y = 0; y < colCount; y++){
        const row = document.createElement("div");
        row.classList.add("row");

        for(let x = 0; x < rowCount; x++){
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.classList.add("defaultColor");
            row.appendChild(cell);
        }
        gridFrame.appendChild(row);
    }

    sizeBtn.innerText = `Grid Size: ${gridSize} x ${gridSize}`;
}

document.addEventListener("mouseover", (e) => {
    const target = e.target;
    //console.log(target);

    if(target.classList.contains("cell")) {

        switch(colorMode) {

            case "solid":
                if(target.classList.contains("defaultColor")){
                    target.classList.remove("defaultColor");
                    //target.classList.add("highlightColor");
                    target.style.backgroundColor = document.getElementById("colorPicker").value;
                }
                break;
            case "rainbow":
                if(target.classList.contains("defaultColor")){
                    target.classList.remove("defaultColor");
                    let color = randomColor();
                    target.style.backgroundColor = `rgb(${color[0]}, ${color[1]},  ${color[2]})`;
                }
                break;
            case "shade":
                if(target.classList.contains("defaultColor")){
                    target.classList.remove("defaultColor");
                    //target.classList.add("grayscaleColor");
                    target.style.backgroundColor = document.getElementById("colorPicker").value;
                    target.style.opacity = "0.1";
                }
                //else if(target.classList.contains("grayscaleColor") && parseFloat(target.style.opacity) < 1) {
                else if(parseFloat(target.style.opacity) < 1) {
                    let opacity = parseFloat(target.style.opacity);
                    opacity += 0.1;
                    target.style.opacity = `${opacity}`;
                    console.log("Opacity: " + opacity);
                }
                break;
        }
    }
}) 

function randomColor(element) {
    let red = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);

    return [red, green, blue];
}

document.addEventListener("click", (e) => {
    let target = e.target;
    //console.log(target.id);

    switch(target.id) {
        //Prompt user for a grid size and generate new grid
        case 'sizeBtn':
            while(true) {   //Prompt till input between 1 and 100
                gridSize = prompt("Enter the grid size (1 to 100):", "16");
                if(gridSize != null){   //Prompt OK
                    if(gridSize < 1 || gridSize > 100 || isNaN(gridSize)) { //If input invalid, repeat prompt
                        continue;
                    }
                    else {  //If input valid, generate new grid
                        gridFrame.replaceChildren();    //Clear grid
                        generateGrid(gridSize, gridSize)
                        return;       
                    }
                }
                else { return; } //Prompt CANCEL
            }
            break;
        //Color mode toggle - solid > shade > rainbow
        case 'modeBtn':
            console.log("Mode: ", colorMode);
            if(colorMode === "solid") {
                colorMode = "shade";
                modeBtn.innerText="Shade Mode";
                colorPicker.disabled = false;
                resetColorBtn.disabled = false;
            }
            else if(colorMode === "shade") {
                colorMode = "rainbow";
                modeBtn.innerText="Rainbow Mode";
                colorPicker.disabled = true;
                resetColorBtn.disabled = true;
            }
            else {
                colorMode = "solid";
                modeBtn.innerText="Solid Mode"; 
                colorPicker.disabled = false;  
                resetColorBtn.disabled = false;
            }
            console.log("Mode: ", colorMode);
            break;

        //Default color
        case 'resetColorBtn':
            colorPicker.value = "#808080";
            break;

        //Erase grid
        case 'clearBtn':
            gridFrame.replaceChildren();
            generateGrid(gridSize, gridSize);
            break;

        //Default click
        default:
            return;
    }
}) 

document.onload(generateGrid(gridSize, gridSize));  //Load inital grid
