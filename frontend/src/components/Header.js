import logo from "../images/logo/logo.svg";
import {useState} from "react";

function Header({emailData, signOut}) {

  const [clickBurger, setClickBurger] = useState(false);

  const handleClickBurger = () => {
    setClickBurger(prevState => !prevState);
  }

  return (
    <>
      {clickBurger ?
        <nav className="header__nav-menu header__nav-menu_active-burger">
          <ul className="header__links-menu header__links-menu_active-burger">
            <li className="header__link-menu">{emailData}</li>
            <li className="header__link-menu">
              <button onClick={signOut} className="header__link-out">Выйти</button>
            </li>
          </ul>
        </nav> : ""}
      <header className="header">
        <img
          src={logo}
          alt=" Логотип сайта mesto."
          className="header__logo"
        />
        <nav className="header__nav-menu">
          <div className="header__burger" onClick={handleClickBurger}>
            <div className={clickBurger ? "header__burger-close-menu" : "header__burger-menu"}></div>
          </div>
          <ul className="header__links-menu">
            <li className="header__link-menu">{emailData}</li>
            <li className="header__link-menu">
              <button onClick={signOut} className="header__link-out">Выйти</button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header;