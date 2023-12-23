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
        closeModal(e.currentTarget);
    }
}

//функция закрытия попапа

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', closeByClick);
    document.removeEventListener('keydown', closeByEsc);
    // if(popup.classList.contains('popup_type_delete')) { //хотел очистить переменные при закрытии попапа, но тогда пришлось бы их экспортировать 
    //     cardToDelete = null;                            //из index в modal, что не очень хорошая практика, и тоже была бы пометка "надо исправить"
    //     cardIdToDelete = null;                          //решил, что лучше убрать, так как все равно при попытке удаления другой карточки, переменные 
    // }                                                    // перезапишутся, в выходные наставник нечасто отвечает, а старший студент с данной проблемой не 
                                                            //смог помочь, ну он согласился, что нужно тут в сloseModal, а что с экспортом не ответил
}

// функция установления импутов формы

export { openModal, closeModal }; 