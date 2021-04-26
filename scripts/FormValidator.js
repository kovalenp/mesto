import {
  INPUT_ERROR_CLASS,
  ERROR_CLASS,
  DEFAULT_INPUT_SELECTOR,
  DEFAULT_SUBMIT_SELECTOR,
} from "./constants.js";

import {
  showInputError,
  hideInputError,
  toggleButtonState,
} from "./validationUtils.js";

export class FormValidator {
  constructor(selectors, formElement) {
    this._formElement = formElement;
    this._inputSelector = selectors.inputSelector || DEFAULT_INPUT_SELECTOR;
    this._submitSelector = selectors.submitSelector || DEFAULT_SUBMIT_SELECTOR;
    this._inputErrorClass = selectors.inputErrorClass || INPUT_ERROR_CLASS;
    this._errorClass = selectors.errorElement || ERROR_CLASS;
  }

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(
        this._formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      hideInputError(this._formElement, inputElement);
    }
  };

  _setEventListeners = () => {
    const inputList = Array.from(
      this._formElement.querySelectorAll(`${this._inputSelector}`)
    );
    const submitElement = this._formElement.querySelector(
      `${this._submitSelector}`
    );
    toggleButtonState(inputList, submitElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        toggleButtonState(inputList, submitElement);
      });
    });
  };

  enableValidation() {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
