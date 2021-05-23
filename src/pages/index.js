import "./index.css";

import Api from "../components/Api";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import ModalWithImage from "../components/Modals/ModalWithImage.js";
import ModalWithForm from "../components/Modals/ModalWithForm.js";
import ModalConformation from "../components/Modals/ModalConformation.js";
import FormValidator from "../validation/FormValidator.js";

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

const api = new Api();

// init userInfo container
const userInfo = new UserInfo({
  userNameSelector: PROFILE_NAME,
  roleSelector: PROFILE_ROLE,
  avatarSelector: PROFILE_AVATAR,
});

//confirm modal
const confirmModal = new ModalConformation({
  modalSelector: MODAL_CONFIRM,
  onSubmit: (card) => {
    api
      .deleteCard(card._id)
      .then(() => card.removeCard())
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

//get user id
api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data);

    const { _id } = data;

    // get cards info
    api.getInitialCards().then((res) => {
      // cards Layout
      const cards = new Section(
        {
          items: res,
          renderer: (item) => {
            const card = new Card({
              data: item,
              handleCardClick: onCardClick,
              userId: _id,
              handleDeleteClick: onCardDelete,
              handleLike: onCardLike,
            });
            cards.addItem(card.getCard());
          },
        },
        PLACES_LIST
      );

      // render init data
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
        const card = new Card({
          data: res,
          handleCardClick: onCardClick,
          handleDeleteClick: onCardDelete,
          userId,
          handleLike: onCardLike,
        });
        const cards = new Section({}, PLACES_LIST);
        cards.prependItem(card.getCard());
      })
      .then(addPlaceModal.setLoading(false))
      .catch((err) => console.error(err));
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
      .then(avatarModal.setLoading(false))
      .catch((err) => console.error(err));
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
      .then(profileModal.setLoading(false))
      .then(profileModal.close())
      .catch((err) => console.error(err));
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
