const statusDisplay = document.querySelector('.status');

let gameActive = true;
//let currentPlayer = "X";
let currentPlayer = Math.random()> 0.5 ? "X" : "O";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// this handles the updating of the board who played
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function checkWin(){
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        updateScore();
        gameActive = false;
        statusDisplay.style.color = "rgb(255,255,255)";
        return roundWon;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(255,255,255)";
        return roundDraw;
    }
    return false;
}

function handleResultValidation() {

    checkWin();

    if(gameActive){
        handlePlayerChange();
        handleComputerMove();
    }
   
}

function handleComputerMove(){

    pickComputerMove();
    if(!checkWin())
        handlePlayerChange()

}

function pickComputerMove(){

    while(true){
        //loop through gamestate and randomly find an available spot
        var m = Math.floor(Math.random() * 8)
        if(gameState[m] == '') 
            break;
    }

    //m will have the computer move 
    gameState[m] = currentPlayer
    document.getElementById(m).innerHTML = currentPlayer
    // querySelect... 

}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = Math.random()> 0.5 ? "X" : "O"; 
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.style.color = "rgb(255, 255, 255)";
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);

//the score the game at the beginning
const score = {X:0, O:0}

//this function will update the score by one as each game ends
const updateScore = () => {
    if (currentPlayer === 'X'){
        score.X +=1;
    }
    else if(currentPlayer ==='O'){
        score.O +=1;
    }

    displayScore();
}

//this helps display the score within the html file
const displayScore = () => {
    const scoreBoard = document.getElementById("scoreboard");
    scoreBoard.innerHTML = `Player X: ${score.X}  |  Player O: ${score.O}`;
}