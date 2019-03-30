export const setAllTournaments = (state, data = {}, refresh) => {
  const { tournaments = [], total, limit, page, pages } = data;

  const listTournaments = !refresh && state.tournaments ? state.tournaments : [];
  const allMeta = { total, limit, page: parseInt(page), pages };
  const showMoreAllTournaments = page < pages;

  tournaments.forEach(item => {
    item.sectionKey = 'OPEN';
    listTournaments.push(item);
  });

  return {
    ...state,
    tournaments: [...listTournaments],
    allMeta,
    showMoreAllTournaments
  };
};

export const setMyTournaments = (state, data = {}, refresh) => {
  const { tournaments = [], total, limit, page, pages } = data;

  const myTournamentsList = !refresh && state.myTournamentsList ? state.myTournamentsList : [];
  const myMeta = { total, limit, page: parseInt(page), pages };
  const showMoreMyTournaments = page < pages;

  tournaments.forEach(item => {
    item.sectionKey = 'MY';
    myTournamentsList.push(item);
  });

  return {
    ...state,
    myMeta,
    showMoreMyTournaments,
    myTournamentsList: [...myTournamentsList]
  };
};

export const updateSingleTournaments = (state, { data = {}, index, type }) => {
  const tournaments = state.tournaments || {};
  const myTournamentsList = state.myTournamentsList || [];

  if (tournaments[data._id]) {
    if (tournaments[data._id].sectionKey === 'OPEN' && type === 'join') {
      data.sectionKey = 'MY';
      data.joined = true;
      myTournamentsList.push(data._id);
    }
  }

  tournaments[data._id] = data;

  return {
    ...state,
    tournaments,
    myTournamentsList: [...myTournamentsList]
  };
};

export const clearTournamentState = (state, data, tournaments) => {
  const _state = { ...state, tournaments };

  if (!data) {
    return _state;
  }

  return {
    ..._state,
    listReady: !!data.ready,
    refreshing: !!data.refreshing
  };
};
