let isXNext = true; 

const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

function handleClick(event) {
    const cell = event.target;
    
    if (cell.textContent) {
        return;
    }

    const currentPlayer = isXNext ? 'X' : 'O';
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    isXNext = !isXNext;
}

function ResetButton() {
    isXNext = true;
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}

const resetBtn = document.querySelector('.reset-button');
resetBtn.addEventListener('click', ResetButton);