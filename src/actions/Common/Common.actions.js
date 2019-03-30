import * as types from './Common.actionTypes';

export const setLoading = origin => {
  return {
    type: types.COMMON_SET_LOADING,
    origin
  };
};

export const unsetLoading = origin => {
  return {
    type: types.COMMON_UNSET_LOADING,
    origin
  };
};

export const setErrorMessage = data => {
  return {
    type: types.COMMON_SET_ERROR_MESSAGE,
    data
  };
};

export const clear = () => {
  return {
    type: types.COMMON_CLEAR
  };
};

export const setGameList = data => {
  return {
    type: types.STORE_SET_GAME_LIST,
    data
  };
};

export const setPlatformList = data => {
  return {
    type: types.STORE_SET_PLATFORM_LIST,
    data
  };
};

export const setTutorials = data => {
  return {
    type: types.STORE_SET_TUTORIALS,
    data
  };
};

export const getLeaderboard = () => {
  return {
    type: types.SAGAS_GET_LEADERBOARD
  };
};

export const setLeaderboard = (data, force) => {
  return {
    type: types.STORE_SET_LEADERBOARD,
    data,
    force
  };
};

export const setFeaturedStream = (data) => {
  return {
    type: types.STORE_SET_FEATURED_STREAM,
    data
  };
};

export const fetchFeaturedStream = () => {
  return {
    type: types.SAGAS_GET_FEATURED_STREAM
  };
};

export const listLeaderboard = data => {
  return {
    type: types.SAGAS_LIST_LEADERBOARD,
    data
  };
};

export const geoFence = data => {
  return {
    type: types.GEOFENCE,
    data
  };
};

export const navigate = data => {
  return {
    type: types.NAVIGATE,
    data
  };
};

export const refreshLeaderboard = data => {
  return {
    type: types.LEADERBOARD_REFRESH,
    data
  };
};

export const toggleLeaderboardRefreshing = data => {
  return {
    type: types.TOGGLE_LEADERBOARD_REFRESH,
    data
  };
};

export const handleTokenExpired = () => {
  return {
    type: types.HANDLE_TOKEN_EXPIRED
  };
};

export const listFriendsLeaderboard = data => {
  return {
    type: types.SAGAS_LIST_FRIENDS_LEADERBOARD,
    data
  };
};

export const setFriendsLeaderboard = (data, force) => {
  return {
    type: types.STORE_SET_FRIENDS_LEADERBOARD,
    data,
    force
  };
};

export const refreshFriendsLeaderboard = data => {
  return {
    type: types.LEADERBOARD_REFRESH_FRIENDS,
    data
  };
};
