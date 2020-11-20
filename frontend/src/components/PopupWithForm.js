import React from 'react';
import PopupWithItem from './PopupWithItem';

function PopupWithForm(props) {
  const {
    isOpen,
    onClose,
    onSubmit,
    isValid = true,
    legend,
    children,
    popupItemSizeClassName
  } = props;

  const submitButtonClasses = [
    'form__button',
    'form__button_theme_light',
    'form__button_disabled'
  ];
  const submitButtonProps = {
    true: {
      className: submitButtonClasses.slice(0, 2).join(' ')
    },
    false: {
      className: submitButtonClasses.join(' '),
      disabled: true
    }
  }[isValid];
  const popupChildren = (
    <form
      action="#"
      className="form form_theme_light"
      onSubmit={onSubmit}
      noValidate
    >
      <fieldset className="form__fieldset">
        <legend className="form__legend">{legend}</legend>
        {children}
      </fieldset>
      <button type="submit" {...submitButtonProps}>Сохранить</button>
    </form>
  );
  const popupAdditionalClasses = [
    'popup_background-transparency_semi',
    'popup_opened'
  ];

  return (
    <PopupWithItem
      popupAdditionalClassName={
        isOpen
          ? popupAdditionalClasses.join(' ')
          : popupAdditionalClasses[0]
      }
      popupItemSizeClassName={popupItemSizeClassName}
      onClose={onClose}
      children={popupChildren}
    />
  );
}

export default PopupWithForm;
