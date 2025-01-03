class TicTacToe {
    constructor() {
        this.isXNext = true;
        this.xScore = 0;
        this.oScore = 0;
        this.gameActive = true;
        
        this.cells = document.querySelectorAll('.cell');
        this.status = document.getElementById('status');
        this.xScoreElement = document.getElementById('x-score');
        this.oScoreElement = document.getElementById('o-score');
        this.resetBtn = document.querySelector('.reset-button');
        
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        this.initGame();
    }

    initGame() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', (e) => this.handleClick(e));
        });
        
        this.resetBtn.addEventListener('click', () => this.resetButton());
        this.status.textContent = "X's turn";
    }

    handleClick(event) {
        const cell = event.target;
        if (!this.gameActive || cell.textContent) {
            return;
        }

        const currentPlayer = this.isXNext ? 'X' : 'O';
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());

        if (this.checkWin(currentPlayer)) {
            this.gameActive = false;
            this.status.textContent = `${currentPlayer} Wins!`;
            this.updateScore(currentPlayer);
            setTimeout(() => this.resetButton(), 2000);
            return;
        }

        if (this.checkDraw()) {
            this.gameActive = false;
            this.status.textContent = "It's a Draw!";
            setTimeout(() => this.resetButton(), 2000);
            return;
        }

        this.isXNext = !this.isXNext;
        this.status.textContent = `${this.isXNext ? 'X' : 'O'}'s turn`;
    }

    checkWin(player) {
        return this.winningCombinations.some(combination => {
            return combination.every(index => {
                return this.cells[index].textContent === player;
            });
        });
    }

    checkDraw() {
        return [...this.cells].every(cell => cell.textContent);
    }

    updateScore(winner) {
        const scoreElement = winner === 'X' ? this.xScoreElement : this.oScoreElement;
        const scoreContainer = scoreElement.closest('.score');
        
        if (winner === 'X') {
            this.xScore++;
            this.xScoreElement.textContent = this.xScore;
        } else {
            this.oScore++;
            this.oScoreElement.textContent = this.oScore;
        }

        scoreContainer.classList.add('updated');
        setTimeout(() => {
            scoreContainer.classList.remove('updated');
        }, 300);
    }

    resetButton() {
        this.isXNext = true;
        this.gameActive = true;
        this.status.textContent = "X's turn";
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
    }
}


const game = new TicTacToe();

