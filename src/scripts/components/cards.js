import { displayClickedImage } from './index.js'

const cardTemplate = document.querySelector('#card-template').content;


function createCard(item, likesAmountElement) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__title');
  const numberOfLikes = cardTemplate.querySelector('.card__likes-amount');

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardName.textContent = item.name;
  numberOfLikes.textContent = likesAmountElement;
  
  cardImage.addEventListener('click', function() {
    displayClickedImage(item.name, item.link);
  });

  return cardElement;
}

export { createCard }