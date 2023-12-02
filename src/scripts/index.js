// @todo: Темплейт карточки
import { initialCards } from './cards.js'

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const popUp = document.querySelector('.popup');

function createCard(item) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardName = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardName.textContent = item.name;
    deleteButton.addEventListener('click', function() {
        deleteCard(deleteButton);
    });

    return cardElement;
}

function deleteCard(item) {
    const removedObject = item.closest('.places__item');
    removedObject.remove();
}

function addCards() {
    initialCards.forEach(function (item) {
        const cardCopy = createCard(item);
        placesList.append(cardCopy);
    });
}

addCards();

function openPopUp() {
    addEventListener('click', function() {
        popUp.classList.toggle('popup_is-opened');
    });
}

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
