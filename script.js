const gameboard = [];

for (let i = 0; i < 9; i++) {
    if (i % 2 == 0) {
        gameboard[i] = 'X';
    } else {
        gameboard[i] = 'O';
    }
}

function fillBoard() {
    const container = document.querySelector('#container');
    for (let i = 0; i < 9; i++) {
        const new_grid = document.createElement('div');
        new_grid.classList.add('board-grid');
        new_grid.innerHTML = gameboard[i];
        container.append(new_grid);
    }
}