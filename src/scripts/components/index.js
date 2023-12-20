import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { uploadAvatar, getInitialCards, addNewCard, changeProfileData, changeAvatar, getUserId, deleteCard, setDislike, setLike } from './api.js'
import { createCard } from "./card.js";

const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const buttonClosePopupEdit = popupTypeEdit.querySelector('.popup__close');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupTypeAdd = document.querySelector('.popup_type_new-card');
const buttonClosePopupAdd = popupTypeAdd.querySelector('.popup__close');
const buttonSubmitAddCard = popupTypeAdd.querySelector('.popup__button')
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');
const buttonCloseImg = popupTypeImage.querySelector('.popup__close');
const popupTypeDelete = document.querySelector('.popup_type_delete');
const buttonSubmitEditCard = popupTypeEdit.querySelector('.popup__button');
const formElementAddCard = popupTypeAdd.querySelector('.popup__form');
const formElementEditProfile = popupTypeEdit.querySelector('.popup__form');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');
const titleInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const buttonEditAvatar = document.querySelector('.profile__image');
const popupTypeEditAvatar = document.querySelector('.popup_type_edit_avatar');
const buttonSubmitAvatarChange = popupTypeEditAvatar.querySelector('.popup__button');
const formElementEditAvatar = popupTypeEditAvatar.querySelector('.popup__form');
const inputAvatar = popupTypeEditAvatar.querySelector('.popup__input');

function setDefaultInputs() {
    titleInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;
}

// функция для открытия модалки картинки

function displayClickedImage(name, url) {  
    popupImage.src = url;
    popupImage.alt = name;
    popupImageCaption.textContent = name;
    openModal(popupTypeImage);
  }

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });

// слушатели открытия попапов

buttonEditProfile.addEventListener('click', function() {
    openModal(popupTypeEdit);
    setDefaultInputs();
    
});

buttonAddCard.addEventListener('click', function() {
    openModal(popupTypeAdd);
    cardNameInput.value = '';
    urlInput.value = '';
});

//слушатели закрытия попапов

buttonClosePopupEdit.addEventListener('click', function() {
    closeModal(popupTypeEdit);
});
buttonClosePopupAdd.addEventListener('click', function() {
    closeModal(popupTypeAdd);
});
buttonCloseImg.addEventListener('click', function() {
    closeModal(popupTypeImage);
});


// API

//подгружаем аватар

uploadAvatar()
.then((res) => {
    profileTitle.textContent = res.name;
    profileJob.textContent = res.about;
    profileImage.setAttribute('style', `background-image: url(${res.avatar});`);
})
.catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
}); 

//функция удаления карточки с разметки

const deleteCardFromLayout = (item) => {
    deleteCard(item)
    .then(() => {
      const card = document.getElementById(`${item._id}`);
      card.remove();
      closeModal(popupTypeDelete);
    })
    .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ' + err);
    });
  }

//функция добавления и снятия лайка в разметке

const setAndDeleteLike = (e, item) => {
if(e.target.classList.contains('card__like-button_is-active')) {
    setDislike(item)
    .then((res) => {
        e.target.classList.toggle('card__like-button_is-active');
        const card = document.getElementById(`${item._id}`);
        const likesAmountElement = card.querySelector('.card__likes-amount');
        likesAmountElement.textContent = res.likes.length;
    })
    .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ' + err);
    });
    } else {
    setLike(item)
    .then((res) => {
        e.target.classList.toggle('card__like-button_is-active');
        const card = document.getElementById(`${item._id}`);
        const likesAmountElement = card.querySelector('.card__likes-amount');
        likesAmountElement.textContent = res.likes.length;
    })
    .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ' + err);
    });
    }
}

//загружаем карточки 

Promise.all([getUserId(), getInitialCards()])
.then((data) => {
    const initialCards = data[1];
    const userId = data[0];
    initialCards.forEach(function (item) {
            const cardCopy = createCard(item, item.likes.length, userId, displayClickedImage, setAndDeleteLike, deleteCardFromLayout);

            placesList.append(cardCopy);
            })
            
        })
.catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ' + err);
});

//слушатель сабмита обновления данных профиля

formElementEditProfile.addEventListener('submit', function(e) {
    e.preventDefault();
    buttonSubmitEditCard.textContent = buttonSubmitEditCard.getAttribute('data-loading');
    changeProfileData({
        name: titleInput.value,
        about: jobInput.value
    })
    .then((res) => {
        profileTitle.textContent = res.name;
        profileJob.textContent = res.about;
        closeModal(popupTypeEdit);
        clearValidation(formElementEditProfile, {
            formSelector: '.popup__form',
            inputSelector: '.popup__input',
            submitButtonSelector: '.popup__button',
            inactiveButtonClass: 'popup__button_disabled',
            inputErrorClass: 'popup__input_type_error',
            errorClass: 'popup__error_visible'
          });
    })
    .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ' + err);
    })
    .finally(() => {
        buttonSubmitEditCard.textContent = buttonSubmitEditCard.getAttribute('data-default-text');
    });
});

//слушатель сабмита создания новой карточки

document.forms.newPlace.addEventListener('submit', function (event) {
    event.preventDefault();
    buttonSubmitAddCard.textContent = buttonSubmitAddCard.getAttribute('data-loading');

    const { placeName, link } = event.currentTarget.elements;
  
    addNewCard({
      name: placeName.value,
      link: link.value
    })
    .then((item) => {
        const cardCopy = createCard(item, item.likes.length, item.owner._id, displayClickedImage, setAndDeleteLike, deleteCardFromLayout);
        placesList.prepend(cardCopy); //добавляем в начало
        closeModal(popupTypeAdd);
        })
    .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ' + err)
    })
    .finally(() => {
        buttonSubmitAddCard.textContent = buttonSubmitAddCard.getAttribute('data-default-text');
    });
    
    cardNameInput.value = '';
    urlInput.value = '';
  });

buttonEditAvatar.addEventListener('click', function() {
    openModal(popupTypeEditAvatar);
    clearValidation(formElementEditAvatar, {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
      });
    inputAvatar.value = '';
})

buttonSubmitAvatarChange.addEventListener('click', function(e) {
    e.preventDefault();
    buttonSubmitAvatarChange.textContent = buttonSubmitAvatarChange.getAttribute('data-loading');
    const url = inputAvatar.value;
    changeAvatar(url)
    .then(() => {
        profileImage.setAttribute('style', `background-image: url(${url});`);
        closeModal(popupTypeEditAvatar);
    })
    .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
    })
    .finally(() => {
        buttonSubmitAvatarChange.textContent = buttonSubmitAvatarChange.getAttribute('data-default-text');
    });
    inputAvatar.value = '';
})

// показываем сколько лайков - реализовано в функции создания карточки