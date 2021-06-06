
const gameBoard = (() => { // module

    let container = document.querySelectorAll('.grid-block');

    let tileArray = []
    let letterArray = []

    container.forEach((tile) => {
        
        tile.addEventListener('click', function(e) {
            console.log(gameController.getGameOn());
            if (gameController.getGameOn() && e.target.textContent == '') {
                let p = gameController.getPlayerTurn();

                letterArray[e.target.getAttribute('id')] = p.letter;
                e.target.textContent = p.letter;
                e.target.setAttribute('color', p.color);

                console.log(e.target.getAttribute('id') + ' ' + p.letter);
                
                detectWin(p);
                gameController.nextTurn();
            }
        });
        tile.setAttribute('id', tileArray.length);
        tileArray[tileArray.length] = tile;
    });
    
    const detectWin = (p) => {
        const totalLetters = letterArray.reduce((total, letter) => {
            if (letter !== undefined) {
                return total + 1;
            }
        }, 0);

        let l = p.letter;
        if ((letterArray[0] == l && letterArray[1] == l && letterArray[2] == l) 
        || (letterArray[3] == l && letterArray[4] == l && letterArray[5] == l) 
        || (letterArray[6] == l && letterArray[7] == l && letterArray[8] == l)
        || (letterArray[0] == l && letterArray[3] == l && letterArray[6] == l)
        || (letterArray[1] == l && letterArray[4] == l && letterArray[7] == l)
        || (letterArray[2] == l && letterArray[5] == l && letterArray[8] == l)
        || (letterArray[0] == l && letterArray[4] == l && letterArray[8] == l)
        || (letterArray[2] == l && letterArray[4] == l && letterArray[6] == l)) {
            gameController.endGame(p.playerName + " wins!");
        } else if (totalLetters == 9) {
            gameController.endGame("Tie!");
        }
    }

    const clear = () => {
        tileArray = []
        letterArray = []

        container.forEach((tile) => {
            tile.textContent = '';
        });

    }

    return {tileArray, clear}
})();

const gameController = (() => { // module
    let currentPlayer;
    let p1;
    let p2;
    let gameOn = false;

    let displayElement = document.querySelector('#display');

    let setPlayers = (player1, player2) => {
        gameBoard.clear();
        displayElement.textContent = '';
        p1 = player1;
        p2 = player2;
        
        currentPlayer = p1;
        displayElement.textContent = currentPlayer.playerName + "'s turn!";

        console.log(`New Players: ${p1.playerName} and ${p2.playerName}`);
        gameOn = true;
    }

    let nextTurn = () => {
        if (gameController.getGameOn()) {
            if (currentPlayer == p2) {
                currentPlayer = p1;
            } else {
                currentPlayer = p2;
            }
            displayElement.textContent = currentPlayer.playerName + "'s turn!";
            console.log('Switching to ' + currentPlayer.playerName)
        }
    };

    let getPlayerTurn = () => {
        console.log('Current player is ' + currentPlayer.playerName)
        return currentPlayer;
    }

    let getGameOn = () => {
        console.log('Game on is ' + gameOn)
        return gameOn;
    }

    let endGame = (message) => {
        gameOn = false;
        displayElement.textContent = message;
    }

    return {setPlayers, getPlayerTurn, getGameOn, nextTurn, endGame, gameOn};
})();

const buttonManager = (() => {
    let setUpButtons = () => {
        let button = document.querySelector('#newgame');
        button.addEventListener('click', function(e) {
            let p1 = Player('Player 1', 'O', 'red');
            let p2 = Player('Player 2', 'X', 'blue');
            gameController.setPlayers(p1, p2);
        });
    };

    return {setUpButtons};
})();


const Player = (playerName, letter, color) => {
    return {playerName, letter, color};
};

function game() {
    buttonManager.setUpButtons();
    let p1 = Player('Player 1', 'O', 'red');
    let p2 = Player('Player 2', 'X', 'blue');
    console.log(gameController.getGameOn());
    gameController.setPlayers(p1, p2);
    console.log(gameController.getGameOn());
}


function tests() {
    gameBoard.tileArray.forEach((tile) => {
        console.log(tile.textContent)
    });
    
    let p1 = Player('Player 1', 'O', 'red');
    let p2 = Player('Player 2', 'X', 'blue');
    console.log(p1);
    
    gameController.setPlayers(p1, p2);
    gameController.getPlayerTurn();
    gameController.nextTurn();
    gameController.getPlayerTurn();
    gameController.nextTurn();
    gameController.getPlayerTurn();
}

game();


