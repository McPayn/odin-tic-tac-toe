function Gameboard () {
    const board = Array(9).fill('');
    let playerTurn = true;
    let win_mark = '';
    const getGameboard = (i) => board[i];
    const setGameboard = (stuff, i) => board[i] = stuff;
    const getPlayerTurn = () => playerTurn;
    const setPlayerTurn = (val) => playerTurn = val;
    const clearGameboard = () => {
        for (let j = 0; j < 9; j++) {
            board[j] = '';
        }
    };
    const setWinMark = (val) => win_mark = val;
    const getWinMark = () => win_mark;
    return {getGameboard, setGameboard, clearGameboard, getPlayerTurn, setPlayerTurn,
    setWinMark, getWinMark };
}

function createPlayer(mark) {
    let marker = mark;
    const getMarker = () => marker;
    const setMarker = (new_mark) => marker = new_mark;
    return {setMarker, getMarker};
}

const gameboard = new Gameboard;
const player1 = createPlayer("X");
const player2 = createPlayer("O");

function changeMarker(mark) {
    const button_container = document.getElementById('buttons')
    let mark_2 = '';
    if (mark == 'X') { mark_2 = 'O'; }
    else { mark_2 = 'X'; }
    player1.setMarker(mark);
    player2.setMarker(mark_2);
    const player_turn = document.querySelector('.turn-notif');
    player_turn.innerHTML = player1.getMarker() + " turn";
    button_container.style.display = 'none';
}


function fillBoard() {
    for (let i = 0; i < 9; i++) {
        const new_grid = document.getElementById(i);
        new_grid.innerHTML = gameboard.getGameboard(i);
    }
    const player_turn = document.querySelector('.turn-notif');
    const play = gameboard.getPlayerTurn() ? player1.getMarker() : player2.getMarker();
    player_turn.innerHTML = play + ' turn';
    if (checkWin()) {
        player_turn.innerHTML = gameboard.getWinMark() + ' Wins!';
    }
}

function setGrid(id) {
    if (gameboard.getGameboard(id) == '') {
        const turn = gameboard.getPlayerTurn();
        const player = turn ? player1 : player2;
        gameboard.setGameboard(player.getMarker(), id);
        gameboard.setPlayerTurn(!turn);
        fillBoard();
    }
}

function resetBoard() {
    for (let i = 0; i < 9; i++) {
        gameboard.setGameboard('', i);
    }
    fillBoard();
}

function checkWin() {
    let result = false;
    for (let i = 0; i < 3; i++) {
        let row = []
        for (let j = i * 3; j < i * 3 + 3; j++) {
            row.push(gameboard.getGameboard(j));
        }

        if (row.every(field => field === 'X') || row.every(field => field == 'O')) {
            result = true;
            gameboard.setWinMark(row[0]);
        }
    }

    for (let i = 0; i < 3; i++) {
        let column = []
        for (let j = i; j < i + 7; j+=3) {
            column.push(gameboard.getGameboard(j));
        }

        if (column.every(field => field === 'X') || column.every(field => field == 'O')) {
            result = true;
            gameboard.setWinMark(column[0]);
        }
    }

    for (let i = 0; i < 3; i++) {
        let diagonal1 = [gameboard.getGameboard(0), gameboard.getGameboard(4), gameboard.getGameboard(8)];
        let diagonal2 = [gameboard.getGameboard(2), gameboard.getGameboard(4), gameboard.getGameboard(6)];
        if (diagonal1.every(field => field === 'X') || diagonal1.every(field => field === 'O')) {
            result = true;
            gameboard.setWinMark(diagonal1[0]);
        } else if (diagonal2.every(field => field === 'X') || diagonal2.every(field => field === 'O')) {
            result = true;
            gameboard.setWinMark(diagonal2[0]);
        }
    }
    return result;
}