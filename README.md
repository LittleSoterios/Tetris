# Tetris



# Tetris Clone

This project is a Tetris clone implemented in JavaScript. It provides a classic Tetris gaming experience with both single-player and two-player modes. The game features intuitive controls for moving, rotating, and dropping tetromino pieces within a grid. Players aim to clear lines by filling them completely with tetrominoes, earning points and increasing the game's speed as they progress. The project utilizes HTML, CSS, and JavaScript to create an interactive and visually appealing Tetris game.

## Features

- Single-player mode with a grid for one player to play Tetris
- Two-player mode with separate grids for competitive Tetris gameplay
- Random generation of tetromino shapes with different colours
- Smooth movement, rotation, and dropping of tetromino pieces
- Scoring system to track the player's progress and performance
- Audio effects to enhance the gaming experience
- Semi-responsive design for optimal gameplay on different screen sizes

## Usage

The game can be accessed [here](https://littlesoterios.github.io/Tetris/) or by following the steps below:

1. Clone the repository: `git clone https://github.com/LittleSoterios/Tetris.git`
2. Open the project in a web browser: `index.html`
3. Choose between single-player or two-player mode
4. Use the arrow keys (or custom keys) to control the tetromino pieces
5. Aim to clear lines and achieve a high score in the game

Feel free to contribute to the project by adding new features, improving the code, or fixing any issues. Enjoy playing Tetris!

## Timeframe

The development of this Tetris clone spanned over a period of five days, during which the core gameplay mechanics and user interface were implemented. Here's a breakdown of the timeframe:

- Day 1: Basic gameplay mechanics were established, including tetromino movement, rotation, and stacking. The single-player mode and its corresponding user interface were implemented.

- Day 2: All collision logic was completed, and line clearing was added. This included adding a scoring system and speeding up the gameplay as the score increased.

- Day 3: The game was moved from canvas using 2d context, over to grid and flex-box using divs to simulate the blocks. This improved the UI and visual appearance. A home screen and play again function were added after implementing game over logic.

- Day 4: Started to implement 2-player mode (short day)

- Day 5: Finished 2-player mode - user can now navigate between all game modes and the home page

The project was successfully completed within the allocated timeframe.

## Technologies

The project was completed using vanilla Javascript, CSS and HTML. Wireframes were made in Figma and all coding was completed in VS Code.

## Breif

The goal is to create an interactive and enjoyable gaming experience while adhering to the following requirements:

### Rendering:
 The game will be rendered directly in the browser, utilizing HTML, CSS, and JavaScript.

### Win/Loss Logic: 
 The game will include win/loss conditions, and appropriate win/loss messages will be rendered in the HTML. The use of popup alerts during development is acceptable but not suitable for production.

### File Organization: 
 The project will consist of separate HTML, CSS, and JavaScript files, ensuring a clean and modular structure.

### Vanilla JavaScript:
 The game will be developed using pure JavaScript, without relying on external libraries like jQuery.

### Code Formatting: 
 The HTML, CSS, and JavaScript code will be properly indented and formatted. Consistent vertical whitespace will be maintained for improved readability.

### Code Optimization: 
 Unused and commented-out code that will never be executed will be removed to maintain a clean codebase.

### Sensible Naming: 
 Functions and variables will be named in a meaningful and descriptive manner. Functions will be named as verbs, and variables will be named as nouns to enhance code comprehension.

### Consistent Coding Style: 
The code will be written in a consistent manner, following a preferred style for function declarations or function expressions.

### Deployment: 
The completed game will be deployed online using GitHub Pages, allowing anyone to access and play the game from anywhere in the world.


## Planning:

I started development by producing wireframes of the end goal of the design for the UI and Game. These wireframes can be found here: 
### Wireframes:
https://www.figma.com/file/l2ob8cMtPi3jv2BRD1pq0F/Untitled?type=design&node-id=0%3A1&t=d4OTa3H3qfn5GkJ7-1

Psudeocode was written before programming started to give me an idea of what the game logic would look like and what variables and constants I would need
### Pseudocode 
Can be found in the root of the Repo: 'psuedocode.txt'


## Build/Code process:

I started developing a prototype of the main 1 player game. The prototype code can be found in './scripts/prototype.js' and can be tried out by opening protype.html in the page's directory.

I knew from the offset that I would want to create a class to run the main gameplay as this would make implementing the 2-player mode a lot easier down the line. The main starting point was simply creating the Tetris board and getting a tetromino to move down the board at a steady rate. This was fairly simple to implement using a SetInterval with a callback function to render the tetromino on the canvas given its position in relation to the board. The render function for the prototype can be seen below:
``` 
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
        
        for(let j = 0; j< this.boardArr[i].length; j++){
            if (this.boardArr[i][j] === 1){
            
                this.boardGr.fillStyle = this.activePieceArr. color
                this.boardGr.fillRect(j*30,i*30,30,30);
            }
            else if (this.boardArr[i][j] == 'x'){
                
                this.boardGr.fillStyle = 'white'
                this.boardGr.fillRect(j*30,i*30,30,30);
            
            } else if (this.boardArr[i][j] === 0){
                
                this.boardGr.fillStyle = 'black'
                this.boardGr.fillRect(j*30,i*30,30,30);
            
            }
        }
    }
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
```

Alongside the move piece function, this moves the tetromino down the board array and renders it on the canvas. A similar function clearPrevPiece was used the clear the previous position of the piece from the board array and the canvas.

The next features that needed to be implemented were to stop the piece once it hit the bottom and create a new active piece. From there piece collision needed to be implemented, so that pieces would stop and lock once they couldn't move down any further. Rotation was also implemented. Originally tetrominoes were represented in a 4 by 4 matrix and rotation was implemented by calculating the 90-degree rotation of the current tetromino matrix. This ended up causing issues with consistent alignment when rotated quickly so was abandoned and each separate rotation was represented in the tetrominoes being moved into an object which held their rotations and their colour. Below is an example of how the Tetraminoes were represented:

```
const TETRAMINOS = {
  o: {
    color: "red", // Tetramino color
    0: [ // Rotation 0
      [1, 1], // Row 1
      [1, 1], // Row 2
    ],
  },

  i: {
    color: "yellow", // Tetramino color
    0: [[1, 1, 1, 1]], // Rotation 0
    1: [[1], [1], [1], [1]] // Rotation 1
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
  }, ... // continued for all Tetraminoes}
  ```

Rotation collision was a tricky problem to solve and like x-axis and y-axis translation collision, it required a non-referenced copy of the board and a simulation of what the next rotation would look like to find out whether it was possible. Like all other collision functions, this would return true if there was a collision and false if there was no collision (i.e. the inputted movement from the user was possible given the state of the board). That boolean would then be used to update the position/rotation of the tetromino.

Clearing lines was fairly simple. If any rows in the board array were full of 'x's which represented placed blocks it would delete that row and unshift a new 0's (empty space) row to the top of the board.

With that, the main functionality of the gameplay was completed.

As mentioned before, while prototyping and developing the gameplay, I used canvas in 2d context to draw the Tetris board on the screen. Once I had finished this though the plan was always to implement the visualisation of the game using divs. This involved creating all of the divs within the board when I initialised and built out the board array. The code for this can be seen below (if you look carefully you can see how I've linked each div to its corresponding board array cell using template literals to code their coordinates into their element ID):

```
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
  

```

The line `if (arr.length == this.width) { arr.push("x"); ` creates an invisible wall of what the game sees as placed pieces along the right side. I admit this is a bit of a hacky solution but it solves the issue of rotating out of bounds by using the same logic as the function which checks if the tetromino would rotate into an already placed piece.

The scores were fairly simple to implement. The check line function would call itself to check for multiple lines, each time incrementing a line counter variable on the board, based on whether the player achieved one, two, three or four lines, their score would be incremented by increasing numbers matching the original Tetris scoring system.

The game over function checks if there are pieces in the top row and then stops the game loop and displays the game over overlay, showing the player their score.

### two-player mode

As mentioned I had always planned to make a 2-player mode. Thanks to the board class this was *fairly* simple to implement as the game logic was already there and multiple boards could be initialised. I used more parameters to keep track of whether the board was playing in two-player mode or one-player mode in the form of the class variables isMulti and playID. isMulti is a number (either 1 or 2) and helps create the references for the divs as the CSS for multiplayer is different than that of one player. playID was also either 1 or 2 which kept track of which player the board belonged to. Again this was useful for win logic for multiplayer as well as formatting with CSS.

## Challenges

In terms of challenges on the project, there weren't many. I did get stuck on things but never for too long as the main challenge of Tetris is really the collision logic. Once I worked out that a good way to check collisions would be to simulate what that would make the next board state look like and whether that board state would be possible or not, it became fairly straightforward to implement each collision checker. Another challenge which was talked about above was deciding how to represent the tetrominoes and how I would rotate them which was explained in the previous section.

## Wins

I completed this project without looking at any kind of Tetris-focused pseudocode (other than the pseudocode I wrote myself) or any Tetris coding tutorials. This is probably quite evident from how janky some of the code is at this version of the game (21/05/2023) however all of the main Tetris functionality works and there are no game-breaking bugs. I think the biggest win for me in this project was the first time I managed to get the first block to stop when it hit the bottom of the page. While it's pretty simple code, it reassured me that I'd be able to figure everything else out.


## Key Learnings

This was my first complex project in javascript and it's safe to say I am a lot more familiar with the syntax than I was when I started. It's difficult to quantify the key learnings from this project. Most of the concepts and methods I used to create the game were things that I was fairly confident with already. For example, looping through a 2d array. I already had plenty of experience manipulating Nd-arrays from data analysis during university. One thing that was new to me was game ticks, my understanding of setInterval and setTimeout has improved and as well understanding of CSS grid and flex-box. While I can't really put my finger on exactly what I learnt, I can definitely say that I learned that I can solve problems and apply existing knowledge to new problems. This project has definitely increased my confidence while also increasing my already high level of respect for programmers that can keep their code neat and readable.


## Bugs

The only real bugs that are present are that after a game-over scenario, the next block will still spawn which is noticeable but has no effect on the gameplay. There is most likely a very simple fix to it with the order of how the screen renders however I've yet to be able to find that fix. Another 'bug' is when you are along the very right side you can't rotate the piece if it's width is smaller than its width once rotated. This is due to the piece's rotation around 0,0 on the array which would put the piece out of bounds. A check could be implemented to check if it has space on its left to move over and rotate however as it wasn't game-breaking I chose not to fix it immediately and spent my time polishing the aesthetics of the game.

## Future Improvements

I experimented with a hardcore mode. This would involve the screen getting blurred as the score gets higher as well as rogue pieces that were unusual shapes being spawned 2% of the time. This is definitely something that I would like to implement in the future.

The scoring system for lines is the same as the original Tetris however I haven't implemented scoring for soft and hard dropping, t-spins, or all-clears. Other than t-spins these could be included with a couple of lines of code.

Race mode in two-player. The original plan as shown in my wireframes, was to have two-player mode as a race mode - first to x amount of points. That way the game would end for both players at the same time. In the end, I ran out of time to include this however it is definitely something I would like to include in the future.







