import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

import { ModalNavStyle, NavigationEventsHandler } from '../../utils/Navigator';
import { ScreenNames } from '../index';
import * as Images from '../../utils/Images';
import PostChallengeButton from '../../components/PostChallengeButton/PostChallengeButton';
import Loader from '../../components/Loader/Loader';

import Styles from './OnlineUsers.styles';

const pingAssets = {
  green: Images.pingGreen,
  yellow: Images.pingYellow,
  red: Images.pingRed
};

class OnlineUsers extends Component {
  static navigatorStyle = ModalNavStyle;

  constructor(props) {
    super(props);

    this.state = {
      users: props.users ? Object.values(props.users) : [],
      loading: false

    };

    const navigatorEventsHandler = (event) => NavigationEventsHandler({
      screen: this.constructor.id,
      navigator: props.navigator, event
    });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._onItemPress = this._onItemPress.bind(this);
    this._renderItem = this._renderItem.bind(this);
  }

  componentDidMount() {
    if (this.props.online) {
      setTimeout(() => {
        this.props.navigator.setTitle({
          title: `Online Now (${this.props.online})`.toUpperCase()
        });
      }, 100);
    }
    if (this.state.users.length === 0) {
      this.setState({ loading: true });
    }
  }

  componentWillReceiveProps({ users }) {
    if (users) {
      const onlineUsers = Object.values(users);

      this.setState({
        users: onlineUsers,
        query: '',
        loading: false
      });
      this.props.navigator.setTitle({
        title: `Online Now (${onlineUsers.length})`.toUpperCase()
      });
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    return (
      <View style={Styles.container}>
        { this.state.users.length > 0 ? <FlatList data={this.state.users}
            renderItem={this._renderItem} keyExtractor={this._keyExtractor} /> : this._renderEmptyList()}
      </View>
    );
  }

  _renderItem({ item }) {
    const isUser = item._id === this.props.userData._id;

    return (
      <TouchableOpacity style={Styles.item} onPress={() => this._onItemPress(item)}>
        <View style={Styles.playersData}>
          <Text style={Styles.name}>{item.name}</Text>
          <View style={Styles.locationWrapper}>
            {item.city &&
              <Image
                source={pingAssets[item.ping]}
                resizeMode="contain"
                style={Styles.locationIcon}
              />}
            <Text style={Styles.locationText}>
              {item.city || 'No city found'}
            </Text>
          </View>
        </View>
        {!isUser &&
          <TouchableOpacity onPress={() => this._chatWithUser(item)} style={Styles.chatBtnContainer} activeOpacity={0.8}>
            <Image source={Images.chatShapeBubble} style={Styles.chatBtn} />
          </TouchableOpacity>
        }
        {!isUser &&
          <PostChallengeButton onPress={() => this._challengeUser(item)} imgStyle={Styles.challengeBtn} />
        }
      </TouchableOpacity>
    );
  }

  _renderEmptyList() {
    return (
      <View style={Styles.emptyContainer}>
        <Image source={Images.emptyOnline} resizeMode="contain" style={Styles.emptyIcon} />
        <Text style={Styles.emptyText}>{ 'There are no users\nonline right now.' }</Text>
      </View>
    );
  }

  _keyExtractor(item) {
    return item._id;
  }

  _onItemPress(data) {
    let isPublic = true;

    if (this.props.userData) {
      isPublic = this.props.userData._id !== data._id;
    }

    this.props.onItemPress({
      screen: ScreenNames.Profile.id,
      animated: 'true',
      title: data.name,
      backButtonTitle: '',
      passProps: {
        id: data._id,
        public: isPublic
      }
    });
  }

  _challengeUser(opponent) {
    const { challenge } = this.props;

    if (challenge && typeof challenge === 'function') {
      this.props.challenge(opponent);
    }
  }

  _chatWithUser(user) {
    const { initChat } = this.props;

    if (initChat && typeof initChat === 'function') {
      this.props.initChat(user);
    }
  }
}

OnlineUsers.title = 'Online Users';
OnlineUsers.id = 'com.eSportsGlobalGamers.OnlineUsers';

const mapStateToProps = ({ user, chat }) => {
  return {
    userData: user.userData,
    users: chat.onlineUsers,
    loadingOpponent: user.loading
  };
};

export default connect(mapStateToProps)(OnlineUsers);
