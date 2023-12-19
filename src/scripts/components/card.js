import { displayClickedImage } from './index.js'

const cardTemplate = document.querySelector('#card-template').content;


function createCard(item, likesAmountElement, setAndDeleteLike) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__title');
  const numberOfLikes = cardElement.querySelector('.card__likes-amount');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeCardButton = cardElement.querySelector('.card__like-button');

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardName.textContent = item.name;
  numberOfLikes.textContent = likesAmountElement;

  cardImage.addEventListener('click', function() {
    displayClickedImage(item.name, item.link);
  });

//   likeCardButton.addEventListener('click', (e) => {
//     setAndDeleteLike(e);
// })

  return cardElement;
}

export { createCard }