import React, {useEffect, useState} from "react";
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import api from "../utils/api";
import auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [popupTooltipOpen, setPopupTooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  const [authorizationSuccess, setAuthorizationSuccess] = useState(false);

  const [registerSuccess, setRegisterSuccess] = useState(false);

  const [emailData, setEmailData] = useState('');

  const navigate = useNavigate();

  const handleCloseRegister = (successReg) => {
    if (successReg) {
      setPopupTooltipOpen(true);
      setRegisterSuccess(false);
      navigate('/sign-in');
    } else {
      setPopupTooltipOpen(false);
    }
  };

  function onRegister({password, email}) {
    auth.register({password, email}).then(() => {
      setPopupTooltipOpen(true);
      setRegisterSuccess(true);
    }).catch((err) => {
      console.log(err);
      if (err === 'Ошибка: 400' || err === 'Ошибка: 401') {
        setPopupTooltipOpen(true);
        setRegisterSuccess(false);
      }
    });
  }

  const handleCloseAuthorization = (successAuth) => {
    if (successAuth) {
      setPopupTooltipOpen(false);
      setAuthorizationSuccess(false);
      handleLogin();
      navigate('/');
      tokenCheck();
    } else {
      setPopupTooltipOpen(false);
    }
  };

  function onAuthorization({password, email}) {
    auth.authorization({password, email}).then((res) => {
      setPopupTooltipOpen(true);
      setAuthorizationSuccess(true);
    }).catch((err) => {
      console.log(err);
      if (err === 'Ошибка: 400' || err === 'Ошибка: 401') {
        setPopupTooltipOpen(true);
        setAuthorizationSuccess(false);
      }
    });
  }

  function signOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/sign-in');
  }

  const tokenCheck = () => {
    if (localStorage.getItem('token')) {
      const jwt = localStorage.getItem('token');
      auth.getCheckToken(jwt).then((res) => {
        if (res) {
          handleLogin();
          navigate("/", {replace: true});
          setEmailData(res.email);
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  useEffect(() => {
    tokenCheck();
  }, [])

  useEffect(() => {
    loggedIn && api.getInitialCards().then(res => {
      setCards(res);
    }).catch((err) => {
      console.log(err);
    })
  }, [loggedIn])

  useEffect(() => {
    loggedIn && api.getUserInfoProfile().then(res => {
      setCurrentUser(res);
    }).catch((err) => {
      console.log(err);
    })
  }, [loggedIn])

  const handleCardClick = (cardData) => {
    setSelectedCard({
      open: 'popup_opened',
      linkImg: cardData.link,
      name: cardData.name
    });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    if (!isLiked) {
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api.liking(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch((err) => {
        console.log(err);
      });
    } else {
      api.deleteLiking(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({});
    setPopupTooltipOpen(false)
  }

  const handleLogin = () => {
    setLoggedIn(true);
  }

  const handleUpdateUser = (data) => {
    api.updateEditProfile(data).then(data => {
      setCurrentUser(data);
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleUpdateAvatar = (avatar) => {
    api.updateAvatar(avatar).then(res => {
      setCurrentUser(res);
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleAddPlaceSubmit = (data) => {
    api.sendNewCard(data).then(newCard => {
      setCards([newCard, ...cards]);
      closeAllPopups();

    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
      { loggedIn && <Header emailData={emailData} signOut={signOut}/>}
      <Routes>
        <Route
            path="/sign-in"
            element={<Login onAuthorization={onAuthorization}/>}
        />

        <Route path="/sign-up" element={<Register onRegister={onRegister} />}
        />

        <Route
            path="*"
            element={
              <ProtectedRoute
                  path="/"
                  loggedIn={loggedIn}
                  component={Main}
                  onAddPlace={setIsAddPlacePopupOpen}
                  onEditProfile={setIsEditProfilePopupOpen}
                  onEditAvatar={setIsEditAvatarPopupOpen}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
              />
            }
        />

      </Routes>

        <Footer/>

      <InfoTooltip
          popupTooltipOpen={popupTooltipOpen}
          onClose={closeAllPopups}
          authorizationSuccess={authorizationSuccess}
          handleCloseAuthorization={handleCloseAuthorization}
          registerSuccess={registerSuccess}
          handleCloseRegister={handleCloseRegister}
      />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <PopupWithForm
            title={'Вы уверены?'}
            name={'delete-card'}
            onClose={closeAllPopups}
          />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </CurrentUserContext.Provider>
    </>

  )
    ;
}

export default App;
