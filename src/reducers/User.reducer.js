import { userTypes as types } from '../actions';
import { setLoading, unsetLoading } from './Helpers/User.helper.js';

const initialState = {
  userList: null,
  loading: false,
  errorMessage: { show: false, message: '' },
  userData: null,
  friendRequests: null,
  sessionToken: null,
  loadingCoverImage: false,
  loadingProfileImage: false,
  loadingFriends: false,
  cardInfo: null,
  loadingCard: false,
  pendingFriendRequests: null,
  loadingPendingFriendRequests: false,
  loadingAddress: false,
  loadingSignup: false,
  loadingPassword: false,
  deviceToken: null,
  gamertagsError: null,
  searchError: false
};

export default function navigation(state = initialState, action = {}) {
  const { origin } = action;
  switch (action.type) {
    case types.SET_DATA:
      return {
        ...state,
        userData: action.data
      };
    case types.STORE_USER_SET_TOKEN:
      return {
        ...state,
        sessionToken: action.data
      };
    case types.STORE_SEARCH_RESULT:
      return {
        ...state,
        userList: action.data
      };
    case types.USER_SET_FRIEND_REQUESTS:
      return {
        ...state,
        friendRequests: action.data
      };
    case types.STORE_SET_PENDING_FRIEND_REQUESTS:
      return {
        ...state,
        pendingFriendRequests: action.data
      };
    case types.STORE_SET_PLAYER_PROFILE:
      return {
        ...state,
        playerProfile: action.data
      };
    case types.USER_SET_LOADING:
      return setLoading(state, origin);
    case types.USER_UNSET_LOADING:
      return unsetLoading(state, origin);
    case types.CLEAR_DATA:
      return initialState;
    case types.STORE_SET_CARD_INFO:
      return {
        ...state,
        cardInfo: action.data
      };
    case types.USER_CLEAR_PLAYER_PROFILE:
      return {
        ...state,
        playerProfile: null
      };
    case types.USER_SET_FRIENDS:
      return {
        ...state,
        userData: { ...state.userData, friends: action.data }
      };
    case types.SET_DEVICE_TOKEN:
      return {
        ...state,
        deviceToken: action.data
      };
    case types.GAMERTAG_ERROR:
      return {
        ...state,
        gamertagsError: action.data
      };
    case types.SET_SEARCH_ERROR:
      return {
        ...state,
        searchError: true
      };
    case types.UNSET_SEARCH_ERROR:
      return {
        ...state,
        searchError: false
      };
    case types.DEPOSIT_SUCCESS:
      return {
        ...state,
        depositSuccess: true
      };
    case types.WITHDRAW_SUCCESS:
      return {
        ...state,
        withdrawSuccess: true
      };
    default:
      return state;
  }
}
