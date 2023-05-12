
// // ! CONSTANTS

// //const { xgcd } = require("mathjs")

TETRAMINOS = {
    o: {color: 'red',
        0: [[1, 1],
            [1, 1],]  } ,
    
    i: { color: 'yellow',
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






// ! CLASSES

class Board{
    constructor(boardEl, nextEl){
        this.height = 20
        this.width = 10
        this.boardArr = []
        this.piecePosition = [3,0]
        this.piecePositionPrev = this.piecePosition
        this.gameOver = false
        this.boardEl = boardEl
        this.nextEl = nextEl
        this.nextArr = []
        this.lineCount = 0;

        for(let i=0;i<4;i++){
            let arr = []
            for(let j=0;j<4;j++){
                arr.push(0)
                const cell = document.createElement('div');
                cell.id = `nextr${i}c${j}`
                cell.classList.add('empty')
                this.nextEl.appendChild(cell);
            }
            this.nextArr.push(arr)
        }
        

        for (let i = 0; i<this.height; i++){
            let arr = []
            for (let j = 0; j<this.width+1; j++){
                if (arr.length == this.width){
                    arr.push('x')
                }
                else{arr.push(0);
                }
                if(j ===10){
                 continue
                }
                const cell = document.createElement('div');
                cell.id = `r${i}c${j}`
                cell.classList.add('empty')
                this.boardEl.appendChild(cell);

                
            }
            this.boardArr.push(arr)
        }
        this.activePiece = CODES[Math.floor(Math.random()*CODES.length)]
        this.nextPiece = CODES[Math.floor(Math.random()*CODES.length)]
        this.activePieceArr = TETRAMINOS[this.activePiece]
        this.nextPieceArr = TETRAMINOS[this.nextPiece]
        this.speed = 500
        this.playID = 1
        this.pieceOrientation = 0;
        //this.blur = 0
        
        this.ticker;
        this.speedMultiplier = 1
        this.score = 0
        
        


    }

    render(){
        //this.renderNextPiece()
        this.renderActivePeice()
        this.renderNextPiece()
        
    }

    renderActivePeice(){
        
        
        for (let i = 0; i< this.activePieceArr[this.pieceOrientation].length; i++){
            
            for (let j = 0; j< this.activePieceArr[this.pieceOrientation][i].length; j++){
                if(this.boardArr[i+this.piecePosition[1]][j+this.piecePosition[0]]== 'x'){
                    continue
                }
                this.boardArr[i+this.piecePosition[1]][j+this.piecePosition[0]] = this.activePieceArr[this.pieceOrientation][i][j]
            }
        }

        for (let i = 0; i< this.boardArr.length; i++){
           
            for(let j = 0; j< this.boardArr[i].length-1; j++){
                const el = document.getElementById(`r${i}c${j}`)
                el.removeAttribute('class')
                if (this.boardArr[i][j] === 1){
                    el.classList.add(this.activePieceArr.color)

                }
                else if (this.boardArr[i][j] == 'x'){
                    
                    el.classList.add('placed')
                
                } else if (this.boardArr[i][j] === 0){
                    
                    el.classList.add('empty')
                
                }
            }
        }
    }
    renderNextPiece(){
        for (let i = 0; i< this.nextArr.length; i++){
           
            for(let j = 0; j< this.nextArr[i].length; j++){
                const el = document.getElementById(`nextr${i}c${j}`)
                this.nextArr[i][j] = 0
                // el.removeAttribute('class')
                //el.classList.add('empty')
            }
        }

        for (let i = 0; i< this.nextPieceArr[0].length; i++){
            
            for (let j = 0; j< this.nextPieceArr[0][i].length; j++){
                
                this.nextArr[i][j] = this.nextPieceArr[0][i][j]
            }
        }

        for (let i = 0; i< this.nextArr.length; i++){
           
            for(let j = 0; j< this.nextArr[i].length; j++){
                
                
                const el = document.getElementById(`nextr${i}c${j}`)
                el.removeAttribute('class')
                if (this.nextArr[i][j] === 1){
                    el.classList.add(this.nextPieceArr.color)

                }
                
                 else if (this.nextArr[i][j] === 0){
                    
                    el.classList.add('empty')
                
                } else{
                    el.removeAttribute('class')
                }
                
                
            }
        
        }
        
    }
    

    clearPrevPiece(){

        for (let i = 0; i< this.activePieceArr[this.pieceOrientation].length; i++){
            
            for (let j = 0; j< this.activePieceArr[this.pieceOrientation][i].length; j++){
                
                if (this.boardArr[i+this.piecePositionPrev[1]][j+this.piecePositionPrev[0]] == 1){
                    this.boardArr[i+this.piecePositionPrev[1]][j+this.piecePositionPrev[0]] = -1
                }
            }
        }

        

        for (let i = 0; i< this.boardArr.length; i++) {
           
            for(let j = 0; j< this.boardArr[i].length; j++) {
                const el = document.getElementById(`r${i}c${j}`)
                if (this.boardArr[i][j] === -1) {
                    el.classList.add('empty')
                    this.boardArr[i][j] = 0;
                    
                }
            }
        }
        
    }
    collision(){
        
        if((this.piecePosition[1] + 1)>(20 - this.activePieceArr[this.pieceOrientation].length)){
           
            return true
        }
        
        let cp_boardArr = this.boardArr.map(function(arr){
            return arr.slice()
        })
               


        for (let i = 0; i< this.activePieceArr[this.pieceOrientation].length; i++){
            
            for (let j = 0; j< this.activePieceArr[this.pieceOrientation][i].length; j++){
                
                if (cp_boardArr[i+this.piecePosition[1]+1][j+this.piecePosition[0]] == 'x' && this.activePieceArr[this.pieceOrientation][i][j]!==0){
                    return true;
                } 
            }
        }
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
                if (j+this.piecePosition[0]+x === v && this.activePieceArr[this.pieceOrientation][i][j]!==0) return true
                 
            }
        }
        return false

    }
    checkPeiceCollision(direction){
        let x;
        let v;
        if (direction == 1) x = 1
        else x = -1

        let cp_boardArr = this.boardArr.map(function(arr){
            return arr.slice()
        })
               
        for (let i = 0; i< this.activePieceArr[this.pieceOrientation].length; i++){
            //console.log('gets here')
            for (let j = 0; j< this.activePieceArr[this.pieceOrientation][i].length; j++){

                if (cp_boardArr[i+this.piecePosition[1]][j+this.piecePosition[0]+x] == 'x' && this.activePieceArr[this.pieceOrientation][i][j]!==0){
                    return true;
                } 
            }
        }
        return false

    }
    checkRotate(){

        let copy_peice_orietation = (this.pieceOrientation + 1) % (Object.keys(this.activePieceArr).length - 1)
        
        let cp_boardArr = this.boardArr.map(function(arr){
            return arr.slice()
        })
        

        let active_squares = 0
        for (let i = 0; i< this.activePieceArr[copy_peice_orietation].length; i++){
            
            for (let j = 0; j< this.activePieceArr[copy_peice_orietation][i].length; j++){
                
                cp_boardArr[i+this.piecePosition[1]][j+this.piecePosition[0]] += this.activePieceArr[copy_peice_orietation][i][j]

                if (cp_boardArr[i+this.piecePosition[1]][j+this.piecePosition[0]] == 'x1' ) return true
                
            }
        }
        console.log(cp_boardArr)
        
        return false
    }



    

    newPiece(){
        for (let i = 0; i< this.boardArr.length; i++) {
            
             for(let j = 0; j< this.boardArr[i].length; j++) {
                    if(this.boardArr[i][j] == 1){
                        
                        this.boardArr[i][j] = 'x'
                    
                    }
            }
        }
        
        this.checkLine()
        this.activePiece = this.nextPiece
        this.activePieceArr = TETRAMINOS[this.activePiece]
        this.nextPiece = CODES[Math.floor(Math.random()*CODES.length)]
        this.nextPieceArr = TETRAMINOS[this.nextPiece]
        this.piecePosition = [3,0]
        this.piecePositionPrev = this.piecePosition
        this.pieceOrientation = 0
        this.render()
        
    }

    movePeice() {
        if(this.collision()){
            
            this.newPiece()
        }
        else{
            this.clearPrevPiece()
            this.piecePositionPrev = this.piecePosition
            this.piecePosition[1]++
            
        } 
        
    }
    checkLine(){
        let xs = ['x','x','x','x','x','x','x','x','x','x','x']
        let os = [0,0,0,0,0,0,0,0,0,0,'x']
        console.log('this is called');
        for (let i =0; i<this.boardArr.length;i++){
            if (this.boardArr[i].every(item => xs.includes(item))){
                console.log('this should delete rows')
                this.boardArr.splice(i,1)
                this.boardArr.unshift(os)
                
                this.speed = this.speed - (this.speedMultiplier*5)
                this.speedMultiplier +=0.05
                this.lineCount+=1;
                //this.blur += 0.5
                //this.boardEl.style.filter = `blur(${this.blur}px)`
                this.checkLine()
                if(this.lineCount === 1){
                    this.score +=40
                } else if (this.lineCount ===2){
                    this.score += 100
                } else if (this.lineCount === 3){
                    this.score += 300
                } else if (this.lineCount === 4){
                    this.score += 1200
                }

                this.lineCount = 0;
                clearInterval(this.ticker);
                //this.render()
                this.tickerFunc() 
            } else continue
        }
    }
    isGameOver(){
        if(this.boardArr[0].slice(0,9).includes('x')){
            console.log('calls gameover')
            this.gameOver = true;
            return
        }
        
    }
    newGame(){
        document.getElementById('end-screen').style.display = 'none'
        for(let i=0;i<4;i++){
            //let arr = []
            for(let j=0;j<4;j++){
                //arr.push(0)
                document.getElementById(`nextr${i}c${j}`).remove()
                
                
            }
            //this.nextArr.push(arr)
        }
        

        for (let i = 0; i<20; i++){
            //let arr = []
            for (let j = 0; j<10; j++){
                document.getElementById(`r${i}c${j}`).remove()
            }
            
        }

        //console.log(board.boardEl, board.nextEl)
        let new_board = new Board(board.boardEl, board.nextEl)
        new_board.play()
    }
    tickerFunc(){
        this.takeUserInput()
        const onTick = () =>{
            
            this.isGameOver()
            if(this.gameOver){
                this.endGame()
                return;
            }
            this.movePeice()
            this.render()
            console.log("ticking")

        }
        this.ticker = setInterval(onTick, this.speed)
    }

    play() {
        
        this.render()
        
        this.tickerFunc()
        
        //this.ticker = setInterval(onTick, this.speed)
        
        
        
        //this.ticker = setInterval(onTick, this.speed)
        

        
        
    }

    endGame() {
        clearInterval(this.ticker)
        document.getElementById('end-screen').style.display = 'flex'
        document.getElementById('score').innerText = `SCORE: ${this.score}`
        document.getElementById('play-again').addEventListener('click', this.newGame)
        //document.removeEventListener('onkeyup')
        return;
    }

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
        
        this.pieceOrientation = (this.pieceOrientation + 1) % (Object.keys(this.activePieceArr).length - 1)

    }



    takeUserInput() {
        if(this.gameOver){
            
            return 

        } 
        else{

            document.onkeyup = (e) => {
            
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

    
    
}




function init(){
    const arr = ['x','x','x']
    console.log("hallelujuh", 1+arr[0])
    // ! CACHED DOM ELEMENTS
    const homeEl = document.getElementById('home');
    homeEl.addEventListener('click', function(evt){
        if(evt.target.id == 'p1'){
            containerEl.style.display = 'grid'
            homeEl.style.display = 'none'
            board = new Board(boardEl, nextEl)
            board.play()  
        }
        
    })

    
    

    
}

window.addEventListener('DOMContentLoaded', init);


const containerEl = document.getElementById('grid-container')
const boardEl = document.getElementById('board')
const nextEl = document.getElementById('next')

// for (let i = 0; i<20; i++){
//     //let arr = []
//     for (let j = 0; j<10; j++){
        
//         const cell = document.createElement('div');
//         cell.id = `r${i}c${j}`
//         cell.classList.add('empty')
//         boardEl.appendChild(cell);

        
//     }
    
// }