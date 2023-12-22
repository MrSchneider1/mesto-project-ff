// функция открытия попапа

function openModal(popup) {
    popup.classList.add('popup_is-animated');
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', closeByClick);
    document.addEventListener('keydown', closeByEsc);
}

// закрытие на кнопке escape и по клику

function closeByEsc(e) {
    if(e.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    } 
}

function closeByClick(e) {
    const closeButton = e.currentTarget.querySelector('.popup__close');
    if(e.target === e.currentTarget || e.target === closeButton) {
        const popup = e.currentTarget.querySelector('.popup_is-opened');
        closeModal(e.currentTarget);
    }
}

//функция закрытия попапа

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', closeByClick);
    document.removeEventListener('keydown', closeByEsc);
}

// функция установления импутов формы

export { openModal, closeModal }; 