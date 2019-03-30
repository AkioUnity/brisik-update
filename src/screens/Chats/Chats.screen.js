import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { ModalNavStyle2, NavigationEventsHandler } from '../../utils/Navigator';
import { isObjectEmpty } from '../../utils/Utils';
import * as chatActions from '../../actions/Chat/Chat.actions';
import { ScreenNames } from '../../screens';
import ChatItem from '../../components/ChatItem/ChatItem';
import ActionButton from '../../components/ActionButton/ActionButton';

import Styles from './Chats.styles';

class Chats extends React.Component {
  static navigatorStyle = ModalNavStyle2;

  constructor(props) {
    super(props);

    this.state = {
      noFriends: false
    };

    const navigatorEventsHandler = event =>
      NavigationEventsHandler({
        screen: this.constructor.id,
        navigator: props.navigator,
        event
      });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._navigateToChat = this._navigateToChat.bind(this);
    this._renderFriendList = this._renderFriendList.bind(this);
    this._navigateToAddFriends = this._navigateToAddFriends.bind(this);
  }

  componentDidMount() {
    const { userData } = this.props;

    if (
      !isObjectEmpty(userData) &&
      (typeof userData.friends === 'undefined' || userData.friends.length === 0)
    ) {
      this.setState({ noFriends: true });
    }
  }

  componentWillReceiveProps({ userData }) {
    if (!isObjectEmpty(userData) && this.props.userData !== userData) {
      if (typeof userData.friends === 'undefined' || userData.friends.length === 0) {
        this.setState({ noFriends: true });
      } else {
        this.setState({ noFriends: false });

        userData.friends.map((friend, i) => {
          const chatRoom = `${userData._id}_${friend._id}`;

          setTimeout(() => {
            this.props.initializePrivateChat(chatRoom);
          }, 150 * i);
        });
      }
    }
  }

  render() {
    const { userData } = this.props;
    const { noFriends } = this.state;

    return (
      <View style={Styles.container}>
        { noFriends && this._renderEmptyState() }
        <FlatList
          data={userData.friends}
          renderItem={this._renderFriendList}
          keyExtractor={item => item._id}
          initialNumToRender={userData && userData.friends && userData.friends.length}
          extraData={this.props.messages}
          ListFooterComponent={() => <View style={Styles.listFooter} />}
        />
      </View>
    );
  }

  _renderFriendList({ item }) {
    const chatMembers = [item._id, this.props.userData._id].sort();
    const chatId = `${chatMembers[0]}_${chatMembers[1]}`;
    const hasMessages = this.props.messages && this.props.messages[chatId];
    const chatMessages = hasMessages && this.props.messages[chatId];

    const data = {
      user: { ...item },
      message: hasMessages
        ? chatMessages.length > 0
          ? chatMessages[0]
          : `There is no message history yet with ${item.mediaId}`
        : 'Loading chat...'
    };

    return <ChatItem data={data} chatId={chatId} onPress={this._navigateToChat} />;
  }

  _renderEmptyState() {
    return (
      <View style={Styles.emptyContainer}>
        <Text style={Styles.emptyText}>
          {'You don\'t have friends to chat with.\nGo and add some!'}
        </Text>
        <ActionButton title="add friends" onPress={this._navigateToAddFriends} style={Styles.button} />
      </View>
    );
  }

  _navigateToChat(id, chatTitle) {
    this.props.navigator.push({
      screen: ScreenNames.ChatPrivate.id,
      title: chatTitle ? chatTitle.toUpperCase() : 'chat'.toUpperCase(),
      backButtonTitle: '',
      passProps: {
        chatId: id
      }
    });
  }

  _navigateToAddFriends() {
    this.props.navigator.push({
      screen: ScreenNames.AddFriends.id,
      backButtonHidden: true
    });
  }
}

Chats.id = 'com.eSportsGlobalGamers.Chats';
Chats.title = 'Chat';

const mapStateToChats = state => {
  return {
    userData: state.user.userData || {},
    messages: state.chat.messages
  };
};

const mapDispatchToChats = dispatch => {
  return {
    initializePrivateChat: chatId => dispatch(chatActions.initializePrivateChat(chatId))
  };
};

export default connect(mapStateToChats, mapDispatchToChats)(Chats);