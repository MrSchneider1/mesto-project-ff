import { createCard } from "./cards";
import { openModal } from './modal.js';


const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2',
    headers: {
      authorization: '69f8653c-9291-433e-9bb1-872dc49ab260',
      'Content-Type': 'application/json'
    }
  }

  const placesList = document.querySelector('.places__list');

// загрузка аватара с сервера

  const uploadAvatar = () => {
      return fetch(`${config.baseUrl}/users/me`, {
        headers: {
            authorization: '69f8653c-9291-433e-9bb1-872dc49ab260'
          }
    })
        .then(res => res.json())
        .then((res) => {
            document.querySelector('.profile__title').textContent = res.name;
            document.querySelector('.profile__description').textContent = res.about;
            document.querySelector('.profile__image').setAttribute('style', `background-image: url(${res.avatar});`);
        })
        .catch((err) => {
            console.log('Ошибка. Запрос не выполнен: ', err);
        }); 
  } 

  //добавил свой UserId, взял из карточки профиля

const userId = 'fd8130cfa77dd3af30b582d8';

const getUserId = () => {
    return fetch(`${config.baseUrl}/users/me`,  {
        headers: {
            authorization: '69f8653c-9291-433e-9bb1-872dc49ab260'
          }
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
    .then(res => res._id)
    .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
    }); 
}

// добавление всех карточек с сервера

const getInitialCards = () => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-2/cards', {
        headers: {
            authorization: '69f8653c-9291-433e-9bb1-872dc49ab260'
          }
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
        .then((cards) => {
            return cards;
        })
        // .then(() => {
        //     const arrayDeleteButtons = document.querySelectorAll('.card__delete-button'); // можем реализовать только во втором then, чтоб подгрузился масив карточек с id
        //     arrayDeleteButtons.forEach((deleteButton) => {
        //         deleteButton.addEventListener('click', function(e) {
        //             const popupTypeDelete = document.querySelector('.popup_type_delete');
        //             openModal(popupTypeDelete);
        //             const popupButton = popupTypeDelete.querySelector('.popup__button');
        //             popupButton.setAttribute('data-id', e.target.getAttribute('data-button-id'));  //передаем id карточки в атрибут открывшегося попапа, чтоб знать, какую удалять
        //         })
        //     })
        // })
        .catch((err) => {
            console.log('Ошибка. Запрос не выполнен: ', err);
        }); 
}


// функция добавление новой карточки

const addNewCard = (newCard) => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-2/cards', {
        method: 'POST',
        body: JSON.stringify({
            name: newCard.name,
            link: newCard.link
        }),
        headers: {
                  authorization: '69f8653c-9291-433e-9bb1-872dc49ab260',
                  'Content-Type': 'application/json'
                }        
    }) 
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
    .then((item) => {
            const cardCopy = createCard(item, item.likes.length);
            const deleteButton = cardCopy.querySelector('.card__delete-button');
            const likeCardButton = cardCopy.querySelector('.card__like-button');
            const likesAmountElement = cardCopy.querySelector('.card__likes-amount'); 

            cardCopy.setAttribute('id', item._id);    //устанавливаем атрибуты data-* чтобы найти карточку при разных дествиях
            deleteButton.setAttribute('data-button-id', item._id);
            likeCardButton.setAttribute('data-like-card-id', item._id);

            deleteButton.addEventListener('click', function(e) {
                const popupTypeDelete = document.querySelector('.popup_type_delete');
                openModal(popupTypeDelete);
                const popupButton = popupTypeDelete.querySelector('.popup__button');
                popupButton.setAttribute('data-id', e.target.getAttribute('data-button-id'));
            })
            
            likeCardButton.addEventListener('click', (e) => {
                setAndDeleteLike(e);
            })
            
            likesAmountElement.textContent = item.likes.length;
            if(item.likes.some((item) => item._id === userId)) {
                likeCardButton.classList.add('card__like-button_is-active');
            }

            placesList.prepend(cardCopy); //добавляем в начало
        })
    .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ' + err)
    })
}

// добавление и удаление лайка

const setAndDeleteLike = (e) => {
    e.target.classList.toggle('card__like-button_is-active');

    if(e.target.classList.contains('card__like-button_is-active')) {
        fetch(`https://nomoreparties.co/v1/wff-cohort-2/cards/likes/${e.target.getAttribute('data-like-card-id')}`, {
            method: 'PUT',
                    headers: {
                        authorization: '69f8653c-9291-433e-9bb1-872dc49ab260',
                        'Content-Type': 'application/json'
                    }   
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
        .then((res) => {
            const card = document.getElementById(`${e.target.getAttribute('data-like-card-id')}`);
            const likesAmountElement = card.querySelector('.card__likes-amount');
            likesAmountElement.textContent = res.likes.length;
        })
        .catch((err) => {
            console.log('Ошибка. Запрос не выполнен: ' + err);
        });
        } else {
            fetch(`https://nomoreparties.co/v1/wff-cohort-2/cards/likes/${e.target.getAttribute('data-like-card-id')}`, {
            method: 'DELETE',
                    headers: {
                        authorization: '69f8653c-9291-433e-9bb1-872dc49ab260',
                        'Content-Type': 'application/json'
                    }   
        })
        .then(res => res.json())
        .then((res) => {
            const card = document.getElementById(`${e.target.getAttribute('data-like-card-id')}`);
            const likesAmountElement = card.querySelector('.card__likes-amount');
            likesAmountElement.textContent = res.likes.length;
        })
        .catch((err) => {
            console.log('Ошибка. Запрос не выполнен: ' + err);
        });
        }
}

//удаление карточки

const deleteCard = (e) => {
    fetch(`https://nomoreparties.co/v1/wff-cohort-2/cards/${e.target.getAttribute('data-id')}`, {
        method: 'DELETE',
        headers: {
            authorization: '69f8653c-9291-433e-9bb1-872dc49ab260',
            'Content-Type': 'application/json'
          }   
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
    .then(() => {
        const card = document.getElementById(`${e.target.getAttribute('data-id')}`);
        card.remove();
    }) 
    .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ' + err);
    });
}

// редактирование профиля

const changeProfileData = (data) => {
    fetch('https://nomoreparties.co/v1/wff-cohort-2/users/me', {
        method: 'PATCH',
        body: JSON.stringify({
          name: data.name,
          about: data.about
        }),
        headers: {
            authorization: '69f8653c-9291-433e-9bb1-872dc49ab260',
            'Content-Type': 'application/json'
          },
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
    .then((res) => {
        document.querySelector('.profile__title').textContent = res.name;
        document.querySelector('.profile__description').textContent = res.about;
    })
    .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ' + err);
    })
    .finally(() => {
        const popupTypeEdit = document.querySelector('.popup_type_edit');
        const buttonSubmitEditCard = popupTypeEdit.querySelector('.popup__button');//экспорт
        buttonSubmitEditCard.textContent = buttonSubmitEditCard.getAttribute('data-default-text');
    });
    
}

//изменение аватара


const changeAvatar = (url) => {
    fetch('https://nomoreparties.co/v1/wff-cohort-2/users/me/avatar', {
        method: 'PATCH',
        body: JSON.stringify({
            avatar: url
        }),
        headers: {
                  authorization: '69f8653c-9291-433e-9bb1-872dc49ab260',
                  'Content-Type': 'application/json'
                }        
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }})
    .then((res) => {
        document.querySelector('.profile__image').setAttribute('style', `background-image: url(${url});`);
    })
    .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
    })
    .finally(() => {
        const popupTypeEditAvatar = document.querySelector('.popup_type_edit_avatar');             //дубль
        const buttonSubmitAvatarChange = popupTypeEditAvatar.querySelector('.popup__button');      //дубль
        buttonSubmitAvatarChange.textContent = buttonSubmitAvatarChange.getAttribute('data-default-text');
    });
}

export { uploadAvatar, getInitialCards, addNewCard, setAndDeleteLike, deleteCard, changeProfileData, changeAvatar, getUserId, placesList };
  