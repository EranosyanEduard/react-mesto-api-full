import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import appApi from '../utils/appApi';
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
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userLogin, setUserLogin] = React.useState(null);
  const [isOpenTooltipFailure, setIsOpenTooltipFailure] = React.useState(false);
  const [isOpenTooltipSuccess, setIsOpenTooltipSuccess] = React.useState(false);
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
  const handleBaseApiError = (apiName, response) => {
    const responseStatus = `${response.status} ${response.statusText}`;
    console.error(`Base appApi.${apiName} response status: ${responseStatus}`);
  };
  // AuthPage component handlers:
  const handleAuthError = (errorMessage, errorCode) => {
    setIsOpenTooltipFailure(true);
    console.error(errorMessage[errorCode] || 'Неизвестная ошибка');
  };
  const authorizeUser = (userInfo) => {
    appApi
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
    appApi
      .registerUser(newUserInfo, () => {
        setCurrentUser(newUserInfo);
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
    appApi
      .toggleLikeCard(cardId, httpMethod, (updatedCard) => {
        const mappedCards = cards.map((card) => (
          card._id === updatedCard._id ? updatedCard : card
        ));
        setCards(mappedCards);
      })
      .catch((response) => {
        handleBaseApiError('toggleLikeCard', response);
      });
  };
  const removeCard = (cardId) => {
    appApi
      .removeCard(cardId, () => {
        setCards(cards.filter(({ _id }) => _id !== cardId));
      })
      .catch((response) => {
        handleBaseApiError('removeCard', response);
      });
  };
  const updateUserInfo = (userInfo) => {
    appApi
      .setUserInfo(userInfo, setCurrentUser)
      .catch((response) => {
        handleBaseApiError('setUserInfo', response);
      });
  };
  const addCard = (cardInfo) => {
    appApi
      .addCard(cardInfo, (newCard) => {
        setCards(cards.concat(newCard));
      })
      .catch((response) => {
        handleBaseApiError('addCard', response);
      });
  };
  const updateUserpic = (userpicLink) => {
    appApi
      .setUserpic(userpicLink, setCurrentUser)
      .catch((response) => {
        handleBaseApiError('setUserpic', response);
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
    appApi
      .checkToken((user) => {
        appApi
          .getUserInfo(setCurrentUser)
          .catch((response) => {
            handleBaseApiError('getUserInfo', response);
          });
        appApi
          .getCardList(setCards)
          .catch((response) => {
            handleBaseApiError('getCardList', response);
          });
        setUserLogin(user.email);
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
  );
}

export default App;
