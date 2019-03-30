import { Vibration } from 'react-native';
import { call, put, takeEvery, select, all } from 'redux-saga/effects';
import { Navigation } from 'react-native-navigation';
import * as ActionTypes from '../actions/Notification/Notification.actionTypes';
import * as ChallengeActions from '../actions/Challenge/Challenge.actions';
import * as UserActions from '../actions/User/User.actions';
import * as ProductActions from '../actions/Product/Product.actions';
import * as CommonActions from '../actions/Common/Common.actions';
import { getOne } from './Challenge.sagas';
import { fetchUser } from './User.sagas';
import { getNavigation, getActualChallenge, getActualUserProfile } from './Selectors';
import { ScreenNames } from '../screens';
const { ChallengeDetail, Dashboard, Profile } = ScreenNames;

function* onNotification({ data }) {
  const screen = yield select(getNavigation);
  yield put(ChallengeActions.refresh());

  if (data.message === 'challenge') {
    const challenge = yield select(getActualChallenge);

    if (data.action === 'status' || data.action === 'expire') {
      yield all([call(getOne, { data: data.data, force: true }), call(Vibration.vibrate)]);
      return;
    }

    if (screen === ChallengeDetail.id && challenge && challenge.id === data.data) {
      yield call(getOne, { data: challenge });
      yield call(handlePopup, {
        title: 'Challenge updated',
        message: 'The challenge was updated!',
        handleClose: () => Navigation.dismissLightBox()
      });
    } else {
      yield call(getOne, { data: data.data, force: true });
    }

    if (screen !== Dashboard.id) {
      yield put(ChallengeActions.refresh());
    }
  } else if (data.message === 'friend') {
    const player = yield select(getActualUserProfile);
    yield put(UserActions.getUserInfo());
    if (screen === Profile.id && player && player._id === data.subject._id) {
      yield call(fetchUser, { data: data.subject._id }, true);
      yield call(handlePopup, {
        title: 'Information updated',
        message: 'Information updated!',
        handleClose: () => Navigation.dismissLightBox()
      });
    } else if (screen !== Profile.id) {
      yield put(UserActions.fetchUser(data.subject._id));
    }
  } else if (data.message === 'coin') {
    yield put(UserActions.getUserInfo());
    yield put(ProductActions.getCoins());
  } else if (data.message === 'tournament') {
  }

  yield call(Vibration.vibrate);
}

function* onPushNotification(data) {
  const screen = yield select(getNavigation);

  if (data.subject) {
    data.subject = JSON.parse(data.subject);
  }

  if (data.message === 'challenge') {
    const challenge = yield select(getActualChallenge);

    if (screen === ChallengeDetail.id && challenge && challenge.id === data.data) {
      yield call(getOne, { data: data.data });
    } else {
      yield put(
        CommonActions.navigate({
          screen: ScreenNames.ChallengeDetail.id,
          extra: { id: data.data }
        })
      );
    }
  } else if (data.message === 'friend') {
    const player = yield select(getActualUserProfile);
    yield put(UserActions.getPendingFriendRequests());
    yield put(UserActions.getFriendRequests());
    yield put(UserActions.getFriends());

    if (screen === Profile.id && player && player._id === data.subject._id) {
      yield call(fetchUser, { data: data.subject._id }, true);
    } else if (screen !== Profile.id) {
      yield put(
        CommonActions.navigate({
          screen: ScreenNames.ChallengeDetail.id,
          extra: { id: data.subject._id }
        })
      );
    }
  } else if (data.message === 'coin') {
  } else if (data.message === 'tournament') {
  }
}

function* onHistory({ data }) {}

function* onPushOpen({ data }) {
  yield call(onPushNotification, data.notification.payload.additionalData);
}

function* onPushReceive({ data }) {
  console.warn('Notification received');
}

function* onPushRegister({ data }) {
  console.warn('Notification register');
}

function* onPushIds({ data }) {
  yield put(UserActions.setDeviceToken(data.userId));
}

export default function* NotificationSagas() {
  yield all([
    takeEvery(ActionTypes.NOTIFICATION_APPEND_NOTIFICATION, onNotification),
    takeEvery(ActionTypes.NOTIFICATION_SET_HISTORY, onHistory),
    takeEvery(ActionTypes.NOTIFICATION_PUSH_OPEN, onPushOpen),
    takeEvery(ActionTypes.NOTIFICATION_PUSH_REGISTER, onPushRegister),
    takeEvery(ActionTypes.NOTIFICATION_PUSH_IDS, onPushIds),
    takeEvery(ActionTypes.NOTIFICATION_PUSH_RECEIVE, onPushReceive)
  ]);
}

function handlePopup(props) {
  Navigation.showLightBox({
    screen: ScreenNames.GeofenceRestriction.id,
    title: '',
    style: {
     backgroundBlur: 'dark',
     backgroundColor: 'rgba(50, 50, 50, 0.2)'
    },
    passProps: { ...props }
  });
}
