const addCardButton = document.querySelector(".profile__add");
const modalAdd = document.querySelector(".modal_add");
const modalAddCloseButton = document.querySelector(".modal__close_add");
const addForm = document.querySelector(".modal__form_add");
const nameInput = document.querySelector("#name");
const linkInput = document.querySelector("#link");

addCardButton.addEventListener("click", openAddModal);

addForm.addEventListener("submit", addFormSubmitHandler);

function clearAddFormInputs() {
  nameInput.value = "";
  linkInput.value = "";
}

function addFormSubmitHandler(e) {
  e.preventDefault();
  const card = { name: nameInput.value, link: linkInput.value };
  addPlaces(card, true);
  closeModal(modalAdd);
  clearAddFormInputs();
}

function openAddModal() {
  modalAdd.classList.add("modal_opened");
  modalAddCloseButton.addEventListener("click", () => {
    closeModal(modalAdd);
    clearAddFormInputs();
  });
}
