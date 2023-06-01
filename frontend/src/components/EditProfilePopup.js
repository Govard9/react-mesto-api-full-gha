import React, {useState} from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onUpdateUser, onClose}) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState('');

  const [description, setDescription] = useState('');

  React.useEffect(() => {
    if (onClose) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDesc(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title={'Редактировать профиль'}
      name={'profile-edit'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="firstname"
        required
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_data_name"
        id="name"
        onChange={handleChangeName}
        value={name || ''}
      />
      <span className="popup__error name-error"></span>
      <input
        type="text"
        name="profession"
        required
        minLength="2"
        maxLength="200"
        className="popup__input popup__input_data_profession"
        id="profession"
        onChange={handleChangeDesc}
        value={description || ''}
      />
      <span className="popup__error profession-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;