"use strict";

function createModal() {
  // Make an overlay for modal
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.classList.add("hidden");

  // Make a modal box for content
  const modalBox = document.createElement("div");
  modalBox.className = "modal__box";
  modal.appendChild(modalBox);

  // Create general control elements
  const closeButton = document.createElement("span");
  closeButton.className = "material-symbols-outlined";
  closeButton.textContent = "close";

  // Add close function
  closeButton.addEventListener("click", () => {
    modal.classList.add("fade-out");
    setTimeout(() => {
      modal.classList.remove("fade-out");
      modal.classList.add("hidden");
    }, 280);
  });

  const modalHeader = document.createElement("header");
  modalHeader.classList = "modal__header";

  modalHeader.appendChild(closeButton);
  modalBox.appendChild(modalHeader);

  return modal;
}

export default createModal;
