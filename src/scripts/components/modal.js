// функция открытия попапа

function openModal(popup) {
    popup.classList.add('popup_is-animated');
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
    popup.addEventListener('click', closeByClick);
}

// закрытие на кнопку escape и по клику

function closeByEsc(evt) {
    if(evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    } 
}

function closeByClick(evt) {
    if(evt.currentTarget === evt.target) {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    }
}

//функция закрытия попапа

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('click', closeByClick);
    document.removeEventListener('keydown', closeByEsc);
}

// функция установления импутов формы

export { openModal, closeByEsc, closeByClick, closeModal }; 