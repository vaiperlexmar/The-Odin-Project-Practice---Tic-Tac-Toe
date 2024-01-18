"use strict";

function createPlayer(name, icon) {
  let moves = "";

  const getMoves = () => {
    return moves;
  };

  const makeMove = () => {
    let move = +prompt(`${name}'s turn`);

    if (moves.includes(move)) {
      while (move > 0 && move <= 9 && moves.includes(move)) {
        move = +prompt("ARE YOU FCKING IDIOT? SET MOVE THE RIGHT WAY");
      }
    } else if (move > 0 && move <= 9) {
      moves += move;
      return move;
    }
  };

  return {
    name,
    makeMove,
    getMoves,
    icon,
  };
}

const playerX = createPlayer("Abraham", "X");
const playerO = createPlayer("Bob", "O");

const Gameboard = (function () {
  const cells = new Array(9);
  cells.fill(0, 0, 9);

  const getCells = () => {
    return cells;
  };

  const setCell = (index, currentPlayer) => {
    cells[index - 1] = currentPlayer.icon;
  };

  return {
    getCells,
    setCell,
  };
})();

const Game = (function () {
  let winner = null;

  const winCombinations = [
    "123",
    "456",
    "789",
    "147",
    "258",
    "369",
    "159",
    "357",
  ];

  const winnerChecker = (player) => {
    for (const combo of winCombinations) {
      let comboIsSubset = true;

      for (const digit of combo) {
        if (!player.getMoves().includes(digit)) {
          comboIsSubset = false;
          break;
        }
      }

      if (comboIsSubset) {
        return player;
      }
    }

    return false;
  };

  const start = () => {
    let currentPlayer = playerX;

    for (let i = 0; i < 9; i++) {
      let currentMove = currentPlayer.makeMove();

      if (Gameboard.getCells().includes(currentMove)) {
        currentMove = currentPlayer.makeMove(); // throw an error in DOM variant
      } else {
        Gameboard.setCell(currentMove, currentPlayer);

        if (i > 3) {
          if (winnerChecker(currentPlayer)) {
            return currentPlayer;
          }
        }

        currentPlayer = currentPlayer === playerX ? playerO : playerX;
      }
    }
  };

  return {
    start,
  };
})();

Game.start();
