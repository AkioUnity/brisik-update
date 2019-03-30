import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { ScreenNames } from '../../screens/index';
import { chat as chatActions, user as userActions } from '../../actions';
import Colors from '../../styles/Colors';
import Styles from './Chat.styles';
import * as Images from '../../utils/Images';
import ActionButton from '../../components/ActionButton/ActionButton';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messages: [],
      opponentId: null
    };

    this._renderPublicChatListItem = this._renderPublicChatListItem.bind(this);
    this._sendMessage = this._sendMessage.bind(this);
    this._checkIfLoggedIn = this._checkIfLoggedIn.bind(this);
    this._goToOnlineUsers = this._goToOnlineUsers.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { messages, presence } = nextProps;

    this.setState({
      messages: messages,
      presence
    });

    if (
      nextProps.opponentData !== null &&
      nextProps.opponentData !== this.props.opponentData &&
      this.state.opponentId !== null
    ) {
      if (nextProps.opponentData.length === 1) {
        return this._goToChallenge(nextProps.opponentData[0]);
      } else if (nextProps.opponentData.length > 1) {
        const index = nextProps.opponentData.map(user => user._id).indexOf(this.state.opponentId);

        if (index > -1) {
          return this._goToChallenge(nextProps.opponentData[index]);
        } else {
          return (
            Alert.alert(
              'Something went wrong',
              'We couldn\'t find your desired opponent, please try again later.',
              { cancelable: false }
            )
          );
        }
      }
    }
  }

  componentDidMount() {
    const { messages, presence } = this.props;

    this.setState({
      messages: messages,
      presence
    });

    this.props.markNotificationsAsSeen();
  }

  componentWillUnmount() {
    this.props.markNotificationsAsSeen();
  }

  componentWillUpdate(_, nextState) {
    if (this.state.message !== nextState.message) {
      nextState.canSend = nextState.message.trim().length > 0;
    }
  }

  render() {
    const { message, messages, canSend } = this.state;
    return (
      <View style={Styles.container}>
        <KeyboardAwareScrollView
          getTextInputRefs={() => [this.messageInput]}
          keyboardShouldPersistTaps="always"
          scrollEnabled={false}
        >
          <FlatList
            style={[
              Styles.chatList,
              {
                height: this.props.height
              }
            ]}
            data={messages}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderPublicChatListItem}
            enableEmptySections={true}
            ListHeaderComponent={() => (
              <View style={Styles.chatHeader} />
            )}
          />
          <View style={Styles.actionsContainer}>
            <View style={Styles.textInputContainer}>
              <TextInput
                ref={input => (this.messageInput = input)}
                style={Styles.textInput}
                returnKeyType="send"
                autoCorrect={true}
                autoCapitalize="sentences"
                onFocus={this._checkIfLoggedIn}
                onChangeText={text => this.setState({ message: text })}
                onSubmitEditing={this._sendMessage}
                value={message}
                selectionColor={Colors.lasVegas}
                underlineColorAndroid={'transparent'}
                placeholder="Your message..."
                placeholderTextColor={Colors.paysandu}
              />
            </View>
            <ActionButton
              title="send"
              onPress={() => canSend ? this._sendMessage() : {}}
              style={Styles.textInputSubmitButtonContainer}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  _keyExtractor = item => item.entry.timetoken;

  _renderOnlineAmount() {
    const { online } = this.props;
    const onlineUsers = typeof online !== 'undefined' ? online.toString() : '';

    return (
      <TouchableOpacity style={Styles.onlineContainer} onPress={this._goToOnlineUsers}>
        <Text style={Styles.onlineAmount}>{`${onlineUsers} Online Now`}</Text>
        <Image source={Images.chevronRightGreen} style={Styles.chevronRight} />
      </TouchableOpacity>
    );
  }

  _renderPublicChatListItem({ item, index }) {
    const { messages } = this.state;
    const { userData } = this.props;

    if (item.entry && item.entry.user) {
      const itemIndex = parseInt(index);
      const isUserMessage = userData && userData._id === item.entry.user._id;
      const isLastMessage =
        messages[itemIndex + 1] && messages[itemIndex + 1].entry.user._id !== item.entry.user._id;
      const isOnlyMessage = !messages[itemIndex + 1];
      const avatar = item.entry.user.avatar
        ? { uri: item.entry.user.avatar }
        : Images.defaultAvatar;
      const goToProfile = () => this._navigateToProfile(item.entry.user._id, isUserMessage);

      this._lastMessageUserId = item.entry.user._id;

      return (
        <View
          style={[
            Styles.chatListItemContainer,
            isUserMessage ? Styles.chatListItemContainerSameSender : {}
          ]}
        >
          {!isUserMessage && 
            <TouchableOpacity
              onPress={goToProfile}
              style={[
                Styles.chatListItemAvatarContainer,
                (!isLastMessage && !isOnlyMessage) && Styles.chatListItemAvatarContainerWithoutAvatar
              ]}
            >
              {(isLastMessage || isOnlyMessage) &&
                <Image source={avatar} style={Styles.chatListItemAvatar} resizeMethod="resize" />
              }
            </TouchableOpacity>
          }
          <View style={Styles.chatListItemMessageContainer}>
            {(isLastMessage || isOnlyMessage) &&
              <TouchableOpacity
                onPress={goToProfile}
                style={{
                  flexDirection: 'row',
                  justifyContent: `flex-${isUserMessage ? 'end' : 'start'}`
                }}
              >
                <Text
                  style={[
                    Styles.chatListItemUsername,
                    isUserMessage ? Styles.chatListItemMessageAlignedRight : {}
                  ]}
                >
                  {item.entry.user.name && item.entry.user.name}
                  {'  '}
                  <Text
                    style={[
                      Styles.chatListItemDate,
                      isUserMessage ? Styles.chatListItemMessageAlignedRight : {}
                    ]}
                  >
                    {moment(item.entry.timetoken).format('h:mm A')}
                  </Text>
                </Text>
              </TouchableOpacity>
            }
            <Text
              style={[
                Styles.chatListItemMessage,
                isUserMessage ? Styles.chatListItemMessageAlignedRight : {}
              ]}
            >
              {typeof item.entry.text === 'string' && item.entry.text}
            </Text>
          </View>
          {isUserMessage && 
            <TouchableOpacity
              onPress={goToProfile}
              style={[
                Styles.chatListItemAvatarContainerAlignedRight,
                (!isLastMessage && !isOnlyMessage) ? Styles.chatListItemAvatarContainerWithoutAvatar : {}
              ]}
            >
              {(isLastMessage || isOnlyMessage) &&
                <Image
                  source={avatar}
                  style={[Styles.chatListItemAvatar, Styles.chatListItemAvatarAlignedRight]}
                  resizeMethod="resize"
                />
              }
            </TouchableOpacity>
          }
        </View>
      );
    }

    return null;
  }

  _sendMessage() {
    const { message } = this.state;
    if (message && message.length > 0) {
      this.props.sendMessage(message.trim());
      this.setState({ message: '' });
      setTimeout(() => {
        this.messageInput.focus();
      }, 0);
    }
  }

  _checkIfLoggedIn() {
    const { userData } = this.props;
    if (!userData || !userData._id) {
      this.props.navigator.showModal({
        screen: ScreenNames.SignIn.id,
        title: ScreenNames.SignIn.title.toUpperCase()
      });
    }
  }

  _goToOnlineUsers() {
    return setTimeout(() => {
      return this.props.navigator.push({
        screen: ScreenNames.OnlineUsers.id,
        title: ScreenNames.OnlineUsers.title.toUpperCase(),
        animated: true,
        backButtonTitle: '',
        navigatorButtons: {
          leftButtons: [{
            icon: Images.backButton,
            disableIconTint: true,
            id: '@nav/editConfirm'
          }],
          rightButtons: []
        },
        passProps: {
          online: this.props.online,
          onItemPress: data => this.props.navigator.push(data),
          challenge: data => this._challengeUser(data),
          initChat: data => this._initializeChat(data)
        }
      });
    }, 100);
  }

  _challengeUser(opponent) {
    if (opponent._id !== this.props.userData._id) {
      this.setState({ opponentId: opponent._id }, () => this.props.searchUsers(opponent.name));
    } else {
      return (
        Alert.alert(
          'Ups!',
          'You can\'t challenge yourself.\nPlease choose a different opponent',
          { cancelable: false }
        )
      );
    }
  }

  _goToChallenge(opponent) {
    setTimeout(() => {
      this.props.navigator.push({
        screen: ScreenNames.PostChallenge.id,
        title: ScreenNames.PostChallenge.title.toUpperCase(),
        animated: true,
        backButtonTitle: '',
        passProps: {
          defaultType: 'my',
          opponent
        }
      });
    }, 100);
  }

  _initializeChat(user) {
    this.props.navigator.push({
      screen: ScreenNames.ChatPrivate.id,
      title: user ? user.name.toUpperCase() : 'new chat'.toUpperCase(),
      backButtonTitle: '',
      passProps: {
        chatId: `${this.props.userData._id}_${user._id}`
      }
    });
  }

  _navigateToProfile(id, isUser) {
    if (isUser) {
      this.props.navigator.switchToTab({
        tabIndex: 4
      });
    } else {
      this.props.navigator.push({
        screen: ScreenNames.Profile.id,
        title: ScreenNames.Profile.title.toUpperCase(),
        passProps: { id, public: true },
        backButtonTitle: '',
        navigatorButtons: {
          leftButtons: [{
            icon: Images.backButton,
            disableIconTint: true,
            id: '@nav/editConfirm'
          }],
          rightButtons: [{
            icon: Images.menuShape,
            id: '@nav/menu',
            disableIconTint: true
          }]
        }
      });
    }
  }
}

const mapStateToProps = state => {
  return {
    userData: state.user.userData,
    messages: state.chat.messages.public || [],
    presence: state.chat.presence.public || [],
    online: Object.values(state.chat.onlineUsers).length,
    opponentData: state.user.userList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: message => dispatch(chatActions.sendMessage(null, message)),
    markNotificationsAsSeen: () => dispatch(chatActions.markNotificationsAsSeen()),
    searchUsers: data => dispatch(userActions.searchUsers(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
