import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';
import * as Images from '../../utils/Images';
import Colors from '../../styles/Colors';
import Styles from './Avatar.styles';

const Avatar = ({ source, style, shadow, children }) => {
  const image = source || Images.defaultAvatar;
  const _style = [style, shadow ? Styles.withShadow : null];
  const flattenedStyles = StyleSheet.flatten(_style);

  return renderJustImage(image, flattenedStyles, children);
};

function renderJustImage(source, style, children) {
  const containerStyle = [Styles.container, style];
  const imageStyle = [
    style,
    {
      borderRadius: style.width / 2
    }
  ];

  return renderImage(source, containerStyle, imageStyle, children);
}

function renderAnimatedImage(source, flattenedStyles, children) {
  const { containerStyle, imageStyle } = resolveAnimatedStyles(flattenedStyles);
  return renderImage(source, containerStyle, imageStyle, children);
}

function renderImage(source, containerStyle, imageStyle, children) {
  return (
    <View style={containerStyle}>
      <Image style={imageStyle} resizeMode="cover" source={source} resizeMethod="resize">
        {children}
      </Image>
    </View>
  );
}

function resolveAnimatedStyles(flattenedStyles) {
  const positionOffset = 15;

  const containerStyle = [
    Styles.contentContainer,
    {
      height: flattenedStyles.height - positionOffset,
      width: flattenedStyles.width - positionOffset,
      left: positionOffset / 2,
      top: positionOffset / 2
    }
  ];

  const imageStyle = {
    height: flattenedStyles.height - positionOffset,
    width: flattenedStyles.width - positionOffset,
    borderRadius: (flattenedStyles.width - positionOffset) / 2
  };

  return { containerStyle, imageStyle };
}

Avatar.propTypes = {
  shadow: PropTypes.bool,
  fill: PropTypes.number
};

export default Avatar;
