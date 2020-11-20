import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupCardInfo({ isOpen, onClose, onAdd }) {
  const nameInputRef = React.useRef();
  const aboutInputRef = React.useRef();

  React.useEffect(() => {
    nameInputRef.current.value = '';
    aboutInputRef.current.value = '';
  }, [isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onAdd({
      name: nameInputRef.current.value,
      link: aboutInputRef.current.value
    });
    onClose();
  };

  const inputGeneralProps = {
    className: 'form__input form__input_theme_light',
    required: true
  };
  const formChildren = (
    <>
      <label htmlFor="inputCardName" className="form__label">
        <input
          type="text"
          id="inputCardName"
          minLength="1"
          maxLength="30"
          pattern="[a-zA-Zа-яА-ЯёЁ -]+"
          placeholder="Название места"
          ref={nameInputRef}
          {...inputGeneralProps}
        />
        <span className="form__error"></span>
      </label>
      <label htmlFor="inputCardAbout" className="form__label">
        <input
          type="url"
          id="inputCardAbout"
          placeholder="Ссылка на изображение"
          ref={aboutInputRef}
          {...inputGeneralProps}
        />
        <span className="form__error"></span>
      </label>
    </>
  );

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      legend="Новое место"
      children={formChildren}
      popupItemSizeClassName="popup__item_size-for_large-form"
    />
  );
}

export default PopupCardInfo;
