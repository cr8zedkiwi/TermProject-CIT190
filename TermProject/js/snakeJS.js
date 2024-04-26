let squareSize = 30;
let total_row = 26;
let total_col = 26;
let snakeGame;
let context;
let score = 0;
let highScore = 0;

let snakeX = squareSize * 5;
let snakeY = squareSize * 5;


let speedX = 0;
let speedY = 0;

let snakeBody = [];

let foodX;
let foodY;

let gameOver = false;

window.onload = function () {
	// Set snakeGame height and width
	snakeGame = document.getElementById("snakeGame");
	snakeGame.height = total_row * squareSize;
	snakeGame.width = total_col * squareSize;
	context = snakeGame.getContext("2d");

    highScore = localStorage.getItem("highScore") || 0;

	placeFood();
	document.addEventListener("keyup", changeDirection);
	//snake speed
	setInterval(update, 1000 / 10);
};


function update() {
	if (gameOver) {
		return;
	}

	// Background of the snake Game
	context.fillStyle = "#FEE102";
	context.fillRect(0, 0, snakeGame.width, snakeGame.height);

	// Set my food color and position
	context.fillStyle = "red";
	context.fillRect(foodX, foodY, squareSize, squareSize);

	if (snakeX == foodX && snakeY == foodY) {
        score++;
        if (score > highScore) {
            highScore=score;
            localStorage.setItem("highScore", highScore);
        }
		snakeBody.push([foodX, foodY]);
		placeFood();
	}

    context.fillStyle = "red";
    context.fillText("Score: " + score, 10, 30);
    context.font = "32px Arial";


    context.fillText("High Score: " + highScore, 550, 30);


	// How our snake grows
	for (let i = snakeBody.length - 1; i > 0; i--) {

		snakeBody[i] = snakeBody[i - 1];
	}
	if (snakeBody.length) {
		snakeBody[0] = [snakeX, snakeY];
	}

    //setting color and position of snake at start
	context.fillStyle = "purple";
	snakeX += speedX * squareSize;
	snakeY += speedY * squareSize;
	context.fillRect(snakeX, snakeY, squareSize, squareSize);
	for (let i = 0; i < snakeBody.length; i++) {
		context.fillRect(snakeBody[i][0], snakeBody[i][1], squareSize, squareSize);
	}

    // If snake out of bounds end game condition    
	if (snakeX < 0 
		|| snakeX > total_col * squareSize 
		|| snakeY < 0 
		|| snakeY > total_row * squareSize) { 
		
		gameOver = true;
		alert("You Went Out Of Bounds!");
	}
    //If Snake eats own body
	for (let i = 0; i < snakeBody.length; i++) {
		if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) { 
			
			// Snake eats own body
			gameOver = true;
			alert("You Ran Into Yourself!");
		}
	}
}

//This allows us to use our arrow keys to control the snake
function changeDirection(e) {
	if (e.code == "ArrowUp" && speedY != 1) { 
		speedX = 0;
		speedY = -1;
	}
	else if (e.code == "ArrowDown" && speedY != -1) {
		speedX = 0;
		speedY = 1;
	}
	else if (e.code == "ArrowLeft" && speedX != 1) {
		speedX = -1;
		speedY = 0;
	}
	else if (e.code == "ArrowRight" && speedX != -1) { 
		speedX = 1;
		speedY = 0;
	}
}

//random food placement
function placeFood() {

	foodX = Math.floor(Math.random() * total_col) * squareSize; 
	
	foodY = Math.floor(Math.random() * total_row) * squareSize; 
}

//binding the button in html to our function in javascript
$(document).ready(function (){
    $('#playAgain').on('click', function(){
        playAgain();
    })
})

//resetting variables to restart the game
function playAgain(){
     score = 0;
     snakeX = squareSize * 5;
     snakeY = squareSize * 5;
     speedX = 0;
     speedY = 0;
     snakeBody = [];
     gameOver = false;
 
     context.clearRect(0, 0, snakeGame.width, snakeGame.height);
 
     placeFood();
}