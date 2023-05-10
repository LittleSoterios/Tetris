
// ! CONSTANTS

//const { xgcd } = require("mathjs")

TETRAMINOS = {
    o: {color: 'red',
        0: [[1, 1],
            [1, 1]]  } ,
    
    i: { color: 'blue',
        0: [[1, 1, 1, 1]],
        1: [[1],[1],[1],[1]]},
        
    
    s:  {color: 'orange',
        0: [[0, 1, 1],
            [1, 1, 0]],
        1: [[ 1, 0],
            [ 1, 1],
            [ 0, 1]]
        } ,
    
    z  : {color: 'pink',
        0: [[1, 1, 0],
            [0, 1, 1]],
         1: [[ 0, 1],
             [ 1, 1],
             [ 1, 0]]
                        } ,
    
    l:   {color: 'blue',
            0: [[1, 0],
                [1, 0],
                [1, 1]],
            1: [[1, 1, 1],
                [1, 0, 0]],
            2: [[1, 1],
                [0, 1],
                [0, 1]],
            3: [[0, 0, 1],
                [1, 1, 1]],
            
                            },
    
    j:   {color: 'grey',
            0: [[0, 1],
                [0, 1],
                [1, 1]],
            1: [[1, 1, 1],
                [0, 0, 1]],
            2: [[1, 1],
                [1, 0],
                [1, 0]],
            3: [[1, 0, 0],
                [1, 1, 1]],
            
                            },
    t:   {color: 'green',
            0: [[0, 1],
                [1, 1],
                [0, 1]],
            1: [[1, 1, 1],
                [0, 1, 0]],
            2: [[1, 0],
                [1, 1],
                [1, 0]],
            3: [[0, 1, 0],
                [1, 1, 1]],
            
                            },
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
        this.gameOver = false
        

        for (let i = 0; i<this.height; i++){
            let arr = []
            for (let j = 0; j<this.width; j++){
                arr.push(0);
            }
            this.boardArr.push(arr)
        }
        this.activePiece = CODES[Math.floor(Math.random()*CODES.length)]
        this.activePieceArr = TETRAMINOS[this.activePiece]
        this.speed = 10000000
        this.playID = 1
        this.pieceOrientation = 0;
        // this.boardGr.setAttribute('width', this.width)
        // this.boardGr.setAttribute('height', this.height)


    }

    render(){
        //this.clearPrevPiece()
        this.renderActivePeice()
        
        

    }

    renderActivePeice(){
        this.boardGr.fillStyle = this.activePieceArr.color
        //console.log(this.activePieceArr[this.pieceOrientation]);
        for (let i = 0; i< this.activePieceArr[this.pieceOrientation].length; i++){
            //console.log('gets here')
            for (let j = 0; j< this.activePieceArr[this.pieceOrientation][i].length; j++){
                this.boardArr[i+this.piecePosition[1]][j+this.piecePosition[0]] = this.activePieceArr[this.pieceOrientation][i][j]
            }
        }

        for (let i = 0; i< this.boardArr.length; i++){
           // console.log(this.boardArr[i])
            for(let j = 0; j< this.boardArr[i].length; j++){
                if (this.boardArr[i][j] === 1){
                    //console.log(this.boardGr)
                    //this.boardGr.
                    this.boardGr.fillRect(j*30,i*30,30,30);

                }
                else if(this.boardArr[i][j] == 'x'){
                    this.boardGr.fillRect(j*30,i*30,30,30);
                }
            }
        }
    }

    clearPrevPiece(){

        for (let i = 0; i< this.activePieceArr[this.pieceOrientation].length; i++){
            //console.log('gets here')
            for (let j = 0; j< this.activePieceArr[this.pieceOrientation][i].length; j++){
                //console.log(TETRAMINOS[this.activePiece][i][j])
                if (this.boardArr[i+this.piecePositionPrev[1]][j+this.piecePositionPrev[0]] == 1){
                    this.boardArr[i+this.piecePositionPrev[1]][j+this.piecePositionPrev[0]] = -1
                }
            }
        }

        

        for (let i = 0; i< this.boardArr.length; i++) {
           // console.log(this.boardArr[i])
            for(let j = 0; j< this.boardArr[i].length; j++) {
                if (this.boardArr[i][j] === -1) {
                    //console.log(this.boardGr)
                    this.boardGr.fillStyle = 'black'
                    this.boardGr.fillRect(j*30,i*30,30,30);
                    //console.log("test to see if it gets here")
                }
            }
        }
        for (let i = 0; i< this.boardArr.length; i++) {
            // console.log(this.boardArr[i])
             for(let j = 0; j< this.boardArr[i].length; j++) {
                 if (this.boardArr[i][j] === -1) {
                     //console.log(this.boardGr)
                     this.boardArr[i][j] = 0;
                 }
             }
         }
    }
    collision(){
        //console.log(this.piecePosition[1] + 1)
        //console.log(this.boardArr[this.piecePosition[0]+1][this.piecePosition[1]])
        
        if((this.piecePosition[1] + 1)>(20 - this.activePieceArr[this.pieceOrientation].length)){
            //console.log('returns true on collision')
            return true
        }
        //console.log(this.boardArr)
        let cp_boardArr = this.boardArr.map(function(arr){
            return arr.slice()
        })
               


        for (let i = 0; i< this.activePieceArr[this.pieceOrientation].length; i++){
            //console.log('gets here')
            for (let j = 0; j< this.activePieceArr[this.pieceOrientation][i].length; j++){
                //console.log(TETRAMINOS[this.activePiece][i][j])
                //console.log(this.piecePosition)
                //console.log(this.boardArr[i+this.piecePosition[1]][j+this.piecePosition[0]])
                //console.log(this.activePieceArr[this.pieceOrientation][i][j])
                if(this.activePieceArr[this.pieceOrientation][i][j]==0){
                    continue
                }
                //console.log(cp_boardArr[i+this.piecePosition[1]][j+this.piecePosition[0]])
                else if (cp_boardArr[i+this.piecePosition[1]+1][j+this.piecePosition[0]] == 'x'){
                    return true;
                } 
            }
        }
        //console.log(cp_boardArr)
        // let x = false
        // cp_boardArr.forEach(element,i_idx => {
        //     element.forEach(val, j_idx =>{
        //         //console.log(val)
        //         if ()
        //         if (val>2){
        //             x = true
        //         }
        //     })
        // })
        
        
        
            
            
        return false;
        
    }

    newPiece(){
        for (let i = 0; i< this.boardArr.length; i++) {
            // console.log(this.boardArr[i])
             for(let j = 0; j< this.boardArr[i].length; j++) {
                    if(this.boardArr[i][j] == 1){
                        console.log('doing this?')
                        this.boardArr[i][j] = 'x'
                    
                    }
            }
        }
        console.log('there should be x\'s here: \n', this.boardArr)

        this.activePiece = CODES[Math.floor(Math.random()*CODES.length)]
        this.activePieceArr = TETRAMINOS[this.activePiece]
        this.piecePosition = [3,0]
        this.piecePositionPrev = this.piecePosition
        this.pieceOrientation = 0
    }

    movePeice() {
        if(this.collision()){
            //console.log("should get here after true on collision")
            this.newPiece()
        }
        else{
            this.clearPrevPiece()
            this.piecePositionPrev = this.piecePosition
            //console.log(this.piecePositionPrev)
            this.piecePosition[1]++
            //console.log('hgets here', this.piecePosition[1])
        } 
        
    }

    play() {
        this.render()
        
        const onTick = () =>{
            //console.log(this)
            if(this.gameOver){
                this.endGame();
                return;
            }
            
            this.movePeice()

            //this.clearPrevPiece()
            this.render()
            //console.log("tick")
            //console.log(this.boardArr)
            
        }
        setInterval(onTick, this.speed)
        this.takeUserInput()

        
        
    }

    endGame() {
        return;
    }

    // collison(){
    //     if(this.activePieceArr[this.activePieceArr-1].reduce((acc, curr)=>acc+curr) ===0){
    //         this.a
    //     }
    // }

    translatePiece(direction) {
        
        this.clearPrevPiece()
        if (direction) this.piecePosition[0]++
        else this.piecePosition[0]--
        


    }
    rotatePeice(){
        this.clearPrevPiece()
        //console.log((this.pieceOrientation + 1) % (Object.keys(this.activePieceArr).length -1))
        this.pieceOrientation = (this.pieceOrientation + 1) % (Object.keys(this.activePieceArr).length - 1)

       // console.log(this.pieceOrientation)
        

    }



    takeUserInput() {
        document.onkeyup = (e) => {
           // console.log(e.keyCode);
            if (e.keyCode == '40'){
                this.movePeice()
                this.render()
            }
            else if (e.keyCode == '37') {
                this.translatePiece(0)
                this.render()
            }
            else if (e.keyCode == '39') {
                this.translatePiece(1)
                this.render()
            }
            else if (e.keyCode == '38'){
                this.rotatePeice()
                this.render()
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
    board.play()
    
}

window.addEventListener('DOMContentLoaded', init);