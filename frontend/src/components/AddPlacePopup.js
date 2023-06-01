import React, {useEffect, useRef, useState} from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onAddPlace, onClose}) {

  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const handleTitleChange = (evt) => {
    setTitle(evt.target.value)
  }

  const handleLinkChange = (evt) => {
    setLink(evt.target.value)
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name: title,
      link: link,
    });
  }

  return (
    <PopupWithForm
      title={'Новое место'}
      name={'add-card'}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={'Создать'}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        className="popup__input popup__input_data_title"
        required
        id="title"
        onChange={handleTitleChange}
        value={title}
      />
      <span className="popup__error title-error"></span>
      <input
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        className="popup__input popup__input_data_link-img"
        id="link"
        onChange={handleLinkChange}
        value={link}
      />
      <span className="popup__error link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;