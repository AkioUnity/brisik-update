import { Alert, AsyncStorage } from 'react-native';
import { call, put, fork, all, takeEvery, select } from 'redux-saga/effects';
import { common as commonActions, user as userActions } from '../actions';
import * as ActionTypes from '../actions/Common/Common.actionTypes';
import { Navigation } from 'react-native-navigation';
import { ScreenNames } from '../screens';
import { app } from '../app';
import { getSessionToken } from './Selectors';

import Api from '../utils/RESTClient';

function* initialize() {
  try {
    const [games, platforms] = yield all([
      call(Api.Games.list),
      call(Api.Games.listPlatform),
    ]);
    yield put(commonActions.setGameList(games.data));
    yield put(commonActions.setPlatformList(platforms.data));
  } catch (e) {
    Alert.alert('Error');
  }
}

function* listLeaderBoard({ data }) {
  try {
    const token = yield select(getSessionToken);
    yield put(commonActions.setLoading('leaderboard'));
    const list = yield call(Api.User.worldLeaderboard, token, data);
    yield put(commonActions.setLeaderboard(list.data));
    yield put(commonActions.unsetLoading('leaderboard'));
  } catch (e) {
    yield put(commonActions.unsetLoading('leaderboard'));
    Alert.alert('Error');
  }
}

function* listFriendsLeaderboard({ data }) {
  try {
    const token = yield select(getSessionToken);
    yield put(commonActions.setLoading('leaderboard'));
    const list = yield call(Api.User.friendsLeaderboard, token, data);
    yield put(commonActions.setFriendsLeaderboard(list.data));
    yield put(commonActions.unsetLoading('leaderboard'));
  } catch (e) {
    yield put(commonActions.unsetLoading('leaderboard'));
    Alert.alert('Error');
  }
}

function* geoFence({ data }) {
  if (data) {
    yield AsyncStorage.removeItem('@sessionToken');
  }
}

function* leaderboardRefresh() {
  try {
    const token = yield select(getSessionToken);
    yield put(commonActions.toggleLeaderboardRefreshing());
    const list = yield call(Api.User.worldLeaderboard, token);
    yield put(commonActions.setLeaderboard(list.data, true));
    yield put(commonActions.toggleLeaderboardRefreshing());
  } catch (e) {
    yield put(commonActions.toggleLeaderboardRefreshing());
    Alert.alert('Error');
  }
}

function* friendsLeaderboardRefresh() {
  try {
    const token = yield select(getSessionToken);
    yield put(commonActions.toggleLeaderboardRefreshing());
    const list = yield call(Api.User.friendsLeaderboard, token);
    yield put(commonActions.setFriendsLeaderboard(list.data, true));
    yield put(commonActions.toggleLeaderboardRefreshing());
  } catch (e) {
    yield put(commonActions.toggleLeaderboardRefreshing());
    Alert.alert('Error');
  }
}

function* handleTokenExpired() {
  yield put(userActions.clearUserData());
  yield AsyncStorage.removeItem('@sessionToken');
  yield call(Navigation.startSingleScreenApp, app(ScreenNames));
  setTimeout(() => {
    Alert.alert('Session Expired', 'Please log in again'), 0;
  });
}

function* getFeaturedStream() {
  try {
    const featuredStream = yield call(Api.FeaturedStream.get);
    yield put(commonActions.setFeaturedStream(featuredStream.data));
  } catch (error) {

  }
}

export default function* CommonSagas() {
  yield all([
    fork(initialize),
    takeEvery(ActionTypes.SAGAS_LIST_LEADERBOARD, listLeaderBoard),
    takeEvery(ActionTypes.GEOFENCE, geoFence),
    takeEvery(ActionTypes.LEADERBOARD_REFRESH, leaderboardRefresh),
    takeEvery(ActionTypes.HANDLE_TOKEN_EXPIRED, handleTokenExpired),
    takeEvery(ActionTypes.SAGAS_LIST_FRIENDS_LEADERBOARD, listFriendsLeaderboard),
    takeEvery(ActionTypes.LEADERBOARD_REFRESH_FRIENDS, friendsLeaderboardRefresh),
    takeEvery(ActionTypes.SAGAS_GET_FEATURED_STREAM, getFeaturedStream)
  ]);
}
