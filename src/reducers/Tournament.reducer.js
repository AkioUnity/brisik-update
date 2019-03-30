import * as types from '../actions/Tournament/Tournament.actionTypes';
import {
  setAllTournaments,
  setMyTournaments,
  updateSingleTournaments,
  clearTournamentState
} from './Helpers/Tournament.helper';

const initialState = {
  loading: false,
  errorMessage: { show: false, message: '' },
  tournaments: null,
  myTournamentsList: null,
  allTournamentsList: null,
  allMeta: null,
  myMeta: null,
  listReady: false,
  showMoreMyTournaments: false,
  showMoreAllTournaments: false,
  refreshing: false,
  detailLoading: false
};

export default function common(state = initialState, action = {}) {
  switch (action.type) {
    case types.STORE_TOURNAMENTS_SET_ALL:
      return setAllTournaments(state, action.data, action.refresh);
    case types.STORE_TOURNAMENTS_SET_MY:
      return setMyTournaments(state, action.data, action.refresh);
    case types.STORE_TOURNAMENTS_SET_LIST_READY:
      return { ...state, listReady: true };
    case types.STORE_TOURNAMENTS_SINGLE_UPDATE:
      return updateSingleTournaments(state, action.data);
    case types.STORE_TOURNAMENTS_SET_REFRESH:
      return { ...state, refreshing: true };
    case types.TOURNAMENTS_CLEAR:
      return clearTournamentState(initialState, action.data, state.tournaments);
    case types.STORE_TOURNAMENTS_UNSET_REFRESH:
      return { ...state, refreshing: false };
    case types.STORE_TOURNAMENTS_SET_DETAIL_LOADING:
      return { ...state, detailLoading: true };
    case types.STORE_TOURNAMENTS_UNSET_DETAIL_LOADING:
      return { ...state, detailLoading: false };
    default:
      return state;
  }
}
