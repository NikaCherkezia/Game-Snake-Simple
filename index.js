const grid = document.querySelector(".grid");
const startButton = document.querySelector("#start");
const scoreDisplay = document.getElementById("score");
const gameOwer = document.querySelector(".game-over");
const width = 10;

let squares = [];
let currentSnake = [2,1,0];
let direction = 1;
let appleIndex = 0;
let speed = 1000;
let score = 0;
let timerId;


function createGrid() {

    for (let i = 0; i < width * width; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        grid.appendChild(square);
        squares.push(square);              
    }
}

createGrid();

currentSnake.forEach(index => squares[index].classList.add("snake"));

function startGame() {
    clearInterval(timerId);
    currentSnake.forEach(index => squares[index].classList.remove("snake"));
    squares[appleIndex].classList.remove("apple");
    currentSnake = [2,1,0];
    direction = 1;
    speed = 1000;
    score = 0;
    scoreDisplay.textContent = score;
    currentSnake.forEach(index => squares[index].classList.add("snake"));
    generateApples();

    timerId = setInterval(move, speed);
}


function move() {
    if (
        (currentSnake[0] + width >= width * width && direction === width) ||
        (currentSnake[0] % width === width -1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains("snake")
        ) {
        
        currentSnake.forEach(index => squares[index].classList.remove("snake"));
        squares[appleIndex].classList.remove("apple");
        return clearInterval(timerId);
    }
    


    const tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);

    if (squares[currentSnake[0]].classList.contains("apple")){
        squares[appleIndex].classList.remove("apple");
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        generateApples();
        score += 1;
        scoreDisplay.textContent = score;

        clearInterval(timerId);
        speed *= 0.9;
        timerId = setInterval(move, speed);                    
        
    }


    squares[currentSnake[0]].classList.add("snake");

    
}





function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake"));

    squares[appleIndex].classList.add("apple");
}
generateApples();

function control(e) {
   
    if (direction !== -1 && e.keyCode === 39) {
        direction = 1;
    } else if (direction !== width && e.keyCode === 38) {
        direction = - width;
    } else if (direction !== 1 && e.keyCode === 37) {
        direction = -1;
     }else if (direction !== -width && e.keyCode === 40) {
        direction = + width;
    }

    
}

document.addEventListener("keydown", control)
startButton.addEventListener("click", startGame)
