let isXNext = true;
let xScore = 0;
let oScore = 0;
let gameActive = true;

const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const xScoreElement = document.getElementById('x-score');
const oScoreElement = document.getElementById('o-score');

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

function handleClick(event) {
    const cell = event.target;
    if (!gameActive || cell.textContent) {
        return;
    }

    const currentPlayer = isXNext ? 'X' : 'O';
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWin(currentPlayer)) {
        gameActive = false;
        status.textContent = `${currentPlayer} Wins!`;
        updateScore(currentPlayer);
        return;
    }

    if (checkDraw()) {
        gameActive = false;
        status.textContent = "It's a Draw!";
        return;
    }

    isXNext = !isXNext;
    status.textContent = `${isXNext ? 'X' : 'O'}'s turn`;
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === player;
        });
    });
}

function checkDraw() {
    return [...cells].every(cell => cell.textContent);
}

function updateScore(winner) {
    if (winner === 'X') {
        xScore++;
        xScoreElement.textContent = xScore;
    } else {
        oScore++;
        oScoreElement.textContent = oScore;
    }
}

function ResetButton() {
    isXNext = true;
    gameActive = true;
    status.textContent = "X's turn";
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}

const resetBtn = document.querySelector('.reset-button');
resetBtn.addEventListener('click', ResetButton);

