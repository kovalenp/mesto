import { hideInputError, toggleButtonState } from "./validationUtils.js";
import * as mesto from "./pageHtmlElements.js";

const {
  modalPhoto,
  modalPhotoImg,
  modalPhotoCaption,
  modalPhotoCloseButton,
  addForm,
  modalAdd,
  modalAddCloseButton,
  profileModal,
  profileCloseButton,
  profileName,
  profileRole,
  nameInput,
  linkInput,
  profileForm,
  usernameInput,
  roleInput,
  addSubmitButton,
  profileSubmitButton,
} = mesto;

modalPhotoCloseButton.addEventListener("click", () => closeModal(modalPhoto));
modalAddCloseButton.addEventListener("click", () => closeModal(modalAdd));
profileCloseButton.addEventListener("click", () => closeModal(profileModal));

const modalsList = Array.from(document.querySelectorAll(".modal"));

modalsList.forEach((modal) => {
  // Don't propagate click from modal window itself
  const modalContainer = modal.querySelector(".modal__container");
  modalContainer.addEventListener("click", (evt) => {
    evt.stopPropagation();
  });

  // Close modal if clicked outside
  modal.addEventListener("click", () => {
    closeModal(modal);
  });
});

export function closeModal(modal) {
  if (modal.classList.contains("modal_photo")) {
    modalPhotoImg.src = "";
    modalPhotoImg.alt = "";
    modalPhotoCaption.textContent = "";
  }
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", closeOnEscape);
}

export function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", closeOnEscape);
}

function closeOnEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

export function openPhotoModal(name, link) {
  modalPhotoImg.src = link;
  modalPhotoImg.alt = `Большая и очень красивая фотография ${name}`;
  modalPhotoCaption.textContent = name;
  openModal(modalPhoto);
}

export function openAddModal() {
  // fix: remove errors from previous modal opening
  hideInputError(addForm, nameInput);
  hideInputError(addForm, linkInput);

  addForm.reset();

  openModal(modalAdd);
  toggleButtonState([nameInput, linkInput], addSubmitButton);
}

export function openProfileModal() {
  // fix: remove errors from previous modal opening
  hideInputError(profileForm, usernameInput);
  hideInputError(profileForm, roleInput);

  openModal(profileModal);
  usernameInput.value = profileName.textContent;
  roleInput.value = profileRole.textContent;
  toggleButtonState([usernameInput, roleInput], profileSubmitButton); // fix to enable button when modal opened with default data
}
