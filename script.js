const createPlayer = (name) => {
  return { name };
};

const player1 = createPlayer("Tamara");
const player2 = createPlayer("Ruth");

const gameFlow = {
  players: [player1, player2],
  currentTurn: 0,
  board: Array(9).fill(""),

  nextTurn: function () {
    return this.players[this.currentTurn % 2];
  },
};

const winningCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (let condition of winningCondition) {
    let [a, b, c] = condition;

    if (
      gameFlow.board[a] === gameFlow.board[b] &&
      gameFlow.board[a] === gameFlow.board[c]
    ) {
      return gameFlow.board[a];
    }
  }
  return null;
}

function displayBoard() {
  const area = document.getElementsByClassName("game");

  area.innerHTML = "";

  gameFlow.board.forEach((value) => {
    const newDiv = document.createElement("div");
    newDiv.textContent = value;
    area.appendChild(newDiv);
  });
}

function gameBoard() {
  displayBoard();

  while (gameFlow.currentTurn < 9) {
    let currentPlayer = gameFlow.nextTurn();
    let input;

    do {
      input = parseInt(
        prompt(currentPlayer.name + " Which Square do you want to claim? 0-8")
      );

      if (isNaN(input) || input < 0 || input > 8) {
        alert("Pick a number between 0 and 8");
      } else if (gameFlow.board[input] !== "") {
        alert("Pick An Empty Square");
      }
    } while (
      isNaN(input) ||
      input < 0 ||
      input > 8 ||
      gameFlow.board[input] !== ""
    );

    gameFlow.board[input] = currentPlayer.name;
    gameFlow.currentTurn++;

    console.table(gameFlow.board);

    displayBoard(); // Update the screen

    let winner = checkWinner();
    if (winner) {
      alert(winner + " Wins!");
      return;
    }
  }

  alert("Game Over! It's a Tie!");
}

gameBoard();
