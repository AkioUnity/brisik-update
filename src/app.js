import { AsyncStorage, AppState, Linking } from 'react-native';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
//import OneSignal from 'react-native-onesignal';

import GeoFence from './utils/Geofence';
import store from './store/Store';
import { UserProfile } from './utils/Navigator';
import { ScreenNames, registerScreens } from './screens';
import { refresh as challengeRefresh } from './actions/Challenge/Challenge.actions';
import { refresh as tournamentRefresh } from './actions/Tournament/Tournament.actions';
import { initialize as initializeUser } from './actions/User/User.actions';
import { onReceivePush, onOpenPush, onRegisterPush, onIdPush } from './actions/Notification/Notification.actions';
import {
  tabGamepad,
  tabGamepadActive,
  tabTournaments,
  tabTournamentsActive,
  tabChat,
  tabChatActive,
  tabCart,
  tabCartActive,
  tabProfile,
  tabProfileActive,
  bellIcon,
  settingsShape
} from './utils/Images';
import Colors from './styles/Colors';

import Api from './utils/RESTClient';

export default () => {
  checkGeoFence({ appInitializer: true });
};

export const checkGeoFence = (options = {}) => {
  let appState = 'active';
  // GeoFence(options.token)
  //   .then(result => {
      if (typeof options.appInitializer !== 'undefined') {
        AppState.addEventListener('change', nextAppState => {
          if (/inactive|background/.test(appState) && nextAppState === 'active') {
            store.dispatch(challengeRefresh());
            store.dispatch(tournamentRefresh());
          }
          appState = nextAppState;
        });
      }
      new App({ blockedByGeoFence: false }); //result });
    // })
    // .catch(() => new App({ unavailable: true }));
};

export const app = ScreenNames => {
  return {
    screen: {
      screen: ScreenNames.SplashScreen.id,
      navigatorButtons: {
        leftButtons: [],
        rightButtons: []
      }
    },
    drawer: {
      left: {
        screen: ScreenNames.UserMenu.id
      },
      disableOpenGesture: true
    }
  };
};

export const appLoggedIn = ScreenNames => {
  return {
    tabs: [
      {
        label: 'Home',
        screen: ScreenNames.Challenges.id,
        icon: tabGamepad,
        selectedIcon: tabGamepadActive,
        title: ScreenNames.Challenges.title.toUpperCase()
      },
      {
        label: 'Tournaments',
        screen: ScreenNames.Tournaments.id,
        icon: tabTournaments,
        selectedIcon: tabTournamentsActive,
        title: ScreenNames.Tournaments.title.toUpperCase()
      },
      {
        label: 'Chat',
        screen: ScreenNames.Chats.id,
        icon: tabChat,
        selectedIcon: tabChatActive,
        title: ScreenNames.Chats.title.toUpperCase()
      },
      {
        label: 'Profile',
        screen: ScreenNames.Profile.id,
        icon: tabProfile,
        selectedIcon: tabProfileActive,
        title: ScreenNames.Profile.title.toUpperCase(),
        navigatorButtons: {
          leftButtons: [{
            icon: bellIcon,
            id: '@nav/notifications',
            disableIconTint: true
          }],
          rightButtons: [{
            icon: settingsShape,
            id: '@nav/settings',
            disableIconTint: true
          }]
        }
      }
    ],
    tabsStyle: {
      tabBarButtonColor: Colors.paysandu,
      tabBarSelectedButtonColor: Colors.colonia,
      tabBarBackgroundColor: '#141417',
      drawUnderTabBar: true
    },
    appStyle: {
      tabBarButtonColor: Colors.paysandu,
      tabBarSelectedButtonColor: Colors.colonia,
      tabBarBackgroundColor: '#141417',
      drawUnderTabBar: true
    }
  };
};

class App {
  constructor(props) {
    this.initialize(props);
  }

  async initialize(props) {
    await this.initializeScreens();
    await this.initializeNavigator(props);
    await this.initializePushNotifications();
  }

  async initializeScreens() {
    registerScreens(store, Provider);

    Linking.addEventListener('url', event => {
      let url;

      if (event) {
        if (typeof event === 'object') {
          url = event.url;
        } else if (typeof event === 'string') {
          url = event;
        }
      }

      if (url) {
        let getToken = url.split('token=')[1];
        Navigation.startSingleScreenApp({
          screen: {
            screen: ScreenNames.RestorePassword.id,
            title: ScreenNames.RestorePassword.title
          },
          portraitOnlyMode: true,
          passProps: { token: getToken }
        });
      }
    });
  }

  async initializeNavigator({ blockedByGeoFence, unavailable }) {
    const sessionToken = await AsyncStorage.getItem('@sessionToken');

    /*if (typeof blockedByGeoFence !== 'undefined') {
      store.dispatch({ type: 'GEOFENCE', data: blockedByGeoFence });
    }*/

    if (sessionToken) {
      store.dispatch(initializeUser(unavailable));
      Navigation.startTabBasedApp(appLoggedIn(ScreenNames));
    } else {
      Navigation.startSingleScreenApp(app(ScreenNames));
    }
  }

  async initializePushNotifications() {
    //OneSignal.addEventListener('received', data => store.dispatch(onReceivePush(data)));
    //OneSignal.addEventListener('opened', data => store.dispatch(onOpenPush(data)));
    //OneSignal.addEventListener('ids', data => store.dispatch(onIdPush(data)));
  }
}
