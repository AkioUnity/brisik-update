import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Platform, Image } from 'react-native';
import { connect } from 'react-redux';

import { ScreenNames } from '../../screens';
import * as UserActions from '../../actions/User/User.actions';
import * as Images from '../../utils/Images';
import ProfileFriendListing from '../ProfileFriendListing/ProfileFriendListing';
import Styles from './ProfileFriends.styles';

class ProfileFriends extends Component {
  constructor(props) {
    super(props);

    this._navigateProfile = this._navigateProfile.bind(this);
    this._challengeFriend = this._challengeFriend.bind(this);
    this._navigateToAddFriends = this._navigateToAddFriends.bind(this);
    this._chatWithFriend = this._chatWithFriend.bind(this);
  }

  componentDidMount() {
    if (!this.props.public) {
      this.props.getFriendRequests();
      this.props.getPendingFriendRequests();
    }
  }

  render() {
    const { friendRequests, pendingFriendRequests, user } = this.props;

    return (
      <View style={Styles.container}>
        {!this.props.public &&
          <View>
            { this._renderAdd() }
            <ProfileFriendListing
              data={user.friends}
              onPress={this._challengeFriend}
              emptyMessage="You don't have any friends, add one!"
              navigate={this._navigateProfile}
              challenge={true}
              chat={true}
              handleChallenge={this._challengeFriend}
              handleChat={this._chatWithFriend}
            />
          </View>
        }
      </View>
    );
  }

  _renderAdd() {
    return (
      <TouchableOpacity style={Styles.itemContainer} onPress={this._navigateToAddFriends}>
        <View style={Styles.itemTextContainer}>
          <Image source={Images.addFriend} resizeMode="contain" />
          <Text style={Styles.itemText}>Add Friends</Text>
        </View>
        <Image source={Images.chevronRightRed} resizeMode="contain" />
      </TouchableOpacity>
    );
  }

  _challengeFriend(data) {
    this.props.navigator.push({
      screen: ScreenNames.PostChallenge.id,
      title: ScreenNames.PostChallenge.title,
      passProps: {
        defaultType: 'my',
        opponent: data
      },
      backButtonTitle: ''
    });
  }

  _navigateProfile(data) {
    let isPublic = true;

    if (this.props.user) {
      isPublic = this.props.user._id !== data._id;
    }

    if (isPublic) {
      this.props.navigator.push({
        screen: ScreenNames.Profile.id,
        animated: 'true',
        title: ScreenNames.Profile.title.toUpperCase(),
        backButtonTitle: '',
        navigatorButtons: {
          leftButtons: [{
            icon: Images.backButton,
            id: '@nav/editConfirm'
          }],
          rightButtons: [{
            icon: Images.menuShape,
            id: '@nav/menu',
            disableIconTint: true
          }]
        },
        passProps: {
          id: data._id,
          public: isPublic
        }
      });
    } else {
      this.props.navigator.popToRoot({
        animated: true
      });
    }
  }

  _navigateToAddFriends() {
    this.props.navigator.push({
      screen: ScreenNames.AddFriends.id,
      animated: true,
      backButtonHidden: true
    });
  }

  _chatWithFriend(friend) {
    this.props.navigator.push({
      screen: ScreenNames.ChatPrivate.id,
      title: friend ? friend.mediaId.toUpperCase() : 'new chat'.toUpperCase(),
      backButtonTitle: '',
      passProps: {
        chatId: `${this.props.userData._id}_${friend._id}`
      }
    });
  }
}

ProfileFriends.title = 'Friends';
ProfileFriends.id = 'com.eSportsGlobalGamers.ProfileFriends';

const mapStateToProps = ({ user }) => ({
  user: user.userData || {},
  friendRequests: user.friendRequests,
  pendingFriendRequests: user.pendingFriendRequests
});

const mapDispatchToProps = dispatch => {
  return {
    getFriendRequests: () => dispatch(UserActions.getFriendRequests()),
    getPendingFriendRequests: () => dispatch(UserActions.getPendingFriendRequests()),
    sendFriendRequest: friendId => dispatch(UserActions.sendFriendRequest(friendId)),
    acceptFriendRequest: friendId => dispatch(UserActions.acceptFriendRequest(friendId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFriends);
