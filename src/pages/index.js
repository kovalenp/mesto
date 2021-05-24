import "./index.css";

import Api from "../components/Api";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import ModalWithImage from "../components/Modals/ModalWithImage.js";
import ModalWithForm from "../components/Modals/ModalWithForm.js";
import ModalConfirmation from "../components/Modals/ModalConfirmation.js";
import FormValidator from "../components/FormValidator.js";

const addCardButton = document.querySelector(".profile__add");
const editAvatarButton = document.querySelector(".profile__avatar");
const profileEditButton = document.querySelector(".profile__edit");
const usernameInput = document.querySelector("#name");
const aboutInput = document.querySelector("#about");
const editProfileForm = document.querySelector(".modal__form_profile");
const addCardForm = document.querySelector(".modal__form_add");
const avatarForm = document.querySelector(".modal__form_avatar");

import {
  PLACES_LIST,
  MODAL_PHOTO,
  MODAL_ADD,
  MODAL_PROFILE,
  PROFILE_NAME,
  PROFILE_ROLE,
  PROFILE_AVATAR,
  MODAL_AVATAR,
  MODAL_CONFIRM,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-24",
  headers: {
    authorization: "2c1a2c33-777d-40ba-aa82-2e8cada55ffd",
    "Content-Type": "application/json",
  },
});

// init userInfo container
const userInfo = new UserInfo({
  userNameSelector: PROFILE_NAME,
  roleSelector: PROFILE_ROLE,
  avatarSelector: PROFILE_AVATAR,
});

//confirm modal
const confirmModal = new ModalConfirmation({
  modalSelector: MODAL_CONFIRM,
  onSubmit: (card) => {
    api
      .deleteCard(card._id)
      .then(() => card.removeCard())
      .then(() => confirmModal.close())
      .catch((err) => console.error(err));
  },
});

confirmModal.setEventListeners();

// photo modal
const imgModal = new ModalWithImage(MODAL_PHOTO);
imgModal.setEventListeners();

const onCardClick = (name, url) => {
  imgModal.open(name, url);
};

const onCardDelete = (card) => {
  confirmModal.open(card);
};

const onCardLike = (card, isLiked) => {
  if (isLiked) {
    api
      .likeCard(card)
      .then((res) => {
        card.like(res.likes.length);
      })
      .catch((err) => console.error(err));
  } else {
    api
      .unlikeCard(card)
      .then((res) => {
        card.like(res.likes.length);
      })
      .catch((err) => console.error(err));
  }
};

const createCard = (data) => {
  const { userId } = userInfo.getUserInfo();
  return new Card({
    data,
    handleCardClick: onCardClick,
    userId,
    handleDeleteClick: onCardDelete,
    handleLike: onCardLike,
  });
};

const cards = new Section(
  {
    renderer: (data) => {
      const card = createCard(data);
      cards.addItem(card.getCard());
    },
  },
  PLACES_LIST
);

//get user id
api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data);

    // get cards info
    api.getInitialCards().then((res) => {
      cards.setItems(res);
      cards.renderItems();
    });
  })
  .catch((err) => console.error(err));

// Init add card modal
const addPlaceModal = new ModalWithForm({
  modalSelector: MODAL_ADD,
  onSubmit: (data) => {
    const { userId } = userInfo.getUserInfo();
    addPlaceModal.setLoading(true);
    api
      .addCard({ name: data.name, link: data.link, userId })
      .then((res) => {
        const card = createCard(res);
        cards.prependItem(card.getCard());
      })
      .then(() => addPlaceModal.close())
      .catch((err) => console.error(err))
      .finally(() => {
        addPlaceModal.setLoading(false);
      });
  },
  formValidator: new FormValidator({}, addCardForm),
});

addPlaceModal.setEventListeners();
addPlaceModal.enableFormValidation();

// addCard button listener
addCardButton.addEventListener("click", () => addPlaceModal.open());

// Init avatar modal
const avatarModal = new ModalWithForm({
  modalSelector: MODAL_AVATAR,
  onSubmit: (data) => {
    avatarModal.setLoading(true);
    api
      .setUserAvatar(data)
      .then((_res) => {
        userInfo.setUserInfo(data);
      })
      .then(() => avatarModal.close())
      .catch((err) => console.error(err))
      .finally(() => {
        avatarModal.setLoading(false);
      });
  },
  formValidator: new FormValidator({}, avatarForm),
});

avatarModal.setEventListeners();
avatarModal.enableFormValidation();

// addCard button listener
editAvatarButton.addEventListener("click", () => avatarModal.open());

// init profile modal
const profileModal = new ModalWithForm({
  modalSelector: MODAL_PROFILE,
  onSubmit: (data) => {
    profileModal.setLoading(true);
    api
      .setUserInfo(data)
      .then((res) => userInfo.setUserInfo(res))
      .then(() => profileModal.close())
      .catch((err) => console.error(err))
      .finally(() => {
        profileModal.setLoading(false);
      });
  },
  formValidator: new FormValidator({}, editProfileForm),
});

profileModal.setEventListeners();
profileModal.enableFormValidation();

// profile button listener
profileEditButton.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  usernameInput.value = name;
  aboutInput.value = about;
  profileModal.open();
});
