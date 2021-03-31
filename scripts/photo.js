const modalPhoto = document.querySelector(".modal_photo");

const modalPhotoImg = modalPhoto.querySelector(".photo__img");
const modalPhotoCaption = modalPhoto.querySelector(".photo__caption");
const modalPhotoCloseButton = modalPhoto.querySelector(".modal__close_photo");

modalPhotoCloseButton.addEventListener("click", () => closeModal(modalPhoto));

function openPhotoModal(card) {
  modalPhotoImg.src = card.link;
  modalPhotoImg.alt = `Большая и очень красивая фотография ${card.name}`;
  modalPhotoCaption.textContent = card.name;
  modalPhoto.classList.add("modal_opened");
}
