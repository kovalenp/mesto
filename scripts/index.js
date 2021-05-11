import { initData } from "./data.js";

import Card from "./components/Card.js";
import UserInfo from "./components/UserInfo.js";
import Section from "./components/Section.js";
import ModalWithImage from "./components/Modals/ModalWithImage.js";
import ModalWithForm from "./components/Modals/ModalWithForm.js";

const addCardButton = document.querySelector(".profile__add");
const profileEditButton = document.querySelector(".profile__edit");
const usernameInput = document.querySelector("#username");
const roleInput = document.querySelector("#role");

import {
  PLACES_LIST,
  MODAL_PHOTO,
  MODAL_ADD,
  MODAL_PROFILE,
  PROFILE_NAME,
  PROFILE_ROLE,
} from "./constants.js";

// photo modal
const imgModal = new ModalWithImage(MODAL_PHOTO);
imgModal.setEventListeners();

const onCardClick = (name, url) => {
  imgModal.open(name, url);
};

// cards layout
const cards = new Section(
  {
    items: initData,
    renderer: (item) => {
      const card = new Card(item, onCardClick);
      cards.addItem(card.getCard());
    },
  },
  PLACES_LIST
);

// render init data
cards.renderItems();

// Init add card modal
const addPlaceModal = new ModalWithForm({
  modalSelector: MODAL_ADD,
  onSubmit: (evt, data) => {
    evt.preventDefault();
    const card = new Card(data, onCardClick);
    cards.prependItem(card.getCard());
  },
});

addPlaceModal.setEventListeners();
addPlaceModal.enableFormValidation();

// addCard button listener
addCardButton.addEventListener("click", () => addPlaceModal.open());

// init userInfo container
const userInfo = new UserInfo({
  userNameSelector: PROFILE_NAME,
  roleSelector: PROFILE_ROLE,
});

// init profile modal
const profileModal = new ModalWithForm({
  modalSelector: MODAL_PROFILE,
  onSubmit: (evt, data) => {
    evt.preventDefault();
    userInfo.setUserInfo(data);
    profileModal.close();
  },
});

profileModal.setEventListeners();
profileModal.enableFormValidation();

// profile button listener
profileEditButton.addEventListener("click", () => {
  const { userName: name, role } = userInfo.getUserInfo();
  usernameInput.value = name;
  roleInput.value = role;
  profileModal.open();
});

// common listeners for close on click
const modalsList = Array.from(document.querySelectorAll(".modal"));

modalsList.forEach((modal) => {
  // Don't propagate click from modal window itself
  const modalContainer = modal.querySelector(".modal__container");
  modalContainer.addEventListener("mousedown", (evt) => {
    evt.stopPropagation();
  });

  // Close modal if clicked outside
  modal.addEventListener("mousedown", () => {
    modal.classList.remove("modal_opened");
  });
});
