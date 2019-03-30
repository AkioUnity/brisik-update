import * as types from './Chat.actionTypes';

export const initChat = (data) => {
  return {
    type: types.CHAT_INITIALIZE,
    data
  };
};

export const setLoading = () => {
  return {
    type: types.CHAT_SET_LOADING
  };
};

export const unsetLoading = () => {
  return {
    type: types.CHAT_UNSET_LOADING
  };
};

export const setHistory = (channel, history) => {
  return {
    type: types.CHAT_SET_HISTORY,
    channel,
    history
  };
};

export const sendMessage = (channel, message) => {
  return {
    type: types.CHAT_SEND_MESSAGE,
    channel,
    message
  };
};

export const appendMessage = (channel, message) => {
  return {
    type: types.CHAT_APPEND_MESSAGE,
    channel,
    message
  };
};

export const setPresence = presence => {
  return {
    type: types.CHAT_SET_PRESENCE,
    presence
  };
};

export const initializePrivateChat = chatId => {
  return {
    type: types.CHAT_INIT_PRIVATE_CHAT,
    chatId
  };
};

export const setUserPresence = data => {
  return {
    type: types.CHAT_SET_USER_PRESENCE,
    data
  };
};

export const markNotificationsAsSeen = () => {
  return {
    type: types.CHAT_NOTIFICATION_MARK_AS_SEEN
  };
};

export const markNotificationsAsUnSeen = () => {
  return {
    type: types.CHAT_NOTIFICATION_MARK_AS_UNSEEN
  };
};

export const setHereNow = (data) => {
  return {
    type: types.CHAT_SET_HERE_NOW,
    data
  };
};

export const setPrivateChatNotifications = (data) => {
  return {
    type: types.PRIVATE_CHAT_SET_NOTIFICATION,
    data
  };
};

export const unsetPrivateChatNotifications = (data) => {
  return {
    type: types.PRIVATE_CHAT_UNSET_NOTIFICATION,
    data
  };
};

