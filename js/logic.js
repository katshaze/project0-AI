
const game = {

  startingPlayer: "X",

  currentPlayer: "X",

  boardStatus: {
    1: "empty",
    2: "empty",
    3: "empty",
    4: "empty",
    5: "empty",
    6: "empty",
    7: "empty",
    8: "empty",
    9: "empty"
  },

  turnsPlayed: {
    "X": 0,
    "Blowfish": 0
  },

  winningCombo: {
    "X": false,
    "Blowfish": false,
    "Draw": false
  },

  endgame: false,

  winningSquare: "",

  winsTally: {
    "X": 0,
    "Blowfish": 0
  },

  checkForWin: function(player) {
    if (this.boardStatus[1] === player && this.boardStatus[2] === player && this.boardStatus[3] === player) {
      this.winningCombo[player] = true;
    }
    if (this.boardStatus[1] === player && this.boardStatus[5] === player && this.boardStatus[9] === player) {
      this.winningCombo[player] = true;
    }
    if (this.boardStatus[1] === player && this.boardStatus[4] === player && this.boardStatus[7] === player) {
      this.winningCombo[player] = true;
    }
    if (this.boardStatus[2] === player && this.boardStatus[5] === player && this.boardStatus[8] === player) {
      this.winningCombo[player] = true;
    }
    if (this.boardStatus[3] === player && this.boardStatus[6] === player && this.boardStatus[9] === player) {
      this.winningCombo[player] = true;
    }
    if (this.boardStatus[3] === player && this.boardStatus[5] === player && this.boardStatus[7] === player) {
      this.winningCombo[player] = true;
    }
    if (this.boardStatus[4] === player && this.boardStatus[5] === player && this.boardStatus[6] === player) {
      this.winningCombo[player] = true;
    }
    if (this.boardStatus[7] === player && this.boardStatus[8] === player && this.boardStatus[9] === player) {
      this.winningCombo[player] = true;
    }
  },

  checkForDraw: function() {
    if (this.turnsPlayed["X"] + this.turnsPlayed["Blowfish"] === 9) {
      if (this.winningCombo["X"] === false && this.winningCombo["Blowfish"] === false) {
        this.winningCombo["Draw"] = true;
        this.winsTally["Draw"] += 1;
      }
    }
  },

  checkForEndgame: function() {
    for (let key in this.winningCombo) {
      if (this.winningCombo[key] === true) {
        this.endgame = true;
      }
    }
  },

  updateCurrentPlayer: function(player) {
    if (player === "X") {
      this.currentPlayer = "Blowfish";
    } else {
      this.currentPlayer = "X";
    }
  },

  playTurn: function(square, player) {
    if (this.boardStatus[square] === "empty") {
      console.log(`square ${square} is empty ready to be populated`);
      this.boardStatus[square] = player;
      this.turnsPlayed[player] += 1;
    }
    this.checkForWin(player);
    this.checkForDraw();
    this.checkForEndgame();
    if (this.winningCombo[player] === true) {
      this.winningSquare = square;
      console.log(`${this.winningSquare} is ${player}'s winning square.`); // TODO: remove later
      this.winsTally[player] += 1;
    }
    this.updateCurrentPlayer(player);
  },

  chooseSquareAI: function() {
    let availableSquares = [];
    for (key in this.boardStatus) {
      if (this.boardStatus[key] === "empty") {
        availableSquares.push(key);
      }
    }
    let chosenSquare = availableSquares[Math.floor(Math.random() * availableSquares.length)];
    console.log(`AI's randomly chosen square is ${chosenSquare}, meaning AI play turn function is in progress`);
    return chosenSquare;
  }

}
