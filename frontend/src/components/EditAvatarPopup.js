import React, {useEffect, useRef} from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onUpdateAvatar, onClose}) {

  const refAvatar = useRef(null);

  useEffect(() => {
    refAvatar.current.value = '';
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: refAvatar.current.value,
    });
  }

  return (
    <PopupWithForm
      title={'Обновить аватар'}
      name={'update-avatar'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
        className="popup__input popup__input_data_link-avatar"
        id="avatar"
        ref={refAvatar}
      />
      <span className="popup__error avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;