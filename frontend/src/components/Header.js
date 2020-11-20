import React from 'react';
import logo from '../images/header/logo.svg';

/**
 * Component representing the header of a page.
 * @returns {JSX.Element}
 * @constructor
 */
function Header({ pageType, onRedirectButton, userLogin = null }) {
  const buttonText = {
    home: 'Выйти',
    login: 'Регистрация',
    register: 'Войти'
  }[pageType];

  return (
    <header className="page__section header">
      <img
        src={logo}
        alt="Логотип проекта"
        className="header__image"
      />
      <button
        type="button"
        className="header__button"
        onClick={onRedirectButton}
      >
        {buttonText}
      </button>
      {
        userLogin && (<span className="header__login">{userLogin}</span>)
      }
    </header>
  );
}

export default Header;
