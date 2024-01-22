"use strict";

const serviceBar = document.querySelector(".service-bar");
const playground = document.querySelector("#playground");
const resetButton = document.querySelector("#reset-btn");
const settingsButton = document.querySelector("#settings-btn");
const asideMenu = document.querySelector(".settings-menu");
const overlay = document.querySelector(".overlay");

function openMenu() {
  asideMenu.classList.remove("hidden");
  asideMenu.classList.remove("slide-right");
  asideMenu.classList.add("slide-left");
  overlay.classList.remove("hidden");

  // Blur da main content
  serviceBar.classList.add("blured");
  playground.classList.add("blured");
  resetButton.classList.add("blured");
}

function closeMenu() {
  asideMenu.classList.remove("slide-left");
  asideMenu.classList.add("slide-right");

  setTimeout(() => asideMenu.classList.add("hidden"), 500);
  overlay.classList.add("hidden");

  // Unblur
  serviceBar.classList.remove("blured");
  playground.classList.remove("blured");
  resetButton.classList.remove("blured");
}

settingsButton.addEventListener("click", openMenu);
overlay.addEventListener("click", closeMenu);
