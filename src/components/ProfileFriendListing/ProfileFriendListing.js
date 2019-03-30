import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import ActionButton from '../../components/ActionButton/ActionButton';
import PostChallengeButton from '../../components/PostChallengeButton/PostChallengeButton';
import Avatar from '../../components/Avatar/Avatar';
import Loader from '../Loader/Loader';
import { chatShapeBubble } from '../../utils/Images';
import Styles from './ProfileFriendListing.styles';

const ProfileMyFriendListing = ({
  data,
  emptyMessage,
  onPress,
  button,
  text,
  loading,
  navigate,
  challenge,
  chat,
  handleChallenge,
  handleChat
}) => {
  if (!data || loading) {
    return <Loader size="small" />;
  }

  if (data.length > 0) {
    return (
      <View style={Styles.friendsList}>
        {renderItem(data, button, onPress, text, navigate, challenge, chat, handleChallenge, handleChat)}
      </View>
    );
  }

  return (
    <View style={Styles.noContent}>
      <Text style={Styles.noContentText}>
        {emptyMessage}
      </Text>
    </View>
  );
};

function renderItem(data, button, onPress, text, navigate, challenge, chat, handleChallenge, handleChat) {
  return data.map((data, i) => {
    let { user, actionData, async } = prepareData(data);

    return (
      <TouchableOpacity style={Styles.friendsListItem} key={user._id} onPress={() => navigate(user)}>
        <Avatar style={Styles.friendsListItemAvatar} source={user.avatar} />
        <Text style={Styles.friendsListItemName} numberOfLines={1}>
          {user.mediaId}
        </Text>
        {button
          ? <ActionButton
              title={button}
              async={async}
              style={Styles.friendsListItemBtn}
              onPress={() => onPress(actionData)}
              style={Styles.outlineButton}
              textStyle={Styles.outlineButtonText}
            />
          : <Text style={Styles.pendingText}>
              {text}
            </Text>}
        {chat
          ? <TouchableOpacity activeOpacity={0.8} onPress={() => handleChat(data)}>
              <Image source={chatShapeBubble} resizeMode="contain" />
            </TouchableOpacity>
          : null}
        {challenge
          ? <PostChallengeButton imgStyle={Styles.postChallengeButton} onPress={() => handleChallenge(data)} />
          : null}
      </TouchableOpacity>
    );
  });
}

function prepareData(data) {
  let actionData, async, user;

  if (data.friend) {
    user = { ...data.friend };
    actionData = data._id;
    async = true;
  } else if (data.user) {
    user = { ...data.user };
    actionData = data._id;
    async = true;
  } else {
    user = { ...data };
    actionData = { ...data };
    async = false;
  }

  user.avatar = user.profileImage ? { uri: user.profileImage } : null;

  return { user, actionData, async };
}

export default ProfileMyFriendListing;
