import { call, put, takeEvery, select, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import * as actionTypes from '../actions/Tournament/Tournament.actionTypes';
import * as actions from '../actions/Tournament/Tournament.actions';
import * as CommonActions from '../actions/Common/Common.actions';
import { getSessionToken, getMyTournamentMeta, getOpenTournamentMeta, getUserData } from './Selectors';
import RESTClient from '../utils/RESTClient';

function* get(data = {}) {
  try {
    yield put(actions.clear());
    yield all([call(getAll, { refresh: data.refresh }), call(getMy, { refresh: data.refresh })]);
    yield put(actions.setListReady());
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      console.warn('CATCH - T1', JSON.stringify(e));
    }
  }
}

function* getAll(data = {}) {
  const meta = yield select(getOpenTournamentMeta);
  const user = yield select(getUserData);
  const page = meta && !data.refresh ? meta.page + 1 : null;

  try {
    const tournaments = yield RESTClient.Tournament.listAll(page);
    const parsed = identifyMy(tournaments.data, user);
    yield put(actions.storeAll(parsed, data.refresh));
    yield put(actions.setListReady());
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      console.warn('CATCH - T2', JSON.stringify(e));
    }
  }
}

function* getMy(data = {}) {
  const token = yield select(getSessionToken);

  if (!token) {
    return;
  }

  const meta = yield select(getMyTournamentMeta);
  const page = meta && !data.refresh ? meta.page + 1 : null;

  try {
    const tournaments = yield RESTClient.Tournament.listMy(token, page);
    yield put(actions.storeMy(tournaments.data, data.refresh));
    yield put(actions.setListReady());
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      console.warn('CATCH - T3', JSON.stringify(e));
    }
  }
}

function* loadMore({ data }) {
  const action = data === 'MY' ? getMy : getAll;

  try {
    yield call(action);
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      console.warn('CATCH - T4', JSON.stringify(e));
    }
  }
}

function* join({ data, callback }) {
  const token = yield select(getSessionToken);

  try {
    const tournaments = yield call(RESTClient.Tournament.join, { tournament: data }, token);
    yield call(refresh);

    if (typeof callback === 'function') {
      yield call(callback, tournaments, 'success');
    }
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      if (typeof callback === 'function') {
        yield call(callback, e, 'error');
      }
      console.warn('CATCH - T5', JSON.stringify(e));
    }
  }
}

function* refresh() {
  yield put(actions.setRefreshing());
  yield all([call(getAll, { refresh: true }), call(getMy, { refresh: true })]);
  yield put(actions.unsetRefreshing());
}

function* leave({ data, callback }) {
  const token = yield select(getSessionToken);

  try {
    yield call(RESTClient.Entries.leave, token, data);
    yield call(refresh);

    if (typeof callback === 'function') {
      yield call(callback);
    }
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      let error = 'Please try again';

      if (typeof e === 'string') {
        e[0] = e[0].toUpperCase();
        error = e;
      }

      Alert.alert('Error', error);
      console.warn('CATCH - T6', JSON.stringify(e));
    }
  }
}

export function* getOne({ data, force }) {
  if (!force) {
    yield put(actions.setDetailLoading());
  }

  const token = yield select(getSessionToken);
  let id, index;

  if (typeof data === 'string') {
    id = data;
  } else {
    id = data.id;
    index = data.index;
  }

  try {
    const tournament = yield call(RESTClient.Tournament.details, id, token);
    yield put(actions.singleUpdate({ data: tournament.data, index }));
    if (!force) {
      yield put(actions.unsetDetailLoading());
    }
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      if (!force) {
        yield put(actions.unsetDetailLoading());
      }
      console.warn('CATCH - ', JSON.stringify(e));
    }
  }
}

export default function* TournamentSagas() {
  yield all([
    takeEvery(actionTypes.SAGAS_TOURNAMENTS_GET, get),
    takeEvery(actionTypes.SAGAS_TOURNAMENTS_GET_ALL, getAll),
    takeEvery(actionTypes.SAGAS_TOURNAMENTS_GET_MY, getMy),
    takeEvery(actionTypes.SAGAS_TOURNAMENTS_LOAD_MORE, loadMore),
    takeEvery(actionTypes.SAGAS_TOURNAMENTS_JOIN, join),
    takeEvery(actionTypes.SAGAS_TOURNAMENTS_REFRESH, refresh),
    takeEvery(actionTypes.SAGAS_TOURNAMENTS_LEAVE, leave),
    takeEvery(actionTypes.SAGAS_TOURNAMENTS_GET_ONE, getOne)
  ]);
}

function filterMy(data, user) {
  if (!user) {
    return data;
  }

  const _tournaments = data.tournaments.filter(({ participants }) => {
    return !participants.some(({ mediaId }) => mediaId === user.mediaId);
  });

  const lastTournamentId = _tournaments.slice(-1).pop()._id;

  return {
    tournaments: _tournaments,
    after: lastTournamentId
  };
}

function identifyMy(data, user) {
  if (!user) {
    return data;
  }

  const tournaments = data.tournaments.map(data => {
    const joined = data.participants.some(({ mediaId }) => mediaId === user.mediaId);

    return { ...data, joined };
  });

  return { ...data, tournaments };
}
