export const INPUT_ERROR_CLASS = "modal__text-input_error";
export const ERROR_CLASS = "modal__text-input-error_active";

// validation

function showInputError(
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass = INPUT_ERROR_CLASS,
  errorClass = ERROR_CLASS
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${errorClass}`);
}

export function hideInputError(
  formElement,
  inputElement,
  inputErrorClass = INPUT_ERROR_CLASS,
  errorClass = ERROR_CLASS
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${inputErrorClass}`);
  errorElement.classList.remove(`${errorClass}`);
  errorElement.textContent = "";
}

function checkInputValidity(
  formElement,
  inputElement,
  inputErrorClass = INPUT_ERROR_CLASS,
  errorClass = ERROR_CLASS
) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

export function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

const setEventListeners = (
  formElement,
  inputSelector,
  submitSelector,
  inputErrorClass,
  errorClass
) => {
  const inputList = Array.from(
    formElement.querySelectorAll(`${inputSelector}`)
  );
  const submitElement = formElement.querySelector(`${submitSelector}`);
  toggleButtonState(inputList, submitElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      );
      toggleButtonState(inputList, submitElement);
    });
  });
};

export function enableValidation(settings) {
  const {
    formSelector,
    inputSelector,
    submitSelector,
    inputErrorClass,
    errorClass,
  } = settings;

  const formsList = Array.from(document.querySelectorAll(`${formSelector}`));
  formsList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(
      formElement,
      inputSelector,
      submitSelector,
      inputErrorClass,
      errorClass
    );
  });
}
