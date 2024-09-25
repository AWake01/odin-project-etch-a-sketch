let rowCount = 16;
let colCount = 16;

const gridFrame = document.getElementById("gridFrame");

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

document.addEventListener("mouseover", (e) => {
    const target = e.target;
    //console.log(target.classList);

    if(target.classList.contains("cell")) {
            target.classList.remove("defaultColor");
            target.classList.add("highlightColor");
    }
}) 