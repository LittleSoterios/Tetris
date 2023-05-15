

let board_1, board_2
const TETRIS_AUDIO = new Audio('../audio/tetris-lofi.wav')
const LINE_AUDIO = new Audio('../audio/line.wav')
const LINE_AUDIO_4 = new Audio('../audio/4-line.wav')
const MULTI_AUDIO = new Audio('../audio/2-player.wav')


const WINNER_MSG = {
  't': "It's a TIE!\nThat hardly ever happens...",
  '1': "Player 1 wins - better luck next time Player 2",
  '2': "Player 2 wins - Tetris ain't for everyone, Player 1"
}

const TETRAMINOS = {
  o: {
    color: "red",
    0: [
      [1, 1],
      [1, 1],
    ],
  },

  i: { color: "yellow", 0: [[1, 1, 1, 1]], 1: [[1], [1], [1], [1]] },

  s: {
    color: "orange",
    0: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    1: [
      [1, 0],
      [1, 1],
      [0, 1],
    ],
  },

  z: {
    color: "pink",
    0: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    1: [
      [0, 1],
      [1, 1],
      [1, 0],
    ],
  },

  l: {
    color: "blue",
    0: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    1: [
      [1, 1, 1],
      [1, 0, 0],
    ],
    2: [
      [1, 1],
      [0, 1],
      [0, 1],
    ],
    3: [
      [0, 0, 1],
      [1, 1, 1],
    ],
  },

  j: {
    color: "grey",
    0: [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
    1: [
      [1, 1, 1],
      [0, 0, 1],
    ],
    2: [
      [1, 1],
      [1, 0],
      [1, 0],
    ],
    3: [
      [1, 0, 0],
      [1, 1, 1],
    ],
  },
  t: {
    color: "green",
    0: [
      [0, 1],
      [1, 1],
      [0, 1],
    ],
    1: [
      [1, 1, 1],
      [0, 1, 0],
    ],
    2: [
      [1, 0],
      [1, 1],
      [1, 0],
    ],
    3: [
      [0, 1, 0],
      [1, 1, 1],
    ],
  },
};
CODES = ["o", "i", "s", "z", "l", "j", "t"];

// ! cached dom elements

// ! CLASSES

class Board {
  constructor(boardEl, nextEl, playID, isMulti) {
    this.height = 20;
    this.width = 10;
    this.boardArr = [];
    this.piecePosition = [3, 0];
    this.piecePositionPrev = this.piecePosition;
    this.gameOver = false;
    this.boardEl = boardEl;
    this.nextEl = nextEl;
    this.nextArr = [];
    this.lineCount = 0;
    this.activePiece = CODES[Math.floor(Math.random() * CODES.length)];
    this.nextPiece = CODES[Math.floor(Math.random() * CODES.length)];
    this.activePieceArr = TETRAMINOS[this.activePiece];
    this.nextPieceArr = TETRAMINOS[this.nextPiece];
    this.speed = 500;
    this.playID = playID;
    this.pieceOrientation = 0;
    this.ticker;
    this.speedMultiplier = 1;
    this.score = 0;
    this.isMulti = isMulti
    this.scoreEl
    if(this.isMulti == 2){
      this.scoreEl = document.createElement('div')
      this.scoreEl.id = `p${this.playID}_score-game${this.isMulti}`
      multiContainer.appendChild(this.scoreEl)
    }
    else if(this.isMulti == 1){
      this.scoreEl = document.createElement('div')
      this.scoreEl.id = `p${this.playID}_score-game${this.isMulti}`
      containerEl.appendChild(this.scoreEl)

    }

    for (let i = 0; i < 4; i++) {
      let arr = [];
      for (let j = 0; j < 4; j++) {
        arr.push(0);
        const cell = document.createElement("div");
        cell.id = `nextr${i}c${j}${this.playID}`;
        cell.classList.add("empty");
        this.nextEl.appendChild(cell);
      }
      this.nextArr.push(arr);
    }

    for (let i = 0; i < this.height; i++) {
      let arr = [];
      for (let j = 0; j < this.width + 1; j++) {
        if (arr.length == this.width) {
          arr.push("x");
        } else {
          arr.push(0);
        }
        if (j === 10) {
          continue;
        }
        const cell = document.createElement("div");
        cell.id = `r${i}c${j}${this.playID}`;
        cell.classList.add("empty");
        this.boardEl.appendChild(cell);
      }
      this.boardArr.push(arr);
    }
    
  }

  render() {
    if (this.gameOver) return
    this.renderActivePeice();
    this.renderNextPiece();
    document.getElementById(`p${this.playID}_score-game${this.isMulti}`).innerText = this.score
  }

  renderActivePeice() {
    for (
      let i = 0;
      i < this.activePieceArr[this.pieceOrientation].length;
      i++
    ) {
      for (
        let j = 0;
        j < this.activePieceArr[this.pieceOrientation][i].length;
        j++
      ) {
        if (
          this.boardArr[i + this.piecePosition[1]][j + this.piecePosition[0]] ==
          "x"
        ) {
          continue;
        }
        this.boardArr[i + this.piecePosition[1]][j + this.piecePosition[0]] =
          this.activePieceArr[this.pieceOrientation][i][j];
      }
    }

    for (let i = 0; i < this.boardArr.length; i++) {
      for (let j = 0; j < this.boardArr[i].length - 1; j++) {
        const el = document.getElementById(`r${i}c${j}${this.playID}`);
        el.removeAttribute("class");
        if (this.boardArr[i][j] === 1) {
          el.classList.add(this.activePieceArr.color);
        } else if (this.boardArr[i][j] == "x") {
          el.classList.add("placed");
        } else if (this.boardArr[i][j] === 0) {
          el.classList.add("empty");
        }
      }
    }
  }
  renderNextPiece() {
    for (let i = 0; i < this.nextArr.length; i++) {
      for (let j = 0; j < this.nextArr[i].length; j++) {
        const el = document.getElementById(`nextr${i}c${j}${this.playID}`);
        this.nextArr[i][j] = 0;
      }
    }

    for (let i = 0; i < this.nextPieceArr[0].length; i++) {
      for (let j = 0; j < this.nextPieceArr[0][i].length; j++) {
        this.nextArr[i][j] = this.nextPieceArr[0][i][j];
      }
    }

    for (let i = 0; i < this.nextArr.length; i++) {
      for (let j = 0; j < this.nextArr[i].length; j++) {
        const el = document.getElementById(`nextr${i}c${j}${this.playID}`);
        el.removeAttribute("class");
        if (this.nextArr[i][j] === 1) {
          el.classList.add(this.nextPieceArr.color);
        } else if (this.nextArr[i][j] === 0) {
          el.classList.add("empty");
        } else {
          el.removeAttribute("class");
        }
      }
    }
  }

  clearPrevPiece() {
    for (
      let i = 0;
      i < this.activePieceArr[this.pieceOrientation].length;
      i++
    ) {
      for (
        let j = 0;
        j < this.activePieceArr[this.pieceOrientation][i].length;
        j++
      ) {
        if (
          this.boardArr[i + this.piecePositionPrev[1]][
            j + this.piecePositionPrev[0]
          ] == 1
        ) {
          this.boardArr[i + this.piecePositionPrev[1]][
            j + this.piecePositionPrev[0]
          ] = -1;
        }
      }
    }

    for (let i = 0; i < this.boardArr.length; i++) {
      for (let j = 0; j < this.boardArr[i].length; j++) {
        const el = document.getElementById(`r${i}c${j}${this.playID}`);
        if (this.boardArr[i][j] === -1) {
          el.classList.add("empty");
          this.boardArr[i][j] = 0;
        }
      }
    }
  }
  collision() {
    if (
      this.piecePosition[1] + 1 >
      20 - this.activePieceArr[this.pieceOrientation].length
    ) {
      return true;
    }

    let cp_boardArr = this.boardArr.map(function (arr) {
      return arr.slice();
    });

    for (
      let i = 0;
      i < this.activePieceArr[this.pieceOrientation].length;
      i++
    ) {
      for (
        let j = 0;
        j < this.activePieceArr[this.pieceOrientation][i].length;
        j++
      ) {
        if (
          cp_boardArr[i + this.piecePosition[1] + 1][
            j + this.piecePosition[0]
          ] == "x" &&
          this.activePieceArr[this.pieceOrientation][i][j] !== 0
        ) {
          return true;
        }
      }
    }
    return false;
  }
  checkWalls(direction) {
    let x;
    let v;
    if (direction == 1) {
      x = 1;
      v = 10;
    } else {
      x = -1;
      v = -1;
    }
    for (
      let i = 0;
      i < this.activePieceArr[this.pieceOrientation].length;
      i++
    ) {
      for (
        let j = 0;
        j < this.activePieceArr[this.pieceOrientation][i].length;
        j++
      ) {
        if (
          j + this.piecePosition[0] + x === v &&
          this.activePieceArr[this.pieceOrientation][i][j] !== 0
        )
          return true;
      }
    }
    return false;
  }
  checkPeiceCollision(direction) {
    let x;
    let v;
    if (direction == 1) x = 1;
    else x = -1;

    let cp_boardArr = this.boardArr.map(function (arr) {
      return arr.slice();
    });

    for (
      let i = 0;
      i < this.activePieceArr[this.pieceOrientation].length;
      i++
    ) {
      for (
        let j = 0;
        j < this.activePieceArr[this.pieceOrientation][i].length;
        j++
      ) {
        if (
          cp_boardArr[i + this.piecePosition[1]][
            j + this.piecePosition[0] + x
          ] == "x" &&
          this.activePieceArr[this.pieceOrientation][i][j] !== 0
        ) {
          return true;
        }
      }
    }
    return false;
  }
  checkRotate() {
    let copy_peice_orietation =
      (this.pieceOrientation + 1) %
      (Object.keys(this.activePieceArr).length - 1);

    let cp_boardArr = this.boardArr.map(function (arr) {
      return arr.slice();
    })
    for (
      let i = 0;
      i < this.activePieceArr[copy_peice_orietation].length;
      i++
    ) {
      for (
        let j = 0;
        j < this.activePieceArr[copy_peice_orietation][i].length;
        j++
      ) {
        cp_boardArr[i + this.piecePosition[1]][j + this.piecePosition[0]] +=
          this.activePieceArr[copy_peice_orietation][i][j];

        if (
          cp_boardArr[i + this.piecePosition[1]][j + this.piecePosition[0]] ==
          "x1"
        )
          return true;
      }
    }

    return false;
  }

  newPiece() {
    for (let i = 0; i < this.boardArr.length; i++) {
      for (let j = 0; j < this.boardArr[i].length; j++) {
        if (this.boardArr[i][j] == 1) {
          this.boardArr[i][j] = "x"
        }
      }
    }

    this.checkLine();
    this.activePiece = this.nextPiece;
    this.activePieceArr = TETRAMINOS[this.activePiece]
    this.nextPiece = CODES[Math.floor(Math.random() * CODES.length)]
    this.nextPieceArr = TETRAMINOS[this.nextPiece];
    this.piecePosition = [3, 0]
    this.piecePositionPrev = this.piecePosition;
    this.pieceOrientation = 0;
    this.render();
  }

  movePeice() {
    if (this.collision()) {
      this.newPiece()
    } else {
      this.clearPrevPiece()
      this.piecePositionPrev = this.piecePosition;
      this.piecePosition[1]++
    }
  }
  checkLine() {
    let xs = ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]
    let os = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "x"]
    for (let i = 0; i < this.boardArr.length; i++) {
      if (this.boardArr[i].every((item) => xs.includes(item))) {
        this.boardArr.splice(i, 1)
        this.boardArr.unshift(os)
        this.speed = this.speed - this.speedMultiplier * 5
        this.speedMultiplier += 0.05
        this.lineCount += 1
        this.checkLine()
        if (this.lineCount === 1) {
          this.score += 40;
        } else if (this.lineCount === 2) {
          this.score += 100;
        } else if (this.lineCount === 3) {
          this.score += 300;
        } else if (this.lineCount === 4) {
          this.score += 1200;
        }
        if(this.lineCount == 4){
          LINE_AUDIO_4.volume = 0.2
          LINE_AUDIO_4.play()
        }
        else{
          LINE_AUDIO.playbackRate = 5
          LINE_AUDIO.volume = 0.15
          LINE_AUDIO.play()
        }
        
        this.lineCount = 0;
        
        clearInterval(this.ticker)

        this.tickerFunc()
      } else continue
    }
  }
  isGameOver() {
    if (this.boardArr[0].slice(0, 9).includes("x")) {
      this.gameOver = true
      return
    }
  }
  newGame (){
    
    if(this.id[this.id.length-1] == 2){
      MULTI_AUDIO.currentTime = 0
      document.getElementById(`end-screen-2`).style.display = "none"
      board_1 = new Board(p1_board, p1_next, 1, 2)
      board_2  = new Board(p2_board, p2_next, 2, 2)
      board_2.play()
      board_1.play()

    }
    else{
      TETRIS_AUDIO.currentTime = 0
      document.getElementById("end-screen-1").style.display = "none";
      board_1 = new Board(boardEl, nextEl,1,1);
      board_1.play();
    }
  }
  tickerFunc() {
    //takeUserInput(this);
    const onTick = () => {
      this.isGameOver();
      if (this.gameOver) {
        this.endGame();
        return;
      }
      this.movePeice();
      this.render();
    };
    this.ticker = setInterval(onTick, this.speed);
  }

  play() {
    this.render();
    this.tickerFunc();
    return
  }

  endGame() {
    clearInterval(this.ticker);
    
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          document.getElementById(`nextr${i}c${j}${this.playID}`).remove()
        }
      }
  
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 10; j++) {
          document.getElementById(`r${i}c${j}${this.playID}`).remove()
        }
      }
    
    document.getElementById(`p${this.playID}_score-game${this.isMulti}`).style.display = 'none'
    this.scoreEl.remove() 
    
    
    
    if (this.isMulti == 2 && !(board_1.gameOver == true && board_2.gameOver == true)){
      return
    }
    else if(this.isMulti == 2){
      if (board_1.score == board_2.score){
        winner = 't'
      } else if(board_1.score > board_2.score){
        winner = '1'
      } else winner = '2'
    }
    


    
    document.getElementById(`end-screen-${this.isMulti}`).style.display = "flex";

    if(this.isMulti == 1) {
      TETRIS_AUDIO.volume = 0.1
      document.getElementById("score").innerText = `SCORE: ${this.score}`
      document
      .getElementById(`play-again-${this.isMulti}`)
      .addEventListener("click", this.newGame);
    document.getElementById(`go-home-${this.isMulti}`).addEventListener("click", () => {
      containerEl.style.display = 'none'
      document.getElementById(`end-screen-2`).style.display = "none"
      document.getElementById("home").style.display = "flex"
      TETRIS_AUDIO.pause()
      TETRIS_AUDIO.currentTime = 0
    })   
    }
    else {
      MULTI_AUDIO.volume = 0.1
      document.getElementById("winner").innerText = WINNER_MSG[winner]
    
    document
      .getElementById(`play-again-${this.isMulti}`)
      .addEventListener("click", this.newGame);
    document.getElementById(`go-home-${this.isMulti}`).addEventListener("click",  () => {
      document.getElementById(`end-screen-${this.isMulti}`).style.display = "none"
      multiContainer.style.display = 'none'
      document.getElementById("home").style.display = "flex"
      })
    }
    
  }

  translatePiece(direction) {
    if (this.checkWalls(direction)) {
      return;
    } else if (this.checkPeiceCollision(direction)) {
      return;
    }
    this.clearPrevPiece();
    if (direction) this.piecePosition[0]++;
    else this.piecePosition[0]--;
  }
  rotatePeice() {
    if (this.checkRotate()) {
      return;
    }
    this.clearPrevPiece();

    this.pieceOrientation =
      (this.pieceOrientation + 1) %
      (Object.keys(this.activePieceArr).length - 1);
  }

  // takeUserInput(codeBoard) {
  //   let up,left,down,right
  //   if(this.playID === 1){
  //       up = 38
  //       left = 37
  //       right = 39
  //       down = 40
  //   } else if (this.playID === 2){
  //       up = 87
  //       left = 65
  //       right = 68
  //       down = 83
  //   }
  //   if (this.gameOver) {
  //     return;
  //   } else {
  //     document.onkeyup = (e) => {
  //       if (e.code == down) {
  //         this.movePeice();
  //         this.render();
  //       } else if (e.code == left) {
  //         this.translatePiece(0);
  //         this.render();
  //       } else if (e.code == right) {
  //         this.translatePiece(1);
  //         this.render();
  //       } else if (e.code == up) {
  //         this.rotatePeice();
  //         this.render();
  //       }
  //     };
  //   }
  // }
}

function init() {
  
  // ! CACHED DOM ELEMENTS
  
  homeEl.addEventListener("click", function (evt) {
    if (evt.target.id == "p1") {
      containerEl.style.display = "grid"
      homeEl.style.display = "none"
      board_1 = new Board(boardEl, nextEl, 1, 1)
      board_1.play()
      TETRIS_AUDIO.volume = 0.4
      TETRIS_AUDIO.play()

      TETRIS_AUDIO.loop = true;
    }
    else if(evt.target.id == 'p2'){
      multiContainer.style.display = "grid"
      homeEl.style.display = "none"
      MULTI_AUDIO.volume = 0.4
      MULTI_AUDIO.loop = true
      MULTI_AUDIO.play()
      board_1 = new Board(p1_board, p1_next, 1, 2)
      board_2  = new Board(p2_board, p2_next, 2, 2)
      board_2.play()
      board_1.play()
      
        
          
    }
  });
}

window.addEventListener("DOMContentLoaded", init);
const homeEl = document.getElementById("home")
const multiContainer = document.getElementById('grid-container-2')
const p1_board = document.getElementById('p1_board')
const p2_board = document.getElementById('p2_board')
const p1_next = document.getElementById('p1_next')
const p2_next = document.getElementById('p2_next')
const containerEl = document.getElementById("grid-container");
const boardEl = document.getElementById("board");
const nextEl = document.getElementById("next");
let winner;

document.addEventListener('keyup', function(e){

  if(typeof(board_1) === 'undefined' || (board_1.gameOver == true &&board_2.gameOver == true)){
    return
  }
  else{
    if (['ArrowDown',"ArrowLeft","ArrowRight",'ArrowUp'].includes(e.code)){
      if (e.code == 'ArrowDown') {
      board_1.movePeice();
      board_1.render();
      } else if (e.code == 'ArrowLeft') {
      board_1.translatePiece(0);
      board_1.render();
      } else if (e.code == "ArrowRight") {
      board_1.translatePiece(1);
      board_1.render();
      } else if (e.code == 'ArrowUp') {
      board_1.rotatePeice();
      board_1.render();
      }
    } else if(board_2.gameOver == true) return
    else if (['KeyS','KeyA','KeyD','KeyW'].includes(e.code)){
      if (e.code == 'KeyS') {
        board_2.movePeice();
        board_2.render();
        } else if (e.code == 'KeyA') {
        board_2.translatePiece(0);
        board_2.render();
        } else if (e.code == 'KeyD') {
        board_2.translatePiece(1);
        board_2.render();
        } else if (e.code == 'KeyW') {
        board_2.rotatePeice();
        board_2.render();
        }
    }
  }

})

