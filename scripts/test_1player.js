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
    this.isMulti = isMulti;
    this.scoreEl;
    if (this.isMulti == 2) {
      this.scoreEl = document.createElement("div");
      this.scoreEl.id = `p${this.playID}_score-game${this.isMulti}`;
      multiContainer.appendChild(this.scoreEl);
    } else if (this.isMulti == 1) {
      this.scoreEl = document.createElement("div");
      this.scoreEl.id = `p${this.playID}_score-game${this.isMulti}`;
      containerEl.appendChild(this.scoreEl);
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
    if (this.gameOver) return;
    this.renderActivePeice();
    this.renderNextPiece();
    document.getElementById(
      `p${this.playID}_score-game${this.isMulti}`
    ).innerText = this.score;
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
    });
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
          this.boardArr[i][j] = "x";
        }
      }
    }

    this.checkLine();
    this.activePiece = this.nextPiece;
    this.activePieceArr = TETRAMINOS[this.activePiece];
    this.nextPiece = CODES[Math.floor(Math.random() * CODES.length)];
    this.nextPieceArr = TETRAMINOS[this.nextPiece];
    this.piecePosition = [3, 0];
    this.piecePositionPrev = this.piecePosition;
    this.pieceOrientation = 0;
    this.render();
  }

  movePeice() {
    if (this.collision()) {
      this.newPiece();
    } else {
      this.clearPrevPiece();
      this.piecePositionPrev = this.piecePosition;
      this.piecePosition[1]++;
    }
  }
  checkLine() {
    let xs = ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"];
    let os = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "x"];
    for (let i = 0; i < this.boardArr.length; i++) {
      if (this.boardArr[i].every((item) => xs.includes(item))) {
        this.boardArr.splice(i, 1);
        this.boardArr.unshift(os);
        this.speed = this.speed - this.speedMultiplier * 5;
        this.speedMultiplier += 0.05;
        this.lineCount += 1;
        this.checkLine();
        if (this.lineCount === 1) {
          this.score += 40;
        } else if (this.lineCount === 2) {
          this.score += 100;
        } else if (this.lineCount === 3) {
          this.score += 300;
        } else if (this.lineCount === 4) {
          this.score += 1200;
        }
        if (this.lineCount == 4) {
          LINE_AUDIO_4.volume = 0.2;
          LINE_AUDIO_4.play();
        } else {
          LINE_AUDIO.playbackRate = 5;
          LINE_AUDIO.volume = 0.15;
          LINE_AUDIO.play();
        }

        this.lineCount = 0;

        clearInterval(this.ticker);

        this.tickerFunc();
      } else continue;
    }
  }
  isGameOver() {
    if (this.boardArr[0].slice(0, 9).includes("x")) {
      this.gameOver = true;
      return;
    }
  }
  newGame() {
    if (this.id[this.id.length - 1] == 2) {
      MULTI_AUDIO.currentTime = 0;
      document.getElementById(`end-screen-2`).style.display = "none";
      board_1 = new Board(p1_board, p1_next, 1, 2);
      board_2 = new Board(p2_board, p2_next, 2, 2);
      board_2.play();
      board_1.play();
    } else {
      TETRIS_AUDIO.currentTime = 0;
      document.getElementById("end-screen-1").style.display = "none";
      console.log("test that it removes end-screen")
      board_1 = new Board(boardEl, nextEl, 1, 1);
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
    return;
  }

  endGame() {
    clearInterval(this.ticker);

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        document.getElementById(`nextr${i}c${j}${this.playID}`).remove();
      }
    }

    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 10; j++) {
        document.getElementById(`r${i}c${j}${this.playID}`).remove();
      }
    }

    document.getElementById(
      `p${this.playID}_score-game${this.isMulti}`
    ).style.display = "none";
    this.scoreEl.remove();

    if (
      this.isMulti == 2 &&
      !(board_1.gameOver == true && board_2.gameOver == true)
    ) {
      return;
    } else if (this.isMulti == 2) {
      if (board_1.score == board_2.score) {
        winner = "t";
      } else if (board_1.score > board_2.score) {
        winner = "1";
      } else winner = "2";
    }

    document.getElementById(`end-screen-${this.isMulti}`).style.display =
      "flex";

    if (this.isMulti == 1) {
      TETRIS_AUDIO.volume = 0.1;
      document.getElementById("score").innerText = `SCORE: ${this.score}`;
      document
        .getElementById(`play-again-${this.isMulti}`)
        .addEventListener("click", this.newGame);
      document
        .getElementById(`go-home-${this.isMulti}`)
        .addEventListener("click", () => {
          containerEl.style.display = "none";
          document.getElementById(`end-screen-${this.isMulti}`).style.display = "none";
          document.getElementById("home").style.display = "flex";
          TETRIS_AUDIO.pause();
          TETRIS_AUDIO.currentTime = 0;
        });
    } else {
      MULTI_AUDIO.volume = 0.1;
      document.getElementById("winner").innerText = WINNER_MSG[winner];

      document
        .getElementById(`play-again-${this.isMulti}`)
        .addEventListener("click", this.newGame);
      document
        .getElementById(`go-home-${this.isMulti}`)
        .addEventListener("click", () => {
          MULTI_AUDIO.pause();
          MULTI_AUDIO.currentTime = 0;
          document.getElementById(`end-screen-${this.isMulti}`).style.display =
            "none";
          multiContainer.style.display = "none";
          document.getElementById("home").style.display = "flex";
        });
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
}

function init() {
  homeEl.addEventListener("click", homeClickHandler);
}

// ! EVENT LISTENERS
/**
 * Add an event listener to the home page that sets up one or two Tetris boards depending on the user's selection.
 * @param {object} evt - The event object
 * @returns {undefined}
 */
function homeClickHandler(evt) {
  // Check if the player has selected one player mode
  if (evt.target.id == "p1") {
    // Show the grid container for one player
    containerEl.style.display = "grid";
    homeEl.style.display = "none";

    // Set up the first Tetris board and start the game
    board_1 = new Board(boardEl, nextEl, 1, 1);
    board_1.play();

    // Set the volume and play the Tetris audio
    TETRIS_AUDIO.volume = 0.4;
    TETRIS_AUDIO.play();
    TETRIS_AUDIO.loop = true;
  }
  // Check if the player has selected two player mode
  else if (evt.target.id == "p2") {
    // Show the grid container for two players
    multiContainer.style.display = "grid";
    homeEl.style.display = "none";

    // Set the volume and play the multiplayer audio
    MULTI_AUDIO.volume = 0.4;
    MULTI_AUDIO.loop = true;
    MULTI_AUDIO.play();

    // Set up two Tetris boards and start the game for both players
    board_1 = new Board(p1_board, p1_next, 1, 2);
    board_2 = new Board(p2_board, p2_next, 2, 2);
    board_2.play();
    board_1.play();
  }
}

document.getElementById("button-grid").addEventListener("click", (evt) => {
  if (evt.target.id === "up") {
    document.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowUp" }));
  } else if (evt.target.id === "left") {
    document.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowLeft" }));
  } else if (evt.target.id === "down") {
    document.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowDown" }));
  } else if (evt.target.id === "right") {
    document.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowRight" }));
  }
});

// Listen for keyboard input events
document.addEventListener("keyup", (e) => {
  e.isTrusted = true;
  // If either board is undefined or both have game over, return
  if (
    typeof board_1 === "undefined" ||
    (board_1.gameOver == true && board_2.gameOver == true)
  ) {
    return;
  }
  // Otherwise, check which player pressed a key
  else {
    // If player 1 pressed a key
    if (["ArrowDown", "ArrowLeft", "ArrowRight", "ArrowUp"].includes(e.key)) {
      // Move the piece down if the down arrow is pressed
      if (e.key == "ArrowDown") {
        board_1.movePeice();
        board_1.render();
      }
      // Translate the piece left if the left arrow is pressed
      else if (e.key == "ArrowLeft") {
        board_1.translatePiece(0);
        board_1.render();
      }
      // Translate the piece right if the right arrow is pressed
      else if (e.key == "ArrowRight") {
        board_1.translatePiece(1);
        board_1.render();
      }
      // Rotate the piece clockwise if the up arrow is pressed
      else if (e.key == "ArrowUp") {
        board_1.rotatePeice();
        board_1.render();
      }
    }
    // If player 2 pressed a key
    else if (board_2.gameOver == true) {
      return;
    } else if (["KeyS", "KeyA", "KeyD", "KeyW"].includes(e.code)) {
      // Move the piece down if the S key is pressed
      if (e.code == "KeyS") {
        board_2.movePeice();
        board_2.render();
      }
      // Translate the piece left if the A key is pressed
      else if (e.code == "KeyA") {
        board_2.translatePiece(0);
        board_2.render();
      }
      // Translate the piece right if the D key is pressed
      else if (e.code == "KeyD") {
        board_2.translatePiece(1);
        board_2.render();
      }
      // Rotate the piece clockwise if the W key is pressed
      else if (e.code == "KeyW") {
        board_2.rotatePeice();
        board_2.render();
      }
    }
  }
});

window.addEventListener("DOMContentLoaded", init);

// ! CACHED DOM ELEMENTS
/**
 * The home element, used to navigate to one or two player mode.
 * @type {HTMLElement}
 */
const homeEl = document.getElementById("home");

// The container element for the two-player game grid.
const multiContainer = document.getElementById("grid-container-2");

// The game board element for player 1 in two-player mode.
const p1_board = document.getElementById("p1_board");

// The game board element for player 2 in two-player mode.
const p2_board = document.getElementById("p2_board");

// The "next piece" element for player 1 in two-player mode.
const p1_next = document.getElementById("p1_next");

// The "next piece" element for player 2 in two-player mode.
const p2_next = document.getElementById("p2_next");

// The container element for the one-player game grid.
const containerEl = document.getElementById("grid-container");

// The game board element for the current player in one-player mode.
const boardEl = document.getElementById("board");

// The "next piece" element for the current player in one-player mode.
const nextEl = document.getElementById("next");

// ! AUDIO CONSTANTS

/**
 * The background music for the game.
 * @type {HTMLAudioElement}
 */
const TETRIS_AUDIO = new Audio("./audio/tetris-lofi.wav");

//The sound effect that plays when a line is cleared.
const LINE_AUDIO = new Audio("./audio/line.wav");

//The sound effect that plays when four lines are cleared at once.
const LINE_AUDIO_4 = new Audio("./audio/4-line.wav");

//The background music for the two-player game mode.
const MULTI_AUDIO = new Audio("./audio/2-player.wav");

// ! CONSTANT OBJECTS
// Object containing winning messages for each player and tie game
const WINNER_MSG = {
  t: "It's a TIE!\nThat hardly ever happens...", // Tie game message
  1: "Player 1 wins - better luck next time Player 2", // Player 1 win message
  2: "Player 2 wins - Tetris ain't for everyone, Player 1", // Player 2 win message
};

// Object containing the tetramino shapes, colors, and their rotations
const TETRAMINOS = {
  o: {
    color: "red", // Tetramino color
    0: [
      // Rotation 0
      [1, 1], // Row 1
      [1, 1], // Row 2
    ],
  },

  i: {
    color: "yellow", // Tetramino color
    0: [[1, 1, 1, 1]], // Rotation 0
    1: [[1], [1], [1], [1]], // Rotation 1
  },

  s: {
    color: "orange", // Tetramino color
    0: [
      [0, 1, 1], // Row 1
      [1, 1, 0], // Row 2
    ],
    1: [
      [1, 0], // Row 1
      [1, 1], // Row 2
      [0, 1], // Row 3
    ],
  },

  z: {
    color: "pink", // Tetramino color
    0: [
      [1, 1, 0], // Row 1
      [0, 1, 1], // Row 2
    ],
    1: [
      [0, 1], // Row 1
      [1, 1], // Row 2
      [1, 0], // Row 3
    ],
  },

  l: {
    color: "blue", // Tetramino color
    0: [
      [1, 0], // Row 1
      [1, 0], // Row 2
      [1, 1], // Row 3
    ],
    1: [
      [1, 1, 1], // Row 1
      [1, 0, 0], // Row 2
    ],
    2: [
      [1, 1], // Row 1
      [0, 1], // Row 2
      [0, 1], // Row 3
    ],
    3: [
      [0, 0, 1], // Row 1
      [1, 1, 1], // Row 2
    ],
  },

  j: {
    color: "grey", // Tetramino color
    0: [
      [0, 1], // Row 1
      [0, 1], // Row 2
      [1, 1], // Row 3
    ],
    1: [
      [1, 1, 1], // Row 1
      [0, 0, 1], // Row 2
    ],
    2: [
      [1, 1], // Row 1
      [1, 0], // Row 2
      [1, 0], // Row 3
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
    // 90-degree rotation
    1: [
      [1, 1, 1],
      [0, 0, 1],
    ],
    // 180-degree rotation
    2: [
      [1, 1],
      [1, 0],
      [1, 0],
    ],
    // 270-degree rotation
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
    // 90-degree rotation
    1: [
      [1, 1, 1],
      [0, 1, 0],
    ],
    // 180-degree rotation
    2: [
      [1, 0],
      [1, 1],
      [1, 0],
    ],
    // 270-degree rotation
    3: [
      [0, 1, 0],
      [1, 1, 1],
    ],
  },
};

// an array of the tetramino codes
CODES = ["o", "i", "s", "z", "l", "j", "t"];

// ! Global Variables
let board_1, board_2, winner;
