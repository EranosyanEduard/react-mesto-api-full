import React from 'react';
import Header from './Header';
import Content from './Content';
import Profile from './Profile';
import Card from './Card';
import Gallery from './Gallery';
import Footer from './Footer';
import PopupUserInfo from './PopupUserInfo';
import PopupCardInfo from './PopupCardInfo';
import PopupUserpic from './PopupUserpic';
import PopupPicture from './PopupPicture';

function HomePage(props) {
  const {
    headerProps,
    profileProps,
    galleryProps,
    popupUserInfoProps,
    popupCardInfoProps,
    popupUserpicProps,
    popupPictureProps,
  } = props;

  const contentChildren = (
    <>
      <Profile {...profileProps} />
      <Gallery
        component={Card}
        {...galleryProps}
      />
    </>
  );

  return (
    <>
      <Header {...headerProps} />
      <Content children={contentChildren} />
      <Footer />
      <PopupUserInfo {...popupUserInfoProps} />
      <PopupCardInfo {...popupCardInfoProps} />
      <PopupUserpic {...popupUserpicProps} />
      <PopupPicture {...popupPictureProps} />
    </>
  );
}

export default HomePage;
