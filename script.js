
const createPlayer = (name) => {
    const player = () => 'player';
    return {name, player};
};

const player1 = createPlayer('Tamara'); //here take input from UI for name
const player2 = createPlayer('Andrew'); // here also

const gameFlow = {
    players: [player1, player2],
    currentTurn: 0, 

    nextTurn: function () {
        const currentPlayer = this.currentTurn % 2 === 0 ? this.players[0] : this.players[1];
        this.currentTurn++;
        return currentPlayer;
    }};
    
  //user turns
  // function check winner
  // 9 turns no winner calls tie
  // game flow if when loop 0,2,4,6,8 player1.symbol or 1,3,5,7,9 player2.symbol


function gameBoard() {
  const emptyBoard = Array(9).fill('');
  // create var selected
  // if selected !== '' alert.pick empty
  return emptyBoard;
  //funtion to check if array position is emply give alert otherwise
}

console.log(gameFlow);
console.log(player1.name);
console.log(player2.name);
console.table(gameBoard());
