"use strict";

import createModal from "./modal";
import { playerO } from "../../main";
import { playerX } from "../../main";

// Make a modal window
const changeNameModal = createModal();
changeNameModal.setAttribute("id", "change-name-modal");
const changeNameModalBox = changeNameModal.firstElementChild;

// Create container for toggle and players names
const choosePlayerToggleContainer = document.createElement("div");
choosePlayerToggleContainer.className = "modal__toggle-container";

// Create a choose player toggle
const choosePlayerToggle = document.createElement("label");
choosePlayerToggle.classList.add("modal__toggle");
choosePlayerToggle.classList.add("toggle");
choosePlayerToggleContainer.appendChild(choosePlayerToggle);

// Add names of players to toggle
const playerXNameEl = document.createElement("span");
const playerONameEl = document.createElement("span");
playerXNameEl.className = "modal__player-name";
playerONameEl.className = "modal__player-name";
playerXNameEl.textContent = `${playerX.name}`;
playerONameEl.textContent = `${playerO.name}`;
choosePlayerToggleContainer.appendChild(playerXNameEl);
choosePlayerToggleContainer.appendChild(playerONameEl);

// Create slider for choosing player
const choosePlayerInput = document.createElement("input");
choosePlayerInput.type = "checkbox";
choosePlayerToggle.appendChild(choosePlayerInput);

const choosePlayerSlider = document.createElement("span");
choosePlayerSlider.classList.add("slider");
choosePlayerSlider.classList.add("round");
choosePlayerToggle.appendChild(choosePlayerSlider);

// Make highlight for player's name

playerXNameEl.style.color = "#a0bca8";

choosePlayerInput.addEventListener("change", () => {
  if (!choosePlayerInput.checked) {
    playerXNameEl.style.color = "#a0bca8";
    playerONameEl.style.color = "black";
  } else {
    playerONameEl.style.color = "#a0bca8";
    playerXNameEl.style.color = "black";
  }
});

// Add toggle to modal box
changeNameModalBox.appendChild(choosePlayerToggleContainer);

// New name input
const nameInput = document.createElement("input");
nameInput.className = "modal__input";
nameInput.setAttribute("maxlength", 12);
const nameInputLabel = document.createElement("label");
nameInputLabel.className = "modal__label";
nameInputLabel.textContent = "New name";
nameInputLabel.appendChild(nameInput);

// Add input to modal
changeNameModalBox.appendChild(nameInputLabel);

// Create and add submit button
const submitName = document.createElement("button");
submitName.textContent = "Submit";
submitName.classList.add("btn");
submitName.classList.add("btn_rounded");
submitName.classList.add("btn_green");
submitName.classList.add("modal__submit");
changeNameModalBox.appendChild(submitName);

// Add new modal window on page

const app = document.querySelector("#app");
app.appendChild(changeNameModal);

// Add eventlistener for open modal
const changeNameButton = document.querySelector("#change-name-btn");
changeNameButton.addEventListener("click", () => {
  changeNameModal.classList.remove("hidden");
  changeNameModal.classList.add("fade-in");
  setTimeout(() => {
    changeNameModal.classList.remove("fade-in");
  }, 280);
});
