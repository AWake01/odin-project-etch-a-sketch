const gridSizePx = 700;
const rows = 16;
const columns = 16;
let gridSize = 16;

const gridFrame = document.getElementById("gridFrame");
const sizeBtn = document.getElementById("sizeBtn");

function generateGrid(rowCount, colCount) {
    for(let y = 0; y < colCount; y++){
        const row = document.createElement("div");
        row.classList.add("row");

        for(let x = 0; x < rowCount; x++){
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.classList.add("defaultColor");
            //cell.style.width = `${gridSizePx}px`;
            //cell.style.height = `${gridSizePx}px`;
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
            target.classList.remove("defaultColor");
            target.classList.add("highlightColor");
    }
}) 

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
        //Default click
        default:
            return;
    }
}) 

document.onload(generateGrid(gridSize, gridSize));  //Load inital grid
