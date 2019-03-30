import * as types from './Challenge.actionTypes';

export const get = (data) => {
  return {
    type: types.SAGAS_CHALLENGES_GET,
    data
  };
};

export const getOpen = (data) => {
  return {
    type: types.SAGAS_CHALLENGES_GET_OPEN,
    data
  };
};

export const getMy = (data) => {
  return {
    type: types.SAGAS_CHALLENGES_GET_MY,
    data
  };
};

export const refresh = (data) => {
  return {
    type: types.SAGAS_CHALLENGES_REFRESH,
    data
  };
};

export const storeOpen = (data, refresh) => {
  return {
    type: types.STORE_CHALLENGES_SET_OPEN,
    data, refresh
  };
};

export const storeMy = (data, refresh) => {
  return {
    type: types.STORE_CHALLENGES_SET_MY,
    data, refresh
  };
};

export const setListReady = () => {
  return {
    type: types.STORE_CHALLENGES_SET_LIST_READY
  };
};

export const loadMore = (data, callback) => {
  return {
    type: types.SAGAS_CHALLENGES_LOAD_MORE,
    data, callback
  };
};

export const join = (data, callback) => {
  return {
    type: types.SAGAS_CHALLENGES_JOIN,
    data, callback
  };
};

export const accept = (data, callback) => {
  return {
    type: types.SAGAS_CHALLENGES_ACCEPT,
    data, callback
  };
};

export const decline = (data, callback) => {
  return {
    type: types.SAGAS_CHALLENGES_DECLINE,
    data, callback
  };
};

export const cancel = (data, callback) => {
  return {
    type: types.SAGAS_CHALLENGES_CANCEL,
    data, callback
  };
};

export const extend = (data, callback) => {
  return {
    type: types.SAGAS_CHALLENGES_EXTEND,
    data, callback
  };
};

export const singleUpdate = (data) => {
  return {
    type: types.STORE_CHALLENGES_SINGLE_UPDATE,
    data
  };
};

export const postChallenge = (data) => {
  return {
    type: types.SAGAS_POST_CHALLENGE,
    data
  };
};

export const postChallengeSuccess = () => {
  return {
    type: types.STORE_POST_CHALLENGE_SUCCESS
  };
};

export const resetPostChallengeStatus = () => {
  return {
    type: types.STORE_RESET_POST_CHALLENGE_STATUS
  };
};

export const setDetailLoading = () => {
  return {
    type: types.STORE_CHALLENGE_SET_LOADING
  };
};

export const unsetDetailLoading = () => {
  return {
    type: types.STORE_CHALLENGE_UNSET_LOADING
  };
};

export const setRefreshing = () => {
  return {
    type: types.STORE_CHALLENGE_SET_REFRESH
  };
};

export const unsetRefreshing = () => {
  return {
    type: types.STORE_CHALLENGE_UNSET_REFRESH
  };
};

export const clear = (data) => {
  return {
    type: types.CHALLENGE_CLEAR,
    data
  };
};

export const submitScore = (data) => {
  return {
    type: types.SUBMIT_SCORE,
    data
  };
};

export const initSubmit = () => {
  return {
    type: types.INIT_SUBMIT
  };
};

export const closeSubmit = () => {
  return {
    type: types.CLOSE_SUBMIT
  };
};

export const acceptScore = (data) => {
  return {
    type: types.ACCEPT_SCORE,
    data
  };
};

export const declineScore = (data) => {
  return {
    type: types.DECLINE_SCORE,
    data
  };
};

export const getOne = (data) => {
  return {
    type: types.SAGAS_CHALLENGES_GET_ONE,
    data
  };
};

export const setActual = (data) => {
  return {
    type: types.STORE_SET_ACTUAL_CHALLENGE,
    data
  };
};

export const clearLists = () => {
  return {
    type: types.CHALLENGE_CLEAR_LIST,
  };
};

export const forfeit = (data) => {
  return {
    type: types.SAGAS_CHALLENGES_FORFEIT,
    data
  };
};

export const rateOpponent = (data) => {
  return {
    type: types.SAGAS_RATE_OPPONENT,
    data
  };
};

export const setLoadingRating = () => {
  return {
    type: types.STORE_SET_LOADING_RATING
  };
};

export const unsetLoadingRating = () => {
  return {
    type: types.STORE_UNSET_LOADING_RATING
  };
};

export const setUploadingVideo = () => {
  return {
    type: types.CHALLENGES_SET_UPLOADING_VIDEO
  };
};

export const unsetUploadingVideo = () => {
  return {
    type: types.CHALLENGES_UNSET_UPLOADING_VIDEO
  };
};

export const setVideoChallengeUri = (data) => {
  return {
    type: types.SET_VIDEO_CHALLENGE_URI,
    data
  };
};

export const setVideoChallengeResponse = (data, callback) => {
  return {
    type: types.SAGAS_SET_VIDEO_CHALLENGE_RESPONSE_URI,
    data,
    callback
  };
};


export const ratedSuccessfully = () => {
  return {
    type: types.STORE_RATED_SUCCESS
  };
};

export const resetRatingSuccess = () => {
  return {
    type: types.STORE_RATED_RESET
  };
};

export const getCompleted = (data) => {

  return {
    type: types.SAGAS_CHALLENGES_GET_COMPLETED,
    data
  };
};

export const getCompletedRefresh = (data) => {

  return {
    type: types.CHALLENGES_GET_COMPLETED_REFRESH,
    payload: data
  }
}

export const storeCompleted = (data, refresh) => {
  return {
    type: types.STORE_CHALLENGES_SET_COMPLETED,
    data, refresh
  };
};

export const postChallengeFailed = (message) => {
  return {
    type: types.STORE_POST_CHALLENGE_FAIL,
    message
  };
};