function createGameboard() {
    const gameboard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];
    return {gameboard};
}

function createPlayer(marker, name) {
    return {marker, name}
}
function createGamemanager() {
    let activePlayer = player1;
    let gameStopped = false;
    const gameRestartButton = document.querySelector('.reset-game-button');
    
    const dropToken = (row, column) => {
        if(gameStopped == false && playingGameboard.gameboard[row][column] == ''){
        playingGameboard.gameboard[row][column] = activePlayer.marker;
        displayController.displayBoardOnScreen();
        if(checkVictory()){
            gameStopped = true;
            console.log(`${activePlayer.name} wins!`);
        }
        swapPlayerTurn();
    }
    };

    const swapPlayerTurn = () =>{
        activePlayer = activePlayer === player1 ? player2 : player1;
        console.log(activePlayer);
    };

    const checkRows = () => {
        for(let row of playingGameboard.gameboard) {
            if(row[0] !== '' && row.every(cell => cell === row[0])){
                return true;
            }
        }
        return false;
    };

    const restartGame = () => {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                playingGameboard.gameboard[row][col] = ''; 
                console.log(playingGameboard.gameboard[row][col]);
            }
        }
        gameStopped = false;
        displayController.displayBoardOnScreen();
    }

    gameRestartButton.addEventListener('click', restartGame);

    const checkColumns = () => {
        for(let column = 0; column < 3; column++){
            if(playingGameboard.gameboard[0][column] !== '' && playingGameboard.gameboard.every(row => row[column] === playingGameboard.gameboard[0][column])){
                return true;
            }
        }
        return false;
    };

    const checkDiagonals = () => {
        if (playingGameboard.gameboard[0][0] !== '' && playingGameboard.gameboard[0][0] === playingGameboard.gameboard[1][1] && playingGameboard.gameboard[1][1] === playingGameboard.gameboard[2][2]) {
          return true; 
        }
      
        if (playingGameboard.gameboard[0][2] !== '' && playingGameboard.gameboard[0][2] === playingGameboard.gameboard[1][1] && playingGameboard.gameboard[1][1] === playingGameboard.gameboard[2][0]) {
          return true; 
        }
      
        return false;
    };
      
    const checkVictory = () =>{
        if(checkColumns() || checkDiagonals() || checkRows())
        {
            return true;
        }
        return false
    };

    return {checkColumns, checkRows, checkDiagonals, checkVictory, dropToken, activePlayer, gameStopped};
}
function createDisplayController () {
    const gameboardCells = document.querySelectorAll('.game-cell');
    console.log(gameboardCells);

    const displayBoardOnScreen = () => {
        for(let row = 0; row < 3; row++){
            for(let column = 0; column < 3; column++){
                if(playingGameboard.gameboard[row][column] == ''){
                    gameboardCells[row*3 + column].innerHTML = '';
                }
                else{
                    gameboardCells[row*3 + column].innerHTML = playingGameboard.gameboard[row][column];
                }
            }
        }
    }

    return {gameboardCells, displayBoardOnScreen};
}
function inputController() {
    displayController.gameboardCells.forEach(cell => {
        cell.addEventListener('click', () => {
            const index = Array.prototype.indexOf.call(displayController.gameboardCells, cell);

            const row = Math.floor(index / 3);
            const col = index % 3;

            gamemanager.dropToken(row, col);
        })
    });
}

const playingGameboard = createGameboard();

let player1 = createPlayer('X', "Player One");
let player2 = createPlayer('O', "Player Two");

const gamemanager = createGamemanager();
const displayController = createDisplayController();
inputController();