# Tetris



# Tetris Clone

This project is a Tetris clone implemented in JavaScript. It provides a classic Tetris gaming experience with both single-player and two-player modes. The game features intuitive controls for moving, rotating, and dropping tetromino pieces within a grid. Players aim to clear lines by filling them completely with tetrominoes, earning points and increasing the game's speed as they progress. The project utilizes HTML, CSS, and JavaScript to create an interactive and visually appealing Tetris game.

## Features

- Single-player mode with a grid for one player to play Tetris
- Two-player mode with separate grids for competitive Tetris gameplay
- Random generation of tetromino shapes with different colors
- Smooth movement, rotation, and dropping of tetromino pieces
- Scoring system to track the player's progress and performance
- Audio effects to enhance the gaming experience
- Semi-responsive design for optimal gameplay on different screen sizes

## Usage

1. Clone the repository: `git clone https://github.com/your-username/tetris-clone.git`
2. Open the project in a web browser: `p1.html`
3. Choose between single-player or two-player mode
4. Use the arrow keys (or custom keys) to control the tetromino pieces
5. Aim to clear lines and achieve a high score in the game

Feel free to contribute to the project by adding new features, improving the code, or fixing any issues. Enjoy playing Tetris!

## Timeframe

The development of this Tetris clone spanned over a period of five days, during which the core gameplay mechanics and user interface were implemented. Here's a breakdown of the timeframe:

    Day 1: Basic gameplay mechanics were established, including tetromino movement, rotation, and stacking. The single-player mode and its corresponding user interface were implemented.

    Day 2: All collision logic was completed, and line clearing was added. This included adding a score system and speeding up gameplay as the score increased.

    Day 3: The game was moved from canvas using 2d context, over to grid and flex-box using divs to simulate the blocks. This improved the UI and visiual apprearance. A home screen and play again function were added after implementing gameover logic.

    Day 4: Started to implement 2-player mode (short day)

    Day 5: Finished 2-player mode - user can now navigate between all game modes and the home page

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
### Psuedocode 
Can be found in the root of the Repo: 'psuedocode.txt'


## Build/Code process:

I started developing a protoype of the main 1 player game. The prototype code can be found in './scripts/prototype.js' and can be tried out by opening protype.html in the pages directory.

I knew from the offset that I would want to create a class to run the main gameplay as this would make implementing the 2-player mode a lot easier down the line. The main starting poing was simply creating the tetris board and getting a tetramino to move down the board at a steady rate. This was fairly simple to implement using a SetInterval with a callback function to render the tetramino on the canvas given it's position in relation to the board. The render function for the protyope can be seen below:
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
            
                this.boardGr.fillStyle = this.activePieceArr.color
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

Alongside the move piece function this moves the tetramino down the board array and renders it on the canvas. A similar function clearPrevPiece was used the clear the previous position of the piece from the board array and the canvas.





