'use strict';

// AI (Easy) version: code for interaction with the browser

$(document).ready(function () {
  reset(); //this will ensure that on refresh, the starting player will be blowfish, so that the human can start first game.

  // event listener for click to reset in endgame situation.
  $('body').on('click', function () {
    if (game.endgame === true) {
      reset();
    }
  });

  $('.square').on('click', function (event) {
    // if the last click caused an endgame, exit out of here instead of running the player's turn
    if (game.endgame === true) {
      return;
    }
    // endgame is false if we get to here. therefore, turn off the endgame event listener by using stop propogation for now since it's not an endgame situation.
    event.stopPropagation();

    var square = $(this).attr("id"); //get the square name
    if (game.currentPlayer === "Blowfish") {
      game.playTurn(square, game.currentPlayer);
      render();
    }

    if (game.endgame != true) {
      if (game.currentPlayer === "X") {
        setTimeout(function () {
          game.playTurn(game.chooseSquareAI(), game.currentPlayer);
          render();
        }, 500);
      }
    }
  });

  $('#reset').on('click', reset);
});

var reset = function reset() {

  //switch starting player from what it was at start of last game
  if (game.startingPlayer === "X") {
    game.startingPlayer = "Blowfish";
  } else if (game.startingPlayer === "Blowfish") {
    game.startingPlayer = "X";
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

var newGameRender = function newGameRender() {
  $('.visible').removeClass('visible');
  $('.makeBig').removeClass('makeBig');
  $('.flash').removeClass('animated flash');
  $('.' + game.startingPlayer + '-starts').addClass('visible');

  //if it's start of a new game, board is reset and starting player is X (computer), play turn function is called for the computer.
  if (game.currentPlayer === "X") {
    setTimeout(function () {
      game.playTurn(game.chooseSquareAI(), game.currentPlayer);
      render();
    }, 300);
  }
};

var render = function render() {

  // remove the msg re who starts the game if more than one move has been made by any player
  for (var key in game.turnsPlayed) {
    if (game.turnsPlayed[key] > 1) {
      $('.' + key + '-starts').removeClass('visible');
    }
  }

  // update the board squares with wherever X/Blowfish have played.
  for (var _key in game.boardStatus) {
    if (game.boardStatus[_key] === "X") {
      $('#' + _key + ' .x').addClass('visible');
    }
    if (game.boardStatus[_key] === "Blowfish") {
      $('#' + _key + ' .blowfish').addClass('visible');
    }
  }

  // if winningCombo[X/Blowfish/Draw] is true, make text appear at bottom saying X/Blowfish/Draw Wins (simple mode)
  for (var _key2 in game.winningCombo) {
    if (game.winningCombo[_key2] === true) {
      $('.' + _key2 + '-wins').addClass('visible');
    }
  }

  // The blowfish puffs up if it wins.
  if (game.winningCombo["Blowfish"] === true) {
    $('#' + game.winningSquare + '\n     .blowfish').addClass('makeBig');
  }

  // The three winning Xs flash if X wins.
  if (game.winningCombo["X"] === true) {
    $('#' + game.winningStrip[0] + ' .x').addClass('animated flash');
    $('#' + game.winningStrip[1] + ' .x').addClass('animated flash');
    $('#' + game.winningStrip[2] + ' .x').addClass('animated flash');
  }

  // The win gets added to the relevant tally
  for (var _key3 in game.winsTally) {
    $('.' + _key3 + '-tally').html('' + game.winsTally[_key3]);
  }
};