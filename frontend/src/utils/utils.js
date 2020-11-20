/** @module ../utils/utils.js */

const authApiData = {
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
};

const baseApiData = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: '2209a41b-072f-4997-82e0-004301b435a4',
    'Content-Type': 'application/json'
  }
};


export { authApiData, baseApiData };
