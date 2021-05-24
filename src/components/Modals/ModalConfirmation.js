import Modal from "./Modal.js";

export default class ModalConfirmation extends Modal {
  constructor({ modalSelector, onSubmit }) {
    super(modalSelector);
    this._onSubmit = onSubmit;
  }

  setEventListeners() {
    this._modal.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._onSubmit(this._data);
    });
    super.setEventListeners();
  }

  open(data) {
    this._data = data;
    super.open();
  }
}
