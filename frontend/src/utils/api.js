export class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token,
      },
    })
      .then(this.checkResponse);
  }

  updateEditProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then(this.checkResponse)
      .then((data) => {
        return data;
      });
  }

  getUserInfoProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token,
      },
    })
      .then(this.checkResponse)
      .then((result) => {
        return result;
      });
  }

  sendNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then(this.checkResponse)
      .then((data) => {
        return data;
      });
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
      .then(this.checkResponse)
      .then((data) => {
        return data;
      });
  }

  liking(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
    })
      .then(this.checkResponse)
      .then((data) => {
        return data;
      });
  }

  deleteLiking(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
      .then(this.checkResponse)
      .then((data) => {
        return data;
      });
  }

  updateAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: avatar.avatar,
      }),
    })
      .then(this.checkResponse)
      .then((data) => {
        return data;
      });
  }
}

const api = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-60',
  '2ba4031f-f997-482b-b349-7c66bdec4853'
);

export default api;