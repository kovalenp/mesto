// validation

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("modal__text-input_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("modal__text-input-error_active");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("modal__text-input_error");
  errorElement.classList.remove("modal__input-error_active");
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    console.log("here");
    hideInputError(formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

const setEventListeners = (formElement, inputSelector) => {
  const inputList = Array.from(
    formElement.querySelectorAll(`${inputSelector}`)
  );

  const submitElement = formElement.querySelector(".modal__submit-input");
  toggleButtonState(inputList, submitElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, submitElement);
    });
  });
};

function enableValidation(settings) {
  const { formSelector, inputSelector } = settings;
  const formsList = Array.from(document.querySelectorAll(`${formSelector}`));
  formsList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, inputSelector);
  });
}

enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__text-input",
});
