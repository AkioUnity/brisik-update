import { call, takeEvery, select, all } from 'redux-saga/effects';
import * as NotificationsActionTypes from '../actions/Notification/Notification.actionTypes';
import * as ChatActionTypes from '../actions/Chat/Chat.actionTypes';
import * as CommonActionTypes from '../actions/Common/Common.actionTypes';
import { ScreenButtons, CommonNavButtons, NavButtons } from '../utils/Navigator';
import {
  getNavigation,
  getNavigationParams,
  getNavigationPayload,
  getPrivateChatNotifications
} from './Selectors';


let navigator;

function* updateNavigator(action) {
  navigator = action.navigator;
  
  if (action.data.screen === "com.eSportsGlobalGamers.Profile") {
   
    
  }

  yield call(resolveButtons);
}

function* onNotification() {
  if (!navigator) {
    return;
  }

  yield call(resolveButtons, { data: { notification: true } });
}

function* onMessage() {
  if (!navigator) {
    return;
  }

  yield call(resolveButtons, { data: { chat: true } });
}

function* onFeaturedStream() {
  yield call(resolveButtons);
}

function* resolveButtons({ data = {} } = {}) {
  const screen = yield select(getNavigation);
  const navPayload = yield select(getNavigationPayload);
  const {
    hasUser,
    hasNotification,
    hasChatNotification,
    isFeaturedStreamActive
  } = yield select(getNavigationParams);
  const privateChatNotifications = yield select(getPrivateChatNotifications);

  const screenButtons = ScreenButtons[screen]
    ? { ...ScreenButtons[screen] }
    : { ...CommonNavButtons };
  const buttons = {};

  if (!hasUser) {
    delete screenButtons.notification;
  } else if (screenButtons.notification) {
    if (data.notification || hasNotification) {
      screenButtons.notification = NavButtons.notification(true);
    } else {
      screenButtons.notification = NavButtons.notification();
    }
  }

  if (screenButtons.globalChat) {
    const publicNotification = data.chat || hasChatNotification;

    if (publicNotification && !navPayload.chatChannel) {
      screenButtons.chat = NavButtons.globalChat(true);
    } else if (!publicNotification && !navPayload.chatChannel) {
      screenButtons.chat = NavButtons.globalChat();
    } else if (navPayload.chatChannel) {
      screenButtons.chat = NavButtons.globalChat(!!privateChatNotifications[navPayload.chatChannel]);
    }
  }

  if (screenButtons.privateChat) {
    const publicNotification = data.chat || hasChatNotification;

    if (publicNotification && !navPayload.chatChannel) {
      screenButtons.chat = NavButtons.privateChat(true);
    } else if (!publicNotification && !navPayload.chatChannel) {
      screenButtons.chat = NavButtons.privateChat();
    } else if (navPayload.chatChannel) {
      screenButtons.chat = NavButtons.privateChat(!!privateChatNotifications[navPayload.chatChannel]);
    }
  }

  if (screenButtons.featuredStream) {
    const mark = data.isFeaturedStreamActive || isFeaturedStreamActive;
    screenButtons.featuredStream = NavButtons.featuredStream(mark);
  }

  Object.values(screenButtons).sort((a, b) => a.order - b.order).forEach(button => {
    buttons[button.type] = buttons[button.type] || [];
    buttons[button.type].push(button);
  });

  navigator.setButtons(buttons);
}

function* navigate({ data }) {
  navigator.push({
    screen: data.screen,
    animated: true,
    passProps: data.extra,
    backButtonTitle: ''
  });
}

export default function* NavigationSagas() {
  yield all([
    takeEvery(NotificationsActionTypes.NOTIFICATION_APPEND_NOTIFICATION, onNotification),
    takeEvery(ChatActionTypes.CHAT_NOTIFICATION_MARK_AS_UNSEEN, onMessage),
    takeEvery(ChatActionTypes.PRIVATE_CHAT_SET_NOTIFICATION, onMessage),
    takeEvery(CommonActionTypes.NAVIGATION, updateNavigator),
    takeEvery(CommonActionTypes.NAVIGATE, navigate),
    takeEvery(CommonActionTypes.STORE_SET_FEATURED_STREAM, onFeaturedStream)
  ]);
}
