import { commonTypes as types } from '../actions';
import { parseFeaturedStreamResponse } from './Helpers/Common.helper';

const initialState = {
  loading: false,
  errorMessage: { show: false, message: '' },
  gameList: null,
  platformList: null,
  tutorials: null,
  navigation: null,
  loadingLeaderboard: false,
  leaderboard: null,
  lastpage: null,
  navigationStack: [],
  blockedByGeoFence: null,
  leaderboardRefreshing: false,
  navigationPayload: {},
  friendsLeaderboard: null,
  featuredStream: null,
};

export default function common(state = initialState, action = {}) {
  const { origin } = action;
  switch (action.type) {
    case types.COMMON_SET_LOADING:
      if (typeof origin === 'string') {
        if (origin === 'leaderboard') {
          return {
            ...state,
            loadingLeaderboard: true
          };
        }
      }
      return {
        ...state,
        loading: true
      };
    case types.COMMON_UNSET_LOADING:
      if (typeof origin === 'string') {
        if (origin === 'leaderboard') {
          return {
            ...state,
            loadingLeaderboard: false
          };
        }
      }
      return {
        ...state,
        loading: false
      };
    case types.COMMON_SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.data
      };
    case types.COMMON_CLEAR:
      return {
        initialState
      };
    case types.STORE_SET_GAME_LIST:
      return {
        ...state,
        gameList: action.data
      };
    case types.STORE_SET_PLATFORM_LIST:
      return {
        ...state,
        platformList: action.data
      };
    case types.STORE_SET_TUTORIALS:
      return {
        ...state,
        tutorials: action.data
      };
    case types.STORE_SET_LEADERBOARD:
      return {
        ...state,
        leaderboard: state.leaderboard && !action.force ? state.leaderboard.concat(action.data.docs) : action.data.docs,
        lastpage: action.data
      };
    case 'NAVIGATION':
      return {
        ...state,
        navigation: action.data.screen,
        navigationPayload: {
          chatChannel: action.data.props ? action.data.props.chatId : null
        }
      };
    case 'GEOFENCE':
      return { ...state, blockedByGeoFence: action.data };
    case types.TOGGLE_LEADERBOARD_REFRESH: {
      return { ...state, leaderboardRefreshing: !state.leaderboardRefreshing };
    }
    case types.STORE_SET_FRIENDS_LEADERBOARD:
      return {
        ...state,
        friendsLeaderboard: state.friendsLeaderboard && !action.force
          ? state.friendsLeaderboard.concat(action.data.docs)
          : action.data.docs,
        lastpage: action.data
      };
    case types.STORE_SET_FEATURED_STREAM:
      return parseFeaturedStreamResponse(action.data, state);
    default:
      return state;
  }
}
