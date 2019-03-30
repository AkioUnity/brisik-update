import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Animated,
  SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import ActionSheet from 'react-native-action-sheet';
import * as ChallengeActions from '../../actions/Challenge/Challenge.actions';
import { Avatar, Loader } from '../../components';
import { user as userActions } from '../../actions';
import { ModalNavStyle, NavigationEventsHandler, NavButtons } from '../../utils/Navigator';
import ProfileSummary from '../../components/ProfileSummary/ProfileSummary';
import ProfileFriends from '../../components/ProfileFriends/ProfileFriends';
import ActionButton from '../../components/ActionButton/ActionButton';
import { ScreenNames } from '../../screens';
import { cameraIcon, settingsShape, bellIcon } from '../../utils/Images';
import TabView from '../../components/TabView/TabView';
import PTRView from 'react-native-pull-to-refresh';
import axios from 'axios'
import Styles from './Profile.styles';

const APIs = {
  DEV: 'http://207.148.23.33:3000/v1/api',
  STRIPE: 'https://api.stripe.com/v1',
  STAGE: 'https://egg-web-dixtra.herokuapp.com/v1/api',
  LOCAL: 'http://172.20.10.3:3000/v1/api',
  HEROKU: 'https://eggdevelopmentserver.herokuapp.com/v1/api',
  NEUTRINO: 'https://neutrinoapi.com/bad-word-filter'
};

const API = APIs.DEV;  // -_-   manually swap this

class Profile extends Component {
  static navigatorStyle = ModalNavStyle;

  constructor(props) {
    super(props);

    this.tabs = [
      { key: 0, title: 'Summary', Screen: ProfileSummary },
      { key: 1, title: 'Friends', Screen: ProfileFriends }
    ];

    this.inputs = {};

    this.state = {
      tab: this.tabs[0],
      loading: !!props.public,
      userData: !props.public ? this.props.userData : null,
      showModal: false
    };

    const navigatorEventsHandler = (event) => {
      if (event.id === '@nav/menu') {
        this._toggleModal();
      } else {
        NavigationEventsHandler({
          screen: props.public ? this.constructor.idPublic : this.constructor.id,
          navigator: props.navigator, event
        });
      }
    };
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._acceptFriend = this._acceptFriend.bind(this);
    this._challenge = this._challenge.bind(this);
    this._declineFriend = this._declineFriend.bind(this);
    this._addFriend = this._addFriend.bind(this);
    this._removeFriend = this._removeFriend.bind(this);
    this._getCompleted = this.props.getCompleted.bind(this)
  }

  componentDidMount() {
   
    if (this.props.public) {
      this.props.fetchUser(this.props.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.public && this.state.loading && nextProps.userData) {
      if (this.props.userData) {
        const isSameUser = this.props.userData.mediaId === nextProps.userData.mediaId;

        // const hasChanges = (this.props.userData.isFriend !== nextProps.userData.isFriend) ||
        //   (this.props.userData.isPending !== nextProps.userData.isPending) ||
        //   (this.props.userData.requestSent !== nextProps.userData.requestSent) || !isSameUser;

        this.setState({
          loading: false,
          userData: isSameUser ? nextProps.userData : this.state.userData
        });

      } else {
        this.setState({
          loading: false,
          userData: nextProps.userData || this.state.userData
        });
      }
    } else if (!this.state.loading && nextProps.userData && nextProps.userData !== this.props.userData) {
      this.setState({
        loading: false,
        userData: nextProps.userData
      });
    }
  }

  componentWillUpdate(_, { showModal }) {
    if (showModal && this.state.showModal !== showModal) {
      this.animatedHeight = new Animated.Value(-250);

      Animated.timing(
        this.animatedHeight,
        {
          toValue: 0,
          duration: 600
        }
      ).start();
    }
  }

  componentWillUnmount() {
    this.props.removePlayerProfile();
  }

  render() {
    const { userData, showModal } = this.state;
    const { Screen } = this.state.tab;
    
    


    if (this.state.loading || !userData) {
      return <Loader />;
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={Styles.container}>
          { !this.props.public && this._renderTabs() }
          <PTRView onRefresh={this._refresh.bind(this)} color = "transparent">
            <View style={Styles.containerBottomSection}>
              <Screen
                navigator={this.props.navigator}
                public={this.props.public}
                inputReferences={this.inputs}
                userData={this.state.userData}
              />
            </View>
          </PTRView>
          { showModal && this._renderModal() }
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }

  

  _getHeaders() {
    const { sessionToken } = this.props
  
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
  
    if (sessionToken) {
      headers['x-access-token'] = sessionToken;
    }

    let complete = {headers: headers}
    return complete;
  };

  _refresh() {
    axios.get(`${API}/challenges/completed/${this.state.userData._id}`, this._getHeaders())
              .then(response => {
             
               this._getCompleted(response.data.data)
              })
              .catch(error => {
                alert('something went wrong')
              })
    this.props.getUserInfo()
  }

  _renderTabs() {
    const onPress = (tab, i) => {
      this.setState({ tab: tab });
    };

    return (
      <TabView
        tabs={this.tabs}
        onPress={onPress}
        selected={this.state.tab.key} />
    );
  }

  _renderModal() {
    const { isFriend } = this.state.userData;

    return (
      <Animated.View style={[Styles.modalContainer, { top: this.animatedHeight }]}>
        <View style={Styles.buttonsContainer}>
          { isFriend &&
            <ActionButton title="Unfriend" onPress={this._removeFriend} textStyle={Styles.modalBtnText}
              style={[Styles.modalBtn, isFriend ? Styles.unfriend : {}]} /> }
          <ActionButton title="Block" onPress={()=>{}} textStyle={Styles.modalBtnText}
            style={[Styles.modalBtn, isFriend ? Styles.blockFriend : {}]} />
          <ActionButton title="Cancel" onPress={() => this._toggleModal()} textStyle={Styles.modalBtnText}
            style={[Styles.modalBtn, Styles.modalBtnCancel]} />
        </View>
      </Animated.View>
    );
  }

  _removeFriend() {
    this.setState({ loading: true });
    this.props.removeFriend(this.state.userData._id);
    this._toggleModal();
  }

  _addFriend() {
    this.setState({ loading: true });
    this.props.sendFriendRequest(this.state.userData._id);
  }

  _declineFriend() {
    this.setState({ loading: true });
    this.props.declineFriendRequest(this.state.userData.requestId);
  }

  _challenge() {
    this.props.navigator.push({
      screen: ScreenNames.PostChallenge.id,
      title: ScreenNames.PostChallenge.title,
      passProps: { opponent: this.state.userData },
      backButtonTitle: ''
    });
  }

  _acceptFriend() {
    this.setState({ loading: true });
    this.props.acceptFriendRequest(this.state.userData.requestId);
  }

  _toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }
}

Profile.title = 'Profile';
Profile.id = 'com.eSportsGlobalGamers.Profile';
Profile.idPublic = 'com.eSportsGlobalGamers.ProfileOther';

const mapStateToProps = ({ user, notification }, props) => {
  let userData = null;

  if (props.public && user.playerProfile && user.playerProfile._id === props.id) {
    userData = user.playerProfile;
  } else if (!props.public) {
    userData = user.userData;
  }

  return {
    loadingProfileImage: user.loadingProfileImage,
    userData,
    user: !!user.userData,
    hasNotification: !!notification.hasNotification
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeProfileImage: data => dispatch(userActions.changeProfileImage(data)),
    getUserInfo: data => dispatch(userActions.getUserInfo()),
    changeCoverImage: data => dispatch(userActions.changeCoverImage(data)),
    fetchUser: (data) => dispatch(userActions.fetchUser(data)),
    sendFriendRequest: (friendId) => dispatch(userActions.sendFriendRequest(friendId)),
    acceptFriendRequest: (friendId) => dispatch(userActions.acceptFriendRequest(friendId)),
    declineFriendRequest: (data) => dispatch(userActions.declineFriendRequest(data)),
    removeFriend: (data) => dispatch(userActions.removeFriend(data)),
    removePlayerProfile: () => dispatch(userActions.removePlayerProfile()),
    getCompleted: (data) => dispatch(ChallengeActions.getCompleted(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
