const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2',
    headers: {
      authorization: '69f8653c-9291-433e-9bb1-872dc49ab260',
      'Content-Type': 'application/json'
    },
    headersShort: {
        authorization: '69f8653c-9291-433e-9bb1-872dc49ab260'
      }
}

const getResponseData = (res) => {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    } 
    return res.json();
}

// загрузка данных о пользовате с сервера

const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headersShort
})
    .then((res) => {
        return getResponseData(res);
    })
}

// добавление всех карточек с сервера

const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headersShort
    })
        .then((res) => {
            return getResponseData(res);
        })
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
        return getResponseData(res);
    })
}

// функции добавления и удаления лайка
 
const setLike = (item) => {
    return fetch(`${config.baseUrl}/cards/likes/${item._id}`, {
        method: 'PUT',
                headers: config.headers 
    })
    .then((res) => {
        return getResponseData(res);
    })
}

const setDislike = (item) => {
    return fetch(`${config.baseUrl}/cards/likes/${item._id}`, {
        method: 'DELETE',
                headers: config.headers
    })
    .then((res) => {
        return getResponseData(res);
    })
}

//удаление карточки

const deleteCardFromServer = (itemId) => {
    return fetch(`${config.baseUrl}/cards/${itemId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        return getResponseData(res);
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
        return getResponseData(res);
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
        return getResponseData(res);
    })
}

export { getUserData, getInitialCards, addNewCard, deleteCardFromServer, changeProfileData, changeAvatar, setLike, setDislike };
  