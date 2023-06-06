import {Api} from "./api";

export class Auth extends Api {
  constructor(url) {
    super();
    this._url = url;
  }

  checkResponse(res) {
    return super.checkResponse(res);
  }

  register({ password, email }) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
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
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })
      .then(this.checkResponse)
      .then((data) => {
        if (data._id) {
          localStorage.setItem('token', data._id);
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
  'https://api.mesto.govard.nomoredomains.rocks'
);

export default auth;
