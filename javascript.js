const gridSizePx = 700;
const rows = 16;
const columns = 16;

const gridFrame = document.getElementById("gridFrame");

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
    const target = e.target;
    //console.log(target);

    let gridSize = 0;
    do{
        gridSize = prompt("Enter the grid size (1 to 100):", "16");
    }while(gridSize < 1 || gridSize > 100 || isNaN(gridSize));
    
    if(gridSize) {  //Prompt OK
        //gridFrame.innerHTML = "";    //Remove all gridFrame children. Alt: generateGrid(gridSize, gridSize)
        gridFrame.replaceChildren();
        console.log(gridSize);
        generateGrid(gridSize, gridSize);
    } else {return} //Prompt CANCEL
}) 

//MAIN SCRIPT
/////////////
generateGrid(rows, columns);