const modalPhoto = document.querySelector(".modal_photo");
const modalPhotoImg = modalPhoto.querySelector(".photo__img");
const modalPhotoCaption = modalPhoto.querySelector(".photo__caption");
const modalPhotoCloseButton = modalPhoto.querySelector(".modal__close_photo");

modalPhotoCloseButton.addEventListener("click", () => closeModal(modalPhoto));

const modalsList = Array.from(document.querySelectorAll(".modal"));

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

function closeModal(modal) {
  if (modal.classList.contains("modal_photo")) {
    modalPhotoImg.src = "";
    modalPhotoImg.alt = "";
    modalPhotoCaption.textContent = "";
  }
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", closeOnEscape);
}

function _openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", closeOnEscape);
}

function closeOnEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

export function openPhotoModal(name, link) {
  modalPhotoImg.src = link;
  modalPhotoImg.alt = `Большая и очень красивая фотография ${name}`;
  modalPhotoCaption.textContent = name;
  _openModal(modalPhoto);
}
