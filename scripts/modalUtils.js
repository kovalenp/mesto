import { ESC_KEY } from "./constants.js";
import { FormValidator } from "./FormValidator.js";
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
} = mesto;

// modalPhotoCloseButton.addEventListener("click", () => closeModal(modalPhoto));
modalAddCloseButton.addEventListener("click", () => closeModal(modalAdd));
profileCloseButton.addEventListener("click", () => closeModal(profileModal));

const addCardFormValidator = new FormValidator({}, addForm);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator({}, profileForm);
editProfileFormValidator.enableValidation();

const modalsList = Array.from(document.querySelectorAll(".modal"));

modalsList.forEach((modal) => {
  // Don't propagate click from modal window itself
  const modalContainer = modal.querySelector(".modal__container");
  modalContainer.addEventListener("mousedown", (evt) => {
    evt.stopPropagation();
  });

  // Close modal if clicked outside
  modal.addEventListener("mousedown", () => {
    closeModal(modal);
  });
});

export function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", closeOnEscape);
}

// function _cleanUpPhotoContainer() {
//   modalPhotoImg.src = "";
//   modalPhotoImg.alt = "";
//   modalPhotoCaption.textContent = "";
// }

export function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", closeOnEscape);
}

function closeOnEscape(evt) {
  if (evt.key === ESC_KEY) {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

// export function openPhotoModal(name, link) {
//   _cleanUpPhotoContainer(); // There is a bug without this cleanup. Rewrite causes "blink" effect with "old" image.
//   modalPhotoImg.src = link;
//   modalPhotoImg.alt = `Большая и очень красивая фотография ${name}`;
//   modalPhotoCaption.textContent = name;
//   openModal(modalPhoto);
// }

export function openAddModal() {
  // fix: remove errors from previous modal opening
  addCardFormValidator.hideInputError(nameInput);
  addCardFormValidator.hideInputError(linkInput);

  addForm.reset();

  openModal(modalAdd);
  addCardFormValidator.toggleButtonState();
}

export function openProfileModal() {
  // fix: remove errors from previous modal opening
  editProfileFormValidator.hideInputError(usernameInput);
  editProfileFormValidator.hideInputError(roleInput);

  openModal(profileModal);
  usernameInput.value = profileName.textContent;
  roleInput.value = profileRole.textContent;
  editProfileFormValidator.toggleButtonState(); // fix to enable button when modal opened with default data
}
