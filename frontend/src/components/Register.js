import React, {useState} from 'react';
import {Link} from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import logo from "../images/logo/logo.svg";

function Register({ onRegister }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value)
  }

  const handlePassChange = (evt) => {
    setPassword(evt.target.value)
  }

  const registerDataInput = (evt) => {
    evt.preventDefault();
    onRegister({
      email: email,
      password: password
    })
    setEmail('');
    setPassword('');
  }

  return (
    <>
      <header className="header header_space-between">
        <img src={logo}
             alt=" Логотип сайта mesto." className="header__logo"/>
        <Link to="/sign-in" className="header__link">Войти</Link>
      </header>
      <main className="content">
        <div className="auth">
          <h2 className="auth__title">Регистрация</h2>
          <form onSubmit={registerDataInput} className="auth__form">
            <input
              onChange={handleEmailChange}
              type="email"
              name="mail"
              placeholder="Email"
              minLength="5"
              maxLength="254"
              className="auth__input"
              value={email}
              required
            />
            <input
              onChange={handlePassChange}
              type="password"
              name="pass"
              placeholder="Пароль"
              minLength="8"
              maxLength="50"
              className="auth__input"
              value={password}
              required
            />
            <button type="submit" className="auth__button">Зарегистрироваться</button>
            <p className="auth__text-login">
              Уже зарегистрированы?&nbsp;
              <Link to="/sign-in" className="auth__link-login">Войти</Link>
            </p>
          </form>
        </div>
        <InfoTooltip />
      </main>
    </>
  );
}

export default Register;