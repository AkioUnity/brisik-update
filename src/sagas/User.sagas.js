import { Navigation } from 'react-native-navigation';
import { ScreenNames } from '../screens';
import { call, put, takeEvery, select, all } from 'redux-saga/effects';
import { AsyncStorage, Alert } from 'react-native';
import _ from 'lodash';
import { user as userActions, userTypes } from '../actions';
import * as ChallengeActions from '../actions/Challenge/Challenge.actions';
import * as ChatActions from '../actions/Chat/Chat.actions';
import * as TournamentActions from '../actions/Tournament/Tournament.actions';
import * as NotificationActions from '../actions/Notification/Notification.actions';
import * as CommonActions from '../actions/Common/Common.actions';
import {
  getSessionToken,
  getUserData,
  getActualUserProfile,
  selectPendingFriendRequests,
  selectDeviceToken,
  getFriendRequests as selectFriendRequests
} from './Selectors';
import { app, appLoggedIn, checkGeoFence } from '../app';

import Api from '../utils/RESTClient';

function* initialize({ data }) {
  const token = yield AsyncStorage.getItem('@sessionToken');

  if (token) {
    const tokenStatus = yield call(refreshToken, { token: JSON.parse(token) });

    if (tokenStatus === 'success') {
      yield call(getUserInfo);
      yield put(ChatActions.initChat({ private: true }));
      yield call(updatePingTime);
      yield put(ChallengeActions.refresh());
      yield put(TournamentActions.refresh());
      const tutorials = yield call(Api.Tutorials.list);
      yield put(CommonActions.setTutorials(tutorials.data));
    }

    if (typeof data !== 'undefined') {
      yield call(checkGeoFence, { token: token });
    }
  } else {
    yield put(ChatActions.initChat());
  }
}

function* login({ data, callback }) {
  try {
    const result = yield call(Api.User.login, data);

    if (result.status !== 'error') {
      const deviceToken = yield select(selectDeviceToken);

      yield AsyncStorage.setItem('@sessionToken', JSON.stringify(result.data));
      yield call(getUserInfo, { sessionToken: result.data, callback });
      yield call(Navigation.startTabBasedApp, appLoggedIn(ScreenNames));
      yield put(ChallengeActions.refresh());
      yield put(ChatActions.initChat({ private: true }));
      yield put(userActions.getFriendRequests());
      const tutorials = yield call(Api.Tutorials.list);
      yield put(CommonActions.setTutorials(tutorials.data));

      if (deviceToken) {
        yield put(userActions.updateProfile({ deviceToken }));
      }
    } else {
      if (callback) {
        callback('error');
      } else {
        Alert.alert('Error', 'Please check your login credentials');
      }
    }
  } catch (e) {
    if (callback) {
      callback('error');
    } else {
      Alert.alert('Error', 'Please check your login credentials');
    }
  }
}

function* signUp({ data }) {
  yield put(userActions.setLoading('loadingSignup'));

  try {
    const result = yield call(Api.User.signUp, data);

    if (result.status !== 'error') {
      const deviceToken = yield select(selectDeviceToken);

      yield AsyncStorage.setItem('@sessionToken', JSON.stringify(result.data));
      yield call(getUserInfo, { sessionToken: result.data });
      yield put(ChatActions.initChat({ private: true }));

      if (deviceToken) {
        yield put(userActions.updateProfile({ deviceToken }));
      }

      yield call(Navigation.startTabBasedApp, appLoggedIn(ScreenNames));
      yield put(ChallengeActions.getMy());
    } else {
      yield put(userActions.unsetLoading('loadingSignup'));
      if (/E11000/.test(result.message)) {
        if (/MediaId/.test(result.message)) {
          Alert.alert('Error', 'Username already exists, please choose another one!');
        }
      } else {
        Alert.alert('Error', result.message);
      }
    }
  } catch (e) {
    yield put(userActions.unsetLoading('loadingSignup'));
    Alert.alert('Error', 'Please verify fields');
  }
}

function* refreshToken({ token }) {
  if (token) {
    const result = yield call(Api.User.refreshToken, token);
    if (result.status === 'success') {
      yield AsyncStorage.setItem('@sessionToken', JSON.stringify(result.data));
      yield put(userActions.setUserToken(result.data));
    } else {
      yield put(CommonActions.handleTokenExpired());
    }

    return result.status;
  }
}

function* getUserInfo(data = {}) {
  if (!data.sessionToken) {
    data.sessionToken = yield select(getSessionToken);
  }

  try {
    const user = yield call(Api.User.getUserInfo, data.sessionToken);

    if (user.status !== 'error') {
      yield put(userActions.setUserToken(data.sessionToken));
      yield put(userActions.setUserData(user.data));

      if (!user.data.location) {
        yield call(checkGeoFence, { token: data.sessionToken });
        yield call(updatePingTime);
      }
      if (typeof data.callback === 'function') {
        yield call(data.callback);
      }
    } else {
      yield put(CommonActions.handleTokenExpired());
    }
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    }
  }
}

function* updateProfile({ data, section }) {
  const token = yield select(getSessionToken);
  try {
    yield put(userActions.setLoading());
    const result = yield call(Api.User.edit, token, data);
    yield call(getUserInfo, { sessionToken: result.data });
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      if (section === 'gamertags') {
        if (/E11000/.test(e)) {
          Alert.alert('Invalid Gamertag', 'The gamertag is being used by another user');
          yield put(userActions.gamertagError(e));
        }
      } else {
        Alert.alert(e);
      }
    }
  }
}

function* logout() {
  yield AsyncStorage.removeItem('@sessionToken');
  yield AsyncStorage.removeItem('@CART');
  yield put(ChallengeActions.clearLists());
  yield put(TournamentActions.clear());
  yield put(NotificationActions.clearData());
  yield put(userActions.clearUserData());
  yield call(Navigation.startSingleScreenApp, app(ScreenNames));
}

function* searchUsers({ data }) {
  yield put(userActions.setLoading());
  const token = yield select(getSessionToken);
  const user = yield select(getUserData);
  try {
    const result = yield call(Api.User.searchUser, data, token);
    const filteredResult = result.data.filter(({ _id }) => _id !== user._id);

    if (filteredResult.length > 0) {
      yield put(userActions.searchResult(filteredResult));
    } else {
      yield put(userActions.setSearchError());
    }

    yield put(userActions.unsetLoading());
  } catch (e) {
    yield put(userActions.unsetLoading());
  }
}

function* changeImage({ data, callback }) {
  const { image, origin } = data;

  yield put(userActions.setLoading(origin));

  const token = yield select(getSessionToken);
  const user = yield select(getUserData);

  try {
    const S3URL = yield call(uploadImageToS3, image, `type_${origin}`);

    if (user) {
      const result = yield call(Api.User.edit, token, { profileImage: S3URL });
      yield call(getUserInfo, { sessionToken: result.data });
    }

    if (callback) {
      yield callback(S3URL);
    }

    yield put(userActions.unsetLoading(origin));
  } catch (e) {
    yield put(userActions.unsetLoading(origin));
  }
}

function* getFriendRequests() {
  yield put(userActions.setLoading('friends'));

  const token = yield select(getSessionToken);

  try {
    const result = yield call(Api.User.myFriendRequests, token);
    if (result) {
      yield put(userActions.setFriendRequests(result.data));
    }
    yield put(userActions.unsetLoading('friends'));
  } catch (e) {
    yield put(userActions.unsetLoading('friends'));
  }
}

function* getPendingFriendRequests() {
  yield put(userActions.setLoading('friends'));
  const token = yield select(getSessionToken);

  try {
    const result = yield call(Api.User.pendingFriendRequests, token);
    if (result) {
      yield put(userActions.setPendingFriendRequests(result.data));
    }

    yield put(userActions.unsetLoading('friends'));
  } catch (e) {
    yield put(userActions.unsetLoading('friends'));
  }
}

function* sendFriendRequest({ friendId, callback }) {
  const token = yield select(getSessionToken);

  try {
    yield call(Api.User.createFriendRequest, token, friendId);
    yield call(getPendingFriendRequests);
    yield call(fetchUser, { data: friendId });
    if (callback && typeof callback === 'function') {
      yield call(callback);
    }
  } catch (e) {
    console.warn(e);
  }
}

function* acceptFriendRequest({ friendId, callback }) {
  const player = yield select(getActualUserProfile);

  yield put(userActions.setLoading());

  const token = yield select(getSessionToken);

  try {
    yield call(Api.User.acceptFriendRequest, token, friendId);
    yield call(getUserInfo, { sessionToken: token });
    if (player) {
      yield put(userActions.fetchUser({ data: player._id }));
    }
    yield call(getFriendRequests);
    yield put(userActions.unsetLoading());

    if (callback && typeof callback === 'function') {
      yield call(callback);
    }
  } catch (e) {
    yield put(userActions.unsetLoading());
  }
}

function* uploadImageToS3(image, name) {
  const fileType = image.mime.split('/')[1];
  const form = {
    type: fileType,
    name: `${name}.${fileType}`
  };

  const response = yield call(Api.User.requestSignedUrl, form);
  debugger;
  const { signedRequest, url } = response.data;
  const file = {
    uri: image.path,
    type: form.type,
    name: form.name
  };

  const status = yield call(Api.S3.uploadFile, file, signedRequest);
  debugger;
  if (status.status === 'success') {
    return url;
  }
  return null;
}

export function* fetchUser({ data }, load) {
  if (typeof data === 'object') {
    data = data.data;
  }

  if (load) {
    yield put(userActions.setLoading());
  }

  const user = yield select(getUserData);
  const friendRequests = yield select(selectFriendRequests);
  const pendingfriendRequests = yield select(selectPendingFriendRequests);

  try {
    let player = yield call(Api.User.searchById, data);
    player = player.data;
    if (user) {
      player.mutualFriends = _.intersectionBy(user.friends, player.friends, '_id');
      player.isFriend = user.friends.some(({ _id }) => _id === player._id);
      player.isPending =
        !player.isFriend &&
        friendRequests &&
        friendRequests.some(data => {
          if (data.user._id === player._id) {
            player.requestId = data._id;
            return true;
          }
        });
      player.requestSent =
        !player.isFriend &&
        !player.isPending &&
        pendingfriendRequests &&
        pendingfriendRequests.some(({ friend }) => friend && friend._id === player._id);
      player.friends = player.friends.filter(({ _id }) => _id !== user._id);
    }
    yield put(userActions.setPlayerProfile(player));
  } catch (e) {
    yield put(userActions.unsetLoading());
  }
}

function* getCard() {
  yield put(userActions.setLoading('card'));
  const token = yield select(getSessionToken);
  const cardInfo = yield call(Api.User.retrievecardinfo, token);
  yield put(userActions.setCardInfo(cardInfo.data));
  yield put(userActions.unsetLoading('card'));
}

function* addAddress({ data }) {
  try {
    yield put(userActions.setLoading('address'));
    const token = yield select(getSessionToken);
    const result = yield call(Api.User.edit, token, data);
    yield call(getUserInfo, { sessionToken: result.data });
    yield put(userActions.unsetLoading('address'));
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      yield put(userActions.unsetLoading('address'));
      Alert.alert('Error', JSON.stringify(e));
    }
  }
}

function* declineFriendRequest({ data }) {
  const player = yield select(getActualUserProfile);

  yield put(userActions.setLoading());

  const token = yield select(getSessionToken);

  try {
    yield call(Api.User.declineFriendRequest, token, data);
    yield call(getUserInfo, { sessionToken: token });
    if (player) {
      yield put(userActions.fetchUser({ data: player._id }));
    }
    yield call(getFriendRequests);
    yield put(userActions.unsetLoading());
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      yield put(userActions.unsetLoading());
    }
  }
}

function* removeFriend({ data }) {
  yield put(userActions.setLoading());

  const token = yield select(getSessionToken);

  try {
    yield call(Api.User.removeFriend, token, data);
    yield call(getUserInfo, { sessionToken: token });
    yield put(userActions.fetchUser({ data }));
    yield put(userActions.unsetLoading());
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      yield put(userActions.unsetLoading());
    }
  }
}

function* getFriends() {
  yield put(userActions.setLoading('friends'));
  const token = yield select(getSessionToken);

  try {
    const result = yield call(Api.User.friends, token);

    if (result) {
      yield put(userActions.setFriends(result));
    }

    yield put(userActions.unsetLoading('friends'));
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      yield put(userActions.unsetLoading('friends'));
    }
  }
}

function* forgotPassword({ data, callback }) {
  const { email } = data;
  yield put(userActions.setLoading('password'));
  try {
    const result = yield call(Api.User.forgotPassword, { email });
    if (result.status === 'error') {
      if (result.message === 'jwt expired') {
        return yield put(CommonActions.handleTokenExpired());
      }
    }

    yield call(callback, result);
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      Alert.alert('Error', JSON.stringify(e));
    }
  }
}

function* setNewPassword({ data }) {
  yield put(userActions.setLoading('password'));

  try {
    const result = yield call(Api.User.resetPassword, data);
    if (result.status === 'success') {
      yield call(Navigation.startSingleScreenApp, app(ScreenNames));
      Alert.alert('Success', 'Password updated successfully!');
      yield put(userActions.unsetLoading('password'));
    } else if (result.status === 'error') {
      if (result.message === 'jwt expired') {
        yield put(CommonActions.handleTokenExpired());
      } else {
        Alert.alert('Error', JSON.stringify(result.message));
        yield put(userActions.unsetLoading('password'));
      }
    }
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      yield put(userActions.unsetLoading('password'));
      Alert.alert('Error', JSON.stringify(e));
    }
  }
}

function* setDeviceToken({ data }) {
  const token = yield select(getSessionToken);

  if (token) {
    yield put(userActions.updateProfile({ deviceToken: data }));
  }
}

function* updatePingTime() {
  try {
    const token = yield select(getSessionToken);
    const { location } = yield select(getUserData);
    const clientTime = { timestamp: Date.now() };

    if (!location) {
      yield call(checkGeoFence, { token: token });
    }

    const response = yield call(Api.User.pingUpdate, token, clientTime);
    yield put(userActions.setUserData(response.data));
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      console.warn('Error', JSON.stringify(e));
    }
  }
}

export default function* root() {
  yield all([
    takeEvery(userTypes.USER_INITIALIZE, initialize),
    takeEvery(userTypes.SAGAS_LOGIN, login),
    takeEvery(userTypes.LOGOUT, logout),
    takeEvery(userTypes.SAGAS_SIGNUP, signUp),
    takeEvery(userTypes.SAGAS_SEARCH_USERS, searchUsers),
    takeEvery(userTypes.REFRESH_TOKEN, refreshToken),
    takeEvery(userTypes.USER_CHANGE_PROFILE_IMAGE, changeImage),
    takeEvery(userTypes.USER_CHANGE_COVER_IMAGE, changeImage),
    takeEvery(userTypes.USER_GET_FRIEND_REQUESTS, getFriendRequests),
    takeEvery(userTypes.USER_SEND_FRIEND_REQUEST, sendFriendRequest),
    takeEvery(userTypes.USER_ACCEPT_FRIEND_REQUEST, acceptFriendRequest),
    takeEvery(userTypes.USER_UPDATE_PROFILE, updateProfile),
    takeEvery(userTypes.SAGAS_GET_PENDING_FRIEND_REQUESTS, getPendingFriendRequests),
    takeEvery(userTypes.SAGAS_USER_FETCH_USERPROFILE, fetchUser),
    takeEvery(userTypes.SAGAS_GET_CARD, getCard),
    takeEvery(userTypes.SAGAS_ADD_ADDRESS, addAddress),
    takeEvery(userTypes.SAGAS_GET_USER_INFO, getUserInfo),
    takeEvery(userTypes.USER_DECLINE_FRIEND_REQUEST, declineFriendRequest),
    takeEvery(userTypes.USER_REMOVE_FRIEND, removeFriend),
    takeEvery(userTypes.USER_GET_FRIENDS, getFriends),
    takeEvery(userTypes.SAGAS_FORGOT_PASSWORD, forgotPassword),
    takeEvery(userTypes.SET_DEVICE_TOKEN, setDeviceToken),
    takeEvery(userTypes.SAGAS_SET_NEW_PASSWORD, setNewPassword)
  ]);
}
