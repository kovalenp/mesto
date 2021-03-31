const cardElementTemplate = document
  .querySelector(".places__item-template")
  .content.querySelector(".places__item");

const modalPhoto = document.querySelector(".modal_photo");
const placesList = document.querySelector(".places__list");

const modalPhotoImg = modalPhoto.querySelector(".photo__img");
const modalPhotoCaption = modalPhoto.querySelector(".photo__caption");
const modalPhotoCloseButton = modalPhoto.querySelector(".modal__close_photo");

const addCardButton = document.querySelector(".profile__add");
const modalAdd = document.querySelector(".modal_add-photo");
const modalAddCloseButton = document.querySelector(".modal__close_add");
const addForm = document.querySelector(".modal__form_add");
const nameInput = document.querySelector("#name");
const linkInput = document.querySelector("#link");

addCardButton.addEventListener("click", openAddModal);

addForm.addEventListener("submit", addFormSubmitHandler);

function addFormSubmitHandler(e) {
  e.preventDefault();
  const card = { name: nameInput.value, link: linkInput.value };
  addPlaces(card, true);
  closeModal(modalAdd);
  nameInput.value = "";
  linkInput.value = "";
}

function openAddModal() {
  modalAdd.classList.add("modal_opened");
  modalAddCloseButton.addEventListener("click", () => closeModal(modalAdd));
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function onClickLikeButtonHandler(e) {
  e.target.classList.toggle("places__like_active");
}

function openPhotoModal(card) {
  modalPhotoCloseButton.addEventListener("click", () => closeModal(modalPhoto));
  modalPhotoImg.src = card.link;
  modalPhotoCaption.textContent = card.name;
  modalPhoto.classList.add("modal_opened");
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

function addPlaces(card, isFirstElemenet = false) {
  const cardItem = createCardHtmlElement(card);
  isFirstElemenet ? placesList.prepend(cardItem) : placesList.append(cardItem);
}

initData.forEach(addPlaces);
