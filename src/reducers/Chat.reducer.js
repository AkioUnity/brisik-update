import { chatTypes as types } from '../actions';
import { setHereNow, setHistory, appendMessage, setPresence,
  setPrivateChatNotifications, unsetPrivateChatNotifications } from './Helpers/Chat.helper';

const initialState = {
  loading: false,
  messages: {},
  presence: {},
  online: {},
  onlineUsers: {},
  hasNotification: false,
  privateNotifications: {}
};

export default function chat(state = initialState, action = {}) {
  switch (action.type) {
    case types.CHAT_SET_HISTORY:
      return setHistory(state, action);
    case types.CHAT_APPEND_MESSAGE:
      return appendMessage(state, action);
    case types.CHAT_SET_PRESENCE:
      return setPresence(state, action);
    case types.CHAT_SET_USER_PRESENCE:
      return {
        ...state,
        onlineUsers: {
          ...state.onlineUsers,
          [action.data.user._id]: action.data.user
        }
      };
    case types.CHAT_NOTIFICATION_MARK_AS_SEEN:
      return {
        ...state,
        hasNotification: false
      };
    case types.CHAT_NOTIFICATION_MARK_AS_UNSEEN:
      return {
        ...state,
        hasNotification: true
      };
    case types.CHAT_SET_HERE_NOW:
      return setHereNow(state, action.data);
    case types.PRIVATE_CHAT_SET_NOTIFICATION:
      return setPrivateChatNotifications(state, action.data);
    case types.PRIVATE_CHAT_UNSET_NOTIFICATION:
      return unsetPrivateChatNotifications(state, action.data);
    default:
      return state;
  }
}
