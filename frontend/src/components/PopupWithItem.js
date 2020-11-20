import React from 'react';

/**
 * Component representing a popup which contains an item.
 * @param props - Object which contains the properties.
 * @returns {JSX.Element}
 * @constructor
 */
function PopupWithItem(props) {
  const {
    popupAdditionalClassName,
    popupItemSizeClassName,
    popupCloseButtonPositionClassName = 'popup__button_position_top-right',
    onClose,
    children
  } = props;

  return (
    <div
      className={`popup ${popupAdditionalClassName}`}
      onClick={onClose}
      onKeyDown={(event) => {
        if (event.key === 'Escape') onClose();
      }}
      tabIndex="-1"
    >
      <div
        className={`popup__item ${popupItemSizeClassName}`}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {children}
        <button
          type="button"
          className={`popup__button ${popupCloseButtonPositionClassName}`}
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default PopupWithItem;
