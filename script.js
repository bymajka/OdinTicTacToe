function createGameboard() {
    const gameboard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];
    return {gameboard};
}

function createPlayer(marker, name, game_color) {
    return {marker, name, game_color}
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
            displayController.showWiner(activePlayer.name);
        }
        swapPlayerTurn();
    }
    };

    const swapPlayerTurn = () =>{
        activePlayer = activePlayer === player1 ? player2 : player1;
        displayController.showTurnQueue(activePlayer);
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
        displayController.hideWiner();
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
    const winerLabel = document.querySelector('.show-winer');
    const turnQueue = document.querySelector('.turn-management');

    const displayBoardOnScreen = () => {
        for(let row = 0; row < 3; row++){
            for(let column = 0; column < 3; column++){
                const cellIndex = row * 3 + column;
            const cell = gameboardCells[cellIndex];
            const marker = playingGameboard.gameboard[row][column];

            // Clear cell content and styles
            cell.innerHTML = '';
            cell.style.backgroundColor = '';

            if (marker === 'X') {
                cell.innerHTML = marker;
                cell.style.backgroundColor = player1.game_color; // Use player1's color
            } else if (marker === 'O') {
                cell.innerHTML = marker;
                cell.style.backgroundColor = player2.game_color; // Use player2's color
            }
            }
        }
    }

    const showWiner = (player) => {
        winerLabel.style.display = 'block';
        winerLabel.innerHTML = `${player} wins!`;
    }

    const hideWiner = () => {
        winerLabel.style.display = 'none';
        winerLabel.innerHTML = '';
    }

    const showTurnQueue = (player) =>{
        turnQueue.classList.add('fade-out'); 
    
    setTimeout(() => {
        if (player.name === "Player One") {
            turnQueue.innerHTML = "First player's turn ( X )";
        } else {
            turnQueue.innerHTML = "Second player's turn ( O )";
        }
        turnQueue.classList.remove('fade-out'); 
        turnQueue.classList.add('fade-in'); 
    }, 500); 

    setTimeout(() => {
        turnQueue.classList.remove('fade-in'); 
    }, 1000); 
    }

    return {gameboardCells, displayBoardOnScreen, showWiner, hideWiner, showTurnQueue};
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

let player1 = createPlayer('X', "Player One", "#81BFDA");
let player2 = createPlayer('O', "Player Two", "#FADA7A");

const gamemanager = createGamemanager();
const displayController = createDisplayController();
displayController.showTurnQueue(gamemanager.activePlayer);
inputController();