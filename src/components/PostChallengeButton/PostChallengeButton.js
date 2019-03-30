import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

const PostChallengeButton = ({ onPress, style, imgStyle }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.8}>
      <Image style={imgStyle} source={require('../../../assets/images/post_button.png')} />
    </TouchableOpacity>
  );
};

export default PostChallengeButton;