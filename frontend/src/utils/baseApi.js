/** @module ../utils/baseApi.js */

import { apiData } from './utils.js';

/** Class representing the base api. */
class BaseApi {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _getUserInfo() {
    return fetch(`${this._url}/users/me`, { headers: this._headers });
  }

  _getCardList() {
    return fetch(`${this._url}/cards`, { headers: this._headers });
  }

  _patchUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about })
    });
  }

  _postNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    });
  }

  _deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  _toggleLikeCard(cardId, methodName) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: methodName,
      headers: this._headers
    });
  }

  _patchUserpic(userpicLink) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
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
        return Promise.reject(`${response.status} ${response.statusText}`);
      })
      .then(handleResponse)
  }

  getUserInfo(handleResponse) {
    return this._handleBaseResponse(this._getUserInfo(), handleResponse);
  }

  getCardList(handleResponse) {
    return this._handleBaseResponse(this._getCardList(), handleResponse);
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

export default new BaseApi(apiData);
