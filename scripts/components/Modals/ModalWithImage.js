import Modal from "./Modal.js ";

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
    this._modalPhoto = document.querySelector(modalSelector);
    this._modalPhotoImg = this._modalPhoto.querySelector(".photo__img");
    this._modalPhotoCaption = this._modalPhoto.querySelector(".photo__caption");
  }

  _cleanUpPhotoContainer() {
    this._modalPhotoImg.src = "";
    this._modalPhotoImg.alt = "";
    this._modalPhotoCaption.textContent = "";
  }

  open(name, url) {
    this._cleanUpPhotoContainer();
    this._modalPhotoImg.src = url;
    this._modalPhotoImg.alt = `Большая и очень красивая фотография ${name}`;
    this._modalPhotoCaption.textContent = name;
    this._modal.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscClose.bind(this));
  }
}
