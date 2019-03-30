import Endpoints from './Endpoints';

const getHeaders = (data = {}) => {
  const { token } = data;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };

  if (token) {
    headers['x-access-token'] = token;
  }

  return headers;
};

const stripeApiKey = 'sk_test_7Q2JcCTgfQYdcbNW9Obi9qOP';

const RESTClient = {
  User: {
    signUp: userForm => {
      return fetch(Endpoints.Users.signUp(), {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(userForm)
      })
        .then(response => response.json())
        .catch(err => err);
    },
    login: userForm => {
      return fetch(Endpoints.Users.login(), {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(userForm)
      })
        .then(response => response.json())
        .catch(err => err);
    },
    refreshToken: token => {
      return fetch(Endpoints.Users.refreshToken(), {
        method: 'GET',
        headers: getHeaders({ token })
      })
        .then(response => response.json())
        .catch(err => err);
    },
    forgotPassword: form => {
      return fetch(Endpoints.Users.requestNewPasswordToken(), {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(form)
      })
        .then(response => response.json())
        .catch(err => err);
    },
    resetPassword: form => {
      return fetch(Endpoints.Users.resetPassword(), {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(form)
      })
        .then(response => response.json())
        .catch(err => err);
    },
    friends: token => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.friends(),
            options: {
              method: 'GET',
              headers: getHeaders({ token })
            }
          },
          resolve,
          reject
        );
      });
    },
    getUserInfo: token => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.update(),
            options: {
              method: 'GET',
              headers: getHeaders({ token })
            }
          },
          resolve,
          reject
        );
      });
    },
    coinHistory: (token, data) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.coinHistory(data),
            options: {
              method: 'GET',
              headers: getHeaders({ token })
            }
          },
          resolve,
          reject
        );
      });
    },
    edit: (token, data) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.update(),
            options: {
              method: 'PUT',
              headers: getHeaders({ token }),
              body: JSON.stringify(data)
            }
          },
          resolve,
          reject
        );
      });
    },
    searchUser: (terms, token) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.searchUser({ terms }),
            options: {
              method: 'GET',
              headers: getHeaders({ token })
            }
          },
          resolve,
          reject
        );
      });
    },
    createFriendRequest: (token, friendId) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.createFriendRequest(friendId),
            options: {
              method: 'POST',
              headers: getHeaders({ token })
            }
          },
          resolve,
          reject
        );
      });
    },
    myFriendRequests: token => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.myFriendRequests(),
            options: {
              method: 'GET',
              headers: getHeaders({ token })
            }
          },
          resolve,
          reject
        );
      });
    },
    acceptFriendRequest: (token, friendId) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.acceptFriendRequest(friendId),
            options: {
              method: 'POST',
              headers: getHeaders({ token })
            }
          },
          resolve,
          reject
        );
      });
    },
    pendingFriendRequests: token => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.pendingFriendRquest(),
            options: {
              method: 'GET',
              headers: getHeaders({ token })
            }
          },
          resolve,
          reject
        );
      });
    },
    requestSignedUrl: form => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.requestSignedUrl(form.type, form.name),
            options: {
              method: 'GET',
              headers: getHeaders()
            }
          },
          resolve,
          reject
        );
      });
    },
    searchById: playerId => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.searchById(playerId),
            options: {
              method: 'GET',
              headers: getHeaders()
            }
          },
          resolve,
          reject
        );
      });
    },
    stripeCustomer: data => {
      return fetch(Endpoints.Users.stripeCustomer(data), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${stripeApiKey}`
        }
      })
        .then(response => response.json())
        .catch(err => err);
    },
    createStripeCustomer: (token, data, name) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.createStripeCustomer(),
            options: {
              method: 'POST',
              headers: getHeaders({ token }),
              body: JSON.stringify({ token: data, fullname: name })
            }
          },
          resolve,
          reject
        );
      });
    },
    updateCardInfo: (token, data, name) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.updateCardInfo(),
            options: {
              method: 'POST',
              headers: getHeaders({ token }),
              body: JSON.stringify({ token: data, fullname: name })
            }
          },
          resolve,
          reject
        );
      });
    },
    deposit: (token, amount) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.deposit(),
            options: {
              method: 'PUT',
              headers: getHeaders({ token }),
              body: JSON.stringify({ amount: parseInt(amount) })
            }
          },
          resolve,
          reject
        );
      });
    },
    withdraw: (token, {amount, email}) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.withdraw(),
            options: {
              method: 'PUT',
              headers: getHeaders({ token }),
              body: JSON.stringify({email, amount: parseInt(amount) })
            }
          },
          resolve,
          reject
        );
      });
    },
    retrievecardinfo: token => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.retrievecardinfo(),
            options: {
              method: 'GET',
              headers: getHeaders({ token })
            }
          },
          resolve,
          reject
        );
      });
    },
    declineFriendRequest: (token, friendId) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.declineFriendRequest(friendId),
            options: {
              method: 'POST',
              headers: getHeaders({ token })
            }
          },
          resolve,
          reject
        );
      });
    },
    removeFriend: (token, friendId) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.removeFriend(friendId),
            options: {
              method: 'POST',
              headers: getHeaders({ token })
            }
          },
          resolve,
          reject
        );
      });
    },
    worldLeaderboard: (token, data) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.worldLeaderboard(data),
            options: {
              method: 'GET',
              headers: getHeaders({ token })
            }
          },
          resolve,
          reject
        );
      });
    },
    friendsLeaderboard: (token, data) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.friendsLeaderboard(data),
            options: {
              method: 'GET',
              headers: getHeaders({ token })
            }
          },
          resolve,
          reject
        );
      });
    },
    geoFence: (token, lat, lon) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.geoFence(lat, lon),
            options: {
              method: 'GET',
              headers: getHeaders({ token })
            }
          },
          resolve,
          reject
        );
      });
    },
    pingUpdate: (token, timestamp) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.pingUpdate(),
            options: {
              method: 'PUT',
              headers: getHeaders({ token }),
              body: JSON.stringify(timestamp)
            }
          },
          resolve,
          reject
        );
      });
    }
  },

  Tournament: {
    listAll: page => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Tournaments.listAll(page),
            options: {
              method: 'GET',
              headers: getHeaders()
            }
          },
          resolve,
          reject
        );
      });
    },
    listMy: (token, page) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Tournaments.listMy(page),
            options: {
              method: 'GET',
              headers: getHeaders({ token })
            }
          },
          resolve,
          reject
        );
      });
    },
    details: id => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Tournaments.details(id),
            options: {
              method: 'GET',
              headers: getHeaders()
            }
          },
          resolve,
          reject
        );
      });
    },
    join: (data, token) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Tournaments.join(),
            options: {
              method: 'POST',
              headers: getHeaders({ token }),
              body: JSON.stringify(data)
            }
          },
          ({ data }) => RESTClient.Tournament.details(data.tournament).then(resolve).catch(reject),
          reject
        );
      });
    }
  },

  Games: {
    list: () => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Games.list(),
            options: {
              method: 'GET',
              headers: getHeaders()
            }
          },
          resolve,
          reject
        );
      });
    },
    listPlatform: () => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Games.listPlatform(),
            options: {
              method: 'GET',
              headers: getHeaders()
            }
          },
          resolve,
          reject
        );
      });
    }
  },

  FeaturedMatches: {
    list: () => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.FeaturedMatches.list(),
            options: {
              method: 'GET',
              headers: getHeaders()
            }
          },
          resolve,
          reject
        );
      });
    }
  },

  Challenge: {
    postChallenge: (token, form) => {
      const endpoint = form.guest ? Endpoints.Challenge.postPrivate() : Endpoints.Challenge.postOpen();
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint,
            options: {
              method: 'POST',
              headers: getHeaders({ token }),
              body: JSON.stringify(form)
            }
          },
          resolve,
          reject
        );
      });
    },
    start: (token, id) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Challenge.start(id),
            options: {
              method: 'POST',
              headers: getHeaders({ token })
            }
          },
          resolve,
          reject
        );
      });
    },
    listOpen: page => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Challenge.listOpen(page),
            options: {
              method: 'GET',
              headers: getHeaders()
            }
          },
          resolve,
          reject
        );
      });
    },
    listMy: (token, page) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Challenge.listMy(page),
            options: {
              method: 'GET',
              headers: getHeaders({ token })
            }
          },
          resolve,
          reject
        );
      });
    },
    details: (id, token) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Challenge.details(id),
            options: {
              method: 'GET',
              headers: getHeaders({ token })
            }
          },
          resolve,
          reject
        );
      });
    },
    join: (id, token) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Challenge.join(id),
            options: {
              method: 'POST',
              headers: getHeaders({ token })
            }
          },
          ({ data }) => RESTClient.Challenge.details(data.challenge, token).then(resolve).catch(reject),
          reject
        );
      });
    },
    saveResponseVideo: (id, token) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Challenge.saveResponseVideo(id),
            options: {
              method: 'PUT',
              headers: getHeaders({ token })
            }
          },
          resolve,
          reject
        );
      });
    },
    accept: (id, token) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Challenge.accept(id),
            options: {
              method: 'POST',
              headers: getHeaders({ token })
            }
          },
          ({ data }) => RESTClient.Challenge.details(data._id, token).then(resolve).catch(reject),
          reject
        );
      });
    },
    replyVideoChallenge: (id, token, url) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Challenge.replyVideoChallenge(id),
            options: {
              method: 'PUT',
              headers: getHeaders({ token }),
              body: JSON.stringify({ responseVideoUrl2: url })
            }
          },
          ({ data }) => RESTClient.Challenge.details(data._id, token).then(resolve).catch(reject),
          reject
        );
      });
    },
    decline: (id, token) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Challenge.decline(id),
            options: {
              method: 'POST',
              headers: getHeaders({ token })
            }
          },
          ({ data }) => RESTClient.Challenge.details(data._id, token).then(resolve).catch(reject),
          reject
        );
      });
    },
    cancel: (id, token) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Challenge.cancel(id),
            options: {
              method: 'POST',
              headers: getHeaders({ token })
            }
          },
          ({ data }) => RESTClient.Challenge.details(data._id, token).then(resolve).catch(reject),
          reject
        );
      });
    },
    forfeit: (id, token) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Challenge.forfeit(id),
            options: {
              method: 'POST',
              headers: getHeaders({ token })
            }
          },
          ({ data }) => RESTClient.Challenge.details(data._id, token).then(resolve).catch(reject),
          reject
        );
      });
    },
    extend: (id, token) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Challenge.extend(id),
            options: {
              method: 'POST',
              headers: getHeaders({ token })
            }
          },
          ({ data }) => RESTClient.Challenge.details(data._id, token).then(resolve).catch(reject),
          reject
        );
      });
    },
    submitScore: (id, token, data) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Challenge.submitScore(id),
            options: {
              method: 'PUT',
              headers: getHeaders({ token }),
              body: JSON.stringify(data)
            }
          },
          ({ data }) => RESTClient.Challenge.details(data._id, token).then(resolve).catch(reject),
          reject
        );
      });
    },
    acceptScore: (id, token) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Challenge.acceptScore(id),
            options: {
              method: 'PUT',
              headers: getHeaders({ token })
            }
          },
          ({ data }) => RESTClient.Challenge.details(data._id, token).then(resolve).catch(reject),
          reject
        );
      });
    },
    declineScore: (id, token) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Challenge.declineScore(id),
            options: {
              method: 'PUT',
              headers: getHeaders({ token })
            }
          },
          ({ data }) => RESTClient.Challenge.details(data._id, token).then(resolve).catch(reject),
          reject
        );
      });
    },
    rateOpponent: (token, data) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Challenge.ratings(),
            options: {
              method: 'POST',
              headers: getHeaders({ token }),
              body: JSON.stringify(data)
            }
          },
          resolve,
          reject
        );
      });
    },
    listCompleted: (token, page) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Challenge.listCompleted(page),
            options: {
              method: 'GET',
              headers: getHeaders({ token })
            }
          },
          resolve,
          reject
        );
      });
    }
  },

  Entries: {
    create: (data, token) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Entries.create(),
            options: {
              method: 'POST',
              headers: getHeaders({ token }),
              body: JSON.stringify(data)
            }
          },
          resolve,
          reject
        );
      });
    },
    list: token => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Entries.list(),
            options: {
              method: 'GET',
              headers: getHeaders({ token })
            }
          },
          resolve,
          reject
        );
      });
    },
    leave: (token, tournamentId) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Entries.leave(),
            options: {
              method: 'DELETE',
              headers: getHeaders({ token }),
              body: JSON.stringify({ tournament: tournamentId })
            }
          },
          resolve,
          reject
        );
      });
    }
  },

  Shop: {
    products: () => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Shop.products(),
            options: {
              method: 'GET'
            }
          },
          resolve,
          reject
        );
      });
    }
  },

  Product: {
    coins: () => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Product.coins(),
            options: {
              method: 'GET',
              headers: getHeaders()
            }
          },
          resolve,
          reject
        );
      });
    },
    purchaseProduct: (data, token) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Product.purchase(),
            options: {
              method: 'POST',
              headers: getHeaders({ token }),
              body: JSON.stringify(data)
            }
          },
          resolve,
          reject
        );
      });
    },
    mypurchases: token => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Product.mypurchases(),
            options: {
              method: 'GET',
              headers: getHeaders({ token })
            }
          },
          resolve,
          reject
        );
      });
    },
    getProducts: data => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Product.products(data),
            options: {
              method: 'GET'
            }
          },
          resolve,
          reject
        );
      });
    },
    buyCoins: (data, token) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Product.buyCoins(),
            options: {
              method: 'POST',
              headers: getHeaders({ token }),
              body: JSON.stringify(data)
            }
          },
          resolve,
          reject
        );
      });
    },
    search: data => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Product.search(data),
            options: {
              method: 'GET'
            }
          },
          resolve,
          reject
        );
      });
    },
    getCategories: () => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Product.getCategories(),
            options: {
              method: 'GET'
            }
          },
          resolve,
          reject
        );
      });
    }
  },

  Tutorials: {
    list: () => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Tutorials.list(),
            options: {
              method: 'GET',
              headers: getHeaders()
            }
          },
          resolve,
          reject
        );
      });
    }
  },

  S3: {
    uploadFile: (file, signedRequest) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.setRequestHeader('Content-Type', file.type);
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve({
                status: 'success'
              });
            } else {
              reject({
                status: 'error',
                message: 'Could not upload image to the server at this moment'
              });
            }
          }
        };
        xhr.onerror = function() {
          reject({
            status: 'error',
            message: 'Could not upload image to the server at this moment'
          });
        };
        xhr.send(file);
      });
    }
  },
  Neutrino: {
    wordFilter: params => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Neutrino.wordFilter(),
            options: {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(params)
            }
          },
          resolve,
          reject
        );
      });
    }
  },
  FeaturedStream: {
    get: () => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.FeaturedStream.get(),
            options: {
              method: 'GET',
              headers: {
                'content-type': 'application/json'
              }
            }
          },
          resolve,
          reject
        );
      });
    }
  }
};

async function request(config, resolve, reject) {
  try {
    const response = await fetch(config.endpoint, config.options);
    const responseData = await response.json();

    if (responseData.status === 'error') {
      reject(responseData.message);
    } else if (responseData.status === 'success') {
      resolve(responseData);
    } else if (/neutrinoapi/.test(config.endpoint) && typeof responseData === 'object') {
      resolve(responseData);
    } else {
      reject();
    }
  } catch (e) {
    reject(e);
  }
}

export default RESTClient;
