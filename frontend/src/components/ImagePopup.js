import React from "react";

function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_full-image popup_opacity ${card.open}`}>
      <div className="popup__main-container popup__main-container_bg-transperent">
        <button
          onClick={onClose}
          className="popup__close-button"
          type="button"
          aria-label="закрыть всплывающее окно"
        ></button>
        <figure className="popup__block-figure">
          <img src={card.linkImg} alt={card.name} className="popup__img"/>
          <figcaption className="popup__text-figure"></figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;