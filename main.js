"use strict";

function createPlayer(name, icon) {
  let moves = "";

  const getMoves = () => {
    return moves;
  };

  const resetMoves = () => {
    moves = "";
  };

  const signLink =
    icon === "X" ? "assets/img/cross.svg" : "assets/img/circle.svg";

  const makeMove = (cellIndex) => {
    moves += cellIndex;
  };

  return {
    name,
    makeMove,
    getMoves,
    resetMoves,
    icon,
    signLink,
  };
}

const playerX = createPlayer("Abraham", "X");
const playerO = createPlayer("Bob", "O");

const Gameboard = (function () {
  const nameDisplay = document.querySelector(".name-display");
  const cells = new Array(9);
  cells.fill(0, 0, 9);

  const cellsEl = document.querySelectorAll(".cell");
  const usedCells = [];

  const getCells = () => {
    return cells;
  };

  const getCellsElement = () => {
    return cellsEl;
  };

  const getUsedCells = () => {
    return usedCells;
  };

  const setCell = (index, currentPlayer) => {
    if (
      cells[index - 1] === 0 &&
      !cellsEl[index - 1].hasChildNodes() &&
      !Game.gameOver &&
      !usedCells.includes(index)
    ) {
      cells[index - 1] = currentPlayer.icon;
      const playerImg = document.createElement("img");
      playerImg.classList.add("cell__img");
      playerImg.src = currentPlayer.signLink;
      cellsEl[index - 1].appendChild(playerImg);
      usedCells.push(index);
    }
  };

  return {
    getCells,
    setCell,
    getCellsElement,
    getUsedCells,
    nameDisplay,
  };
})();

const Game = (function () {
  let winner = null;
  let gameOver = false;

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

  let currentPlayer = playerX;
  let movesCounter = 0;
  let currentMove;

  Gameboard.nameDisplay.textContent = `${currentPlayer.name}'s turn`;

  Gameboard.getCellsElement().forEach((el) => {
    el.addEventListener("click", function clickOnCell() {
      if (!gameOver) {
        currentMove = el.getAttribute("id");
        movesCounter += 1;

        Gameboard.setCell(currentMove, currentPlayer);
        currentPlayer.makeMove(currentMove);

        if (movesCounter > 3) {
          if (winnerChecker(currentPlayer)) {
            Gameboard.nameDisplay.textContent = `Winner: ${currentPlayer.name}`;
            gameOver = true;
            return;
          }
        }

        if (movesCounter === 9) {
          Gameboard.nameDisplay.textContent = "It's draw!";
          gameOver = true;
          return;
        }

        currentPlayer = currentPlayer === playerX ? playerO : playerX;

        Gameboard.nameDisplay.textContent = `${currentPlayer.name}'s turn`;
      }
    });
  });

  const resetBtn = document.querySelector("#reset-btn");
  resetBtn.addEventListener("click", function reset() {
    Gameboard.getCells().fill(0, 0, 9);
    Gameboard.getCellsElement().forEach((el) => {
      if (Gameboard.getUsedCells().includes(el.id)) {
        el.innerHTML = "";
      }
    });
    Gameboard.getUsedCells().splice(0, Gameboard.getUsedCells().length);
    Gameboard.nameDisplay.textContent = `${currentPlayer.name}'s turn`;

    winner = null;
    gameOver = false;
    currentPlayer = playerX;
    playerX.resetMoves();
    playerO.resetMoves();

    movesCounter = 0;
  });

  return {
    gameOver,
  };
})();
