import React from 'react';
import PopupWithItem from './PopupWithItem';

function PopupPicture({ item, onClose }) {
  const isOpen = !!item;
  const { link, name } = isOpen ? { ...item } : { link: '#', name: '#' };

  const popupChildren = (
    <figure className="figure">
      <img
        src={link}
        alt={`Изображение: ${name}`}
        className="figure__image"
      />
      <figcaption className="figure__caption">{name}</figcaption>
    </figure>
  );
  const popupAdditionalClasses = [
    'popup_background-transparency_slightly',
    'popup_opened'
  ];

  return (
    <PopupWithItem
      popupAdditionalClassName={
        isOpen
          ? popupAdditionalClasses.join(' ')
          : popupAdditionalClasses[0]
      }
      popupItemSizeClassName="popup__item_size-for_figure"
      onClose={onClose}
      children={popupChildren}
    />
  );
}

export default PopupPicture;
