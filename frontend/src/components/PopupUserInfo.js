import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function PopupUserInfo({ isOpen, onClose, onUpdate }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');
  const [isValidName, setIsValidName] = React.useState(false);
  const [isValidAbout, setIsValidAbout] = React.useState(false);
  const [nameError, setNameError] = React.useState('');
  const [aboutError, setAboutError] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
    setIsValidName(true);
    setNameError('');
    setIsValidAbout(true);
    setAboutError('');
  }, [currentUser, isOpen]);

  // Handlers:
  const handleNameChange = (event) => {
    const { value, validity, validationMessage } = event.target;
    setName(value);
    setIsValidName(validity.valid);
    setNameError(validationMessage);
  };
  const handleAboutInput = (event) => {
    const { value, validity, validationMessage } = event.target;
    setAbout(value);
    setIsValidAbout(validity.valid);
    setAboutError(validationMessage);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate({ name, about });
    onClose();
  };

  const inputClasses = [
    'form__input',
    'form__input_theme_light',
    'form__input_invalid'
  ];
  const inputGeneralProps = {
    type: 'text',
    minLength: 2,
    required: true
  };
  const formChildren = (
    <>
      <label htmlFor="inputUserName" className="form__label">
        <input
          id="inputUserName"
          className={
            isValidName
              ? inputClasses.slice(0, 2).join(' ')
              : inputClasses.join(' ')
          }
          maxLength="40"
          pattern="[a-zA-Zа-яА-ЯёЁ -]+"
          placeholder="Имя пользователя"
          value={name}
          onChange={handleNameChange}
          {...inputGeneralProps}
        />
        <span className="form__error">{nameError}</span>
      </label>
      <label htmlFor="inputUserAbout" className="form__label">
        <input
          id="inputUserAbout"
          className={
            isValidAbout
              ? inputClasses.slice(0, 2).join(' ')
              : inputClasses.join(' ')
          }
          maxLength="200"
          placeholder="Информация о пользователе"
          value={about}
          onChange={handleAboutInput}
          {...inputGeneralProps}
        />
        <span className="form__error">{aboutError}</span>
      </label>
    </>
  );

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValidName && isValidAbout}
      legend="Редактировать профиль"
      children={formChildren}
      popupItemSizeClassName="popup__item_size-for_large-form"
    />
  );
}

export default PopupUserInfo;
