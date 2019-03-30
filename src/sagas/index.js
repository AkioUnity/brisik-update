import { fork, all } from 'redux-saga/effects';

import UserSagas from './User.sagas';
import CommonSagas from './Common.sagas';
import ChallengeSagas from './Challenge.sagas';
import TournamentSagas from './Tournament.sagas';
import ProductSagas from './Product.sagas';
import PubnubSagas from './Pubnub.sagas';
import NotificationSagas from './Notification.sagas';
import NavigationSagas from './Navigation.sagas';

export default function* rootSaga() {
  yield all([
    fork(ProductSagas),
    fork(UserSagas),
    fork(CommonSagas),
    fork(ChallengeSagas),
    fork(TournamentSagas),
    fork(PubnubSagas),
    fork(NotificationSagas),
    fork(NavigationSagas)
  ]);
}
