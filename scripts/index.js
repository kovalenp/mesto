const initData = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const editButton = document.querySelector(".profile__edit");
const closeButton = document.querySelector(".popup__close");

const likeButtons = document.querySelectorAll(".places__like");

const formElement = document.querySelector(".popup__form");

const popup = document.querySelector(".popup");

const profileName = document.querySelector(".profile__name");
const profileRole = document.querySelector(".profile__role");

const usernameInput = document.querySelector("#username");
const roleInput = document.querySelector("#role");

const cardTemplate = document
  .querySelector(".places__item-template")
  .content.querySelector(".places__item");

const placesList = document.querySelector(".places__list");

editButton.addEventListener("click", openPopup);

closeButton.addEventListener("click", closePopup);

function openPopup() {
  popup.classList.add("popup_opened");
  usernameInput.value = profileName.textContent;
  roleInput.value = profileRole.textContent;
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(e) {
  e.preventDefault();
  profileName.textContent = usernameInput.value;
  profileRole.textContent = roleInput.value;
  closePopup();
}

function onClickLikeButtonHandler(e) {
  e.target.classList.toggle("places__like_active");
}

formElement.addEventListener("submit", formSubmitHandler);

function addCard(card) {
  const cardItem = cardTemplate.cloneNode(true);
  const cardImg = cardItem.querySelector(".places__img");
  const cardName = cardItem.querySelector(".places__name");
  const cardDelete = cardItem.querySelector(".places__delete");
  const cardLike = cardItem.querySelector(".places__like");

  cardImg.src = card.link;
  cardName.textContent = card.name;

  cardDelete.addEventListener("click", () => {
    cardItem.remove();
  });

  cardLike.addEventListener("click", onClickLikeButtonHandler);

  placesList.append(cardItem);
}

initData.forEach(addCard);
