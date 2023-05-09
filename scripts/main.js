
function init(){
    const grid = document.getElementById('grid')
    console.log(grid)
    const width = 10
    const height = 20
    const cellCount = width*height


    for (let i = 0; i < cellCount; i++){
        const cell = document.createElement('div')
        // Add index to div element
        cell.innerText = i%10 + ", " + Math.floor(i/10)
        // Add index as an attribute
        cell.dataset.index = i
        // cell.setAttribute('data-index', i)
        console.log(cell)
        // Add cell to grid
        grid.appendChild(cell)
    }
}

window.addEventListener('DOMContentLoaded', init);