import * as types from '../actions/Challenge/Challenge.actionTypes';
import {
  setOpenChallenges,
  setMyChallenges,
  updateSingleChallenges,
  clearChallengeState
} from './Helpers/Challenge.helper';

const initialState = {
  loading: false,
  errorMessage: { show: false, message: '' },
  challenges: null,
  myChallengesList: null,
  openChallengesList: null,
  openMeta: null,
  myMeta: null,
  listReady: false,
  showMoreMyChallenges: false,
  showMoreOpenChallenges: false,
  postSuccess: false,
  detailLoading: false,
  refreshing: false,
  settingScore: false,
  actualChallenge: null,
  loadingRating: false,
  ratedSuccess: false,
  completedChallenges: null,
  completedMeta: null,
  postError: '',
  isUploadingVideo: false,
  uriVideoChallenge: null
};

export default function common(state = initialState, action = {}) {
  switch (action.type) {
    case types.STORE_CHALLENGES_SET_OPEN:
      return setOpenChallenges(state, action.data, action.refresh);
    case types.STORE_CHALLENGES_SET_MY:
      return setMyChallenges(state, action.data, action.refresh);
    case types.STORE_CHALLENGES_SET_LIST_READY:
      return { ...state, listReady: true };
    case types.STORE_CHALLENGES_SINGLE_UPDATE:
      return updateSingleChallenges(state, action.data);
    case types.STORE_POST_CHALLENGE_SUCCESS:
      return { ...state, postSuccess: true };
    case types.STORE_CHALLENGE_SET_LOADING:
      return { ...state, detailLoading: true };
    case types.STORE_CHALLENGE_UNSET_LOADING:
      return { ...state, detailLoading: false };
    case types.STORE_CHALLENGE_SET_REFRESH:
      return { ...state, refreshing: true };
    case types.STORE_CHALLENGE_UNSET_REFRESH:
      return { ...state, refreshing: false };
    case types.CHALLENGE_CLEAR:
      return clearChallengeState(initialState, action.data, state.challenges);
    case types.CHALLENGE_CLEAR_LIST:
      return clearChallengeState(initialState, action.data, state.challenges);
    case types.INIT_SUBMIT:
      return { ...state, settingScore: true };
    case types.CLOSE_SUBMIT:
      return { ...state, settingScore: false };
    case types.STORE_SET_ACTUAL_CHALLENGE:
      return { ...state, actualChallenge: action.data };
    case types.STORE_SET_LOADING_RATING:
      return { ...state, loadingRating: true };
    case types.STORE_UNSET_LOADING_RATING:
      return { ...state, loadingRating: false };
    case types.STORE_RATED_SUCCESS:
      return { ...state, ratedSuccess: true };
    case types.STORE_RATED_RESET:
      return { ...state, ratedSuccess: false };
    case types.STORE_CHALLENGES_SET_COMPLETED:
      return { ...state, completedChallenges: action.data.docs}
     // return setCompletedChallenges(state, action.data, action.refresh);
    case types.CHALLENGES_GET_COMPLETED_REFRESH:
      return { ...state, completedChallenges: action.payload}
     // return setCompletedChallenges(state, {docs: action.payload}, action.refresh);
    case types.STORE_RESET_POST_CHALLENGE_STATUS:
      return { ...state, postSuccess: false, postError: '' };
    case types.STORE_POST_CHALLENGE_FAIL:
      return { ...state, postError: action.message };
    case types.CHALLENGES_SET_UPLOADING_VIDEO:
      return { ...state, isUploadingVideo: true};
    case types.CHALLENGES_UNSET_UPLOADING_VIDEO:
      return { ...state, isUploadingVideo: false};
    case types.SET_VIDEO_CHALLENGE_URI:
      return { ...state, uriVideoChallenge: action.data };
    default:
      return state;
  }
}
