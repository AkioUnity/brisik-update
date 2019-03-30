import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';

import Styles from './NotificationItem.styles';

const NotificationItem = ({
  type,
  friendlyMessage,
  data,
  color,
  subject,
  seen,
  style,
  onPress,
  icon,
  _id,
  amount,
  tournament,
  action
}) => {
  const coinMessage = amount ? friendlyMessage.split(`${amount} coins`)[0] : null;

  return (
    <TouchableOpacity
      style={[Styles.container, style]}
      onPress={() =>
        onPress(typeof data !== 'undefined' ? data : tournament, type, subject, _id, seen, action)
      }
    >
      <View style={Styles.notificationTextContainer}>
        <Text style={Styles.text} numberOfLines={2}>
          <Text style={[Styles.text, Styles.textBold]}>
            {subject && subject.mediaId}
          </Text>{' '}
          {coinMessage === null ? friendlyMessage : coinMessage}
          <Text style={Styles.amount}>{amount ? `${amount} coins!` : null}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationItem;
