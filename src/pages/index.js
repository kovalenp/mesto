import "./index.css";

import { initData } from "../data/data.js";

import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import ModalWithImage from "../components/Modals/ModalWithImage.js";
import ModalWithForm from "../components/Modals/ModalWithForm.js";
import FormValidator from "../validation/FormValidator.js";

const addCardButton = document.querySelector(".profile__add");
const profileEditButton = document.querySelector(".profile__edit");
const usernameInput = document.querySelector("#username");
const roleInput = document.querySelector("#role");
const editProfileForm = document.querySelector(".modal__form_profile");
const addCardForm = document.querySelector(".modal__form_add");

import {
  PLACES_LIST,
  MODAL_PHOTO,
  MODAL_ADD,
  MODAL_PROFILE,
  PROFILE_NAME,
  PROFILE_ROLE,
} from "../utils/constants.js";

// photo modal
const imgModal = new ModalWithImage(MODAL_PHOTO);
// imgModal.setEventListeners();

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
  onSubmit: (data) => {
    const card = new Card(data, onCardClick);
    cards.prependItem(card.getCard());
  },
  formValidator: new FormValidator({}, addCardForm),
});

// addPlaceModal.setEventListeners();
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
  onSubmit: (data) => {
    userInfo.setUserInfo(data);
    profileModal.close();
  },
  formValidator: new FormValidator({}, editProfileForm),
});

// profileModal.setEventListeners();
profileModal.enableFormValidation();

// profile button listener
profileEditButton.addEventListener("click", () => {
  const { userName: name, role } = userInfo.getUserInfo();
  usernameInput.value = name;
  roleInput.value = role;
  profileModal.open();
});
