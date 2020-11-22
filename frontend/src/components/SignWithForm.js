import React from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function SignWithForm({ pageType, onSubmit }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    setEmail(currentUser.email);
    setPassword(currentUser.password);
  }, [currentUser]);

  // Handlers:
  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ email, password });
  };

  // Form data:
  const { legend, buttonText, linkTo, linkText } = {
    login: {
      legend: 'Вход',
      buttonText: 'Войти',
      linkTo: '/sign-up',
      linkText: 'Ещё не зарегистрированы? Регистрация',
    },
    register: {
      legend: 'Регистрация',
      buttonText: 'Зарегистрироваться',
      linkTo: '/sign-in',
      linkText: 'Уже зарегистрированы? Войти',
    }
  }[pageType];
  const inputGeneralProps = {
    className: 'form__input form__input_theme_dark',
    required: true
  };

  return (
    <section className="sign">
      <form
        action="#"
        className="sign__item form form_theme_dark"
        name={pageType}
        onSubmit={handleSubmit}
        noValidate
      >
        <fieldset className="form__fieldset">
          <legend className="form__legend form__legend_align_center">
            {legend}
          </legend>
          <label htmlFor="inputUserEmail" className="form__label">
            <input
              type="email"
              id="inputUserEmail"
              name="userEmail"
              placeholder="Email"
              value={email}
              onChange={handleEmailInput}
              {...inputGeneralProps}
            />
          </label>
          <label htmlFor="inputUserPassword" className="form__label">
            <input
              type="password"
              id="inputUserPassword"
              name="userPassword"
              placeholder="Пароль"
              value={password}
              onChange={handlePasswordInput}
              {...inputGeneralProps}
            />
          </label>
        </fieldset>
        <button type="submit" className="form__button">{buttonText}</button>
      </form>
      <Link to={linkTo} className="sign__item sign__item_type_link">
        {linkText}
      </Link>
    </section>
  );
}

export default SignWithForm;
