// @todo: Темплейт карточки
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.places__item');
const cardImage = cardElement.querySelector('.card__image');
let cardName = cardElement.querySelector('.card__title');

function addCards() {
    for (let i = 0; i < initialCards.length; i = i + 1) {
        cardImage.src = initialCards[i].link;
        cardName.textContent = initialCards[i].name;
        let cardCopy = cardElement.cloneNode(true);
        placesList.append(cardCopy);
        const deleteButton = cardCopy.querySelector('.card__delete-button');
        function deleteCard() {
            const removedObject = deleteButton.closest('.places__item');
            removedObject.remove();
        }
        deleteButton.addEventListener('click', deleteCard);
    }
}

addCards();

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
