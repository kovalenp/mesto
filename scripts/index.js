import Card from "./Card.js";
import { initData } from "./data.js";
import { FormValidator } from "./FormValidator.js";
import { openAddModal, openProfileModal, closeModal } from "./modalUtils.js";
import * as mesto from "./pageHtmlElements.js";

const {
  placesList,
  modalAdd,
  profileModal,
  addCardButton,
  addForm,
  nameInput,
  linkInput,
  profileEditButton,
  profileForm,
  profileName,
  profileRole,
  usernameInput,
  roleInput,
} = mesto;

addCardButton.addEventListener("click", openAddModal);
addForm.addEventListener("submit", addFormSubmitHandler);
profileEditButton.addEventListener("click", openProfileModal);

profileForm.addEventListener("submit", profileSubmitHandler);

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const card = { name: nameInput.value, link: linkInput.value };
  addPlaces(card, true);
  closeModal(modalAdd);
  addForm.reset();
}

function profileSubmitHandler(e) {
  e.preventDefault();
  profileName.textContent = usernameInput.value;
  profileRole.textContent = roleInput.value;
  closeModal(profileModal);
}

function addPlaces(card, isFirstElement = false) {
  const cardItem = new Card(card);
  isFirstElement
    ? placesList.prepend(cardItem.getCard())
    : placesList.append(cardItem.getCard());
}

initData.forEach(addPlaces);

const addCardFormValidator = new FormValidator({}, addForm);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator({}, profileForm);
editProfileFormValidator.enableValidation();
