import * as types from './Notification.actionTypes';

export const appendNotification = data => {
  return {
    type: types.NOTIFICATION_APPEND_NOTIFICATION,
    data
  };
};

export const setHistory = data => {
  return {
    type: types.NOTIFICATION_SET_HISTORY,
    data
  };
};

export const markNotificationsAsSeen = () => {
  return {
    type: types.NOTIFICATION_MARK_AS_SEEN
  };
};

export const markNotificationsAsUnSeen = () => {
  return {
    type: types.NOTIFICATION_MARK_AS_UNSEEN
  };
};

export const clearData = () => {
  return {
    type: types.NOTIFICATION_CLEAR_DATA
  };
};

export const onReceivePush = (data) => {
  return {
    type: types.NOTIFICATION_PUSH_RECEIVE,
    data
  };
};

export const onOpenPush = (data) => {
  return {
    type: types.NOTIFICATION_PUSH_OPEN,
    data
  };
};

export const onRegisterPush = (data) => {
  return {
    type: types.NOTIFICATION_PUSH_REGISTER,
    data
  };
};

export const onIdPush = (data) => {
  return {
    type: types.NOTIFICATION_PUSH_IDS,
    data
  };
};

export const markSeen = (data) => {
  return {
    type: types.NOTIFICATION_MARK_SEEN,
    data
  };
};
