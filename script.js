const createPlayer = (name, symbol) => {
  return { name, symbol};
};

const player1 = createPlayer(prompt("Who is Player 1?"), "X");
const player2 = createPlayer(prompt("Who is Player 2?"), "O");
const area = document.getElementById("game");

const gameFlow = {
  players: [player1, player2],
  currentTurn: 0,
  board: Array(9).fill(""),

  nextTurn: function () {
    return this.players[this.currentTurn % 2];
  },

  displayBoard: function () {
    area.innerHTML = "";
    this.board.forEach((value, index) => {
      const newDiv = document.createElement("button");
      newDiv.textContent = value;
      newDiv.dataset.index = index;
      newDiv.addEventListener("click", move);
      area.appendChild(newDiv);
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
      gameFlow.board[a] === gameFlow.board[c] ) {
        
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
function gameBoard() {
  gameFlow.displayBoard();
}

gameBoard();
