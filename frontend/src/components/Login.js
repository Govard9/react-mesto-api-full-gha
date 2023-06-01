import React, {useState} from 'react';
import {Link} from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import logo from "../images/logo/logo.svg";

function Login(props) {
  const { onAuthorization } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value)
  }

  const handlePassChange = (evt) => {
    setPassword(evt.target.value)
  }

  const authDataInput = (evt) => {
    evt.preventDefault();
    onAuthorization({
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
        <Link to="/sign-up" className="header__link">Регистрация</Link>
      </header>
      <main className="content">
        <div className="auth">
          <h2 className="auth__title">Вход</h2>
          <form className="auth__form" onSubmit={authDataInput}>
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
            <button type="submit" className="auth__button">Войти</button>
          </form>
        </div>
        <InfoTooltip/>
      </main>
    </>
  );
}

export default Login;