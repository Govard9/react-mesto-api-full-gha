import {useContext} from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({
                onCardClick,
                onCardLike,
                onAddPlace,
                onEditAvatar,
                onEditProfile,
                cards,
                onCardDelete
              }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div onClick={onEditAvatar} className="profile__block-avatar">
          <img
            src={currentUser.avatar}
            alt=" Аватар профиля пользователя."
            className="profile__avatar"
          />
          <button className="profile__button-edit" type="button"
                  aria-label="изменение фотографии профиля"></button>
        </div>
        <div className="profile__info">
          <div className="profile__info-text">
            <h1 className="profile__author">{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              className="profile__edit-button"
              type="button"
              aria-label="редактирование профиля"
            ></button>
          </div>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-button"
          type="button"
          aria-label="добавления новой карточки"
        ></button>
      </section>
      <section className="photos">
        {
          cards.map((item) => {
            return <Card
              card={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              key={item._id}/>
          })
        }
      </section>
    </main>
  )
}

export default Main;