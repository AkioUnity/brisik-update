import _ from 'lodash';

export const setHereNow = (state, data) => {
  const presence = { ...(state.presence.public || {}) };
  const online = (state.online.public || 0) + data.totalOccupancy;
  const timestamp = new Date().getTime();
  const onlineUsers = { ...state.onlineUsers };

  data.channels.public.occupants.forEach((user) => {
    if (!user.state) {
      presence[user.uuid] = {
        status: 1,
        timestamp: timestamp
      };
    } else {
      onlineUsers[user.state.user._id] = user.state.user;
    }
  });

  return { ...state,
    presence: { ...state.presence, public: presence },
    online: { ...state.online, public: online },
    onlineUsers
  };
};

export const setHistory = (state, data) => {
  let channelHistory = state.messages[data.channel] || [];
  let history = data.history.messages.filter(({ entry }) => !!entry);
  history.concat(channelHistory);

  const messages = _.sortBy(history, o => new Date(o.entry.timetoken)).reverse()
    || state.messages[data.channel] || [];

  return {
    ...state,
    messages: {
      ...state.messages,
      [data.channel]: messages
    }
  };
};

export const appendMessage = (state, data) => {
  let channelMessages = state.messages[data.channel] || [];

  channelMessages.splice(0, 0, {
    entry: {
      ...data.message
    }
  });

  return {
    ...state,
    messages: {
      ...state.messages,
      [data.channel]: [...channelMessages]
    }
  };
};

export const setPresence = (state, action) => {
  let presence = state.presence[action.presence.channel] || {};
  let online = state.online[action.presence.channel];
  const isJoinAction = action.presence.action === 'join';

  presence[action.presence.uuid] = {
    timestamp: action.presence.timestamp,
    status: isJoinAction ? 1 : 0
  };

  if (!online) {
    online = isJoinAction ? 1 : 0;
  } else {
    online = isJoinAction ? online + 1 : online - 1;
    delete state.onlineUsers[action.presence.uuid];
  }

  return {
    ...state,
    presence: {
      ...state.presence,
      [action.presence.channel]: presence
    },
    online: {
      ...state.online,
      [action.presence.channel]: online
    },
    onlineUsers: {
      ...state.onlineUsers
    }
  };
};

export const setPrivateChatNotifications = (state, data) => {
  return {
    ...state,
    privateNotifications: {
      ...state.privateNotifications,
      [data.id]: true
    }
  };
};

export const unsetPrivateChatNotifications = (state, data) => {
  return {
    ...state,
    privateNotifications: {
      ...state.privateNotifications,
      [data.id]: false
    }
  };
};