// AI (Easy) Version: code for state of play

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

  winningStrip: [],

  winsTally: {
    "X": 0,
    "Blowfish": 0
  },

  playTurn: function(square, player) {
    if (this.boardStatus[square] === "empty") {
      this.boardStatus[square] = player;
      this.turnsPlayed[player] += 1;
      this.checkForWin(player);
      this.checkForDraw();
      this.checkForEndgame();
      if (this.winningCombo[player] === true) {
        this.winningSquare = square;
        this.winsTally[player] += 1;
      }
      this.updateCurrentPlayer(player);
    }
  },

  //function to randomly choose a square for the computer to play in based on what's available. gets called from presentation.js at same time as running the playturn function for the computer.
  chooseSquareAI: function() {
    let availableSquares = [];
    for (let key in this.boardStatus) {
      if (this.boardStatus[key] === "empty") {
        availableSquares.push(key);
      }
    }
    let chosenSquare = availableSquares[Math.floor(Math.random() * availableSquares.length)];
    return chosenSquare;
  },

  checkForWin: function(player) {
    if (this.boardStatus[1] === player && this.boardStatus[2] === player && this.boardStatus[3] === player) {
      this.winningCombo[player] = true;
      this.winningStrip = [1,2,3];
    }
    if (this.boardStatus[1] === player && this.boardStatus[5] === player && this.boardStatus[9] === player) {
      this.winningCombo[player] = true;
      this.winningStrip = [1,5,9];
    }
    if (this.boardStatus[1] === player && this.boardStatus[4] === player && this.boardStatus[7] === player) {
      this.winningCombo[player] = true;
      this.winningStrip = [1,4,7];
    }
    if (this.boardStatus[2] === player && this.boardStatus[5] === player && this.boardStatus[8] === player) {
      this.winningCombo[player] = true;
      this.winningStrip = [2,5,8];
    }
    if (this.boardStatus[3] === player && this.boardStatus[6] === player && this.boardStatus[9] === player) {
      this.winningCombo[player] = true;
      this.winningStrip = [3,6,9];
    }
    if (this.boardStatus[3] === player && this.boardStatus[5] === player && this.boardStatus[7] === player) {
      this.winningCombo[player] = true;
      this.winningStrip = [3,5,7];
    }
    if (this.boardStatus[4] === player && this.boardStatus[5] === player && this.boardStatus[6] === player) {
      this.winningCombo[player] = true;
      this.winningStrip = [4,5,6];
    }
    if (this.boardStatus[7] === player && this.boardStatus[8] === player && this.boardStatus[9] === player) {
      this.winningCombo[player] = true;
      this.winningStrip = [7,8,9];
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
  }
};
