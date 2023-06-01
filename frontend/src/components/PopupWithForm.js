import React from "react";

function PopupWithForm(
  {
    name,
    title,
    isOpen,
    onClose,
    buttonText,
    children,
    onSubmit
  }) {
  return (
    <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__main-container">
        <button
          onClick={onClose}
          className="popup__close-button"
          type="button"
          aria-label="закрыть всплывающее окно"
        ></button>
        <h2 className="popup__text">{title}</h2>
        <form onSubmit={onSubmit} className="popup__form" name={name}>
          {children}
          <button type="submit" className="popup__button">{buttonText ?? 'Сохранить'}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;