// Play board é a Tela ou Tabuleiro
/* Conteiner onde a cobra e a comida serão rederizadas.  */
const playBoard = document.querySelector(".play-board");

// Placar atual
const scoreElement = document.querySelector(".score");

// Recorde (maoir pontuação)
const highScoreElement = document.querySelector(".record") /* O "querySelector" é para "puxar" um
elemento com alguma classe do html.*/

// Controle de movimento
/* Seleciona elementos <i> Icones Botões para Devices Mobiles. */
const controls = document.querySelectorAll(".controls i") /* o "document" vai procurar
por todo o documento html o que você está "puxando". O "querySelectorAll" "puxa"
todos os elementos com a classe ou o elemento.*/

// Cadastro de Variáveis
/* Variável Boleana que indica se o jogo terminou. */
let gameOver = false;

// Variável para armazenar as coodernadas X e Y da comida (aleatórias).
let foodX, foodY;

// Armazena as coordenadas X e Y da cabeça da cobra (posição inicial de 5).
let snakeX = 5, snakeY = 5;

// Variável para armazenar a velocidade nas direções X e Y, inicialmente em 0.
let velocityX = 0, velocityY = 0;

// Uma Array para armazenar as coordenadas de cada segmento do corpo, primeiro elemento é a cabeça.
let snakeBody = [];

// Variável para armazenar o ID do intervalo que será usado para atualizar o jogo em um determinado ritmo.
let setIntervalId;

// Variável para manter o controle da pontuação atual do jogador.
let score = 0;


// Obtenha a pontuação alto do armazenamento local
/* Tenta recuperar o valor associado à chave "high-score" do armazenamento local do navegador. */
let highScore = localStorage.getItem("high-score") || 0;
/* Se o localStorage retornar NULL (caso ele não exista), a variável highscore será definida como 0. */

// Posição aleatória entre 1 e 30 para a comida.
const updateFoodPosition = () => { // Retorna um número de ponto flutuante pseudoaleatório entre 0 e 1.
    foodX = Math.floor(Math.random()* 30) + 1; /* "* 30" Multiplica o número aleatório por 30 para obter um valor entre 0 e quase 30. O "Math.floor()" arrendonda o resultado para o inteiro mais próximo (entre 0 e 29). O "+ 1" adiciona 1 para garantir que as coordenadas da comida estejam entre 1 e 30.*/
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

// Função para lidar com o Fim do Jogo
/* Função handleGameOver = quando a cobra colide consigo mesma ou com as paredes do tabuleiro. */

const handleGameOver = () => {
    clearInterval (setIntervalId);
    alert("Game Over! Aperte Ok para iniciar novamente...");
    location.reload();
}

// Função para Mudar a direção da cobrinha
const changeDirection = e => { // "=>" é para passar a função para frente
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key})));

// Começar o Game = init Game
const initGame = () => {
    if (gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // Quando a cobra come
    if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]);
        score++;
        highScore = score >= highScore ? score : highScore;

        localStorage.setItem("highScore", highScore);
        scoreElement.innerHTML = `Score: ${score}`;
        highScoreElement.innerHTML = `High Score: ${highScore}`;
    }

    snakeX += velocityX;
    snakeY += velocityY;

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }

    // Add div para cada parte do corpo da cobra
    for (let i = 0; i < snakeBody .length; i++) {
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

        // Verifica se a cabeça da cobra atingiu ou colidiu com o corpo
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
        playBoard.innerHTML = html;
    }

}

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection);