const cardElementTemplate = document
  .querySelector(".places__item-template")
  .content.querySelector(".places__item");

const placesList = document.querySelector(".places__list");

function closeModal(modal) {
  modal.classList.remove("modal_opened");
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
