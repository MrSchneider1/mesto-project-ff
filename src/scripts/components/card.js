import { openModal } from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;

function createCard(item, likesAmountElement, userId, displayImageFunction, setAndDeleteLikeFunction, DeleteCardFromLayoutFunction) {
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

  cardElement.setAttribute('id', item._id);    //устанавливаем атрибуты data-* чтобы найти карточку при разных дествиях

  if(item.owner._id !== userId) {  //выключаем кнопку удаления у чужих карточек
    deleteButton.style.display = 'none';
  }
  
  if(item.likes.some((item) => item._id === userId)) { // если мы поставили лайк до этого, пусть лайк будет активным
      likeCardButton.classList.add('card__like-button_is-active');
  }

  cardImage.addEventListener('click', function() {
    displayImageFunction(item.name, item.link);
  });

  deleteButton.addEventListener('click', function(e) {
    const popupTypeDelete = document.querySelector('.popup_type_delete');
    openModal(popupTypeDelete);
    const popupButton = popupTypeDelete.querySelector('.popup__button');
    popupButton.addEventListener('click', function(e) {
      DeleteCardFromLayoutFunction(item);
    })
})

  likeCardButton.addEventListener('click', (e) => {
    setAndDeleteLikeFunction(e, item);
})

  return cardElement;
}

export { createCard }