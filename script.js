// Obtém o elemento canvas do documento onde o jogo será executado
let canvas = document.getElementById("snake"); 
// Contexto 2D do canvas para desenhar
let context = canvas.getContext("2d");
// Tamanho de cada "caixa" no jogo, que determina o tamanho dos elementos no jogo
let box = 32;
// Inicialização da cobra
let snake = [{ x: 8 * box, y: 8 * box }, { x: 7 * box, y: 8 * box }];
// Direção inicial da cobra
let direction = "right";
// Posição inicial da comida
let food = { x: Math.floor(Math.random() * 15 + 1) * box, y: Math.floor(Math.random() * 15 + 1) * box };
// Inicializa a pontuação e a velocidade do jogo
let score = 0; 
let speed = 300; 

// Função para criar o background do jogo
function createBG() {
    context.fillStyle = "black";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// Função para desenhar a cobra
function createSnake() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Função para desenhar a comida
function createFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// Função para desenhar a pontuação na tela
function drawScore() {
    context.fillStyle = "white";
    context.font = "16px Arial";
    context.fillText("Score: " + score, box, box);
}

// Função para atualizar a direção da cobra
function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}


// Função para atualizar a direção da cobra
function update(event) {
    // Verifica qual tecla foi pressionada e atualiza a direção de acordo
    switch(event.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (direction !== 'left') direction = 'right';
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (direction !== 'up') direction = 'down';
            break;
    }
}


// Função principal para iniciar o jogo
function startGame() {
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    // Move a cabeça da cobra na direção correta
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    // Verifica se a cobra atingiu as bordas do jogo e a faz reaparecer do outro lado
    if (snakeX < 0) snakeX = 15 * box;
    if (snakeY < 0) snakeY = 15 * box;
    if (snakeX > 15 * box) snakeX = 0;
    if (snakeY > 15 * box) snakeY = 0;

    // Verifica se a cobra comeu a comida
    if (snakeX == food.x && snakeY == food.y) {
        // Adiciona uma nova cabeça à cobra
        var newHead = { x: snakeX, y: snakeY };
        snake.unshift(newHead); 
        // Gera uma nova posição para a comida
        food = { x: Math.floor(Math.random() * 15 + 1) * box, y: Math.floor(Math.random() * 15 + 1) * box };
        // Incrementa a pontuação e ajusta a velocidade
        score += 10; 
        speed -= 10; // Ajusta a velocidade
        clearInterval(game); // Limpa o intervalo de jogo atual
        game = setInterval(startGame, speed); // Inicia um novo intervalo com a velocidade atualizada
    } else {
        // Remove o último segmento da cobra
        snake.pop();
    }

    // Verifica se a cobra colidiu consigo mesma
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x == snakeX && snake[i].y == snakeY) {
            clearInterval(game); // Para o jogo
            gameOver();
        }
    }

    // Cria uma nova cabeça para a cobra
    var newHead = { x: snakeX, y: snakeY };
    snake.unshift(newHead);

    // Desenha o background, a cobra, a comida e a pontuação na tela
    createBG();
    createSnake();
    createFood();
    drawScore();
}

// Adiciona um listener para detectar quando uma tecla é pressionada
document.addEventListener("keydown", update);

function gameOver() {
    clearInterval(game);
    document.getElementById('score').textContent = score; // Atualiza a pontuação no alerta
    document.getElementById('gameOverAlert').style.display = 'block'; // Exibe o alerta de game over
}


// Inicia o jogo chamando a função startGame repetidamente com um intervalo de tempo
var game = setInterval(startGame, speed); 
