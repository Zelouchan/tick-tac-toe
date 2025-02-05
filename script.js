const createPlayer = (name, symbol) => {
  //creates players
  return { name, symbol };
};

let player1;
let player2;

const gameFlow = {
  players: [],
  currentTurn: 0,
  board: Array(9).fill(""),
  gameActive: true, //allows the game to be stopped when there is a winner or a tie

  nextTurn: function () {
    //determines which players turn it is
    return this.players[this.currentTurn % 2];
  },

  displayBoard: function () {
    const area = document.getElementById("game");
    area.innerHTML = "";
    this.board.forEach((value, index) => {
      const newDiv = document.createElement("button");
      newDiv.textContent = value;
      newDiv.dataset.index = index; //needed for interaction with the div
      if (gameFlow.gameActive) {
        //only accepts click if the game is still active
        newDiv.addEventListener("click", move);
      }
      area.appendChild(newDiv);
    });
  },

  resetButton: function () {
    const resets = document.getElementById("reset");
    resets.addEventListener("click", () => {
      const area = document.getElementById("game"); // Get area here
      area.innerHTML = "";
      gameFlow.board = Array(9).fill("");
      gameFlow.currentTurn = 0;
      gameFlow.gameActive = true; //resets active status
      gameFlow.displayBoard();
    });
  },
};

function checkWinner() {
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

  for (let condition of winningCondition) {
    let [a, b, c] = condition;

    if (
      gameFlow.board[a] &&
      gameFlow.board[a] === gameFlow.board[b] &&
      gameFlow.board[a] === gameFlow.board[c]
    ) {
      const winningSymbol = gameFlow.board[a]; //checks which player won
      const winner = gameFlow.players.find(
        (player) => player.symbol === winningSymbol
      ); //see which player won
      return winner ? winner.name : null;
    }
  }
  return null;
}

function move(event) {
  if (gameFlow.gameActive) {
    const index = event.target.dataset.index;
    const currentPlayer = gameFlow.nextTurn(); //determines whose turn it is

    if (gameFlow.board[index] === "") {
      gameFlow.board[index] = currentPlayer.symbol; //changes the object in the array to the players symbol
      gameFlow.currentTurn++; //adds to the next turn
      gameFlow.displayBoard(); //updates the board

      const winner = checkWinner();
      if (winner) {
        gameFlow.gameActive = false;
        alert(winner + " Wins!");
        return;
      }

      if (gameFlow.currentTurn === 9) {
        gameFlow.gameActive = false;
        alert("Game Over! It's a Tie!");
        return;
      }
    }
  }
}

function submitButton() {
  const starts = document.getElementById("submit");
  starts.addEventListener("click", (event) => {
    event.preventDefault();

    const play1 = document.getElementById("name1").value;
    const play2 = document.getElementById("name2").value;

    if (play1 === "" || play2 === "") {
      //makes sure playernames are input or no gameboard will load
      alert("Give Player Names");
      return;
    }

    player1 = createPlayer(play1, "X");
    player2 = createPlayer(play2, "O");

    gameFlow.players = [player1, player2]; // Assign players

    gameFlow.displayBoard();
  });
}

gameFlow.resetButton(); //activates the reset button
submitButton(); //activates the submit button, without this the field will not be initialized
