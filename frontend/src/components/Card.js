import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ item, onImage, onLikeButton, onRemoveButton }) {
  const { _id: currentUserId } = React.useContext(CurrentUserContext);
  const { link, likes, name, owner, _id: cardId } = item;
  // Determine the state of the buttons:
  const isOwner = currentUserId === owner._id;
  const hasLike = likes.some((user) => user._id === currentUserId);
  const likeButtonClasses = [
    'card__button-like',
    'card__button-like_active'
  ];

  // Handlers:
  const handleImageClick = () => {
    onImage(item);
  };
  const handleLikeButtonClick = () => {
    onLikeButton(item, currentUserId);
  };

  return (
    <li className="gallery__item card">
      <img
        src={link}
        alt={`Изображение: ${name}`}
        className="card__image"
        onClick={handleImageClick}
      />
      <h2 className="card__heading">{name}</h2>
      <button
        type="button"
        className={hasLike
          ? likeButtonClasses.join(' ')
          : likeButtonClasses[0]
        }
        onClick={handleLikeButtonClick}
      />
      <span className="card__counter">{likes.length}</span>
      {
        isOwner && (
          <button
            type="button"
            className="card__button-remove"
            onClick={() => {
              onRemoveButton(cardId);
            }}
          />
        )
      }
    </li>
  );
}

export default Card;
