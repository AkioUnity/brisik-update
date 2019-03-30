import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Platform } from 'react-native';
import Colors from '../../styles/Colors';
import Styles from './Loader.styles';

const Loader = (props) => {

  return (
    <ActivityIndicator animating={true} style={Styles.loader} size={props.size || 'large'}
      color={Platform.OS !== 'ios' ? Colors.tranqueras : void 0} />
  );
};

Loader.propTypes = {
  size: PropTypes.string
};

export default Loader;
