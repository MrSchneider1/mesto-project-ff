import { initialCards, addCards, handleSubmitFormAdd } from './cards.js';
import { openModal, closeModal, setDefaultInputs, setupImagePopupListeners, handleSubmitFormEdit } from './modal.js';

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

addCards(initialCards);

// слушатели открытия попапов

editButton.addEventListener('click', function() {
    openModal(popupTypeEdit);
    setDefaultInputs();
});

addButton.addEventListener('click', function() {
    openModal(popupTypeAdd);
});

setupImagePopupListeners();

//слушатели закрытия попапов

closeButtonEdit.addEventListener('click', function() {
    closeModal(popupTypeEdit);
});
closeButtonAdd.addEventListener('click', function() {
    closeModal(popupTypeAdd);
});
closeButtonImg.addEventListener('click', function() {
    closeModal;(popupTypeImage);
});

//слушатель добавления карточки

formElementAdd.addEventListener('submit', handleSubmitFormAdd);

// слушатель редактирования имени

formElementEdit.addEventListener('submit', handleSubmitFormEdit);

export { placesList, cardTemplate, editButton, popupTypeEdit, addButton, popupTypeAdd, popupTypeImage, closeButtonEdit, closeButtonAdd, closeButtonImg, formElementAdd, formElementEdit }