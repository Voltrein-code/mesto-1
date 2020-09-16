import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards} from './initial-cards.js';
import {settingsForm} from './constants.js';
// // ____________________________________________________
// // =================== Переменные =====================
// // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// // ==Попап редактирования профиля==
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit')
const popupEditForm = popupEdit.querySelector('.popup__form');
const nameInput = popupEdit.querySelector('.popup__input_name_name');
const professionInput = popupEdit.querySelector('.popup__input_name_profession');

// // ==Попап увеличения картинки==
const gridPhotos = document.querySelectorAll('.grid-item__image');
const popupImageWrap = document.querySelector('.popup_type_image');
const popupImage = popupImageWrap.querySelector('.popup__image');
const popupImageTitle = popupImageWrap.querySelector('.popup__title-image');

// ==Попап добавления карточки==
const popupAdd = document.querySelector('.popup_type_add')
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = popupAdd.querySelector('.popup__button-close');
const popupAddForm = popupAdd.querySelector('.popup__form');
const titleCardInput = popupAdd.querySelector('.popup__input_name_title-card');
const linkCardInput = popupAdd.querySelector('.popup__input_name_link-card');

// ==Добавление карточки пользователем==
const gridCardTemplateId = '#grid-item';
const gridPhotosContainer = document.querySelector('.grid-photos');

// ==Кнопки закрытия попапов==
const popupCloseButtons = document.querySelectorAll('.popup__button-close');
const keyCodeEsc = 27;
let popupCloseButton;
// // _________________________________________________
// // =================== Функции =====================
// // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// ==Функция определения открытого попапа==
const findOpenPopup = () => {
  return document.querySelector('.popup_opened');
}
// ==Функция закрытия попапа по кнопке крестика==
const closePopupCross = () => {
  closePopup(findOpenPopup())
}
// ==Функция открытия попапа==
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscKey);
  // Определяем кнопку закрытия открытого попапа и вешаем слушатель
  popupCloseButton = popup.querySelector('.popup__button-close');
  popupCloseButton.addEventListener('click', closePopupCross);

  popup.addEventListener('click', closePopupOverlay);
  editFormValidator.resetForm();
  addFormValidator.resetForm();
}

// ==Функция закрытия попапа по нажатию Esc==
const closePopupEscKey = (event) => {
  if (event.keyCode === keyCodeEsc) {
    document.removeEventListener('keydown', closePopupEscKey);
    closePopup(findOpenPopup());
  }
}

// ==Функция закрытия попапа==
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  popupCloseButton.removeEventListener('click', closePopupCross);// удаляем слушатель с кнопки закрытия открытого ранее попапа
  popup.removeEventListener('click', closePopupOverlay);
}

// ==Закрытие попапа по клике на оверлей==
const closePopupOverlay = event => { 
  if (event.target !== event.currentTarget) return;   
  closePopup(findOpenPopup());
}

// // ==Обработчик формы редактирования профиля==
const formEditSubmitHandler = (event) => {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;

  closePopup(findOpenPopup());
}

// ==Функция создания попапа с увеличеной картинкой==
const fillPopupImage = (image) => {
  popupImage.src = image.src;
  popupImageTitle.textContent = image.alt;
}

// // ==Обработчик формы добавления карточки==
const formAddSubmitHandler = (event) => {
  event.preventDefault();

  const titleCard = titleCardInput.value;
  const linkCard = linkCardInput.value;
  new Card(titleCard, linkCard, '#grid-item').renderCard(container);
  closePopup(findOpenPopup());
  
}

// ____________________________________________________
// ============== Обработчики событий =================
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// ==Редактирование профиля==
popupEditOpenButton.addEventListener('click', function() {
  openPopup(popupEdit);
  //При открытии заполняем форму редактирования профиля текущими значениями
  nameInput.value = profileName.textContent;
  professionInput.value =  profileProfession.textContent;
});

// ==Открытие попапов==
popupAddOpenButton.addEventListener('click', function() {
  openPopup(popupAdd);
})

// ==Обработчик формы редактирования профиля==
popupEditForm.addEventListener('submit', formEditSubmitHandler); // Кнопка "Сохранить"

// ==Обработчик формы добавления карточки==
popupAddForm.addEventListener('submit', formAddSubmitHandler);

// ____________________________________________________
// ======== Изначальное состояние страницы ============
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// Генерация изначальных карточек
const container = document.querySelector('.grid-photos');
initialCards.forEach(item => {
  new Card(item.name, item.link, gridCardTemplateId, openPopup, popupImageWrap, fillPopupImage).renderCard(container);
})

// Включаем валидацию формы редактрования профиля
const editFormValidator = new FormValidator(settingsForm, popupEditForm);
editFormValidator.enableValidation();

// Включаем валидацию формы добавления карточки
const addFormValidator = new FormValidator(settingsForm, popupAddForm);
addFormValidator.enableValidation();
