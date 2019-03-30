import { call, put, takeEvery, select, all } from 'redux-saga/effects';
import { Alert, AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';
import * as CommonActionTypes from '../actions/Common/Common.actionTypes';
import * as CommonActions from '../actions/Common/Common.actions';
import * as actionTypes from '../actions/Challenge/Challenge.actionTypes';
import * as actions from '../actions/Challenge/Challenge.actions';
import {
  getSessionToken,
  getMyChallengeMeta,
  getOpenChallengeMeta,
  getCompletedChallengeMeta
} from './Selectors';
import RESTClient from '../utils/RESTClient';
import ScreenNames from '../screens';

function* get() {
  try {
    yield put(actions.clear());
    yield all([call(getOpen), call(getMy)]);
    yield put(actions.setListReady());
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    }
    console.warn('CATCH - ', JSON.stringify(e));
  }
}

function* getOpen(data = {}) {
  const meta = yield select(getOpenChallengeMeta);
  const page = meta && !data.refresh ? meta.page + 1 : null;

  try {
    const challenges = yield RESTClient.Challenge.listOpen(page);
    yield put(actions.storeOpen(challenges.data, data.refresh));
    yield put(actions.setListReady());
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    }
  }
}

function* getMy(data = {}) {
  const token = yield select(getSessionToken);
  if (!token) {
    return;
  }

  const meta = yield select(getMyChallengeMeta);
  const page = meta && !data.refresh ? meta.page + 1 : null;
  try {
    const challenges = yield RESTClient.Challenge.listMy(token, page);
    yield put(actions.storeMy(challenges.data, data.refresh));
    yield put(actions.setListReady());
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    }
  }
}

function* loadMore({ data }) {
  const action = data === 'MY' ? getMy : getOpen;

  try {
    yield call(action);
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    }
  }
}

function* accept({ data, callback }) {
  yield put(actions.setDetailLoading());
  const token = yield select(getSessionToken);

  try {
    const challenge = yield call(RESTClient.Challenge.accept, data.id, token);
    yield put(actions.singleUpdate({ data: challenge.data, index: data.index }));
    yield put(actions.unsetDetailLoading());

    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      yield put(actions.unsetDetailLoading());
      console.warn('CATCH - ', JSON.stringify(e));
    }
  }
}

function* join({ data, callback }) {
  yield put(actions.setDetailLoading());
  const token = yield select(getSessionToken);

  try {
    const challenge = yield call(RESTClient.Challenge.join, data.id, token);
    yield put(actions.singleUpdate({ data: challenge.data, index: data.index }));
    yield put(actions.unsetDetailLoading());

    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      yield put(actions.unsetDetailLoading());
      console.warn('CATCH - ', JSON.stringify(e));
    }
  }
}

function* cancel({ data }) {
  yield put(actions.setDetailLoading());
  const token = yield select(getSessionToken);
  try {
    const challenge = yield call(RESTClient.Challenge.cancel, data.id, token);
    yield put(actions.singleUpdate({ data: challenge.data, index: data.index }));
    yield put(actions.unsetDetailLoading());
    yield call(refresh);
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      yield put(actions.unsetDetailLoading());
      console.warn('CATCH - ', JSON.stringify(e));
    }
  }
}

function* forfeit({ data }) {
  yield put(actions.setDetailLoading());
  const token = yield select(getSessionToken);

  try {
    const challenge = yield call(RESTClient.Challenge.forfeit, data.id, token);
    yield put(actions.singleUpdate({ data: challenge.data, index: data.index }));
    yield put(actions.unsetDetailLoading());
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      yield put(actions.unsetDetailLoading());
      console.warn('CATCH - ', JSON.stringify(e));
    }
  }
}

function* extend({ data }) {
  yield put(actions.setDetailLoading());
  const token = yield select(getSessionToken);

  try {
    const challenge = yield call(RESTClient.Challenge.extend, data.id, token);
    yield put(actions.singleUpdate({ data: challenge.data, index: data.index }));
    yield put(actions.unsetDetailLoading());
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      yield put(actions.unsetDetailLoading());
      console.warn('CATCH - ', JSON.stringify(e));
    }
  }
}

function* decline({ data }) {
  yield put(actions.setDetailLoading());
  const token = yield select(getSessionToken);
  try {
    const challenge = yield call(RESTClient.Challenge.decline, data.id, token);
    yield put(actions.singleUpdate({ data: challenge.data, index: data.index }));
    yield put(actions.unsetDetailLoading());
    yield call(refresh);
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      yield put(actions.unsetDetailLoading());
      console.warn('CATCH - ', JSON.stringify(e));
    }
  }
}

function* postChallenge({ data, callback }) {
  yield put(actions.setDetailLoading());
  const token = yield select(getSessionToken);

  try {
    const challenge = yield call(RESTClient.Challenge.postChallenge, token, data);

    yield put(actions.singleUpdate({ data: challenge.data, index: data.index }));
    yield put(actions.unsetDetailLoading());
    yield call(refresh);
    yield put(actions.postChallengeSuccess());
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else if (typeof e === 'string') {
      yield put(actions.postChallengeFailed(e));
    }
    yield put(actions.unsetDetailLoading());
  }
}

function* setResponseVideoChallenge({data, callback}) {
  yield put(actions.setDetailLoading());
  const token = yield select(getSessionToken);
  try {
    debugger
    const challenge = yield call(RESTClient.Challenge.replyVideoChallenge, data.id, token, data.url);
    debugger
    yield put(actions.singleUpdate({ data: challenge.data, index: data.index }));
    yield put(actions.unsetDetailLoading());

    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      yield put(actions.unsetDetailLoading());
      console.warn('CATCH - ', JSON.stringify(e));
    }
  }
}

function* refresh() {
  yield put(actions.setRefreshing());
  yield all([call(getOpen, { refresh: true }), call(getMy, { refresh: true })]);
  yield put(actions.unsetRefreshing());
}

function* submitScore({ data }) {
  const token = yield select(getSessionToken);
  yield put(actions.setDetailLoading());

  try {
    const challenge = yield call(RESTClient.Challenge.submitScore, data.data.challengeId, token, data.data.form);
    yield put(actions.singleUpdate({ data: challenge.data, index: data.index }));
    yield put(actions.unsetDetailLoading());
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      yield put(actions.unsetDetailLoading());
      console.warn('CATCH - ', JSON.stringify(e));
    }
  }
}

function* acceptScore({ data }) {
  yield put(actions.setDetailLoading());
  const token = yield select(getSessionToken);
  try {
    const challenge = yield call(RESTClient.Challenge.acceptScore, data.data, token);
    yield put(actions.singleUpdate({ data: challenge.data, index: data.index }));
    yield put(actions.unsetDetailLoading());
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      yield put(actions.unsetDetailLoading());
      console.warn('CATCH - ', JSON.stringify(e));
    }
  }
}

function* declineScore({ data }) {
  yield put(actions.setDetailLoading());
  const token = yield select(getSessionToken);
  try {
    const challenge = yield call(RESTClient.Challenge.declineScore, data.data, token);
    yield put(actions.singleUpdate({ data: challenge.data, index: data.index }));
    yield put(actions.unsetDetailLoading());
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      yield put(actions.unsetDetailLoading());
      console.warn('CATCH - ', JSON.stringify(e));
    }
  }
}

function* rateOpponent({ data }) {
  yield put(actions.setLoadingRating());
  const token = yield select(getSessionToken);

  try {
    const result = yield call(RESTClient.Challenge.rateOpponent, token, data);
    yield put(actions.ratedSuccessfully());
    yield put(actions.unsetLoadingRating());
    yield call(refresh);
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      console.warn('CATCH - ', JSON.stringify(e));
    }
  }
}

function* getCompleted(data = {}) {
  const token = yield select(getSessionToken);
  if (!token) {
    return;
  }

  const meta = yield select(getCompletedChallengeMeta);
  const page = meta && !data.refresh ? meta.page + 1 : null;
  try {
    const challenges = yield RESTClient.Challenge.listCompleted(token, page);
    yield put(actions.storeCompleted(challenges.data, data.refresh));
    yield put(actions.setListReady());
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
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
    const challenge = yield call(RESTClient.Challenge.details, id, token);
    yield put(actions.singleUpdate({ data: challenge.data, index }));
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

export default function* ChallengeSagas() {
  yield all([
    takeEvery(actionTypes.SAGAS_CHALLENGES_GET, get),
    takeEvery(actionTypes.SAGAS_CHALLENGES_GET_OPEN, getOpen),
    takeEvery(actionTypes.SAGAS_CHALLENGES_GET_MY, getMy),
    takeEvery(actionTypes.SAGAS_CHALLENGES_LOAD_MORE, loadMore),
    takeEvery(actionTypes.SAGAS_CHALLENGES_ACCEPT, accept),
    takeEvery(actionTypes.SAGAS_CHALLENGES_CANCEL, cancel),
    takeEvery(actionTypes.SAGAS_CHALLENGES_DECLINE, decline),
    takeEvery(actionTypes.SAGAS_CHALLENGES_EXTEND, extend),
    takeEvery(actionTypes.SAGAS_CHALLENGES_JOIN, join),
    takeEvery(actionTypes.SAGAS_POST_CHALLENGE, postChallenge),
    takeEvery(actionTypes.SAGAS_CHALLENGES_REFRESH, refresh),
    takeEvery(actionTypes.SUBMIT_SCORE, submitScore),
    takeEvery(actionTypes.ACCEPT_SCORE, acceptScore),
    takeEvery(actionTypes.DECLINE_SCORE, declineScore),
    takeEvery(actionTypes.SAGAS_CHALLENGES_GET_ONE, getOne),
    takeEvery(actionTypes.SAGAS_CHALLENGES_FORFEIT, forfeit),
    takeEvery(actionTypes.SAGAS_RATE_OPPONENT, rateOpponent),
    takeEvery(actionTypes.SAGAS_CHALLENGES_GET_COMPLETED, getCompleted),
    takeEvery(actionTypes.SAGAS_SET_VIDEO_CHALLENGE_RESPONSE_URI, setResponseVideoChallenge)
  ]);
}
