import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';

import * as UserActions from '../../actions/User/User.actions';
import ActionButton from '../../components/ActionButton/ActionButton';
import Avatar from '../../components/Avatar/Avatar';
import Loader from '../../components/Loader/Loader';
import { NavigationEventsHandler, ModalNavStyle2 } from '../../utils/Navigator';

import Styles from './FriendRequests.styles';

class FriendRequests extends React.Component {
  static navigatorButtons = {};
  static navigatorStyle = {
    ...ModalNavStyle2,
    drawUnderTabBar: true
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

    this._keyExtractor = this._keyExtractor.bind(this);
    this._renderListItem = this._renderListItem.bind(this);
    this._handleListRefresh = this._handleListRefresh.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.props.data) {
      this.props.navigator.setButtons({
        leftButtons: [],
        rightButtons: []
      });
    }
  }

  render() {
    const { data, loadingFriends, fetching } = this.props;

    return (
      <View style={Styles.container}>
        <FlatList data={data} keyExtractor={this._keyExtractor} onRefresh={this._handleListRefresh}
          refreshing={loadingFriends} renderItem={this._renderListItem} />
        { !data || data.length === 0 && <Text>{ 'You don\'t have pending requests' }</Text> }
      </View>
    );
  }

  _renderListItem({ item }) {
    const { fetching, data } = this.props;
    const isLastItem = data.length === 1;

    return (
      <View style={Styles.itemContainer}>
        <View style={Styles.itemPlayer}>
          <Avatar source={{ uri: item.user.profileImage }} style={Styles.itemAvatar} />
          <Text style={Styles.itemName}>{ item.user.mediaId }</Text>
        </View>
        <View style={Styles.actionsContainer}>
          <ActionButton title="decline" style={Styles.declineBtn} textStyle={Styles.btnText}
            onPress={() => this._handleDecline(item._id, isLastItem)} />
          <ActionButton title="accept" style={Styles.acceptBtn} textStyle={Styles.btnText}
            onPress={() => this._handleAccept(item._id, isLastItem)} />
        </View>
      </View>
    );
  }

  _keyExtractor(item) {
    return item._id;
  }

  _handleAccept(id, isLastItem) {
    this.props.acceptFriendRequest(id);

    if (isLastItem) {
      this._goBack();
    }
  }

  _handleDecline(id, isLastItem) {
    this.props.declineFriendRequest(id);

    if (isLastItem) {
      this._goBack();
    }
  }

  _handleListRefresh() {
    this.props.getFriendRequests();
  }

  _goBack() {
    setTimeout(() => this.props.navigator.pop({ animated: true, animationType: 'fade' }), 250);
  }
}

FriendRequests.title = 'Friend requests';
FriendRequests.id = 'com.eSportsGlobalGamers.FriendRequests';

const mapStateToProps = ({ user }) => {
  return {
    loadingFriends: user.loadingFriends,
    fetching: user.loading,
    data: user.friendRequests
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFriendRequests: () => dispatch(UserActions.getFriendRequests()),
    acceptFriendRequest: friendId => dispatch(UserActions.acceptFriendRequest(friendId)),
    declineFriendRequest: friendId => dispatch(UserActions.declineFriendRequest(friendId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequests);