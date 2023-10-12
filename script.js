function Gameboard () {
    const board = Array(9).fill('');
    let playerTurn = true;
    const getGameboard = (i) => board[i];
    const setGameboard = (stuff, i) => board[i] = stuff;
    const getPlayerTurn = () => playerTurn;
    const setPlayerTurn = (val) => playerTurn = val;
    const clearGameboard = () => {
        for (let j = 0; j < 9; j++) {
            board[j] = '';
        }
    };
    return {getGameboard, setGameboard, clearGameboard, getPlayerTurn, setPlayerTurn};
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
    let mark_2 = '';
    if (mark == 'X') { mark_2 = 'O'; }
    else { mark_2 = 'X'; }
    player1.setMarker(mark);
    player2.setMarker(mark_2);
}

function changeBoard(e) {
    gameboard.setGameboard(marker, e.target.id);
}

function fillBoard() {
    for (let i = 0; i < 9; i++) {
        const new_grid = document.getElementById(i);
        new_grid.innerHTML = gameboard.getGameboard(i);
    }
    const player_turn = document.querySelector('.turn-notif');
    const play = gameboard.getPlayerTurn() ? '1' : '2';
    player_turn.innerHTML = 'Player ' + play + ' turn';
}

function setGrid(id) {
    if (gameboard.getGameboard(id) == '') {
        const turn = gameboard.getPlayerTurn();
        const player = turn ? player1 : player2;
        gameboard.setGameboard(player.getMarker(), id);
        fillBoard();
        gameboard.setPlayerTurn(!turn);
    }
}

function resetBoard() {
    for (let i = 0; i < 9; i++) {
        gameboard.setGameboard('', i);
    }
    fillBoard();
}