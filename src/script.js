// Define HTML elements
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const highScoreText = document.getElementById('highScore');
const arrowItem = document.getElementsByClassName('arrow-item')

// Obtener el elemento div
const gameBoard = document.getElementById('game-board')

// Obtener las propiedades de la cuadrícula aplicadas al div
const gridStyles = window.getComputedStyle(gameBoard);

// Obtener las propiedades específicas de la cuadrícula
const numColumnas = gridStyles.gridTemplateColumns.split(' ').length;
const numFilas = gridStyles.gridTemplateRows.split(' ').length

// Define game variables
let randomGift = ['🎧', '🎮', '🪁', '🩳', '🎠', '🛝', '🎨','🧥', '🧣', '👟', '💍', '⚽', '⚾', '🥎', '🏀', '🏐', '🏈', '🧸', '🎸', '🚗', '🚀', '🚁', '🛩️']
const gridSize = numColumnas;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let highScore = 0;
let direction = 'right';
let gameInterval; 
let gameSpeedDelay = 200;
let gameStarted = false;
let itemToWrap = '🎧'
let giftIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#F5B03E" d="M16.4 31.73s-6.45.51-7.31 1.96c-.87 1.45-.92 3.68-.92 6.13c0 2.46-.1 8.1-.1 8.1l1.54 3.31s.29 42.19.29 43.5c0 1.3 0 2.89 1.88 3.9c1.88 1.01 49.66 24.09 51.15 24.71c2.25.93 3.32.58 3.32.58l53.09-88.79s-.17-2.43-2.38-3.01c-1.27-.32-100.56-.39-100.56-.39"/><path fill="#E07F14" d="M65.68 60.92c-.81 2.23-.44 25.29-.3 42.06c.14 16.76-.43 20.23 0 20.81c.43.58 1.6.02 4.91-1.45c6.15-2.72 35.69-17.34 37.86-18.64c2.17-1.3 7.47-3.99 8.34-5.44s1.34-14.94 1.63-25.77c.29-10.84.58-19.51.58-19.51l1.3-3.9s-.28-10.54-.33-11.7c-.09-1.92-.3-2.91-.79-2.67c-.7.33-6.54 5.12-22 12.64c-9.71 4.71-30.64 12.03-31.2 13.57"/><path fill="#FDD717" d="M65.82 11.21c-4.33-.2-16.18 6.65-27.6 10.4S9.56 32.9 9.41 33.34c-.14.43 6.94 3.6 11.46 5.77c5.37 2.57 25.87 12.28 29.62 13.87c3.76 1.59 12.72 5.31 14.16 5.2c2.02-.14 21.1-7.66 30.78-12.28s21.78-11.78 21.94-13.52c.07-.78-17.8-7.45-26.71-11.48c-17.2-7.79-21.67-9.54-24.84-9.69"/><path fill="#E37D14" d="M8.12 49.77c.15 1.88 1.18 2.55 3.8 3.69c2.62 1.14 52.15 26.87 53.29 26.87c1.14 0 1.48-4.08.23-3.97c-.68.06-16.95-7.67-32.15-15.39C20.39 54.43 8.04 47.9 8.04 47.9z"/><path fill="#BA5E0D" d="M120.01 48.99S67.12 75.89 66.6 76.15s-1.35.17-1.35.17l-.04 4.01s.49.11 1.04-.06c.32-.1 52.23-26.97 52.46-27.05s1.23-.68 1.44-1.95c.18-1.02-.14-2.28-.14-2.28"/><path fill="#AF0F1B" d="m28.86 97.42l10.35 15.4l4.53 1.55s.37-16.8.52-29.25c.21-18.19.13-34.78.39-35.72c.43-1.59 20.56-8.12 20.56-8.12S87.95 48.41 88.67 50c.32.7.07 12.48 0 26.21c-.09 17.34-.06 37.36-.06 37.36s2.35-.01 2.63-.88c.29-.87 1.45-7.58 1.45-7.58l8.82-58.79l4.48-5.78l-6.22-11.84l-25.52-12.56l-8.77 1.97l-9.49-1.45l-30.1 21.63l3.51 7.12l8.61 4.39z"/><path fill="#DC0D28" d="M91.28 49.39c-.55 1.21-.23 63.56-.23 63.56s2.75-1.52 6.29-3.22c3.52-1.69 6.05-2.74 6.27-3.62s.61-62.54.61-62.54z"/><path fill="#FF2A23" d="M41.35 48.1c.33.36-.21 65.06-.88 65.21c-.53.13-12.58-5.25-12.58-5.8c0-.55.97-62.38.97-62.38S40.37 47 41.35 48.1m23.88-33.85c-3.33 0-7.01.95-8.08 3.74s-1.31 6.94-1.31 10.04c0 2.97-.48 10.57 8.67 10.45c9.15-.12 9.42-3.51 9.56-10.99c.12-6.24-.71-9.27-1.54-10.57c-.74-1.17-3.2-2.67-7.3-2.67"/><path fill="#FCC9D2" d="M59.94 29.69c2.08.12 2.97-4.45 4.57-6.95c1.6-2.49 3.27-4.16 2.67-5.46c-.49-1.08-4.84-1.43-7.19 1.84c-1.65 2.31-1.94 10.46-.05 10.57"/><path fill="#FF2A23" d="M73.33 16.42s2.95 3 3.72 8.88s-.12 10.45-.12 10.45s14.66-.44 19.72.53c4.99.97 6.73 3.17 6.73 4.77c0 1.6-3.28 2.89-6.61 2.65s-5.58-.42-6 .42s.18 2.14 4.81 2.49c4.63.36 9.98-.3 11.64-6.06s1.72-15.74 1.13-22.93c-.59-7.19-1.89-11.3-5.11-12.86c-3.39-1.63-11.88-1.9-19.9 2.61s-10.01 9.05-10.01 9.05"/><path fill="#FCC9D2" d="M89.94 9.58c-1.04-1.34-4.39-1.3-6.18.77c-1.9 2.2-2.32 10.57.12 11.05c2.76.54 2.26-3.98 4.28-6.77c1.98-2.73 2.79-3.74 1.78-5.05"/><path fill="#FF2A23" d="M56.38 16.71S45.15 3.62 32.32 3.82c-7.72.12-9.68 4.57-10.1 6.41s-3.62 20.14.65 30.05S36 47.62 37.39 47.3c1.78-.42 5.57-1.72 5.21-3.09c-.36-1.37-12.95 3.56-13.07-2.08s8.91-6.24 13.07-6.36c4.16-.12 11.29.83 11.29.83s-1.25-6.83-.42-11.7s2.91-8.19 2.91-8.19"/><path fill="#FCC9D2" d="M28.88 8.57c-1.6 1.66-2.26 11.23-1.25 15.98s1.9 6.77 3.98 6.36c1.74-.35 2.79-9.67 3.62-12.95c.89-3.5 3.09-7.22 2.2-8.85c-1.36-2.5-6.88-2.27-8.55-.54"/></svg>'
let santaIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path fill="#F3D2A2" d="M5 21c0 2.209-1.119 4-2.5 4S0 23.209 0 21s1.119-4 2.5-4S5 18.791 5 21"/><path fill="#F3D2A2" d="M3 18.562C3 10.037 8.373 3.125 15 3.125s12 6.912 12 15.438C27 27.088 21.627 34 15 34S3 27.088 3 18.562"/><path fill="#DD2E44" d="M20 0c-.249 0-.478.007-.713.012C19.19.01 19.097 0 19 0C9 0 2 4.582 2 9s6.373 4 13 4c4.442 0 7.648 0 9.966-.086L25 13l6 15h2s.343-3.055 1-7c1-6 .533-21-14-21"/><path fill="#F3D2A2" d="M30 21c0 2.209-1.119 4-2.5 4S25 23.209 25 21s1.119-4 2.5-4s2.5 1.791 2.5 4"/><path fill="#662113" d="M10 21a1 1 0 0 1-1-1v-2a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1m10 0a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1"/><path fill="#B7755E" d="M16 26h-2a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2"/><path fill="#E6E7E8" d="M27 25c0-2-2.293-.707-3 0c-1 1-3 3-5 2c-2.828-1.414-4-1-4-1s-1.171-.414-4 1c-2 1-4-1-5-2c-.707-.707-3-2-3 0s1 2 1 2c-1 2 1 3 1 3c0 3 3 3 3 3c0 3 4 2 4 2c1 1 3 1 3 1s2 0 3-1c0 0 4 1 4-2c0 0 3 0 3-3c0 0 2-1 1-3c0 0 1 0 1-2"/><path fill="#F3D2A2" d="M15 28c7 0 4 2 0 2s-7-2 0-2"/><ellipse cx="3" cy="14" fill="#D1D3D4" rx="2" ry="4"/><ellipse cx="26" cy="14" fill="#D1D3D4" rx="2" ry="4"/><circle cx="32" cy="29" r="4" fill="#F1F2F2"/><path fill="#F1F2F2" d="M29 12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h25a2 2 0 0 1 2 2z"/></svg>'

// Draw game map, snake, food
function draw() {
  board.innerHTML = '';
  drawSnake();
  drawFood();
  updateScore();
}

// Draw snake
function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement('div', 'snake');
    setPosition(snakeElement, segment);
    snakeElement.innerHTML = giftIcon
    if(snake.indexOf(segment)===0)  snakeElement.innerHTML = santaIcon
    board.appendChild(snakeElement);
  });
}

// Create a snake or food cube/div
function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

// Set the position of snake or food
function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

// Testing draw function
// draw();

// Draw food function
function drawFood() {
  if (gameStarted) {
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    foodElement.innerHTML = itemToWrap
    board.appendChild(foodElement);
  }
}

// Generate food
function generateFood() {
  const x = Math.floor(Math.random() * gridSize) + 1;
  const y = Math.floor(Math.random() * gridSize) + 1;
  return { x, y };
}

// Moving the snake
function move() {
  const head = { ...snake[0] };
  switch (direction) {
    case 'up':
      head.y === 1 ? head.y = gridSize : head.y--;
      break;
    case 'down':
      head.y === gridSize ? head.y = 1 : head.y++;
      break;
    case 'left':
      head.x === 1 ? head.x = gridSize : head.x--;
      break;
    case 'right':
      head.x === gridSize ? head.x = 1 : head.x++;
      break;
  }

  snake.unshift(head);

  //   snake.pop();

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    itemToWrap = generateGift()
    increaseSpeed();
    clearInterval(gameInterval); // Clear past interval
    gameInterval = setInterval(() => {
      move();
      checkCollision();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
}

// Test moving
// setInterval(() => {
//   move(); // Move first
//   draw(); // Then draw again new position
// }, 200);

// Start game function
function startGame() {
  gameStarted = true; // Keep track of a running game
  instructionText.style.display = 'none';
  logo.style.display = 'none';
  gameInterval = setInterval(() => {
    move();
    checkCollision();
    draw();
  }, gameSpeedDelay);
}

// Keypress event listener
function handleKeyPress(event) {
  if (
    (!gameStarted && event.code === 'Space') ||
    (!gameStarted && event.key === ' ')
  ) {
    startGame();
  } else {
    switch (event.key) {
      case 'ArrowUp':
        direction = 'up';
        break;
      case 'ArrowDown':
        direction = 'down';
        break;
      case 'ArrowLeft':
        direction = 'left';
        break;
      case 'ArrowRight':
        direction = 'right';
        break;
    }
  }
}

document.addEventListener('keydown', handleKeyPress);

function increaseSpeed() {
  //   console.log(gameSpeedDelay);
  if (gameSpeedDelay > 150) {
    gameSpeedDelay -= 5;
  } else if (gameSpeedDelay > 100) {
    gameSpeedDelay -= 3;
  } else if (gameSpeedDelay > 50) {
    gameSpeedDelay -= 2;
  } else if (gameSpeedDelay > 25) {
    gameSpeedDelay -= 1;
  }
}

function checkCollision() {
  const head = snake[0];

  // if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
  //   resetGame();
  // }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
    }
  }
}

function resetGame() {
  updateHighScore();
  stopGame();
  snake = [{ x: 10, y: 10 }];
  food = generateFood();
  direction = 'right';
  gameSpeedDelay = 200;
  updateScore();
}

function updateScore() {
  const currentScore = snake.length - 1;
  score.textContent = currentScore.toString().padStart(3, '0');
}

function stopGame() {
  clearInterval(gameInterval);
  gameStarted = false;
  instructionText.style.display = 'block';
  logo.style.display = 'block';
}

function updateHighScore() {
  const currentScore = snake.length - 1;
  if (currentScore > highScore) {
    highScore = currentScore;
    highScoreText.textContent = highScore.toString().padStart(3, '0');
  }
  highScoreText.style.display = 'block';
}

//Generate random gift to wrap
function generateGift() {
  const random = Math.floor(Math.random() * randomGift.length)
  let itemToWrap = randomGift[random]
  return itemToWrap
}


instructionText.addEventListener('click', startGame)

for (let arrow of arrowItem) {
  let arrowDirection = arrow.attributes.value.textContent
  arrow.addEventListener('click', ()=> {
      switch (arrowDirection) {
        case 'up':
          direction = 'up';
          break;
        case 'down':
          direction = 'down';
          break;
        case 'left':
          direction = 'left';
          break;
        case 'right':
          direction = 'right';
          break;
      }
  })
}
