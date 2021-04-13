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

const cardElementTemplate = document
  .querySelector("#place-template")
  .content.querySelector(".places__item");

const placesList = document.querySelector(".places__list");

const addCardButton = document.querySelector(".profile__add");
const modalAdd = document.querySelector(".modal_add");
const modalAddCloseButton = document.querySelector(".modal__close_add");
const addForm = document.querySelector(".modal__form_add");
const nameInput = document.querySelector("#name");
const linkInput = document.querySelector("#link");

const modalPhoto = document.querySelector(".modal_photo");

const modalPhotoImg = modalPhoto.querySelector(".photo__img");
const modalPhotoCaption = modalPhoto.querySelector(".photo__caption");
const modalPhotoCloseButton = modalPhoto.querySelector(".modal__close_photo");

const profileEditButton = document.querySelector(".profile__edit");
const profileCloseButton = document.querySelector(".modal__close_profile");

const profileForm = document.querySelector(".modal__form_profile");
const profileModal = document.querySelector(".modal_profile");
const profileName = document.querySelector(".profile__name");
const profileRole = document.querySelector(".profile__role");
const usernameInput = document.querySelector("#username");
const roleInput = document.querySelector("#role");

const modalsList = Array.from(document.querySelectorAll(".modal"));

addCardButton.addEventListener("click", openAddModal);
addForm.addEventListener("submit", addFormSubmitHandler);
modalPhotoCloseButton.addEventListener("click", () => closeModal(modalPhoto));
profileEditButton.addEventListener("click", openProfileModal);
profileCloseButton.addEventListener("click", () => closeModal(profileModal));
modalAddCloseButton.addEventListener("click", () => closeModal(modalAdd));
profileForm.addEventListener("submit", profileSubmitHandler);

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", (evt) => closeOnEscape(evt, modal));
  clearAddFormInputs();
  clearPhotoModal();
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", (evt) => closeOnEscape(evt, modal));
}

function closeOnEscape(evt, modal) {
  if (evt.key === "Escape") {
    closeModal(modal);
  }
}

function openPhotoModal(card) {
  modalPhotoImg.src = card.link;
  modalPhotoImg.alt = `Большая и очень красивая фотография ${card.name}`;
  modalPhotoCaption.textContent = card.name;
  openModal(modalPhoto);
}

function clearAddFormInputs() {
  addForm.reset();
}

function clearPhotoModal() {
  modalPhotoImg.src = "";
  modalPhotoImg.alt = ``;
  modalPhotoCaption.textContent = "";
}

function addFormSubmitHandler(e) {
  e.preventDefault();
  const card = { name: nameInput.value, link: linkInput.value };
  addPlaces(card, true);
  closeModal(modalAdd);
}

function openAddModal() {
  openModal(modalAdd);
}

function openProfileModal() {
  openModal(profileModal);
  usernameInput.value = profileName.textContent;
  roleInput.value = profileRole.textContent;
}

function profileSubmitHandler(e) {
  e.preventDefault();
  profileName.textContent = usernameInput.value;
  profileRole.textContent = roleInput.value;
  closeModal(profileModal);
}

function onClickLikeButtonHandler(e) {
  e.target.classList.toggle("places__like_active");
}

function createCardHtmlElement(cardData) {
  const { name, link } = cardData;
  const cardItem = cardElementTemplate.cloneNode(true);
  const cardImg = cardItem.querySelector(".places__img");
  const cardName = cardItem.querySelector(".places__name");
  const cardDelete = cardItem.querySelector(".places__delete");
  const cardLike = cardItem.querySelector(".places__like");

  cardImg.src = link;
  cardImg.alt = `Фотография ${name}`;
  cardName.textContent = name;

  cardDelete.addEventListener("click", () => cardItem.remove());
  cardLike.addEventListener("click", onClickLikeButtonHandler);
  cardImg.addEventListener("click", () => openPhotoModal(cardData));

  return cardItem;
}

function addPlaces(card, isFirstElement = false) {
  const cardItem = createCardHtmlElement(card);
  isFirstElement ? placesList.prepend(cardItem) : placesList.append(cardItem);
}

modalsList.forEach((modal) => {
  // Don't propagate click from modal window itself
  const modalContainer = modal.querySelector(".modal__container");
  modalContainer.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  // Close modal if clicked outside
  modal.addEventListener("click", () => {
    closeModal(modal);
  });
});

initData.forEach(addPlaces);
