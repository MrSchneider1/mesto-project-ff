import { placesList, cardTemplate, popupTypeAdd } from './index.js'
import { setupImagePopupListeners, closeModal } from './modal.js'

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Таганрог",
      link: "https://images.unsplash.com/photo-1694456950156-844c5785dcce?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

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

  return cardElement;
}

function likeCard(item) {
  item.classList.toggle('card__like-button_is-active');
}

function deleteCard(item) {
  const removedObject = item.closest('.places__item');
  removedObject.remove();
}

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

// функция добавления новой карточки

function handleSubmitFormAdd(evt) {
  const nameInput = document.querySelector('.popup__input_type_card-name');
  const urlInput = document.querySelector('.popup__input_type_url');
  evt.preventDefault();

  const newArray = [
      { 
          name: `${nameInput.value}`,
          link: `${urlInput.value}`
      }
  ]
  addCardsToBeginning(newArray);
  setupImagePopupListeners();
  closeModal(popupTypeAdd); 
}

export { initialCards, createCard, likeCard, deleteCard, addCards, addCardsToBeginning, handleSubmitFormAdd }