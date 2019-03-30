import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';

import Avatar from '../Avatar/Avatar';

import Styles from './ChatItem.styles';

const ChatItem = ({ onPress, data, unread, chatId }) => {
  const { user, message } = data;
  const hasMessage = typeof message === 'object';
  const longMessage = hasMessage && message.entry.text.length >= 50;

  return (
    <TouchableOpacity style={Styles.container} onPress={() => onPress && onPress(chatId, user.mediaId)}>
      <Avatar source={{ uri: user.profileImage }} style={Styles.userAvatar} />
      <View style={Styles.messageWrapper}>
        <View style={Styles.message}>
          <Text style={[Styles.messageSender, unread ? Styles.messageSenderUnread : {}]}>
            { user.mediaId }
          </Text>
          <Text style={Styles.messageText}>
            { hasMessage
                ? longMessage ? message.entry.text.substring(0, 50) + '...' :  message.entry.text
                : message }
          </Text>
        </View>
        <View>
          <Text style={Styles.dateText}>
            { hasMessage && moment(message.entry.timetoken).format('h:mmA') }
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;