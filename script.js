//Play Board é a TELA ou tabuleiro
/* Container onde a cobra e a comida serão renderizadas */
const playBoard = document.querySelector("play-board");
// Placar atual do jogador
const scoreElement = document.querySelector(".score");
//Record (maior pontuação)
const highScoreElement = document.querySelector(".high-score");
// Controle de movimento
/* Seleciona Elementos <i> Icones Botões para Devices Mobiles */
const controls = document.querySelectorAll(".controls i")

//Cadastro de Variaveis

/* Variavel Boleana que indica se o jogo terminou */
let gameOver = false;
// Variavel para armazenar as coordenadas X e Y da Comida
let foodX, foodY;
// Armazena as coordenadas da cabeça da cobra(posição inicial de 5)
let snakeX = 5, snakeY = 5;
/* Variavel para armazenar a velocidade nas direções X e, inicialmente em 0,
porq a cobra está parada*/
let velocityX = 0, velocityY = 0;
/* uma Array para armazenar as coordenadas de cada segmento do corpo,
primeiro elemento é a cabeça */
let snakeBody = [];
/* variavel para armazenar o ID do intervalo que será usado 
para atualzar o jogo em um determinado ritmo. */
let setIntervalId;
// Uma variavel para manter o controle da pontuação atual do jogador 
let score = 0



// Obtenha pontuação alta do armazenamento local
/* Tenta recurar o valor associado à chave "high-score do
armazenamento local do navegador" */
let highScore = localStorage.getItem("high-score") || 0;
/* Se o localStorage retornar NULL (caso ele nao exista), a
variavel high-store sera definida como 0*/


// Posição aleatoria entre 1 e 30 para a comida
/* Gera coordenadas aleatorias para a nova posição de comida */
const updateFoodposition = () => {
    //retorna o numero de ponto flutuante pseudoaleatório
    foodX = Math.floor(Math.random() * 30) + 1;
    // * 30: Multiplica o número aleatorio por 30 para obter um valor entre 0 e quase 30
    // Math.floor(): Arredonda o resultado para o numero inteiro mais proximo (entre 0 e 29)
    //+1: Adiciona 1 para garantir que as coordenadas da comida estejam entre 1 e 30.
    foodX = Math.floor (Math.random() *30) +1;
    foodY = Math.floor (Math.random() *30) +1;
}

//Função para lidar com o fim do Jogo
/* Função handleGameOver = quando a cobra colide consigo mesma ou com as paredes do tabuleiro */

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Press Ok for retry🐛");
    location.reload();
}