//branch: ai-feature-easy

const reset = function() {

  //switch starting player from what it was at start of last game
  if (game.startingPlayer === "X") {
    console.log(`at time of reset, X was starting player`);
    game.startingPlayer = "Blowfish";
    console.log('new starting player on reset is blowfish');
  } else if (game.startingPlayer === "Blowfish") {
    console.log('at time of reset, blowfish was starting player');
    game.startingPlayer = "X";
    console.log('new starting player on reset is X');
  }

  //double check currentplayer is set to whichever is the new starting player
  game.currentPlayer = game.startingPlayer;

  game.boardStatus = {
    1: "empty",
    2: "empty",
    3: "empty",
    4: "empty",
    5: "empty",
    6: "empty",
    7: "empty",
    8: "empty",
    9: "empty"
  };
  game.turnsPlayed = {
    "X": 0,
    "Blowfish": 0
  };
  game.winningCombo = {
    "X": false,
    "Blowfish": false,
    "Draw": false
  };
  game.endgame = false;

  newGameRender();
};

const newGameRender = function() {
  $('.visible').removeClass('visible');
  $('.makeBig').removeClass('makeBig');
  $(`.${game.startingPlayer}-starts`).addClass('visible');
  if (game.currentPlayer === "X") {
    console.log(`AI about to be triggered from inside newGameRender function`);
    setTimeout(function() {
      game.playTurn(game.chooseSquareAI(), game.currentPlayer);
      render();
    }, 300);
    console.log(`render function just got triggered after AI was triggered in situation of start of game, inside newGameRender function.`);
  };
};

const render = function() {

  // remove the msg re who starts the game if more than one move has been made by any player
  for (let key in game.turnsPlayed) {
    if (game.turnsPlayed[key] > 1) {
      $(`.${key}-starts`).removeClass('visible');
    }
  };

  // update the board squares with wherever X/Blowfish have played.
  for (let key in game.boardStatus) {
    if (game.boardStatus[key] === "X") {
      $(`#${key} .x`).addClass('visible');
    }
    if (game.boardStatus[key] === "Blowfish") {
      $(`#${key} .blowfish`).addClass('visible');
    }
  };

  // if winningCombo[X/Blowfish/Draw] is true, make text appear at bottom saying X/Blowfish/Draw Wins (simple mode) // TODO: Better mode: the three relevant X flash on screen by switching on a special class
  for (let key in game.winningCombo) {
    if (game.winningCombo[key] === true) {
      $(`.${key}-wins`).addClass('visible');
    }
  };

  // The blowfish puffs up if it wins.
  if (game.winningCombo["Blowfish"] === true) {
    $(`#${game.winningSquare}
     .blowfish`).addClass('makeBig');
  };

  // The win gets added to the relevant tally
  for (let key in game.winsTally) {
    $(`.${key}-tally`).html(`${game.winsTally[key]}`);
  };

};

$(document).ready(function() {
  reset(); //this means on refresh, the starting player will be blowfish, so that the human can start first game.

  // event listener for click to reset in endgame situation.
  $('body').on('click', function() {
    console.log('body clicked'); // TODO: remove later

    if (game.endgame === true) {
    console.log('body event has run and endgame is true. about to reset.');
    reset();
    };
  });

  $('.square').on('click', function(event) {
    // if the last click caused an endgame, exit out of here instead of running the player's turn
    if (game.endgame === true) {
      return;
    }
    // endgame is false if we get to here. if so, turn off the endgame event listener by using stop propogation for now since it's not an endgame situation.
    event.stopPropagation();

    let square = $(this).attr("id"); //get the square name
    game.playTurn(square, game.currentPlayer);
    render();
    if (game.endgame != true) {
      setTimeout(function() {
        game.playTurn(game.chooseSquareAI(), game.currentPlayer);
        render();
      }, 500);
    }
  });

  $('.reset').on('click', 'button', reset);

});
