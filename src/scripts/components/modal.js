import { popupTypeEdit, popupTypeImage } from './index.js'

// функция открытия попапа

function openModal(popup) {
    popup.classList.add('popup_is-animated');
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
    popup.addEventListener('click', closeByClick);
}

// закрытие на кнопку escape и по клику

function closeByEsc(evt) {
    if(evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    } 
}

function closeByClick(evt) {
    if(evt.currentTarget === evt.target) {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    }
}

//функция закрытия попапа

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('click', closeByClick);
    document.removeEventListener('keydown', closeByEsc);
}

// функция установления импутов формы

function setDefaultInputs() {
    const name = popupTypeEdit.querySelector('.popup__input_type_name');
    const nameText = document.querySelector('.profile__title').textContent;
    const description = popupTypeEdit.querySelector('.popup__input_type_description');
    const descriptionText = document.querySelector('.profile__description').textContent;
    name.value = nameText;
    description.value = descriptionText;
}

// функции для открытия модалки картинки

function setupImagePopupListeners(evt) {
    const cardsArray = document.querySelectorAll('.places__item');
    cardsArray.forEach(openImageModal);
}

function openImageModal(card) {
    const cardImage = card.querySelector('.card__image');
    cardImage.addEventListener('click', displayClickedImage);
};

function displayClickedImage(evt) {  
    const popupImage = document.querySelector('.popup__image');
    const popupImageCaption = document.querySelector('.popup__caption');
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupImageCaption.textContent = evt.target.alt;
    openModal(popupTypeImage);
}

// редактирование имени

function handleSubmitFormEdit(evt) {
    evt.preventDefault();

    const nameInputEdit = document.querySelector('.popup__input_type_name');
    const jobInput = document.querySelector('.popup__input_type_description');
    const profileTitle = document.querySelector('.profile__title');
    const profileJob = document.querySelector('.profile__description');

    profileTitle.textContent = nameInputEdit.value;
    profileJob.textContent = jobInput.value;

    closeModal(popupTypeEdit);
}

export { openModal, closeByEsc, closeByClick, closeModal, setDefaultInputs, setupImagePopupListeners, openImageModal, displayClickedImage, handleSubmitFormEdit }; 