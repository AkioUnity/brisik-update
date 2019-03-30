export const setLoading = (state, origin) => {
  if (typeof origin === 'string') {
    if (origin === 'profile') {
      return {
        ...state,
        loadingProfileImage: true
      };
    }
    if (origin === 'cover') {
      return {
        ...state,
        loadingCoverImage: true
      };
    }
    if (origin === 'friends') {
      return {
        ...state,
        loadingFriends: true
      };
    }
    if (origin === 'card') {
      return {
        ...state,
        loadingCard: true
      };
    }
    if (origin === 'address') {
      return {
        ...state,
        loadingAddress: true
      };
    }
    if (origin === 'password') {
      return {
        ...state,
        loadingPassword: true
      };
    }
  }

  if (origin) {
    return {
      ...state,
      [origin]: true
    };
  }

  return {
    ...state,
    loading: true
  };
};

export const unsetLoading = (state, origin) => {
  if (typeof origin === 'string') {
    if (origin === 'profile') {
      return {
        ...state,
        loadingProfileImage: false
      };
    }
    if (origin === 'cover') {
      return {
        ...state,
        loadingCoverImage: false
      };
    }
    if (origin === 'friends') {
      return {
        ...state,
        loadingFriends: false
      };
    }
    if (origin === 'card') {
      return {
        ...state,
        loadingCard: false
      };
    }
    if (origin === 'address') {
      return {
        ...state,
        loadingAddress: false
      };
    }
    if (origin === 'password') {
      return {
        ...state,
        loadingPassword: false
      };
    }
  }

  if (origin) {
    return {
      ...state,
      [origin]: false
    };
  }

  return {
    ...state,
    loading: false
  };
};
