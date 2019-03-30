import Colors from '../styles/Colors';
import Fonts from '../styles/Fonts';
import state from '../store/Store';
import {
  bellIcon,
  bellIconWithIndicator,
  crossIcon,
  menuIcon,
  body,
  chatShapeBubble,
  leaderboardIcon,
  chatShape,
  settingsShape,
  addChatShapeBubble,
  backButton,
  featuredStream,
  featuredStreamActive
} from './Images';
import  { ScreenNames } from '../screens';
import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { appLoggedIn } from '../app';
import Analytics from './GoogleAnalytics';

export const NavButtons = {
  globalChat: (mark) => ({
    icon: chatShape,
    id: '@nav/messages',
    disableIconTint: true,
    type: 'rightButtons',
    order: 1,
    mark
  }),
  notification: (mark) => ({
    icon: mark ? bellIconWithIndicator : bellIcon,
    id: '@nav/notifications',
    disableIconTint: true,
    type: 'leftButtons',
    order: 0,
    mark
  }),
  body: () => ({
    icon: body,
    id: '@nav/online',
    disableIconTint: true,
    type: 'rightButtons',
    order: 0
  }),
  menu: () => ({
    icon: menuIcon,
    id: '@drawer/toggle',
    disableIconTint: true,
    type: 'leftButtons',
    order: 0
  }),
  cross: () => ({
    icon: crossIcon,
    id: '@modal/close',
    disableIconTint: true,
    type: 'leftButtons',
    order: 0
  }),
  privateChat: () => ({
    icon: chatShapeBubble,
    id: '@nav/private_messages',
    disableIconTint: true,
    type: 'rightButtons',
    order: 1
  }),
  leaderboard: () => ({
    icon: leaderboardIcon,
    id: '@nav/leaderboard',
    disableIconTint: true,
    type: 'leftButtons',
    order: 0
  }),
  settings: () => ({
    icon: settingsShape,
    id: '@nav/settings',
    disableIconTint: true,
    type: 'rightButtons',
    order: 1
  }),
  addPrivateChat: () => ({
    icon: addChatShapeBubble,
    id: '@nav/private_chat',
    disableIconTint: true,
    type: 'rightButtons',
    order: 1
  }),
  backChevron: () => ({
    icon: backButton,
    id: '@nav/editConfirm',
    disableIconTint: true,
    type: 'leftButtons',
    order: 0
  }),
  featuredStream: (mark) => ({
    icon: mark ? featuredStreamActive : featuredStream,
    id: '@nav/featuredStream',
    disableIconTint: true,
    type: 'rightButtons',
    order: 1
  })
};

const NavigatorStyle = {
  navBarNoBorder: true,
  navBarTitleTextCentered: true,
  topBarElevationShadowEnabled: false,
  navBarBackgroundColor: Colors.salto,
  screenBackgroundColor: Colors.salto,
  navBarTextFontFamily: Fonts.get('regular'),
  navBarTextColor: Colors.colonia,
  navBarButtonColor: Colors.colonia,
  statusBarTextColorScheme: 'light',
  drawUnderTabBar: true
};

export const PrincipalNavStyle = {
  ...NavigatorStyle,
  drawUnderNavBar: false
};

export const SingleNavStyle = {
  ...NavigatorStyle,
  drawUnderNavBar: false,
  navBarLeftButtonColor: Colors.colonia
};

export const ModalNavStyle = {
  ...NavigatorStyle,
  navBarBackgroundColor: Colors.soriano,
  screenBackgroundColor: Colors.soriano
};

export const ModalNavStyle2 = {
  ...NavigatorStyle,
  navBarBackgroundColor: Colors.salto,
  screenBackgroundColor: Colors.salto
};

export const SplashStyle = {
  ...NavigatorStyle,
  navBarBackgroundColor: Colors.montevideo,
  screenBackgroundColor: Colors.montevideo,
  navBarNoBorder: true
};

export const PrincipalNavButtons = {
  notification: NavButtons.notification(),
  menu: NavButtons.menu(),
  chat: NavButtons.globalChat()
};

export const CommonNavButtons = {
  notification: NavButtons.notification(),
  chat: NavButtons.globalChat()
};

export const ModalNavButtons = {
  cross: NavButtons.cross()
};

export const SearchNavButtons = {
  leftButtons: Platform.OS === 'ios'
    ?
      [{
        title: 'Cancel',
        id: '@nav/cancel',
        buttonFontSize: 12,
        buttonFontWeight: '400'
      }]
    : NavButtons.backChevron(),
  rightButtons: [{
    title: 'Search',
    id: '@nav/searchConfirm',
    buttonFontSize: 12,
    buttonFontWeight: '400'
  }]
};

export const ChatNavButton = {
  backButton: NavButtons.backChevron(),
  chat: NavButtons.privateChat()
};

export const ChallengesNavButtons = {
  leaderboard: NavButtons.leaderboard(),
  chat: NavButtons.globalChat(),
  featuredStream: NavButtons.featuredStream()
};

export const SkipNavButton = {
  leftButtons: [],
  rightButtons: [{
    title: 'Skip',
    id: '@nav/skip',
    buttonFontSize: 12,
    buttonFontWeight: '400',
    buttonColor: Colors.cerroLargo
  }]
};

export const TournamentsNavButtons = {
  leaderboard: NavButtons.leaderboard()
};

export const UserProfile = {
  notification: NavButtons.notification(),
  settings: NavButtons.settings()
};

export const PrivateChatNavButton = {
  addPrivateChat: NavButtons.addPrivateChat()
};


export const ScreenButtons = {
  'com.eSportsGlobalGamers.Dashboard': {},
  'com.eSportsGlobalGamers.UserMenu': PrincipalNavButtons,
  'com.eSportsGlobalGamers.postChallenge': {},
  'com.eSportsGlobalGamers.ShopProduct': {},
  'com.eSportsGlobalGamers.Profile': UserProfile,
  'com.eSportsGlobalGamers.AddFunds': {},
  'com.eSportsGlobalGamers.WithdrawFunds': {},
  'com.eSportsGlobalGamers.ProfileOther': {},
  'com.eSportsGlobalGamers.challengeDetail': ChatNavButton,
  'com.eSportsGlobalGamers.PrivacyPolicy': {},
  'com.eSportsGlobalGamers.Tutorials': {},
  'com.eSportsGlobalGamers.Faq': {},
  'com.eSportsGlobalGamers.TermsConditions': {},
  'com.eSportsGlobalGamers.BuyCoins': {},
  'com.eSportsGlobalGamers.Tournament': ChatNavButton,
  'com.eSportsGlobalGamers.CoinProduct': CommonNavButtons,
  'com.eSportsGlobalGamers.Checkout': {},
  'com.eSportsGlobalGamers.Purchase': {},
  'com.eSportsGlobalGamers.searchUsers': SearchNavButtons,
  'com.eSportsGlobalGamers.ShopCategories': ModalNavButtons,
  'com.eSportsGlobalGamers.Cart': {},
  'com.eSportsGlobalGamers.ChallengeScore': ChatNavButton,
  'com.eSportsGlobalGamers.FaqMenu': {},
  'com.eSportsGlobalGamers.ShippingInformation': {},
  'com.eSportsGlobalGamers.AddCard': {},
  'com.eSportsGlobalGamers.OnlineUsers': {},
  'com.eSportsGlobalGamers.Notifications': {},
  'com.eSportsGlobalGamers.Chat': {},
  'com.eSportsGlobalGamers.ForgotPassword': {},
  'com.eSportsGlobalGamers.RestorePassword': {},
  'com.eSportsGlobalGamers.ChallengeDispute': {},
  'com.eSportsGlobalGamers.ChatPrivate': {},
  'com.eSportsGlobalGamers.Splash': {},
  'com.eSportsGlobalGamers.Login': {},
  'com.eSportsGlobalGamers.Register': {},
  'com.eSportsGlobalGamers.Challenges': ChallengesNavButtons,
  'com.eSportsGlobalGamers.ChallengeRating': SkipNavButton,
  'com.eSportsGlobalGamers.Shop': {},
  'com.eSportsGlobalGamers.Tournaments': TournamentsNavButtons,
  'com.eSportsGlobalGamers.EditProfile': {},
  'com.eSportsGlobalGamers.EditPassword': {},
  'com.eSportsGlobalGamers.ProfileSettings': {},
  'com.eSportsGlobalGamers.CoinsCart': {},
  'com.eSportsGlobalGamers.FriendRequests': {},
  'com.eSportsGlobalGamers.Chats': {},
  'com.eSportsGlobalGamers.Leaderboard': {},
  'com.eSportsGlobalGamers.CustomNavBar': {},
  'com.eSportsGlobalGamers.AddCardScreen': {},
  'com.eSportsGlobalGamers.VideoCamera': {}
};

const handleDeepLink = ({ link, payload }, navigator) => {
  if (/drawer:\/\//.test(link) || /internal:\/\//.test(link)) {
    const data = JSON.parse(payload);
    navigator.push(data);
  } else if (/pop:\/\//.test(link)) {
    navigator.pop({ animated: true, animationType: 'fade' });
  }
};

export const NavigationEventsHandler = ({ screen, navigator, event, props = {}}) => {
  const { type, id } = event;
  const screenName = screen.split('com.eSportsGlobalGamers.')[1];
  Analytics.trackScreenView(screenName);

  if (type === 'ScreenChangedEvent') {
    if (id === 'willAppear') {
      const regex = new RegExp('^(challenges|tournaments|shop|profile|chats)$', 'i');
      const isTabBasedScreen = regex.test(screenName);

      if (screenName !== 'Splash') {
        if (isTabBasedScreen) {
          navigator.toggleTabs({
            to: 'shown',
            animated: true
          });
        } else {
          navigator.toggleTabs({
            to: 'hidden',
            animated: true
          });
        }
      }
    } else if (id === 'didAppear') {
      state.dispatch({type: 'NAVIGATION', data: {screen, event, props}, navigator});
    }
  } else if (type === 'DeepLink') {
    return handleDeepLink(event, navigator);
  } else if (type === 'NavBarButtonPress') {
    navigator.toggleTabs({
      to: 'hidden',
      animated: true
    });

    switch (id) {
      case '@drawer/toggle':
        return navigator.toggleDrawer({
          side: 'left',
          animated: true
        });
      case '@nav/notifications':
        return navigator.push({
          screen: ScreenNames.Notifications.id,
          title: ScreenNames.Notifications.title.toUpperCase(),
          backButtonTitle: '',
          passProps: {
            ...props,
            navigate: (data) => navigator.push(data)
          }
        });
      case '@nav/messages':
        if (props.screen === 'private-chat') {
          return navigator.push({
            screen: ScreenNames.ChatPrivate.id,
            title: props.title || ScreenNames.ChatPrivate.title.toUpperCase(),
            passProps: {
              chatId: props.chatId
            },
            backButtonTitle: ''
          });
        }
        return navigator.push({
          screen: ScreenNames.Chat.id,
          title: ScreenNames.Chat.title.toUpperCase(),
          passProps: props,
          backButtonTitle: ''
        });
      case '@nav/private_messages':
        if (props.screen === 'private-chat') {
          return navigator.push({
            screen: ScreenNames.ChatPrivate.id,
            title: props.title || ScreenNames.ChatPrivate.title.toUpperCase(),
            passProps: {
              chatId: props.chatId
            },
            backButtonTitle: ''
          });
        }
        return navigator.push({
          screen: ScreenNames.Chat.id,
          title: ScreenNames.Chat.title.toUpperCase(),
          passProps: props,
          backButtonTitle: ''
        });
      case '@modal/close':
        return navigator.dismissModal();
      case '@nav/online':
        return navigator.showModal({
          screen: ScreenNames.OnlineUsers.id,
          title: ScreenNames.OnlineUsers.title.toUpperCase(),
          passProps: {
            onItemPress: (data) => {
              if (Platform.OS === 'ios') {
                navigator.dismissModal({ animated: true }).then(() => navigator.push(data));
              } else {
                navigator.dismissModal({ animated: true });
                navigator.push(data);
              }
            }
          }
        });
      case '@nav/cancel':
        return navigator.pop({
          animated: true,
          animationType: 'fade'
        });
      case '@nav/leaderboard':
        return navigator.push({
          screen: ScreenNames.Leaderboard.id,
          title: ScreenNames.Leaderboard.title.toUpperCase(),
          backButtonTitle: ''
        });
      case '@nav/skip':
        return Navigation.startTabBasedApp(appLoggedIn(ScreenNames));
      case '@nav/settings':
        return navigator.push({
          screen: ScreenNames.ProfileSettings.id,
          title: ScreenNames.ProfileSettings.title.toUpperCase(),
          backButtonTitle: ''
        });
      case '@nav/editConfirm':
        return navigator.pop({ animated: true });
      case '@nav/private_chat':
        return navigator.push({
          screen: ScreenNames.SearchUsers.id,
          title: 'new chat'.toUpperCase(),
          backButtonTitle: '',
          passProps: {
            searchForChat: true
          }
        });
    }
  }
};
