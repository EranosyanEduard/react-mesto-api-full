/** @module ../utils/authApi.js */

import { authApiData } from './utils';

/** Class representing the auth api. */
class AuthApi {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _postUserInfo(resourceName, { email, password }) {
    return fetch(`${ this._url }/${ resourceName }`, {
      method: 'POST',
      headers: { ...this._headers },
      body: JSON.stringify({ email, password })
    });
  }

  _getUserInfo(token) {
    return fetch(`${ this._url }/users/me`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${ token }`
      }
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
      this._getUserInfo(localStorage.getItem('jwt')),
      handleResponse,
    );
  }
}

export default new AuthApi(authApiData);
