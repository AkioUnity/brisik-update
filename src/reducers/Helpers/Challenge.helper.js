export const setOpenChallenges = (state, data = {}, refresh) => {
  const { docs = [], total, limit, page, pages } = data;

  const challenges = state.challenges || {};
  const openChallengesList = !refresh && state.openChallengesList ? state.openChallengesList : [];
  const openMeta = { total, limit, page: parseInt(page), pages };
  const showMoreOpenChallenges = page < pages;

  docs.forEach(item => {
    item.sectionKey = 'OPEN';
    challenges[item._id] = item;

    const duplicated = openChallengesList.findIndex(challenge => challenge._id === item._id);
    if (duplicated > -1) {
      openChallengesList.splice(duplicated, 1);
    }

    openChallengesList.push(item);
  });

  return {
    ...state,
    challenges,
    openMeta,
    showMoreOpenChallenges,
    openChallengesList: [...openChallengesList]
  };
};

export const setMyChallenges = (state, data = {}, refresh) => {
  const { docs = [], total, limit, page, pages } = data;

  const challenges = state.challenges || {};
  const myChallengesList = !refresh && state.myChallengesList ? state.myChallengesList : [];
  const myMeta = { total, limit, page: parseInt(page), pages };
  const showMoreMyChallenges = page < pages;

  docs.forEach(item => {
    item.sectionKey = 'MY';
    challenges[item._id] = item;

    const duplicated = myChallengesList.findIndex(challenge => challenge._id === item._id);
    if (duplicated > -1) {
      myChallengesList.splice(duplicated, 1);
    }

    myChallengesList.push(item);
  });

  return {
    ...state,
    challenges,
    myMeta,
    showMoreMyChallenges,
    myChallengesList: [...myChallengesList]
  };
};

export const updateSingleChallenges = (state, { data = {}, index }) => {
  const challenges = state.challenges || {};
  const openChallengesList = state.openChallengesList || [];
  const myChallengesList = state.myChallengesList || [];

  if (state.challenges[data._id]) {
    data.sectionKey = challenges[data._id].sectionKey;

    if (challenges[data._id].sectionKey === 'OPEN' && data.state === 4) {
      data.sectionKey = 'MY';
      openChallengesList.splice(index, 1);
      myChallengesList.push(data._id);
    }
  } else {
    if (data.guest) {
      data.sectionKey = 'MY';
      myChallengesList.push(data);
    } else {
      data.sectionKey = 'OPEN';
      openChallengesList.push(data);
    }
  }

  challenges[data._id] = data;

  return {
    ...state,
    challenges,
    myChallengesList: [...myChallengesList],
    openChallengesList: [...openChallengesList]
  };
};

export const clearChallengeState = (state, data = {}, challenges) => {
  const _state = { ...state, challenges };

  if (!data) {
    return _state;
  }

  return {
    ..._state,
    listReady: !!data.ready,
    refreshing: !!data.refreshing,
    challenges: null,
    myChallengesList: null,
    openChallengesList: null
  };
};

export const setCompletedChallenges = (state, data = {}, refresh) => {
  const { docs = [], total, limit, page, pages } = data;

  const completedChallenges = []
  const showMoreMyChallenges = true
  const completedMeta = { total, limit, page: parseInt(page), pages };

  docs.forEach(item => {
    item.sectionKey = 'COMPLETED';
    completedChallenges.push(item);
  });

  return {
    ...state,
    showMoreMyChallenges,
    completedMeta,
    completedChallenges: [...completedChallenges]
  };
};
