import React from 'react';
import PopupWithItem from './PopupWithItem';

function InfoTooltip({ pageType, isSuccessful, isOpen, onClose }) {
  const tooltipImageTypeClassName = isSuccessful
    ? 'tooltip__image_type_success'
    : 'tooltip__image_type_failure';
  const tooltipText = {
    login: {
      true: 'Вы успешно авторизовались!',
      false: 'Что-то пошло не так! Попробуйте еще раз.'
    },
    register: {
      true: 'Вы успешно зарегистрировались!',
      false: 'Что-то пошло не так! Попробуйте еще раз.'
    }
  }[pageType][isSuccessful];

  const popupChildren = (
    <div className="tooltip">
      <div className={`tooltip__image ${tooltipImageTypeClassName}`} />
      <p className="tooltip__text">{tooltipText}</p>
    </div>
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
      popupItemSizeClassName="popup__item_size-for_tooltip"
      popupCloseButtonPositionClassName="popup__button_position_top-center"
      onClose={onClose}
      children={popupChildren}
    />
  );
}

export default InfoTooltip;
