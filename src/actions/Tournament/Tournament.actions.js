import * as types from './Tournament.actionTypes';

export const get = (data) => {
  return {
    type: types.SAGAS_TOURNAMENTS_GET,
    data
  };
};

export const getAll = (data) => {
  return {
    type: types.SAGAS_TOURNAMENTS_GET_ALL,
    data
  };
};

export const getMy = (data) => {
  return {
    type: types.SAGAS_TOURNAMENTS_GET_MY,
    data
  };
};

export const storeAll = (data, refresh) => {
  return {
    type: types.STORE_TOURNAMENTS_SET_ALL,
    data, refresh
  };
};

export const storeMy = (data, refresh) => {
  return {
    type: types.STORE_TOURNAMENTS_SET_MY,
    data, refresh
  };
};

export const setListReady = () => {
  return {
    type: types.STORE_TOURNAMENTS_SET_LIST_READY
  };
};

export const loadMore = (data, callback) => {
  return {
    type: types.SAGAS_TOURNAMENTS_LOAD_MORE,
    data, callback
  };
};

export const join = (data, callback) => {
  return {
    type: types.SAGAS_TOURNAMENTS_JOIN,
    data, callback
  };
};

export const singleUpdate = (data) => {
  return {
    type: types.STORE_TOURNAMENTS_SINGLE_UPDATE,
    data
  };
};

export const refresh = () => {
  return {
    type: types.SAGAS_TOURNAMENTS_REFRESH
  };
};

export const setRefreshing = () => {
  return {
    type: types.STORE_TOURNAMENTS_SET_REFRESH
  };
};

export const clear = (data) => {
  return {
    type: types.TOURNAMENTS_CLEAR,
    data
  };
};

export const leave = (data, callback) => {
  return {
    type: types.SAGAS_TOURNAMENTS_LEAVE,
    data, callback
  };
};

export const unsetRefreshing = () => {
  return {
    type: types.STORE_TOURNAMENTS_UNSET_REFRESH
  };
};

export const getOne = (data) => {
  return {
    type: types.SAGAS_TOURNAMENTS_GET_ONE,
    data
  };
};

export const setDetailLoading = () => {
  return {
    type: types.STORE_TOURNAMENTS_SET_DETAIL_LOADING
  };
};

export const unsetDetailLoading = () => {
  return {
    type: types.STORE_TOURNAMENTS_UNSET_DETAIL_LOADING
  };
};