const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext('2d');
const scoreText = document.querySelector('#scoreText');
const resetBtn = document.querySelector('#resetBtn');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
            {x:unitSize *4, y:0},
            {x:unitSize *3, y:0},
            {x:unitSize *2, y:0},
            {x:unitSize *1, y:0},
            {x:0, y:0}
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame)
document.addEventListener('keydown', handleEnterKey);

gameStart();

function gameStart(){
  running = true;
  scoreText.textContent = score;
  createFood();
  drawFood();
  nextTick();
};
function nextTick(){
  if(running)
  {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 100)
  }
  else{
    displayGameOver();
  }
};
function clearBoard(){
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
};

// Function to handle the Enter key event for restarting the game
function handleEnterKey(event) {
  const ENTER_KEY_CODE = 13; // Key code for "Enter"
  if (event.keyCode === ENTER_KEY_CODE && !running) {
    resetGame();  // Restart the game when Enter is pressed
  }
}

function createFood(){
function randomFood(min, max){
    // const randomNum = Math.round((Math.random() * (max-min + 1) + min)/unitSize)*unitSize;
    const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNum;
  }
  // foodX = randomFood(0, gameWidth - unitSize);
  // foodY = randomFood(0, gameWidth - unitSize);
  foodX = randomFood(0, (gameWidth / unitSize) - 1) * unitSize;
foodY = randomFood(0, (gameHeight / unitSize) - 1) * unitSize;
};

function drawFood(){
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, unitSize, unitSize);
};
function moveSnake(){
  const head = {x: snake[0].x + xVelocity,
                y: snake[0].y + yVelocity};
  snake.unshift(head);
  if(snake[0].x == foodX && snake[0].y == foodY){
    score += 1;
    scoreText.textContent = score;
    createFood();
  }
  else{
    snake.pop();
  }
};
function drawSnake(){
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;
  snake.forEach(snakePart => {
    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  });
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38 
    const RIGHT = 39
    const DOWN = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
      case(keyPressed == LEFT && !goingRight):
        xVelocity = -unitSize;
        yVelocity = 0;
        break;
      case(keyPressed == UP && !goingDown):
        xVelocity = 0;
        yVelocity = -unitSize;
        break;
      case(keyPressed == RIGHT && !goingLeft):
        xVelocity = unitSize;
        yVelocity = 0;
        break;
      case(keyPressed == DOWN && !goingUp):
        xVelocity = 0;
        yVelocity = unitSize;
        break;
    }
};
function checkGameOver(){
  switch(true)
  {
    case (snake[0].x < 0):
      running = false;
      break;
    case (snake[0].x >= gameWidth):
      running = false;
      break;
    case (snake[0].y < 0):
      running = false;
      break;
    case (snake[0].y >= gameHeight):
      running = false;
      break;
  }

  for(let i=1; i<snake.length; i+=1){
 if(snake[i].x == snake[0].x && snake[i].y == snake[0].y)
    running = false;
  }
};
function displayGameOver(){
  ctx.font = "50px MV Boli";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER!", gameWidth/2, gameHeight/2);
  running = false;
};
function resetGame(){
  score = 0;
  xVelocity = unitSize;
  yVelocity = 0;
  snake = [
    {x:unitSize *4, y:0},
    {x:unitSize *3, y:0},
    {x:unitSize *2, y:0},
    {x:unitSize *1, y:0},
    {x:0, y:0}
];
running = true;
  gameStart();
};

