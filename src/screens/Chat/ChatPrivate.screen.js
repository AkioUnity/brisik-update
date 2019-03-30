import React, { Component } from 'react';
import {Text, View, FlatList, Image, TextInput, TouchableOpacity, SafeAreaView} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import _ from 'lodash';
import { SingleNavStyle, NavigationEventsHandler } from '../../utils/Navigator';
import { ScreenNames } from '../index';
import { chat as chatActions } from '../../actions';
import Colors from '../../styles/Colors';
import Styles from './ChatPrivate.styles';
import * as Images from '../../utils/Images';
import moment from 'moment';
import ActionButton from '../../components/ActionButton/ActionButton';

class ChatPrivate extends Component {
  static navigatorStyle = SingleNavStyle;
  static navigatorButtons = {
    leftButtons: [{
      icon: Images.backButton,
      id: '@nav/editConfirm',
      disableIconTint: true
    }],
    rightButtons: []
  };

  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messages: []
    };

    const navigatorEventsHandler = event =>
      NavigationEventsHandler({
        screen: this.constructor.id,
        navigator: props.navigator,
        event
      });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._renderChatListItem = this._renderChatListItem.bind(this);
    this._sendMessage = this._sendMessage.bind(this);
    this._checkIfLoggedIn = this._checkIfLoggedIn.bind(this);
  }

  componentWillMount() {
    this.props.initializePrivateChat(this.props.chatId);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      messages: _.sortBy(
        nextProps.messages[this.props.chatId],
        o => new Date(o.entry.timetoken)
      ).reverse()
    });
  }

  componentDidMount() {
    this.setState({
      messages: _.sortBy(
        this.props.messages[this.props.chatId],
        o => new Date(o.entry.timetoken)
      ).reverse()
    });

    this.props.unsetPrivateChatNotifications(this.props.chatId);
  }

  componentWillUnmount() {
    this.props.unsetPrivateChatNotifications(this.props.chatId);
  }

  componentWillUpdate(_, nextState) {
    if (this.state.message !== nextState.message) {
      nextState.canSend = nextState.message.trim().length > 0;
    }

    this.props.unsetPrivateChatNotifications(this.props.chatId);
  }

  render() {
    const { message, messages, canSend } = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={Styles.container}>
        <KeyboardAwareScrollView
          getTextInputRefs={() => [this.messageInput]}
          keyboardShouldPersistTaps="always"
          scrollEnabled={false}
        >
          { messages.length > 0 ? this._renderTimeToken() : <View style={Styles.emptyTimeToken} /> }
          <FlatList
            style={Styles.chatList}
            data={messages}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderChatListItem}
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
                autoCorrect={false}
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
      </View>
    );
  }

  _keyExtractor = item => item.entry.timetoken;

  _renderChatListItem({ item, index }) {
    const { messages, presence } = this.state;
    const { userData } = this.props;

    if (item.entry && item.entry.user) {
      const itemIndex = parseInt(index);
      const isUserMessage = userData && userData._id === item.entry.user._id;
      const isSameSender = this._lastMessageUserId === item.entry.user._id;
      const isLastMessage =
        messages[itemIndex + 1] && messages[itemIndex + 1].entry.user._id !== item.entry.user._id;
      const isOnlyMessage = !messages[itemIndex + 1];
      const avatar = item.entry.user.avatar
        ? { uri: item.entry.user.avatar }
        : Images.defaultAvatar;

      this._lastMessageUserId = item.entry.user._id;

      return (
        <View
          style={[
            Styles.chatListItemContainer,
            isUserMessage ? Styles.chatListItemContainerSameSender : {}
          ]}
        >
          {!isUserMessage && 
            <View
              style={[
                Styles.chatListItemAvatarContainer,
                (!isLastMessage && !isOnlyMessage) ? Styles.chatListItemAvatarContainerWithoutAvatar : {}
              ]}
            >
              {(isLastMessage || isOnlyMessage) &&
                <Image source={avatar} style={Styles.chatListItemAvatar} resizeMethod="resize" />
              }
            </View>
          }
          <View style={Styles.chatListItemMessageContainer}>
            {(isLastMessage || isOnlyMessage) &&
              <Text
                style={[
                  Styles.chatListItemUsername,
                  isUserMessage ? Styles.chatListItemMessageAlignedRight : {}
                ]}
              >
                {item.entry.user.name && item.entry.user.name}
                {'  '}
              </Text>
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
            <View
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
            </View>
          }
        </View>
      );
    }

    return null;
  }

  _renderTimeToken() {
    const { entry } = this.state.messages[0];

    return <Text style={Styles.timetoken}>{ moment(entry.timetoken).calendar().toUpperCase() }</Text>;
  }

  _sendMessage() {
    const { message } = this.state;
    const { chatId } = this.props;

    if (message && message.length > 0) {
      this.props.sendPrivateMessage(chatId, message.trim());
      setTimeout(() => {
        this.messageInput.focus();
        this.setState({ message: '' });
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
    } else {
      !this.chatInitialized && this.props.initializePrivateChat(this.props.chatId);
      this.chatInitialized = true;
    }
  }
}

ChatPrivate.title = '';
ChatPrivate.id = 'com.eSportsGlobalGamers.ChatPrivate';

const mapStateToProps = state => {
  return {
    userData: state.user.userData,
    messages: state.chat.messages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendPrivateMessage: (channel, message) => dispatch(chatActions.sendMessage(channel, message)),
    initializePrivateChat: chatId => dispatch(chatActions.initializePrivateChat(chatId)),
    unsetPrivateChatNotifications: chatId =>
      dispatch(chatActions.unsetPrivateChatNotifications({ id: chatId }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPrivate);
