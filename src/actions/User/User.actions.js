import * as types from './User.actionTypes';

export const initialize = data => {
  return {
    type: types.USER_INITIALIZE,
    data
  };
};

export const login = (data, callback) => {
  return {
    type: types.SAGAS_LOGIN,
    data,
    callback
  };
};

export const signup = (data, callback) => {
  return {
    type: types.SAGAS_SIGNUP,
    data,
    callback
  };
};

export const refreshToken = token => {
  return {
    type: types.REFRESH_TOKEN,
    token
  };
};

export const update = (form, options) => {
  return {
    type: types.UPDATE,
    form,
    options
  };
};

export const forgotPassword = (data, callback) => {
  return {
    type: types.SAGAS_FORGOT_PASSWORD,
    data,
    callback
  };
};

export const setNewPassword = data => {
  return {
    type: types.SAGAS_SET_NEW_PASSWORD,
    data
  };
};

export const logout = () => {
  return {
    type: types.LOGOUT
  };
};

export const setUserData = data => {
  return {
    type: types.SET_DATA,
    data
  };
};

export const setUserToken = data => {
  return {
    type: types.STORE_USER_SET_TOKEN,
    data
  };
};

export const clearUserData = () => {
  return {
    type: types.CLEAR_DATA
  };
};

export const searchUsers = data => {
  return {
    type: types.SAGAS_SEARCH_USERS,
    data
  };
};

export const searchResult = data => {
  return {
    type: types.STORE_SEARCH_RESULT,
    data
  };
};

export const setLoading = origin => {
  return {
    type: types.USER_SET_LOADING,
    origin
  };
};

export const unsetLoading = origin => {
  return {
    type: types.USER_UNSET_LOADING,
    origin
  };
};

export const changeProfileImage = (data, callback) => {
  return {
    type: types.USER_CHANGE_PROFILE_IMAGE,
    data,
    callback
  };
};

export const changeCoverImage = data => {
  return {
    type: types.USER_CHANGE_COVER_IMAGE,
    data
  };
};

export const getFriendRequests = () => {
  return {
    type: types.USER_GET_FRIEND_REQUESTS
  };
};

export const getPendingFriendRequests = () => {
  return {
    type: types.SAGAS_GET_PENDING_FRIEND_REQUESTS
  };
};

export const setPendingFriendRequests = data => {
  return {
    type: types.STORE_SET_PENDING_FRIEND_REQUESTS,
    data
  };
};

export const setFriendRequests = data => {
  return {
    type: types.USER_SET_FRIEND_REQUESTS,
    data
  };
};

export const sendFriendRequest = (friendId, callback) => {
  return {
    type: types.USER_SEND_FRIEND_REQUEST,
    friendId,
    callback
  };
};

export const acceptFriendRequest = (friendId, callback) => {
  return {
    type: types.USER_ACCEPT_FRIEND_REQUEST,
    friendId,
    callback
  };
};

export const updateProfile = (data, section) => {
  return {
    type: types.USER_UPDATE_PROFILE,
    data,
    section
  };
};

export const fetchUser = data => {
  return {
    type: types.SAGAS_USER_FETCH_USERPROFILE,
    data
  };
};

export const setCardInfo = data => {
  return {
    type: types.STORE_SET_CARD_INFO,
    data
  };
};

export const setPlayerProfile = data => {
  return {
    type: types.STORE_SET_PLAYER_PROFILE,
    data
  };
};

export const getCard = () => {
  return {
    type: types.SAGAS_GET_CARD
  };
};

export const addAddress = data => {
  return {
    type: types.SAGAS_ADD_ADDRESS,
    data
  };
};

export const declineFriendRequest = data => {
  return {
    type: types.USER_DECLINE_FRIEND_REQUEST,
    data
  };
};

export const getUserInfo = sessionToken => {
  return {
    type: types.SAGAS_GET_USER_INFO,
    sessionToken
  };
};

export const removeFriend = data => {
  return {
    type: types.USER_REMOVE_FRIEND,
    data
  };
};

export const removePlayerProfile = data => {
  return {
    type: types.USER_CLEAR_PLAYER_PROFILE,
    data
  };
};

export const getFriends = data => {
  return {
    type: types.USER_GET_FRIENDS,
    data
  };
};

export const setFriends = data => {
  return {
    type: types.USER_SET_FRIENDS,
    data
  };
};

export const setDeviceToken = data => {
  return {
    type: types.SET_DEVICE_TOKEN,
    data
  };
};

export const gamertagError = data => {
  return {
    type: types.GAMERTAG_ERROR,
    data
  };
};

export const setSearchError = () => {
  return {
    type: types.SET_SEARCH_ERROR
  };
};

export const unsetSearchError = () => {
  return {
    type: types.UNSET_SEARCH_ERROR
  };
};
