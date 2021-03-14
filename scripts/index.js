const editButton = document.querySelector('.profile__edit');
const closeButton = document.querySelector('.popup__close');

editButton.addEventListener('click', function () {
  document.querySelector('.popup').classList.add('popup_opened');
});

closeButton.addEventListener('click', function () {
  document.querySelector('.popup').classList.remove('popup_opened');
});
