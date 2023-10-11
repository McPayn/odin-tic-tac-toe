const marker = 0;
function Gameboard () {
    const board = [];
    const getGameboard = (i) => board[i];
    const setGameboard = (stuff, i) => board[i] = stuff;
    return {getGameboard, setGameboard};
}

const gameboard = new Gameboard;
for (let i = 0; i < 9; i++) {
    if (i % 2 == 0) {
        gameboard.setGameboard('X', i);
    } else {
        gameboard.setGameboard('O', i);
    }
}

function changeMarker(mark) {
    marker = mark;
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
            gameboard.setGameboard(marker, e.target.id);
            fillBoard();
        }
        new_grid.innerHTML = gameboard.getGameboard(i);
        container.append(new_grid);
    }
}