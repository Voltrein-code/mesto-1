import Card from './Card.js';
import FormValidator from './FormValidator.js';
export {openPopup, popupImageWrap, fillPopupImage};
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
const gridCardTemplate = document.querySelector('#grid-item').content;
const gridPhotosContainer = document.querySelector('.grid-photos');

// ==Кнопки закрытия попапов==
const popupCloseButtons = document.querySelectorAll('.popup__button-close');

// // _________________________________________________
// // =================== Функции =====================
// // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// ==Функция определения открытого попапа==
const findOpenPopup = () => {
  return document.querySelector('.popup_opened');
}

// ==Функция открытия попапа==
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  popup.parentNode.addEventListener('keydown', closePopupEscKey);
  popup.querySelector('.popup__button-close').addEventListener('click', () => {
    closePopup(findOpenPopup()); //Выбираем кнопку открытого попапа и вешаем события закрытия на крестик
  })
}

// ==Функция закрытия попапа по нажатию Esc==
const closePopupEscKey = (event) => {
  if (event.keyCode === 27) {
    findOpenPopup().parentNode.removeEventListener('keydown', closePopupEscKey);
    closePopup(findOpenPopup());
  }
}

// ==Функция закрытия попапа==
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
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
  new Card(titleCard, linkCard, '#grid-item').render(container);
  closePopup(findOpenPopup());
  popupAddForm.reset(); // очищаем поля формы для следующего добавления карточки
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

// ==Закрытие попапов по оверлею==
popupEdit.addEventListener('click', closePopupOverlay);
popupAdd.addEventListener('click', closePopupOverlay);
popupImageWrap.addEventListener('click', closePopupOverlay);

// ==Обработчик формы редактирования профиля==
popupEditForm.addEventListener('submit', formEditSubmitHandler); // Кнопка "Сохранить"

// ==Обработчик формы добавления карточки==
popupAddForm.addEventListener('submit', formAddSubmitHandler);

// ____________________________________________________
// ======== Изначальное состояние страницы ============
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// ==Генерация первых 6 карточек из коробки==
const initialCards =[
  {
    name: 'Конь на лугу',
    link: './images/kate-nesmieian-rRXUtG1Kbqs-unsplash.jpg'
  },
  {
    name: 'Лошадки',
    link: './images/mark-neal-Am8FAT_PoJM-unsplash.jpg'
  },
  {
    name: 'Милая лошадь',
    link: './images/navid-bazari-Vw4oefoH4Iw-unsplash.jpg'
  },
  {
    name: 'Разговор коней',
    link: './images/raphael-wicker-P6JRr7-FxLw-unsplash.jpg'
  },
  {
    name: 'Утренний завтрак',
    link: './images/rich-dahlgren--MMRAIrqgUE-unsplash.jpg'
  },
  {
    name: 'Внимательный конь',
    link: './images/santiago-martin-7NC_LcUaky8-unsplash.jpg'
  }
]
// Настройки валидации
const settingsForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}
// Генерация изначальных карточек
const container = document.querySelector('.grid-photos');
for (let i = 0; i < initialCards.length; i++) {
  new Card(initialCards[i].name, initialCards[i].link, '#grid-item').render(container);
}

// Включаем валидацию формы редактрования профиля
const EditFormValidator = new FormValidator(settingsForm, popupEditForm);
EditFormValidator.enableValidation();

// Включаем валидацию формы добавления карточки
const AddFormValidator = new FormValidator(settingsForm, popupAddForm);
AddFormValidator.enableValidation();
