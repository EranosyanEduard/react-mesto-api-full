import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { RegisteredUserContext } from '../contexts/RegisteredUserContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import authApi from '../utils/authApi';
import baseApi from '../utils/baseApi';
import ProtectedRoute from './ProtectedRoute';
import AuthPage from './AuthPage';
import HomePage from './HomePage';

/**
 * Component representing the app.
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
  const history = useHistory();
  // [State variables]
  // Variables for the authApi:
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [registeredUser, setRegisteredUser] = React.useState({
    email: '',
    password: ''
  });
  const [userLogin, setUserLogin] = React.useState(null);
  const [isOpenTooltipFailure, setIsOpenTooltipFailure] = React.useState(false);
  const [isOpenTooltipSuccess, setIsOpenTooltipSuccess] = React.useState(false);
  // Variables for the baseApi:
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isOpenPopupUserpic, setIsOpenPopupUserpic] = React.useState(false);
  const [isOpenPopupUserInfo, setIsOpenPopupUserInfo] = React.useState(false);
  const [isOpenPopupCardInfo, setIsOpenPopupCardInfo] = React.useState(false);

  // [Handlers]
  // General handlers:
  const closeAllPopups = () => {
    setIsOpenTooltipFailure(false);
    setIsOpenTooltipSuccess(false);
    setIsOpenPopupUserpic(false);
    setIsOpenPopupUserInfo(false);
    setIsOpenPopupCardInfo(false);
    setSelectedCard(null);
  };
  const handleBaseApiError = (apiName, statusInfo) => {
    console.error(`BaseApi.${apiName} response status: ${statusInfo}`);
  };
  // AuthPage component handlers:
  const handleAuthError = (errorMessage, errorCode) => {
    setIsOpenTooltipFailure(true);
    console.error(errorMessage[errorCode] || 'Неизвестная ошибка');
  };
  const authorizeUser = (userInfo) => {
    authApi
      .authorizeUser(userInfo, ({ token }) => {
        localStorage.setItem('jwt', token);
        setIsOpenTooltipSuccess(true);
      })
      .catch((response) => {
        const errorMessage = {
          400: 'Не передано одно из полей',
          401: 'Некорректно заполнено одно из полей'
        };
        handleAuthError(errorMessage, response.status);
      });
  };
  const registerUser = (newUserInfo) => {
    authApi
      .registerUser(newUserInfo, () => {
        setRegisteredUser(newUserInfo);
        setIsOpenTooltipSuccess(true);
      })
      .catch((response) => {
        const errorMessage = {
          400: 'Некорректно заполнено одно из полей'
        };
        handleAuthError(errorMessage, response.status);
      });
  };
  // HomePage component handlers:
  const toggleLikeCard = ({ likes, _id: cardId }, userId) => {
    const hasLike = likes.some((user) => user._id === userId);
    const httpMethod = hasLike ? 'DELETE' : 'PUT';
    baseApi
      .toggleLikeCard(cardId, httpMethod, (updatedCard) => {
        const mappedCards = cards.map((card) => (
          card._id === updatedCard._id ? updatedCard : card
        ));
        setCards(mappedCards);
      })
      .catch((statusInfo) => {
        handleBaseApiError('toggleLikeCard', statusInfo);
      });
  };
  const removeCard = (cardId) => {
    baseApi
      .removeCard(cardId, () => {
        setCards(cards.filter(({ _id }) => _id !== cardId));
      })
      .catch((statusInfo) => {
        handleBaseApiError('removeCard', statusInfo);
      });
  };
  const updateUserInfo = (userInfo) => {
    baseApi
      .setUserInfo(userInfo, setCurrentUser)
      .catch((statusInfo) => {
        handleBaseApiError('setUserInfo', statusInfo);
      });
  };
  const addCard = (cardInfo) => {
    baseApi
      .addCard(cardInfo, (newCard) => {
        setCards(cards.concat(newCard));
      })
      .catch((statusInfo) => {
        handleBaseApiError('addCard', statusInfo);
      });
  };
  const updateUserpic = (userpicLink) => {
    baseApi
      .setUserpic(userpicLink, setCurrentUser)
      .catch((statusInfo) => {
        handleBaseApiError('setUserpic', statusInfo);
      });
  };

  // [Properties]
  // AuthPage props:
  const tooltipTypeFailureProps = {
    isOpen: isOpenTooltipFailure,
    onClose: closeAllPopups
  };
  const authPageTypeLoginProps = {
    pageType: 'login',
    onRedirectButton() {
      history.push('/sign-up');
    },
    onSubmit: authorizeUser,
    tooltipTypeFailureProps,
    tooltipTypeSuccessProps: {
      isOpen: isOpenTooltipSuccess,
      onClose() {
        closeAllPopups();
        setLoggedIn(true);
      }
    }
  };
  const authPageTypeRegisterProps = {
    pageType: 'register',
    onRedirectButton() {
      history.push('/sign-in');
    },
    onSubmit: registerUser,
    tooltipTypeFailureProps,
    tooltipTypeSuccessProps: {
      isOpen: isOpenTooltipSuccess,
      onClose() {
        closeAllPopups();
        history.push('/sign-in');
      }
    }
  };
  // HomePage props:
  const homePageProps = {
    headerProps: {
      pageType: 'home',
      onRedirectButton() {
        setLoggedIn(false);
        setUserLogin(null);
        localStorage.removeItem('jwt');
        history.push('/sign-in');
      },
      userLogin
    },
    profileProps: {
      onImage() {
        setIsOpenPopupUserpic(true);
      },
      onEditButton() {
        setIsOpenPopupUserInfo(true);
      },
      onAddButton() {
        setIsOpenPopupCardInfo(true);
      }
    },
    galleryProps: {
      items: cards,
      itemProps: {
        onImage(cardInfo) {
          setSelectedCard(cardInfo);
        },
        onLikeButton: toggleLikeCard,
        onRemoveButton: removeCard
      }
    },
    popupUserInfoProps: {
      isOpen: isOpenPopupUserInfo,
      onClose: closeAllPopups,
      onUpdate: updateUserInfo
    },
    popupCardInfoProps: {
      isOpen: isOpenPopupCardInfo,
      onClose: closeAllPopups,
      onAdd: addCard
    },
    popupUserpicProps: {
      isOpen: isOpenPopupUserpic,
      onClose: closeAllPopups,
      onUpdate: updateUserpic
    },
    popupPictureProps: {
      item: selectedCard,
      onClose: closeAllPopups
    },
  };

  React.useEffect(() => {
    authApi
      .checkToken(({ data }) => {
        baseApi
          .getUserInfo(setCurrentUser)
          .catch((statusInfo) => {
            handleBaseApiError('getUserInfo', statusInfo);
          });
        baseApi
          .getCardList(setCards)
          .catch((statusInfo) => {
            handleBaseApiError('getCardList', statusInfo);
          });
        setUserLogin(data.email);
        setLoggedIn(true);
        history.push('/');
      })
      .catch((response) => {
        response.json()
          .then((except) => {
            console.error(except.message);
          })
          .catch(() => {
            console.error('Неизвестная ошибка');
          });
      });
  }, [loggedIn, history]);

  return (
    <RegisteredUserContext.Provider value={registeredUser}>
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path="/sign-in">
            <AuthPage {...authPageTypeLoginProps} />
          </Route>
          <Route exact path="/sign-up">
            <AuthPage {...authPageTypeRegisterProps} />
          </Route>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={HomePage}
            {...homePageProps}
          />
          <ProtectedRoute path="*" loggedIn={false} />
        </Switch>
      </CurrentUserContext.Provider>
    </RegisteredUserContext.Provider>
  );
}

export default App;
