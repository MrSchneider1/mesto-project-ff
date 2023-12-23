const cardTemplate = document.querySelector('#card-template').content;

function createCard(item, userId, displayImageFunction, setAndDeleteLikeFunction, deleteCardFunction) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__title');
  const numberOfLikesElement = cardElement.querySelector('.card__likes-amount');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeCardButton = cardElement.querySelector('.card__like-button');

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardName.textContent = item.name;
  numberOfLikesElement.textContent = item.likes.length;

  if(item.owner._id !== userId) {  //удаляем кнопку удаления у чужих карточек
    deleteButton.remove();
  }
  
  if(item.likes.some((item) => item._id === userId)) { // если мы поставили лайк до этого, пусть лайк будет активным
      likeCardButton.classList.add('card__like-button_is-active');
  }

  cardImage.addEventListener('click', function() {
    displayImageFunction(item.name, item.link);
  });

  deleteButton.addEventListener('click', function() {
    deleteCardFunction(cardElement, item);
})

  likeCardButton.addEventListener('click', (e) => {
    setAndDeleteLikeFunction(e, item, likeCardButton, numberOfLikesElement);
})

  return cardElement;
}

function deleteCardFromLayout(item) {
  item.remove();
}

function toggleLike(likeCardButton, numberOfLikesElement, newLikesNumber) {
  likeCardButton.classList.toggle('card__like-button_is-active');
  numberOfLikesElement.textContent = newLikesNumber;
}

export { createCard, deleteCardFromLayout, toggleLike }