const createPlayer = (name) => {
  const player = () => "player";
  return { name, player };
};

const player1 = createPlayer("Tamara"); //here take input from UI for name
const player2 = createPlayer("Ruth"); // here also

const gameFlow = {
  players: [player1, player2],
  currentTurn: 0,
  board: Array(9).fill(""), //creates the empty board

  nextTurn: function () {
    return this.players[this.currentTurn % 2];
  },
};


function gameBoard() {
  while (gameFlow.currentTurn <9) {
  let input = parseInt(prompt(gameFlow.nextTurn().name + " Which Square do you want to claim? 0-8"));

  if (isNaN(input) || input < 0 || input > 8) {
    alert("Pick a number between 0 and 8");
    return gameBoard();
  }

  if (gameFlow.board[input] !== "") {
    alert("Pick An Empty Square");
    continue;
  } else {
    const value = gameFlow.nextTurn().name; 
    gameFlow.board[input] = value; 
    gameFlow.currentTurn++; 
  }

  console.table(gameFlow.board); // Fixed: prints board after every move
}}

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

gameBoard();

