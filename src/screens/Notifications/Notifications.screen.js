import React, { Component } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { ScreenNames } from '../';
import NotificationsItem from '../../components/NotificationsItem/NotificationItem';
import * as NotificationAction from '../../actions/Notification/Notification.actions';
import * as UserActions from '../../actions/User/User.actions';
import { SingleNavStyle, NavigationEventsHandler } from '../../utils/Navigator';
import { chevronRightGreen, backButton, emptyBell } from '../../utils/Images';

import Styles from './Notifications.styles';

class Notifications extends Component {
  static navigatorStyle = {
    ...SingleNavStyle,
    drawUnderTabBar: true
  };
  static navigatorButtons = {
    leftButtons: [{
      icon: backButton,
      id: '@nav/editConfirm',
      disableIconTint: true
    }],
    rightButtons: []
  };

  constructor(props) {
    super(props);

    const navigatorEventsHandler = event =>
      NavigationEventsHandler({
        screen: this.constructor.id,
        navigator: props.navigator,
        event
      });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._renderItem = this._renderItem.bind(this);
    this._onItemPress = this._onItemPress.bind(this);
    this._navigate = this._navigate.bind(this);
    this._acceptFriend = this._acceptFriend.bind(this);
    this._declineFriend = this._declineFriend.bind(this);
    this._refreshFriendList = this._refreshFriendList.bind(this);
  }

  componentDidMount() {
    this.props.setNotificationsSeen();
  }

  componentWillUnmount() {
    this.props.setNotificationsSeen();
  }

  render() {
    const { notifications, friendRequests, loadingFriends } = this.props;
    const Wrapper = friendRequests && friendRequests.length > 0 ? TouchableOpacity : View;

    return (
      <View style={Styles.container}>
        { friendRequests &&
          <Wrapper
            style={Styles.friendsBox}
            onPress={() => this._navigate({}, ScreenNames.FriendRequests)}
          >
            <Text style={Styles.friendsText}>{ `${friendRequests.length} Friend Requests` }</Text>
            { friendRequests.length > 0 && <Image source={chevronRightGreen} resizeMode="contain" /> }
          </Wrapper> }
        { notifications.length > 0 ? <FlatList data={notifications} renderItem={this._renderItem}
          keyExtractor={this._keyExtractor} /> : this._renderEmptyNotifications() }
      </View>
    );
  }

  _renderItem({ item }) {
    return <NotificationsItem {...item} style={Styles.item} onPress={this._onItemPress} />;
  }

  _keyExtractor(item) {
    return item._id;
  }

  _onItemPress(data, type, subject, _id, seen, action) {
    if (!seen) {
      this.props.setNotificationSeen(_id);
    }

    switch (type) {
      case 'challenge':
        return this._navigate({ id: data }, ScreenNames.ChallengeDetail);
      case 'friend':
        return this._navigate({
          id: subject._id,
          public: true
        }, ScreenNames.Profile, subject.mediaId);
      case 'tournament':
        if (action === 'newchallenge') {
          return this._navigate({ id: data }, ScreenNames.ChallengeDetail);
        } else {
          return this._navigate({ id: data }, ScreenNames.Tournament);
        }
      case 'coin':
        return this._navigate({}, ScreenNames.Purchase);
      case 'bought':
        return this._navigate({}, ScreenNames.Purchase);
    }
  }

  _navigate(data, route, title) {
    this.props.navigate({
      screen: route.id,
      title: (title || route.title).toUpperCase(),
      passProps: data,
      animated: true,
      backButtonTitle: '',
      navigatorButtons: {
        leftButtons: [{
          icon: backButton,
          id: '@nav/editConfirm',
          disableIconTint: true
        }],
        rightButtons: []
      }
    });
  }

  _acceptFriend(id) {
    this.props.acceptFriendRequest(id);
  }

  _declineFriend() {}

  _refreshFriendList() {
    this.props.getPendingFriendRequests();
  }

  _renderEmptyNotifications() {
    return (
      <View style={Styles.emptyContainer}>
        <Image source={emptyBell} resizeMode="contain" style={Styles.emptyIcon} />
        <Text style={Styles.emptyText}>{ 'There are no recent\nnotifications right now.' }</Text>
      </View>
    );
  }
}

Notifications.title = 'Notifications';
Notifications.id = 'com.eSportsGlobalGamers.Notifications';

const mapStateToProps = ({ user, chat, notification }) => ({
  notifications: notification.notifications,
  navigatorParams: {
    hasUser: !!user.userData,
    hasNotification: !!notification.hasNotification,
    hasChatNotification: !!chat.hasNotification
  },
  friendRequests: user.friendRequests
});

const mapDispatchToProps = dispatch => ({
  setNotificationsSeen: () => dispatch(NotificationAction.markNotificationsAsSeen()),
  setNotificationSeen: (id) => dispatch(NotificationAction.markSeen(id)),
  getPendingFriendRequests: () => dispatch(UserActions.getPendingFriendRequests()),
  acceptFriendRequest: friendId => dispatch(UserActions.acceptFriendRequest(friendId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
