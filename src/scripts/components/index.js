import { createCard } from './cards.js';
import { openModal, closeModal } from './modal.js';
import { initialCards } from './cardsData.js'

const cardTemplate = document.querySelector('#card-template').content;
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');
const placesList = document.querySelector('.places__list');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupTypeAdd = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const buttonClosePopupEdit = popupTypeEdit.querySelector('.popup__close');
const buttonClosePopupAdd = popupTypeAdd.querySelector('.popup__close');
const buttonCloseImg = popupTypeImage.querySelector('.popup__close');
const formElementAddCard = popupTypeAdd.querySelector('.popup__form');
const formElementEditProfile = popupTypeEdit.querySelector('.popup__form');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');
const titleInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

function addCards(array) {
    array.forEach(function (item) {
        const cardCopy = createCard(item);
        placesList.append(cardCopy);
    });
}
  
function addCardsToBeginning(array) {
    array.forEach(function (item) {
        const cardCopy = createCard(item);
        placesList.prepend(cardCopy);
    });
}

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

// редактирование имени

function handleSubmitFormEdit(evt) {
    evt.preventDefault();

    profileTitle.textContent = titleInput.value;
    profileJob.textContent = jobInput.value;

    closeModal(popupTypeEdit);
}

// функция добавления новой карточки

function handleSubmitFormAdd(evt) {
    evt.preventDefault();
  
  
    const newObject = { 
            name: cardNameInput.value,
            link: urlInput.value
        }
    
    
    const cardCopy = createCard(newObject);
    placesList.prepend(cardCopy);
  
    closeModal(popupTypeAdd); 
    cardNameInput.value = '';
    urlInput.value = '';
  }

addCards(initialCards);

// слушатели открытия попапов

buttonEditProfile.addEventListener('click', function() {
    openModal(popupTypeEdit);
    setDefaultInputs();
});

buttonAddCard.addEventListener('click', function() {
    openModal(popupTypeAdd);
});

// setupImagePopupListeners();

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

//слушатель добавления карточки

formElementAddCard.addEventListener('submit', handleSubmitFormAdd);

// слушатель редактирования имени

formElementEditProfile.addEventListener('submit', handleSubmitFormEdit);

export { cardTemplate, displayClickedImage }