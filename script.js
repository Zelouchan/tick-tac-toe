const createPlayer = (name, symbol) => {
  return { name, symbol };
};

let player1;
let player2;

const gameFlow = {
  players: [],
  currentTurn: 0,
  board: Array(9).fill(""),

  nextTurn: function () {
    return this.players[this.currentTurn % 2];
  },

  displayBoard: function () {
    const area = document.getElementById("game"); // Get area here
    area.innerHTML = "";
    this.board.forEach((value, index) => {
      const newDiv = document.createElement("button");
      newDiv.textContent = value;
      newDiv.dataset.index = index;
      newDiv.addEventListener("click", move);
      area.appendChild(newDiv);
    });
  },

  resetButton: function () {
    const resets = document.getElementById("reset");
    resets.addEventListener("click", () => {
      const area = document.getElementById("game"); // Get area here
      area.innerHTML = "";
      this.board = Array(9).fill("");
      this.currentTurn = 0;
      this.displayBoard();
    });
  },
};

function checkWinner() {
  const winningCondition = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],
  ];

  for (let condition of winningCondition) {
    let [a, b, c] = condition;

    if (
      gameFlow.board[a] &&
      gameFlow.board[a] === gameFlow.board[b] &&
      gameFlow.board[a] === gameFlow.board[c]
    ) {
      const winningSymbol = gameFlow.board[a];
      const winner = gameFlow.players.find(player => player.symbol === winningSymbol);
      return winner.name;
    }
  }
  return null;
}

function move(event) {
  const index = event.target.dataset.index;
  const currentPlayer = gameFlow.nextTurn();

  if (gameFlow.board[index] === "") {
    gameFlow.board[index] = currentPlayer.symbol;
    gameFlow.currentTurn++;
    gameFlow.displayBoard();

    const winner = checkWinner();
    if (winner) {
      alert(winner + " Wins!");
      return;
    }
    if (gameFlow.currentTurn === 9) {
      alert("Game Over! It's a Tie!");
      return;
    }
  }
}

function submitButton() {
  const starts = document.getElementById("submit");
  starts.addEventListener("click", (event) => {
    event.preventDefault();

    const play1 = document.getElementById("name1").value;
    const play2 = document.getElementById("name2").value;

    player1 = createPlayer(play1, "X");
    player2 = createPlayer(play2, "O");

    gameFlow.players = [player1, player2]; // Assign players

    gameFlow.displayBoard();
  });
}

gameFlow.resetButton();
submitButton();