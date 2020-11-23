/** @module ../utils/authApi.js */

import { apiData } from './utils';

/** Class representing the auth api. */
class appApi {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _postUserInfo(resourceName, { email, password }) {
    return fetch(`${this._url}/${resourceName}`, {
      method: 'POST',
      headers: { ...this._headers },
      body: JSON.stringify({ email, password })
    });
  }

  _getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });
  }

  _getCardList() {
    return fetch(`${this._url}/cards`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });
  }

  _patchUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({ name, about })
    });
  }

  _postNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({ name, link })
    });
  }

  _deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });
  }

  _toggleLikeCard(cardId, methodName) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: methodName,
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });
  }

  _patchUserpic(userpicLink) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        link: userpicLink
      })
    });
  }

  _handleBaseResponse(baseResponse, handleResponse) {
    return baseResponse
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then(handleResponse)
  }

  registerUser(newUserInfo, handleResponse) {
    return this._handleBaseResponse(
      this._postUserInfo('signup', newUserInfo),
      handleResponse,
    );
  }

  authorizeUser(userInfo, handleResponse) {
    return this._handleBaseResponse(
      this._postUserInfo('signin', userInfo),
      handleResponse,
    );
  }

  checkToken(handleResponse) {
    return this._handleBaseResponse(
      this._getUserInfo(),
      handleResponse,
    );
  }

  getUserInfo(handleResponse) {
    return this._handleBaseResponse(
      this._getUserInfo(),
      handleResponse
    );
  }

  getCardList(handleResponse) {
    return this._handleBaseResponse(
      this._getCardList(),
      handleResponse
    );
  }

  setUserInfo(userInfo, handleResponse) {
    return this._handleBaseResponse(
      this._patchUserInfo(userInfo),
      handleResponse
    );
  }

  addCard(cardInfo, handleResponse) {
    return this._handleBaseResponse(
      this._postNewCard(cardInfo),
      handleResponse
    );
  }

  removeCard(cardId, handleResponse) {
    return this._handleBaseResponse(
      this._deleteCard(cardId),
      handleResponse
    );
  }

  toggleLikeCard(cardId, methodName, handleResponse) {
    return this._handleBaseResponse(
      this._toggleLikeCard(cardId, methodName),
      handleResponse
    );
  }

  setUserpic(userpicLink, handleResponse) {
    return this._handleBaseResponse(
      this._patchUserpic(userpicLink),
      handleResponse
    );
  }
}

export default new appApi(apiData);
