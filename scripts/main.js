// ! CONSTANTS

TETRAMINOS = {
    o: [[1, 1, 0, 0],
          [1, 1, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]],
    
    i: [[1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]],
    
    s:    [[0, 1, 1, 0],
          [1, 1, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]],
    
    z  : [[1, 1, 0, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]],
    
    l:   [[1, 0, 0, 0],
          [1, 0, 0, 0],
          [1, 1, 0, 0],
          [0, 0, 0, 0]],
    
    j:   [[0, 1, 0, 0],
          [0, 1, 0, 0],
          [1, 1, 0, 0],
          [0, 0, 0, 0]],
    
    t:   [[0, 1, 0, 0],
          [1, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]]
}
CODES = ["o","i","s","z","l","j","t"]




// ! CLASSES

class Board{
    constructor(height, width, boardEl){
        this.height = height
        this.width = width
        this.boardArr = []
        this.boardGr = boardEl
        this.piecePosition = [3,0]
        this.piecePositionPrev = this.piecePosition

        for (let i = 0; i<this.height; i++){
            let arr = []
            for (let j = 0; j<this.width; j++){
                arr.push(0);
            }
            this.boardArr.push(arr)
        }
        this.activePiece = CODES[Math.floor(Math.random()*CODES.length)]
        this.speed = 1000
        this.playID = 1
        // this.boardGr.setAttribute('width', this.width)
        // this.boardGr.setAttribute('height', this.height)


    }

    render(){
        this.clearPrevPiece()
        
        this.renderActivePeice()

    }

    renderActivePeice(){
        this.boardGr.fillStyle = 'green'
        
        for (let i = 0; i< TETRAMINOS[this.activePiece].length; i++){
            console.log('gets here')
            for (let j = 0; j< TETRAMINOS[this.activePiece][i].length; j++){
                console.log(TETRAMINOS[this.activePiece][i][j])

                this.boardArr[i+this.piecePosition[1]][j+this.piecePosition[0]] = TETRAMINOS[this.activePiece][i][j]
            }
        }

        for (let i = 0; i< this.boardArr.length; i++){
           // console.log(this.boardArr[i])
            for(let j = 0; j< this.boardArr[i].length; j++){
                if (this.boardArr[i][j] === 1){
                    console.log(this.boardGr)
                    this.boardGr.fillRect(j*30,i*30,30,30);
                }
            }
        }
    }

    clearPrevPiece(){

        for (let i = 0; i< TETRAMINOS[this.activePiece].length; i++){
            console.log('gets here')
            for (let j = 0; j< TETRAMINOS[this.activePiece][i].length; j++){
                console.log(TETRAMINOS[this.activePiece][i][j])

                this.boardArr[i+this.piecePositionPrev[1]][j+this.piecePositionPrev[0]] = -1
            }
        }

        this.boardGr.fillStyle = 'black'

        for (let i = 0; i< this.boardArr.length; i++){
           // console.log(this.boardArr[i])
            for(let j = 0; j< this.boardArr[i].length; j++){
                if (this.boardArr[i][j] === -1){
                    console.log(this.boardGr)
                    this.boardGr.fillRect(j*30,i*30,30,30);
                }
            }
        }
    }
    
}


function init(){

    // ! CACHED DOM ELEMENTS
    const canvas = document.getElementById('board')
    canvas.setAttribute('width', 300)
    canvas.setAttribute('height', 600)

    const canvas_ctx = canvas.getContext('2d')
    

    board = new Board(20,10, canvas_ctx)
    
}

window.addEventListener('DOMContentLoaded', init);