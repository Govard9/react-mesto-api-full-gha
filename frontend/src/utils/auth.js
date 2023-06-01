import {Api} from "./api";

export class Auth extends Api {
  constructor(url, token) {
    super();
    this._url = url;
    this._token = token;
  }

  checkResponse(res) {
    return super.checkResponse(res);
  }

  register({ password, email }) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })
      .then(this.checkResponse)
      .then((data) => {
        return data;
      });
  }

  authorization({ password, email }) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })
      .then(this.checkResponse)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          return data;
        }
      });
  }

  getCheckToken(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(this.checkResponse)
      .then((result) => {
        return result;
      });
  }

}

const auth = new Auth(
  'https://auth.nomoreparties.co',
  '2ba4031f-f997-482b-b349-7c66bdec4853'
);

export default auth;