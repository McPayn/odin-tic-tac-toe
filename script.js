function Gameboard () {
    const board = [];
    const getGameboard = (i) => board[i];
    const setGameboard = (stuff, i) => board[i] = stuff;
    return {getGameboard, setGameboard};
}

function createPlayer(mark) {
    let marker = mark;
    const getMarker = () => marker;
    const setMarker = (new_mark) => marker=new_mark;
    return {setMarker, getMarker};
}

const gameboard = new Gameboard;
const player = createPlayer("X");

for (let i = 0; i < 9; i++) {
    if (i % 2 == 0) {
        gameboard.setGameboard('X', i);
    } else {
        gameboard.setGameboard('O', i);
    }
}

function changeMarker(mark) {
    player.setMarker(mark);
}

function changeBoard(e) {
    gameboard.setGameboard(marker, e.target.id);
}
function fillBoard() {
    const container = document.querySelector('#container');
    container.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const new_grid = document.createElement('div');
        new_grid.classList.add('board-grid');
        new_grid.setAttribute('id', i);
        new_grid.onclick = function (e) {
            gameboard.setGameboard(player.getMarker(), e.target.id);
            fillBoard();
        }
        new_grid.innerHTML = gameboard.getGameboard(i);
        container.append(new_grid);
    }
}