console.log('Hello World!');
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X'; // Start with player X
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Empty board
let gameActive = true;

// Check if there's a winner
const checkWinner = () => {
    const winningPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            setMessage(`${currentPlayer} Wins!`);
            highlightWinner(pattern);
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        setMessage('It\'s a Draw!');
    }
};

// Set message on the screen
const setMessage = (message) => {
    messageElement.textContent = message;
};

// Highlight the winning cells
const highlightWinner = (pattern) => {
    pattern.forEach(index => {
        cells[index].style.backgroundColor = '#ff0000';
    });
};

// Handle cell click
const handleCellClick = (index) => {
    if (gameBoard[index] !== '' || !gameActive) return;

    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].style.color = currentPlayer === 'X' ? '#00ff00' : '#ff0000';

    checkWinner();

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

// Reset the game
const resetGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#333';
        cell.style.color = '#fff';
    });
    messageElement.textContent = '';
};

// Event listeners
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

resetButton.addEventListener('click', resetGame);