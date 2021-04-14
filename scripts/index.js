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
const addSubmitButton = addForm.querySelector(".modal__submit-input");

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
const profileSubmitButton = profileForm.querySelector(".modal__submit-input");

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
  document.removeEventListener("keyup", closeOnEscape);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", closeOnEscape);
}

function closeOnEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
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

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const card = { name: nameInput.value, link: linkInput.value };
  addPlaces(card, true);
  closeModal(modalAdd);
  addForm.reset();
}

function openAddModal() {
  // fix: remove errors from previous modal opening
  hideInputError(addForm, nameInput);
  hideInputError(addForm, linkInput);

  addForm.reset();

  openModal(modalAdd);
  /*fix for reviewer comment:

  При создании карточки и открытии попапа снова,
  кнопка сабмита не заблокирована, хотя поля пустые,
  и можно создать пустую карточку*/
  toggleButtonState([nameInput, linkInput], addSubmitButton);
}

function openProfileModal() {
  openModal(profileModal);
  usernameInput.value = profileName.textContent;
  roleInput.value = profileRole.textContent;
  toggleButtonState([usernameInput, roleInput], profileSubmitButton); // fix to enable button when modal opened with default data
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
  modalContainer.addEventListener("click", (evt) => {
    evt.stopPropagation();
  });

  // Close modal if clicked outside
  modal.addEventListener("click", () => {
    closeModal(modal);
  });
});

initData.forEach(addPlaces);
