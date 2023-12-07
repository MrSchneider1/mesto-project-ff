import { createCard } from './cards.js';
import { openModal, closeModal } from './modal.js';
import { initialCards } from './cardsData.js'

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const editButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const addButton = document.querySelector('.profile__add-button');
const popupTypeAdd = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const closeButtonEdit = popupTypeEdit.querySelector('.popup__close');
const closeButtonAdd = popupTypeAdd.querySelector('.popup__close');
const closeButtonImg = popupTypeImage.querySelector('.popup__close');
const formElementAdd = popupTypeAdd.querySelector('.popup__form');
const formElementEdit = popupTypeEdit.querySelector('.popup__form');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');
const titleInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');

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

editButton.addEventListener('click', function() {
    openModal(popupTypeEdit);
    setDefaultInputs();
});

addButton.addEventListener('click', function() {
    openModal(popupTypeAdd);
});

// setupImagePopupListeners();

//слушатели закрытия попапов

closeButtonEdit.addEventListener('click', function() {
    closeModal(popupTypeEdit);
});
closeButtonAdd.addEventListener('click', function() {
    closeModal(popupTypeAdd);
});
closeButtonImg.addEventListener('click', function() {
    closeModal(popupTypeImage);
});

//слушатель добавления карточки

formElementAdd.addEventListener('submit', handleSubmitFormAdd);

// слушатель редактирования имени

formElementEdit.addEventListener('submit', handleSubmitFormEdit);

export { placesList, cardTemplate, editButton, popupTypeEdit, addButton, popupTypeAdd, popupTypeImage, closeButtonEdit, closeButtonAdd, 
    closeButtonImg, formElementAdd, formElementEdit, cardNameInput, urlInput, titleInput, jobInput, addCards, addCardsToBeginning, displayClickedImage }