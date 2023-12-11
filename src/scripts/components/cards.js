import { cardTemplate, displayClickedImage } from './index.js' 

function createCard(item) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeCardButton = cardElement.querySelector('.card__like-button');

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardName.textContent = item.name;
  deleteButton.addEventListener('click', function() {
      deleteCard(deleteButton);
  });
  
  likeCardButton.addEventListener('click', function(evt) {
      likeCard(evt.target);
  });
  
  cardImage.addEventListener('click', function() {
    displayClickedImage(item.name, item.link);
  });

  return cardElement;
}

function likeCard(item) {
  item.classList.toggle('card__like-button_is-active');
}

function deleteCard(item) {
  const removedObject = item.closest('.places__item');
  removedObject.remove();
}

export { createCard }