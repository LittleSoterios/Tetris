
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

// ! cached dom elements

const titleEl = document.getElementById('title')
const scoreEl = document.getElementById('title')
const homeEl = document.getElementById('title')



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
            for (let j = 0; j<this.width+1; j++){
                if (arr.length == this.width){
                    arr.push('x')
                }
                else{arr.push(0);
                }
                
            }
            this.boardArr.push(arr)
        }
        this.activePiece = CODES[Math.floor(Math.random()*CODES.length)]
        this.activePieceArr = TETRAMINOS[this.activePiece]
        this.speed = 500
        this.playID = 1
        this.pieceOrientation = 0;
        this.ticker;
        this.speedMultiplier = 1
        this.score = 0
        
        // this.boardGr.setAttribute('width', this.width)
        // this.boardGr.setAttribute('height', this.height)


    }

    render(){
        //this.clearPrevPiece()
        this.renderActivePeice()
        
        

    }

    renderActivePeice(){
        
        //console.log(this.activePieceArr[this.pieceOrientation]);
        for (let i = 0; i< this.activePieceArr[this.pieceOrientation].length; i++){
            //console.log('gets here')
            for (let j = 0; j< this.activePieceArr[this.pieceOrientation][i].length; j++){
                if(this.boardArr[i+this.piecePosition[1]][j+this.piecePosition[0]]== 'x'){
                    continue
                }
                this.boardArr[i+this.piecePosition[1]][j+this.piecePosition[0]] = this.activePieceArr[this.pieceOrientation][i][j]
            }
        }

        for (let i = 0; i< this.boardArr.length; i++){
           // console.log(this.boardArr[i])
            for(let j = 0; j< this.boardArr[i].length; j++){
                if (this.boardArr[i][j] === 1){
                    //console.log(this.boardGr)
                    //this.boardGr.
                    this.boardGr.fillStyle = this.activePieceArr.color
                    this.boardGr.fillRect(j*30,i*30,30,30);
                

                }
                else if (this.boardArr[i][j] == 'x'){
                    //console.log(this.boardGr)
                    //this.boardGr.
                    this.boardGr.fillStyle = 'white'
                    this.boardGr.fillRect(j*30,i*30,30,30);
                
                } else if (this.boardArr[i][j] === 0){
                    //console.log(this.boardGr)
                    //this.boardGr.
                    this.boardGr.fillStyle = 'black'
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
                    this.boardArr[i][j] = 0;
                    //console.log("test to see if it gets here")
                }
            }
        }
        // for (let i = 0; i< this.boardArr.length; i++) {
        //     // console.log(this.boardArr[i])
        //      for(let j = 0; j< this.boardArr[i].length; j++) {
        //          if (this.boardArr[i][j] === -1) {
        //              //console.log(this.boardGr)
        //              this.boardArr[i][j] = 0;
        //          }
        //      }
        //  }
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
                // if(this.activePieceArr[this.pieceOrientation][i][j]==0){
                //     continue
                // }
                //console.log(cp_boardArr[i+this.piecePosition[1]][j+this.piecePosition[0]])
                if (cp_boardArr[i+this.piecePosition[1]+1][j+this.piecePosition[0]] == 'x' && this.activePieceArr[this.pieceOrientation][i][j]!==0){
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
    checkWalls(direction){
        let x;
        let v;
        if (direction == 1){
            x = 1
            v = 10
        }
        else{
            x = -1
            v = -1
        }
        for (let i = 0; i< this.activePieceArr[this.pieceOrientation].length; i++){
            //console.log('gets here')
            for (let j = 0; j< this.activePieceArr[this.pieceOrientation][i].length; j++){
                //console.log(TETRAMINOS[this.activePiece][i][j])
                //console.log(this.piecePosition)
                //console.log(this.boardArr[i+this.piecePosition[1]][j+this.piecePosition[0]])
                //console.log(this.activePieceArr[this.pieceOrientation][i][j])
                // if(this.activePieceArr[this.pieceOrientation][i][j]==0){
                //     continue
                // }
                //console.log(cp_boardArr[i+this.piecePosition[1]][j+this.piecePosition[0]])
                if (j+this.piecePosition[0]+x === v && this.activePieceArr[this.pieceOrientation][i][j]!==0){
                    return true
                } 
            }
        }
        return false

    }
    checkPeiceCollision(direction){
        let x;
        let v;
        if (direction == 1){
            x = 1
            //v = 10
        }
        else{
            x = -1
            //v = -1
        }
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
                // if(this.activePieceArr[this.pieceOrientation][i][j]==0){
                //     continue
                // }
                //console.log(cp_boardArr[i+this.piecePosition[1]][j+this.piecePosition[0]])
                if (cp_boardArr[i+this.piecePosition[1]][j+this.piecePosition[0]+x] == 'x' && this.activePieceArr[this.pieceOrientation][i][j]!==0){
                    return true;
                } 
            }
        }
        return false

    }
    checkRotate(){

        let copy_peice_orietation = (this.pieceOrientation + 1) % (Object.keys(this.activePieceArr).length - 1)
        //copies piece orientation with new rotation to test
        let cp_boardArr = this.boardArr.map(function(arr){
            return arr.slice()
        })
        // copies the board array without referencing

        let active_squares = 0
        for (let i = 0; i< this.activePieceArr[copy_peice_orietation].length; i++){
            //console.log('gets here')
            for (let j = 0; j< this.activePieceArr[copy_peice_orietation][i].length; j++){
                // if(cp_boardArr[i+this.piecePosition[1]][j+this.piecePosition[0]]== 'x'){
                //     return
                // }
                cp_boardArr[i+this.piecePosition[1]][j+this.piecePosition[0]] += this.activePieceArr[copy_peice_orietation][i][j]
                if (cp_boardArr[i+this.piecePosition[1]][j+this.piecePosition[0]] == 'x1' ){
                    return true
                
                }
                
                
                
            }
        }
        console.log(cp_boardArr)
        // for (let i =0; i< cp_boardArr.length; i++){
        //     for (let j = 0; j<cp_boardArr[i].length; j++){
        //         if(cp_boardArr[i][j] === 1){
        //             console.log(i,j)
        //             console.log("adding 1 to active squares")
        //             active_squares++
        //         }
        //     }
        // }
        // if (active_squares !== 4){
        //     console.log(active_squares)
        //     return true;
        // }
        return false
    }

    

    newPiece(){
        for (let i = 0; i< this.boardArr.length; i++) {
            // console.log(this.boardArr[i])
             for(let j = 0; j< this.boardArr[i].length; j++) {
                    if(this.boardArr[i][j] == 1){
                        //console.log('doing this?')
                        this.boardArr[i][j] = 'x'
                    
                    }
            }
        }
        //console.log('there should be x\'s here: \n', this.boardArr)
        this.checkLine()
        this.activePiece = CODES[Math.floor(Math.random()*CODES.length)]
        this.activePieceArr = TETRAMINOS[this.activePiece]
        this.piecePosition = [3,0]
        this.piecePositionPrev = this.piecePosition
        this.pieceOrientation = 0
        this.render()
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
    checkLine(){
        let xs = ['x','x','x','x','x','x','x','x','x','x']
        let os = [0,0,0,0,0,0,0,0,0,0]
        console.log('this is called');
        for (let i =0; i<this.boardArr.length;i++){
            if (this.boardArr[i].every(item => xs.includes(item))){
                console.log('this should delete rows')
                this.boardArr.splice(i,1)
                this.boardArr.unshift(os)
                this.checkLine()
                this.speed = this.speed - (this.speedMultiplier*5)
                this.speedMultiplier +=0.05
            } else continue
        }
    }
    isGameOver(){
        if(this.boardArr[0].slice(0,9).includes('x')){
            console.log('calls gameover')
            this.gameOver = true
        }
        
    }

    play() {
        this.render()
        
        const onTick = () =>{
            this.isGameOver()
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
        this.ticker = setInterval(onTick, this.speed)
        this.takeUserInput()

        
        
    }

    endGame() {
        clearInterval(this.ticker)
        return;
    }

    // collison(){
    //     if(this.activePieceArr[this.activePieceArr-1].reduce((acc, curr)=>acc+curr) ===0){
    //         this.a
    //     }
    // }

    translatePiece(direction) {
        if (this.checkWalls(direction)){
            return;
        } else if(this.checkPeiceCollision(direction)){
            return;
        }
        this.clearPrevPiece()
        if (direction) this.piecePosition[0]++
        else this.piecePosition[0]--
        


    }
    rotatePeice(){
        if(this.checkRotate()){
            return
        }
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
    const arr = ['x','x','x']
    console.log("hallelujuh", 1+arr[0])
    // ! CACHED DOM ELEMENTS
    const canvas = document.getElementById('board')
    canvas.setAttribute('width', 300)
    canvas.setAttribute('height', 600)

    const canvas_ctx = canvas.getContext('2d')
    

    board = new Board(20,10, canvas_ctx)
    board.play()
    console.log('comes out of the game')
    
}

window.addEventListener('DOMContentLoaded', init);