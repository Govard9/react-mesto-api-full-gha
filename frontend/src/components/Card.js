import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardLike, onCardClick, onCardDelete}) {
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `card__like ${isLiked && 'card__like_active'}`
  );

  return (
    <article className="card">
      <img
        src={card.link}
        alt={card.name}
        className="card__element"
        onClick={handleClick}
      />
      {isOwn && <button className="card__delete" onClick={handleDeleteClick} ></button>}
      <div className="card__info">
        <h2 className="card__signature">{card.name}</h2>
        <div className="card__block-like">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
            aria-label="поставить лайк"
          ></button>
          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}
export default Card;