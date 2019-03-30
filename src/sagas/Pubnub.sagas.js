import { Alert } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { call, put, fork, takeEvery, select, all } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { chat as chatActions, notification as notificationActions, chatTypes } from '../actions';
import { UUID } from '../utils/Utils';
import { getUserData } from './Selectors';
import Api from '../utils/RESTClient';

import PubNub from 'pubnub';

let pubnub;
const pubnubConfig = {
  publishKey: 'pub-c-fb6b838f-08c8-4404-bfb4-a39d1f2b213a',
  subscribeKey: 'sub-c-bc332ea4-2bdc-11e8-8305-f27a6a4e1feb',
  ssl: true,
  presenceTimeout: 320
};
const publicChannel = 'public';

const waitForPubnubEvent = () => {
  return new Promise(resolve =>
    pubnub.addListener({
      message: m => resolve(m),
      presence: p => resolve(p)
    })
  );
};

const waitForPubnubHistory = channel => {
  return new Promise(resolve =>
    pubnub
      .history({
        channel,
        reverse: false,
        count: 100
      })
      .then(history => resolve(history))
  );
};

function* initialize({ data }) {
  if (data && data.private) {
    yield fork(initializePrivatePubnub);
  } else {
    yield fork(initializePublicPubnub);
  }

  yield fork(waitForPublicHistory);
  yield fork(getPublicHereNow);
}

function* initializePublicPubnub() {
  if (pubnub) {
    pubnub.unsubscribe({
      channels: [publicChannel]
    });
    pubnub = null;
  }

  pubnub = new PubNub({
    ...pubnubConfig,
    uuid: DeviceInfo.getUniqueID()
  });

  pubnub.subscribe({
    channels: [publicChannel],
    withPresence: true
  });

  yield call(waitForEvents);
}

function* initializePrivatePubnub() {
  const userData = yield select(getUserData);

  if (pubnub) {
    yield call(pubnub.unsubscribe, {
      channels: [publicChannel, userData._id]
    });
    pubnub = null;
  }

  pubnub = new PubNub({
    ...pubnubConfig,
    uuid: userData._id
  });

  yield call(pubnub.subscribe, {
    channels: [userData._id].concat([publicChannel]),
    withPresence: true
  });

  setTimeout(() => {
    //WORKAROUND
    pubnub.setState({
      state: {
        user: {
          _id: userData._id,
          name: userData.mediaId,
          avatar: userData.profileImage,
          city: userData.city,
          ping: userData.ping
        }
      },
      uuid: userData._id,
      channels: [publicChannel]
    });
  }, 3000);

  yield call(waitForNotificationsHistory);
  yield call(waitForEvents);
}

function* getPublicHereNow() {
  try {
    const response = yield call(pubnub.hereNow, {
      channels: [publicChannel],
      includeState: true,
      includeUUIDs: true
    });

    yield put(chatActions.setHereNow(response));
  } catch (e) {
    console.warn('error', e);
  }
}

function* waitForEvents() {
  while (true) {
    const event = yield call(waitForPubnubEvent);
    if (typeof event.action !== 'undefined') {
      yield call(handlePresence, event);
    } else if (typeof event.message !== 'undefined') {
      yield call(handleMessage, event);
    }
  }
}

function* waitForPublicHistory() {
  let waiting = true;
  while (waiting) {
    const history = yield call(waitForPubnubHistory, publicChannel);
    yield call(handleHistory, publicChannel, history);
    waiting = false;
  }
}

function* waitForNotificationsHistory() {
  const userData = yield select(getUserData);
  let waiting = true;
  while (waiting) {
    const notifications = yield call(waitForPubnubHistory, userData._id);
    yield call(handleNotificationsHistory, notifications.messages.reverse());
    waiting = false;
  }
}

function* waitForPrivateHistory(channels) {
  let histories = {};
  for (let i = 0, l = channels.length; i < l; i += 1) {
    histories[channels[i]] = yield call(waitForPubnubHistory, channels[i]);
  }

  for (let key in histories) {
    if (histories.hasOwnProperty(key) && histories[key]) {
      yield call(handleHistory, key, histories[key]);
    }
  }
}

function* handleMessage(message) {
  const userData = yield select(getUserData);

  if (typeof message !== 'undefined' && typeof message.channel === 'string') {
    if (userData && message.channel === userData._id) {
      yield put(notificationActions.markNotificationsAsUnSeen());
      yield put(notificationActions.appendNotification(message.message));
    } else {
      if (typeof message.message._id !== 'undefined') {
        if (!userData || message.message.user._id) {
          if (message.channel === 'public') {
            yield put(chatActions.markNotificationsAsUnSeen());
          } else {
            yield put(chatActions.setPrivateChatNotifications({ id: message.channel }));
          }

          yield put(chatActions.appendMessage(message.channel, message.message));
        }
      }
    }
  }
}

function* handlePresence(presence) {
  const { action, timestamp, uuid, channel, state } = presence;
  if (action === 'join' || action === 'leave' || action === 'timeout') {
    yield put(chatActions.setPresence({ action, timestamp, uuid, channel }));
  } else if (action === 'state-change') {
    yield put(chatActions.setUserPresence(state));
  }
}

function* handleHistory(channel, history) {
  yield put(chatActions.setHistory(channel, history));
}

function* handleNotificationsHistory(history) {
  yield put(notificationActions.setHistory(history));
}

function* sendMessage({ channel, message }) {
  const userData = yield select(getUserData);
  let user;
  let _channel = channel || publicChannel;

  try {
    if (userData) {
      user = {
        _id: userData._id,
        name: userData.mediaId || `${userData.firstName} ${userData.lastName}`,
        avatar: userData.profileImage
      };
    }

    const filterParams = {
      content: message,
      'censor-character': '*'
    };
    const filtered = yield call(Api.Neutrino.wordFilter, filterParams);
  } catch(e) {
    console.warn('Bad word filter error -', e);
  } finally {
    const _message = {
      _id: UUID(),
      text: typeof filtered !== 'undefined' ? filtered['censored-content'] : message,
      timetoken: new Date().toISOString(),
      user: user
    };

    pubnub.publish({
      channel: _channel,
      message: _message
    });
  }
}

function* initializePrivateChat({ chatId }) {
  const userData = yield select(getUserData);

  while (!pubnub) {
    yield call(() => new Promise((resolve) => setTimeout(resolve, 300)));
  }

  let subscribedChannels = yield call(
    () =>
      new Promise((resolve, reject) =>
        pubnub.whereNow(
          {
            uuid: userData && userData._id
          },
          (status, response) => resolve(response)
        )
      )
  );

  if (!subscribedChannels) {
    return;
  }

  subscribedChannels.channels.push(chatId);

  pubnub.unsubscribe({
    channels: subscribedChannels.channels
  });

  pubnub.subscribe({
    channels: subscribedChannels.channels,
    withPresence: true
  });

  yield call(waitForPrivateHistory, subscribedChannels.channels);
}

export default function* PubnubSagas() {
  yield all([
    takeEvery(chatTypes.CHAT_INITIALIZE, initialize),
    takeEvery(chatTypes.CHAT_SEND_MESSAGE, sendMessage),
    takeEvery(chatTypes.CHAT_INIT_PRIVATE_CHAT, initializePrivateChat)
  ]);
}
