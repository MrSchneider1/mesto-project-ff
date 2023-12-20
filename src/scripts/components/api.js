const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2',
    headers: {
      authorization: '69f8653c-9291-433e-9bb1-872dc49ab260',
      'Content-Type': 'application/json'
    }
}

// загрузка аватара с сервера

  const uploadAvatar = () => {
      return fetch(`${config.baseUrl}/users/me`, {
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
  }

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
        console.log('Ошибка. Идентификатор текущего пользователя не найден: ', err);
    }); 
}

// добавление всех карточек с сервера

const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
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
        .catch((err) => {
            console.log('Ошибка запроса. Карточки не загружены с сервера: ', err);
        }); 
}


// функция добавление новой карточки

const addNewCard = (newCard) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        body: JSON.stringify({
            name: newCard.name,
            link: newCard.link
        }),
        headers: config.headers     
    }) 
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
}

// функции добавления и удаления лайка
 
const setLike = (item) => {
    return fetch(`${config.baseUrl}/cards/likes/${item._id}`, {
        method: 'PUT',
                headers: config.headers 
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
}

const setDislike = (item) => {
    return fetch(`${config.baseUrl}/cards/likes/${item._id}`, {
        method: 'DELETE',
                headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
}

//удаление карточки

const deleteCard = (item) => {
    return fetch(`${config.baseUrl}/cards/${item._id}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
}

// редактирование профиля

const changeProfileData = (data) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: data.name,
          about: data.about
        }),
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
}

//изменение аватара

const changeAvatar = (url) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        body: JSON.stringify({
            avatar: url
        }),
        headers: config.headers        
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }})
}

export { uploadAvatar, getInitialCards, addNewCard, deleteCard, changeProfileData, changeAvatar, getUserId, setLike, setDislike };
  