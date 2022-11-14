// STATE
let state = {
    board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ],
    players: ['X', 'O'],
    currentPlayer: 0
}

// DOM REFERENCES
const playerOptionsEl = document.querySelector(".playerOptions");
const chooseNameEl = document.querySelector(".chooseName");
const playerOneName = document.querySelector("#playerOneName");
const playerTwoName = document.querySelector("#playerTwoName");
const submitEl = document.querySelector(".submitButton");
const playerOneOutput = document.querySelector(".playerOneOutput");
const playerTwoOutput = document.querySelector(".playerTwoOutput");
const boardEl = document.querySelector(".gameBoard");
const cellOne = document.getElementById("0-0");
const cellTwo = document.getElementById("0-1");
const cellThree = document.getElementById("0-2");
const cellFour = document.getElementById("1-0");
const cellFive = document.getElementById("1-1");
const cellSix = document.getElementById("1-2");
const cellSeven = document.getElementById("2-0");
const cellEight = document.getElementById("2-1");
const cellNine = document.getElementById("2-2");
const wrapperEl = document.querySelector(".board")
const resetEl = document.querySelector(".reset");

// FUNCTIONS

// Allows you to begin the game by choosing which game option, then shows who goes first and the board
playerOptionsEl.addEventListener("click", function() {
    playerOptionsEl.classList.toggle("hidden");
    // This will remove the choose name div after submitting your usernames
    chooseNameEl.classList.toggle("hidden");    
})

// Allows you to input usernames and have them displayed
function pickName() {
    // Will randomize who is X and who is O
    const randomNumber = Math.floor(Math.random() * 2);
    if (randomNumber == 0) {
        playerOneOutput.textContent = playerOneName.value + " - X";
        playerTwoOutput.textContent = playerTwoName.value + " - O"; 
    } else {
        playerOneOutput.textContent = playerOneName.value + " - O";
        playerTwoOutput.textContent = playerTwoName.value + " - X";
    }
    playerOneName.value = "";
    playerTwoName.value = "";
    wrapperEl.classList.toggle("hidden");
    chooseNameEl.classList.toggle("hidden");    
}
submitEl.addEventListener("click", pickName);

// Function will render the amount of cells needed in correspondence to the state
function renderGame() {
    // Clears board, so that it doesn't generate another board after clicking
    boardEl.textContent = "";
    state.board.forEach((row, rowIndex) => {
        for ( let i = 0; i < row.length; i++) {
            createCell(rowIndex, i);
        }
    })
}
renderGame();

// Function will create cells and add a dataset for each one indicating which row and column the cell is in
function createCell(rowIndex, columnIndex) {
    const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = rowIndex;
            cell.dataset.column = columnIndex;
            cell.textContent = state.board[rowIndex][columnIndex];
            cell.id = rowIndex + "-" + columnIndex;
            boardEl.append(cell);
}

// Allows you to click a cell
boardEl.addEventListener("click", function(event) {
    if (event.target.matches(".cell")) {
        const row = event.target.dataset.row;
        const column = event.target.dataset.column;
        // Prevents users from selecting the same cell twice
        if (state.board[row][column]) {
            alert("Illegal Move");
        } else {
            // Will provide the content you want generated when you click a cell from the state object
            state.board[row][column] = state.players[state.currentPlayer];
            changeTurn();
        }
    }
    renderGame();
})

// Function will change the player's turn
function changeTurn () {
     // Ternary operator, is an alternative for if...else
        // If currentPlayer is 0, then change to 1, if not then 0
        state.currentPlayer = state.currentPlayer === 0 ? 1 : 0;
}

// Function checks if there was a win or not
function checkWin() {
    if (cellOne != "" && cellOne === cellTwo & cellTwo === cellThree) {
        console.log("Hi");
    }
}
checkWin();

function checkDraw() {
    if (cellOne != "" && cellOne === cellTwo && cellTwo === cellThree && cellThree === cellFour && cellFour === cellFive && cellFive === cellSix && cellSix === cellSeven && cellSeven === cellEight && cellEight === cellNine) {
        console.log("Hi");
    }
}

// Will reset the page, could not be done previously when state was a constant
resetEl.addEventListener("click", function() {
    state = {
        board: [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ],
        players: ['X', 'O'],
        currentPlayer: 0
    }
    renderGame();
    playerOptionsEl.classList.toggle("hidden");
    wrapperEl.classList.toggle("hidden");
});
