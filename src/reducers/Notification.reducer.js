import * as ActionTypes from '../actions/Notification/Notification.actionTypes';
import { appendNotification, setHistory, markSeen } from './Helpers/Notification.helper';

const initialState = {
  notifications: [],
  hasNotification: false
};

export default function navigation(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.NOTIFICATION_APPEND_NOTIFICATION:
      return appendNotification(state, action.data);
    case ActionTypes.NOTIFICATION_SET_HISTORY:
      return setHistory(state, action.data);
    case ActionTypes.NOTIFICATION_MARK_AS_UNSEEN:
      return { ...state, hasNotification: true };
    case ActionTypes.NOTIFICATION_MARK_AS_SEEN:
      return { ...state, hasNotification: false };
    case ActionTypes.NOTIFICATION_CLEAR_DATA:
      return initialState;
    case ActionTypes.NOTIFICATION_MARK_SEEN:
      return markSeen(state, action.data);
    default:
      return state;
  }
}
