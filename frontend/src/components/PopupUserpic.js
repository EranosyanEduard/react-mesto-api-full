import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupUserpic({ isOpen, onClose, onUpdate }) {
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.value = '';
  }, [isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate(inputRef.current.value);
    onClose();
  };

  const formChildren = (
    <label htmlFor="inputUserpicLink" className="form__label">
      <input
        type="url"
        id="inputUserpicLink"
        className="form__input form__input_theme_light"
        placeholder="Ссылка на изображение"
        ref={inputRef}
        required
      />
    </label>
  );

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      legend="Обновить аватар"
      children={formChildren}
      popupItemSizeClassName="popup__item_size-for_small-form"
    />
  );
}

export default PopupUserpic;
