import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Profile({ onImage, onEditButton, onAddButton }) {
  const { avatar, name, about } = React.useContext(CurrentUserContext);

  return (
    <section className="profile">
      <figure className="profile__figure" onClick={onImage}>
        <img
          src={avatar}
          alt="Аватар - графическое представление пользователя"
          className="profile__image"
        />
      </figure>
      <div className="profile__control">
        <h1 className="profile__text profile__text_type_name">{name}</h1>
        <button
          type="button"
          className="profile__button profile__button_type_edit"
          onClick={onEditButton}
        />
      </div>
      <p className="profile__text profile__text_type_about">{about}</p>
      <button
        type="button"
        className="profile__button profile__button_type_add"
        onClick={onAddButton}
      />
    </section>
  );
}

export default Profile;
