export const getSessionToken = (state) => state.user.sessionToken;
export const getUserData = (state) => state.user.userData;
export const getFriendRequests = (state) => state.user.friendRequests;
export const getActualUserProfile = (state) => state.user.playerProfile;
export const selectPendingFriendRequests = (state) => state.user.pendingFriendRequests;
export const selectDeviceToken = (state) => state.user.deviceToken;

export const getMyChallengeMeta = (state) => state.challenge.myMeta;
export const getOpenChallengeMeta = (state) => state.challenge.openMeta;
export const getActualChallenge = (state) => state.challenge.actualChallenge;
export const getCompletedChallengeMeta = (state) => state.challenge.completedMeta;

export const getMyTournamentMeta = (state) => state.tournament.myMeta;
export const getOpenTournamentMeta = (state) => state.tournament.allMeta;

export const getNavigation = (state) => state.common.navigation;
export const getNavigationPayload = (state) => state.common.navigationPayload;

export const getPrivateChatNotifications = (state) => state.chat.privateNotifications;

export const getCart = (state) => state.product.cart;

export const getNavigationParams = (state) => ({
  hasUser: !!state.user.userData,
  hasNotification: !!state.notification.hasNotification,
  hasChatNotification: !!state.chat.hasNotification,
  isFeaturedStreamActive: !!state.common.featuredStream
});