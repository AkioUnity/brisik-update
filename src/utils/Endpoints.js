const APIs = {
  DEV: 'https://api.brisik-api.com/v1/api',
  STRIPE: 'https://api.stripe.com/v1',
  STAGE: 'https://brisik-api.herokuapp.com/v1/api',
  LOCAL: 'http://172.20.10.3:3000/v1/api',
  HEROKU: 'https://eggdevelopmentserver.herokuapp.com/v1/api',
  NEUTRINO: 'https://neutrinoapi.com/bad-word-filter'
};

const API = APIs.DEV;

const neutrinoConfig = {
  userId: 'Brisik',
  apiKey: 'OSk97FdP1uLWrJrHkC3h5o6IIMeuwOT2S6UsBIDrw2SY2dLB'
};

const Endpoints = {
  Users: {
    signUp: () => `${API}/users/signup`,
    login: () => `${API}/users/login`,
    update: () => `${API}/users/me`,
    resetPassword: () => `${API}/users/resetpassword`,
    requestNewPasswordToken: () => `${API}/users/requestnewpasswordtoken`,
    friends: () => `${API}/users/search`,
    sync: () => `${API}/users/sync`,
    searchUser: ({ terms }) => {
      let endpoint = `${API}/users/search`;
      if (terms) {
        const endpointTerms = `?terms=${terms}`;
        endpoint += endpointTerms;
      }
      return endpoint;
    },
    createFriendRequest: id => `${API}/users/createfriendrequest/${id}`,
    myFriendRequests: () => `${API}/users/myfriendrequests/`,
    acceptFriendRequest: id => `${API}/users/acceptfriendrequest/${id}`,
    pendingFriendRquest: () => `${API}/users/pendingfriendrequests/`,
    requestSignedUrl: (type, name) => `${API}/users/requestsignedurl?filename=${name}&filetype=${type}`,
    searchById: id => `${API}/users/details/${id}`,
    stripeCustomer: data => `${APIs.STRIPE}/tokens?${data}`,
    createStripeCustomer: () => `${API}/users/createstripecustomer`,
    deposit: () => `${API}/users/deposit`,
    withdraw: () => `${API}/users/withdraw`,
    updateCardInfo: () => `${API}/users/updatecardinfo`,
    retrievecardinfo: () => `${API}/users/retrievecardinfo`,
    declineFriendRequest: id => `${API}/users/declinefriendrequest/${id}`,
    removeFriend: id => `${API}/users/removeFriend/${id}`,
    worldLeaderboard: page => {
      const endpoint = `${API}/users/leaderboard`;
      if (!page) {
        return endpoint;
      }

      const query = '?page=' + page;
      return endpoint + query;
    },
    coinHistory: page => {
      const endpoint = `${API}/users/transactionhistory?sort=createdAt`;
      if (!page) {
        return endpoint;
      }

      const query = '&page=' + page;
      return endpoint + query;
    },
    geoFence: (lat, lon) => `${API}/users/checkgeolocation?lat=${lat}&lon=${lon}`,
    refreshToken: () => `${API}/users/refreshtoken`,
    friendsLeaderboard: page => {
      const endpoint = `${API}/users/friendleaderboard`;
      if (!page) {
        return endpoint;
      }

      const query = '?page=' + page;
      return endpoint + query;
    },
    pingUpdate:  () => `${API}/users/updatepingtime`
  },

  Tournaments: {
    listAll: page => {
      const endpoint = `${API}/tournaments/open`;

      if (!page) {
        return endpoint;
      }

      const query = '?page=' + page;
      return endpoint + query;
    },
    listMy: page => {
      const endpoint = `${API}/tournaments/my`;

      if (!page) {
        return endpoint;
      }

      const query = '?page=' + page;
      return endpoint + query;
    },
    details: id => `${API}/tournaments/details/${id}`,
    join: () => `${API}/entries`
  },

  FeaturedMatches: {
    list: () => `${API}/featuredmatches`
  },

  Games: {
    list: () => `${API}/games`,
    listPlatform: () => `${API}/platforms`
  },

  Challenge: {
    listOpen: page => {
      const endpoint = `${API}/challenges/open`;

      if (!page) {
        return endpoint;
      }

      const query = '?page=' + page;
      return endpoint + query;
    },
    listMy: page => {
      const endpoint = `${API}/challenges/my`;

      if (!page) {
        return endpoint;
      }

      const query = '?page=' + page;
      return endpoint + query;
    },
    postOpen: () => `${API}/challenges/open`,
    join: id => `${API}/challenges/open/${id}/join`,
    accept: id => `${API}/challenges/private/${id}/accept`,
    decline: id => `${API}/challenges/private/${id}/decline`,
    start: id => `${API}/challenges/startmatch/${id}`,
    replyVideoChallenge: id => `${API}/challenges/${id}/saveresponsevideo`,
    postPrivate: () => `${API}/challenges/private`,
    result: id => `${API}/challenges/results/${id}`,
    submitScore: id => `${API}/challenges/submit_score/${id}`,
    acceptScore: id => `${API}/challenges/accept_score/${id}`,
    declineScore: id => `${API}/challenges/decline_score/${id}`,
    forfeit: id => `${API}/challenges/forfeit/${id}`,
    cancel: id => `${API}/challenges/cancel/${id}`,
    extend: id => `${API}/challenges/extendtimeforchallenge/${id}`,
    details: id => `${API}/challenges/details/${id}`,
    ratings: () => `${API}/ratings`,
    saveResponseVideo: id => `${API}/challenges/${id}/saveresponsevideo`,
    listCompleted: page => {
      const endpoint = `${API}/challenges/completed`;

      if (!page) {
        return endpoint;
      }

      const query = '?page=' + page;
      return endpoint + query;
    }
  },

  Product: {
    coins: () => `${API}/products/coins`,
    purchase: () => `${API}/products/purchase`,
    buyCoins: () => `${API}/products/purchasecoinpackage`,
    mypurchases: () => `${API}/products/mypurchases`,
    products: page => {
      const endpoint = `${API}/products/`;
      if (!page) {
        return endpoint;
      }

      const query = '?page=' + page;
      return endpoint + query;
    },
    search: data => `${API}/products/search?terms=${data}`,
    getCategories: () => `${API}/products/categories`
  },

  Tutorials: {
    list: () => `${API}/tutorials`
  },

  Entries: {
    create: () => `${API}/entries`,
    list: () => `${API}/entries`,
    leave: () => `${API}/entries/`
  },

  Neutrino: {
    wordFilter: () =>
      `${APIs.NEUTRINO}?user-id=${neutrinoConfig.userId}&api-key=${neutrinoConfig.apiKey}`
  },

  FeaturedStream: {
    get: () => `${API}/twitch`
  }
};

export default Endpoints;
