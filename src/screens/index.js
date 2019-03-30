import { Navigation } from 'react-native-navigation';
import DashboardScreen from './Dashboard/Dashboard.screen';
import UserMenuScreen from './UserMenu/UserMenu.screen';
import SignInScreen from './SignIn/SignIn.screen';
import PostChallengeScreen from './PostChallenge/PostChallenge.screen';
import SearchUsersScreen from './SearchUsers/SearchUsers.screen';
import ShopProductScreen from './ShopProduct/ShopProduct.screen';
import CartScreen from './Cart/Cart.screen';
import ProfileScreen from './Profile/Profile.screen';
import ChallengeScoreScreen from './ChallengeScore/ChallengeScore.screen';
import ChallengeDetailScreen from './ChallengeDetail/ChallengeDetail.screen';
import ChallengeDisputeScreen from './ChallengeDispute/ChallengeDispute.screen';
import TournamentScreen from './TournamentDetail/TournamentDetail.screen';
import ChatScreen from './Chat/Chat.screen';
import ChatPrivateScreen from './Chat/ChatPrivate.screen';
import PrivacyPolicyScreen from './PrivacyPolicy/PrivacyPolicy.screen';
import TutorialsScreen from './Tutorials/Tutorials.screen';
import FaqScreen from './Faq/Faq.screen';
import FaqMenuScreen from './FaqMenu/FaqMenu.screen';
import TermsConditionsScreen from './TermsConditions/TermsConditions.screen';
import BuyCoinsScreen from './Coin/BuyCoins.screen';
import CoinProductScreen from './Coin/CoinProduct.screen';
import CheckoutScreen from './Checkout/Checkout.screen';
import NotificationsScreen from './Notifications/Notifications.screen';
import PurchaseScreen from './Purchase/Purchase.screen';
import ShippingInformationScreen from './ShippingInformation/ShippingInformation.screen';
import AddCardScreen from './AddCard/AddCard.screen';
import OnlineUsersScreen from './Chat/OnlineUsers.screen';
import ForgotPasswordScreen from './ForgotPassword/ForgotPassword.screen';
import RestorePasswordScreen from './RestorePassword/RestorePassword.screen';
import SplashScreen from './Splash/Splash.screen';
import LoginScreen from './Login/Login.screen';
import Challenges from './Challenges/Challenges.screen';
import MyChallengesScreen from './MyChallenges/MyChallenges.screen';
import OpenChallengesScreen from './OpenChallenges/OpenChallenges.screen';
import Tournaments from './Tournaments/Tournaments.screen';
import Leaderboard from './Leaderboard/Leaderboard.screen';
import ChallengeRating from './ChallengeRating/ChallengeRating.screen';
import Shop from './Shop/Shop.screen';
import EditProfile from './EditProfile/EditProfile.screen';
import EditPassword from './EditPassword/EditPassword.screen';
import AddFriends from './AddFriends/AddFriends.screen';
import ProfileSettings from './ProfileSettings/ProfileSettings.screen';
import CoinsCart from './CoinsCart/CoinsCart.screen';
import FriendRequests from './FriendRequests/FriendRequests.screen';
import Chats from './Chats/Chats.screen';
import RegisterScreen from './Register/Register.screen';
import GeofenceRestriction from './Popup/Popup';
import VideoChallengeReply from './VideoChallengeReply/VideoChallengeReply.screen';
import SearchNavbar from '../components/SearchNavbar/SearchNavbar';
import CustomButtonNavBar from '../components/CustomButtonNavBar/CustomButtonNavBar';
import CustomNavBar from '../components/CustomNavBar/CustomNavBar';
import ChallengeVideoReply from './ChallengeVideoReply/ChallengeVideoReply.screen';
import AddFundsScreen from './AddFunds/AddFunds.screen';
import WithdrawFundsScreen from './WithdrawFunds/WithdrawFunds.screen';
import VideoCameraScreen from './VideoCamera/VideoCamera.screen';

export const ScreenNames = {
  Dashboard: {
    id: DashboardScreen.id,
    title: DashboardScreen.title
  },
  UserMenu: {
    id: UserMenuScreen.id,
    title: UserMenuScreen.title
  },
  PostChallenge: {
    id: PostChallengeScreen.id,
    title: PostChallengeScreen.title
  },
  SearchUsers: {
    id: SearchUsersScreen.id,
    title: SearchUsersScreen.title
  },
  ShopProduct: {
    id: ShopProductScreen.id,
    title: ShopProductScreen.title
  },
  Cart: {
    id: CartScreen.id,
    title: CartScreen.title
  },
  Profile: {
    id: ProfileScreen.id,
    title: ProfileScreen.title
  },
  ProfileOther: {
    id: ProfileScreen.idPublic,
    title: ProfileScreen.title
  },
  ChallengeScore: {
    id: ChallengeScoreScreen.id,
    title: ChallengeScoreScreen.title
  },
  ChallengeDetail: {
    id: ChallengeDetailScreen.id,
    title: ChallengeDetailScreen.title
  },
  ChallengeVideoReply: {
    id: ChallengeVideoReply.id,
    title: ChallengeVideoReply.title
  },
  ChallengeDispute: {
    id: ChallengeDisputeScreen.id,
    title: ChallengeDisputeScreen.title
  },
  Tournament: {
    id: TournamentScreen.id,
    title: TournamentScreen.title
  },
  Chat: {
    id: ChatScreen.id,
    title: ChatScreen.title
  },
  ChatPrivate: {
    id: ChatPrivateScreen.id,
    title: ChatPrivateScreen.title
  },
  PrivacyPolicy: {
    id: PrivacyPolicyScreen.id,
    title: PrivacyPolicyScreen.title
  },
  Tutorials: {
    id: TutorialsScreen.id,
    title: TutorialsScreen.title
  },
  Faq: {
    id: FaqScreen.id,
    title: FaqScreen.title
  },
  FaqMenu: {
    id: FaqMenuScreen.id,
    title: FaqMenuScreen.title
  },
  TermsConditions: {
    id: TermsConditionsScreen.id,
    title: TermsConditionsScreen.title
  },
  BuyCoins: {
    id: BuyCoinsScreen.id,
    title: BuyCoinsScreen.title
  },
  CoinProduct: {
    id: CoinProductScreen.id,
    title: CoinProductScreen.title
  },
  Checkout: {
    id: CheckoutScreen.id,
    title: CheckoutScreen.title
  },
  Notifications: {
    id: NotificationsScreen.id,
    title: NotificationsScreen.title
  },
  Purchase: {
    id: PurchaseScreen.id,
    title: PurchaseScreen.title
  },
  ShippingInformation: {
    id: ShippingInformationScreen.id,
    title: ShippingInformationScreen.title
  },
  AddCard: {
    id: AddCardScreen.id,
    title: AddCardScreen.title
  },
  OnlineUsers: {
    id: OnlineUsersScreen.id,
    title: OnlineUsersScreen.title
  },
  ForgotPassword: {
    id: ForgotPasswordScreen.id,
    title: ForgotPasswordScreen.title
  },
  RestorePassword: {
    id: RestorePasswordScreen.id,
    title: RestorePasswordScreen.title
  },
  SplashScreen: {
    id: SplashScreen.id,
    title: SplashScreen.title
  },
  Login: {
    id: LoginScreen.id,
    title: LoginScreen.title
  },
  Challenges: {
    id: Challenges.id,
    title: Challenges.title
  },
  MyChallenges: {
    id: MyChallengesScreen.id,
    title: MyChallengesScreen.title
  },
  OpenChallenges: {
    id: OpenChallengesScreen.id,
    title: OpenChallengesScreen.title
  },
  Tournaments: {
    id: Tournaments.id,
    title: Tournaments.title
  },
  Leaderboard: {
    id: Leaderboard.id,
    title: Leaderboard.title
  },
  ChallengeRating: {
    id: ChallengeRating.id,
    title: ChallengeRating.title
  },
  Shop: {
    id: Shop.id,
    title: Shop.title
  },
  EditProfile: {
    id: EditProfile.id,
    title: EditProfile.title
  },
  EditPassword: {
    id: EditPassword.id,
    title: EditPassword.title
  },
  AddFriends: {
    id: AddFriends.id,
    title: AddFriends.title
  },
  SearchNavbar: {
    id: SearchNavbar.id,
    title: SearchNavbar.title
  },
  ProfileSettings: {
    id: ProfileSettings.id,
    title: ProfileSettings.title
  },
  CoinsCart: {
    id: CoinsCart.id,
    title: CoinsCart.title
  },
  FriendRequests: {
    id: FriendRequests.id,
    title: FriendRequests.title
  },
  Chats: {
    id: Chats.id,
    title: Chats.title
  },
  CustomButtonNavBar: {
    id: CustomButtonNavBar.id,
    title: CustomButtonNavBar.title
  },
  Register: {
    id: RegisterScreen.id,
    title: RegisterScreen.title
  },
  GeofenceRestriction: {
    id: GeofenceRestriction.id,
    title: GeofenceRestriction.title
  },
  CustomNavBar: {
    id: CustomNavBar.id,
    title: CustomNavBar.title
  },
  VideoChallengeReply: {
    id: VideoChallengeReply.id,
    title: VideoChallengeReply.title
  },
  AddFunds: {
    id: AddFundsScreen.id,
    title: AddFundsScreen.title
  },
  WithdrawFunds: {
    id: WithdrawFundsScreen.id,
    title: WithdrawFundsScreen.title
  },
  VideoCamera: {
    id: VideoCameraScreen.id,
    title: VideoCameraScreen.title
  }
};

export function registerScreens(store, Provider) {
  Navigation.registerComponent(ScreenNames.UserMenu.id, () => UserMenuScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.PostChallenge.id, () => PostChallengeScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.SearchUsers.id, () => SearchUsersScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.ShopProduct.id, () => ShopProductScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.Cart.id, () => CartScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.Profile.id, () => ProfileScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.ProfileOther.id, () => ProfileScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.ChallengeScore.id, () => ChallengeScoreScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.ChallengeDetail.id, () => ChallengeDetailScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.ChallengeVideoReply.id, () => ChallengeVideoReply, store, Provider);
  Navigation.registerComponent(ScreenNames.ChallengeDispute.id, () => ChallengeDisputeScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.Tournament.id, () => TournamentScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.Chat.id, () => ChatScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.ChatPrivate.id, () => ChatPrivateScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.PrivacyPolicy.id, () => PrivacyPolicyScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.Tutorials.id, () => TutorialsScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.Faq.id, () => FaqScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.FaqMenu.id, () => FaqMenuScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.TermsConditions.id, () => TermsConditionsScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.BuyCoins.id, () => BuyCoinsScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.CoinProduct.id, () => CoinProductScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.Checkout.id, () => CheckoutScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.Notifications.id, () => NotificationsScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.Purchase.id, () => PurchaseScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.Dashboard.id, () => DashboardScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.ShippingInformation.id, () => ShippingInformationScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.AddCard.id, () => AddCardScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.OnlineUsers.id, () => OnlineUsersScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.ForgotPassword.id, () => ForgotPasswordScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.RestorePassword.id, () => RestorePasswordScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.SplashScreen.id, () => SplashScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.Login.id, () => LoginScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.Challenges.id, () => Challenges, store, Provider);
  Navigation.registerComponent(ScreenNames.MyChallenges.id, () => MyChallengesScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.OpenChallenges.id, () => OpenChallengesScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.Tournaments.id, () => Tournaments, store, Provider);
  Navigation.registerComponent(ScreenNames.Leaderboard.id, () => Leaderboard, store, Provider);
  Navigation.registerComponent(ScreenNames.ChallengeRating.id, () => ChallengeRating, store, Provider);
  Navigation.registerComponent(ScreenNames.Shop.id, () => Shop, store, Provider);
  Navigation.registerComponent(ScreenNames.EditProfile.id, () => EditProfile, store, Provider);
  Navigation.registerComponent(ScreenNames.EditPassword.id, () => EditPassword, store, Provider);
  Navigation.registerComponent(ScreenNames.AddFriends.id, () => AddFriends, store, Provider);
  Navigation.registerComponent(ScreenNames.SearchNavbar.id, () => SearchNavbar, store, Provider);
  Navigation.registerComponent(ScreenNames.ProfileSettings.id, () => ProfileSettings, store, Provider);
  Navigation.registerComponent(ScreenNames.CoinsCart.id, () => CoinsCart, store, Provider);
  Navigation.registerComponent(ScreenNames.FriendRequests.id, () => FriendRequests, store, Provider);
  Navigation.registerComponent(ScreenNames.Chats.id, () => Chats, store, Provider);
  Navigation.registerComponent(ScreenNames.CustomButtonNavBar.id, () => CustomButtonNavBar, store, Provider);
  Navigation.registerComponent(ScreenNames.Register.id, () => RegisterScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.GeofenceRestriction.id, () => GeofenceRestriction, store, Provider);
  Navigation.registerComponent(ScreenNames.CustomNavBar.id, () => CustomNavBar, store, Provider);
  Navigation.registerComponent(ScreenNames.VideoChallengeReply.id, () => VideoChallengeReply, store, Provider);
  Navigation.registerComponent(ScreenNames.AddFunds.id, () => AddFundsScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.WithdrawFunds.id, () => WithdrawFundsScreen, store, Provider);
  Navigation.registerComponent(ScreenNames.VideoCamera.id, () => VideoCameraScreen, store, Provider);
}

export default { ScreenNames, registerScreens };
