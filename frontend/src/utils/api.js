export class Api {
  constructor(url) {
    this._url = url;
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
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
      },
    })
      .then(this.checkResponse);
  }

  updateEditProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
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
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
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
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
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
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
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
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
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
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
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
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
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
  'https://api.mesto.govard.nomoredomains.rocks'
);

export default api;
