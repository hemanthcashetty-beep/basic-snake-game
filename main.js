const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreText = document.getElementById("score");

const size = 12;
let snake;
let food;
let direction;
let score;
let loop;

function startGame() {
  clearInterval(loop);

  snake = [
    { x: 120, y: 120 },
    { x: 108, y: 120 },
    { x: 96, y: 120 }
  ];

  direction = "RIGHT";
  score = 0;
  scoreText.textContent = "Score: 0";

  createFood();
  loop = setInterval(update, 150);
}

function changeDirection(newDirection) {
  if (newDirection === "UP" && direction !== "DOWN") direction = "UP";
  if (newDirection === "DOWN" && direction !== "UP") direction = "DOWN";
  if (newDirection === "LEFT" && direction !== "RIGHT") direction = "LEFT";
  if (newDirection === "RIGHT" && direction !== "LEFT") direction = "RIGHT";
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") changeDirection("UP");
  if (event.key === "ArrowDown") changeDirection("DOWN");
  if (event.key === "ArrowLeft") changeDirection("LEFT");
  if (event.key === "ArrowRight") changeDirection("RIGHT");
});

function createFood() {
  food = {
    x: Math.floor(Math.random() * 20) * size,
    y: Math.floor(Math.random() * 20) * size
  };
}

function update() {
  let head = { ...snake[0] };

  if (direction === "UP") head.y -= size;
  if (direction === "DOWN") head.y += size;
  if (direction === "LEFT") head.x -= size;
  if (direction === "RIGHT") head.x += size;

  const hitWall =
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height;

  const hitSelf = snake.some(
    part => part.x === head.x && part.y === head.y
  );

  if (hitWall || hitSelf) {
    clearInterval(loop);
    alert("Game Over! Score: " + score);
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreText.textContent = "Score: " + score;
    createFood();
  } else {
    snake.pop();
  }

  draw();
}

function draw() {
  ctx.fillStyle = "#b6d78a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, size, size);

  ctx.fillStyle = "#174b1a";
  snake.forEach(part => {
    ctx.fillRect(part.x, part.y, size - 1, size - 1);
  });
}

startGame();