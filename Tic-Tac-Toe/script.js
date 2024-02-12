const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart-btn');

let turn = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

// Function to check for win
const checkWin = (player) => {
  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
  ];

  for (const condition of winningConditions) {
    const [a, b, c] = condition;

    if (
      gameBoard[a] === player &&
      gameBoard[b] === player &&
      gameBoard[c] === player
    ) {
      return true;
    }
  }

  return false;
};

// Function to check for draw
const checkDraw = () => {
  return gameBoard.every((cell) => cell !== '');
};

// Function to handle cell click
const cellClick = (event) => {
  // Extract the cell index from the clicked cell's ID
  const cellIndex = event.target.id.split('-')[1] - 1;

  // Check if the clicked cell is empty
  if (gameBoard[cellIndex] === '') {
    // Update the game board with the current player's symbol
    gameBoard[cellIndex] = turn;
    event.target.textContent = turn;

    // Check for win or draw
    if (checkWin(turn)) {
      // Display win message and disable all cells
      message.textContent = `${turn} wins!`;
      disableAllCells();
    } else if (checkDraw()) {
      // Display draw message and disable all cells
      message.textContent = "It's a draw!";
      disableAllCells();
    } else {
      // Switch to the other player's turn
      switchPlayerTurn();
    }
  }
};

// Disable all cells
const disableAllCells = () => {
  cells.forEach((cell) => (cell.disabled = true));
};

// Switch the turn to the other player
const switchPlayerTurn = () => {
  turn = turn === 'X' ? 'O' : 'X';
};


// Add event listeners to each cell
cells.forEach((cell) => cell.addEventListener('click', cellClick));

// Restart button click handler
restartBtn.addEventListener('click', () => {
  turn = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  message.textContent = '';
  cells.forEach((cell) => {
    cell.textContent = '';
    cell.disabled = false;
  });
});
