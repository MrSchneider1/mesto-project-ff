import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { uploadAvatar, getInitialCards, addNewCard, setAndDeleteLike, deleteCard, changeProfileData, changeAvatar, getUserId, placesList } from './api.js'
import { createCard } from "./card.js";

const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const buttonClosePopupEdit = popupTypeEdit.querySelector('.popup__close');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupTypeAdd = document.querySelector('.popup_type_new-card');
const buttonClosePopupAdd = popupTypeAdd.querySelector('.popup__close');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');
const buttonCloseImg = popupTypeImage.querySelector('.popup__close');
const popupTypeDelete = document.querySelector('.popup_type_delete');//дубль в api
const buttonSubmitDeleteCard = popupTypeDelete.querySelector('.popup__button');
const buttonSubmitEditCard = popupTypeEdit.querySelector('.popup__button');//дубль в api
const formElementAddCard = popupTypeAdd.querySelector('.popup__form');
const formElementEditProfile = popupTypeEdit.querySelector('.popup__form');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');
const titleInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const buttonEditAvatar = document.querySelector('.profile__image');
const popupTypeEditAvatar = document.querySelector('.popup_type_edit_avatar');//дубль в api
const buttonSubmitAvatarChange = popupTypeEditAvatar.querySelector('.popup__button');//дубль в api
const formElementEditAvatar = popupTypeEditAvatar.querySelector('.popup__form');

function setDefaultInputs() {
    titleInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;
}

// функция для открытия модалки картинки

function displayClickedImage(name, url) {  
    popupImage.src = url;
    popupImage.alt = name;
    popupImageCaption.textContent = name;
    openModal(popupTypeImage);
  }

// слушатели открытия попапов

buttonEditProfile.addEventListener('click', function() {
    openModal(popupTypeEdit);
    setDefaultInputs();
    clearValidation(formElementEditProfile);
});

buttonAddCard.addEventListener('click', function() {
    openModal(popupTypeAdd);
    cardNameInput.value = '';
    urlInput.value = '';
    clearValidation(formElementAddCard);
});

//слушатели закрытия попапов

buttonClosePopupEdit.addEventListener('click', function() {
    closeModal(popupTypeEdit);
});
buttonClosePopupAdd.addEventListener('click', function() {
    closeModal(popupTypeAdd);
});
buttonCloseImg.addEventListener('click', function() {
    closeModal(popupTypeImage);
});

enableValidation();

// API

//подгружаем аватар

uploadAvatar();

//загружаем карточки 

// getInitialCards();

Promise.all([getUserId(), getInitialCards()])
.then((data) => {
    const initialCards = data[1];
    const userId = data[0];
    initialCards.forEach(function (item) {
            const cardCopy = createCard(item, item.likes.length);
            const deleteButton = cardCopy.querySelector('.card__delete-button');
            const likeCardButton = cardCopy.querySelector('.card__like-button');
            const likesAmountElement = cardCopy.querySelector('.card__likes-amount');

            cardCopy.setAttribute('id', item._id);
            // deleteButton.setAttribute('data-button-id', item._id); //нужно, чтобы добавить атрибут Id карточки на кнопку сабмита в модалке и знать, какую удалять
            likeCardButton.setAttribute('data-like-card-id', item._id); //Нужно, чтобы в запросе к серверу по лайку найти нужную карточку
            
            likeCardButton.addEventListener('click', (e) => {
                setAndDeleteLike(e, item);
            })
            
            likesAmountElement.textContent = item.likes.length;

            if(item.owner._id !== userId) {  //выключаем кнопку удаления у чужих карточек
                deleteButton.style.display = 'none';
            }
            if(item.likes.some((item) => item._id === userId)) { // если мы поставили лайк до этого, пусть лайк будет активным
                likeCardButton.classList.add('card__like-button_is-active');
            }

            deleteButton.addEventListener('click', function(e) {
                const popupTypeDelete = document.querySelector('.popup_type_delete');
                openModal(popupTypeDelete);
                const popupButton = popupTypeDelete.querySelector('.popup__button');
                popupButton.addEventListener('click', function(e) {
                    deleteCard(e, item);
                    closeModal(popupTypeDelete);
                })
                // popupButton.setAttribute('data-id', e.target.getAttribute('data-button-id'));  //передаем id карточки в атрибут открывшегося попапа, чтоб знать, какую удалять
            })

            //удаление карточки слушатель

            // buttonSubmitDeleteCard.addEventListener('click', function(e) {
            //     deleteCard(e);
            //     closeModal(popupTypeDelete);
            // })
            placesList.append(cardCopy);
            })
            
        })
// .then(() => {
//         const arrayDeleteButtons = document.querySelectorAll('.card__delete-button'); // можем реализовать только во втором then, чтоб подгрузился масив карточек с id
//         arrayDeleteButtons.forEach((deleteButton) => {
//             deleteButton.addEventListener('click', function(e) {
//                 const popupTypeDelete = document.querySelector('.popup_type_delete');
//                 openModal(popupTypeDelete);
//                 const popupButton = popupTypeDelete.querySelector('.popup__button');
//                 popupButton.addEventListener('click', function(e, item) {
//                     deleteCard(e, item);
//                     closeModal(popupTypeDelete);
//                 })
//                 // popupButton.setAttribute('data-id', e.target.getAttribute('data-button-id'));  //передаем id карточки в атрибут открывшегося попапа, чтоб знать, какую удалять
//             })
//         })
//     })
.catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ' + err);
});

//удаление карточки слушатель

// buttonSubmitDeleteCard.addEventListener('click', function(e) {
//     deleteCard(e);
//     closeModal(popupTypeDelete);
// })

//слушатель сабмита обновления данных профиля

formElementEditProfile.addEventListener('submit', function(e) {
    e.preventDefault();
    buttonSubmitEditCard.textContent = buttonSubmitEditCard.getAttribute('data-loading');
    changeProfileData({
        name: titleInput.value,
        about: jobInput.value
    });
    closeModal(popupTypeEdit);
});

//слушатель сабмита создания новой карточки

document.forms.newPlace.addEventListener('submit', function (event) {
    event.preventDefault();
  
    const { placeName, link } = event.currentTarget.elements;
  
    addNewCard({
      name: placeName.value,
      link: link.value
    });
    
    cardNameInput.value = '';
    urlInput.value = '';
    closeModal(popupTypeAdd);
  });

buttonEditAvatar.addEventListener('click', function() {
    openModal(popupTypeEditAvatar);
    clearValidation(formElementEditAvatar);
})

buttonSubmitAvatarChange.addEventListener('click', function(e) {
    e.preventDefault();
    buttonSubmitAvatarChange.textContent = buttonSubmitAvatarChange.getAttribute('data-loading');
    const inputAvatar = popupTypeEditAvatar.querySelector('.popup__input');
    const url = inputAvatar.value;
    changeAvatar(url);
    inputAvatar.value = '';
    closeModal(popupTypeEditAvatar);
})

// показываем сколько лайков - реализовано в функции создания карточки

export { displayClickedImage, popupTypeDelete }