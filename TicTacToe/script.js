// script.js (modify this)

const board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";  // X is now always Player 1
let gameActive = true;
let player1Name = "Player 1"; // Default names
let player2Name = "Player 2";

const message = document.getElementById("message");
const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset-button");

// New elements for modal
const winModal = document.getElementById("win-modal");
const winMessage = document.getElementById("win-message");
const modalResetButton = document.getElementById("modal-reset-button");
const closeButton = document.querySelector(".close-button");


function handleCellClick(event) {
    const cell = event.target;
    const index = parseInt(cell.dataset.index);

    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer === "X" ? "x-player" : "o-player");

        if (checkWin()) {
            const winner = currentPlayer === "X" ? player1Name : player2Name;
            winMessage.textContent = `${winner} wins!`;
            winModal.style.display = "block"; // Show the modal
            gameActive = false;
        } else if (checkDraw()) {
            winMessage.textContent = "It's a draw!";
            winModal.style.display = "block"; // Show the modal
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            const nextPlayer = currentPlayer === "X" ? player1Name : player2Name;
            message.textContent = `${nextPlayer}'s (${currentPlayer}) turn`;
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return !board.includes("");
}

function resetGame() {
    board.fill("");
    currentPlayer = "X"; // Player 1 always starts
    gameActive = true;
    message.textContent = `${player1Name}'s (X) turn`; // Use Player 1's name
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x-player", "o-player");
    });
    winModal.style.display = "none"; // Hide the modal after reset
}

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

resetButton.addEventListener("click", resetGame);
modalResetButton.addEventListener("click", resetGame); // Reset from the modal

closeButton.addEventListener("click", () => {  // Close the modal with the 'x'
    winModal.style.display = "none";
});

// Close the modal if the user clicks outside of it
window.addEventListener("click", (event) => {
    if (event.target == winModal) {
        winModal.style.display = "none";
    }
});

// You can add code here to allow players to enter their names (optional)
// For example, using prompt() or input fields in the HTML
// player1Name = prompt("Enter Player 1's name (X):") || "Player 1";
// player2Name = prompt("Enter Player 2's name (O):") || "Player 2";
// message.textContent = `${player1Name}'s (X) turn`;