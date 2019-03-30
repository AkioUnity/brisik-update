import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import NavBarButton from '../CustomButtonNavBar/CustomButtonNavBar';

import Styles from './CustomNavBar.styles';

class CustomNavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { leftButtons, rightButtons, title } = this.props;

    return (
      <View style={Styles.container}>
        <View style={Styles.leftButtonWrapper}>
          {leftButtons.map(this._renderButton)}
        </View>
        <Text style={Styles.navBarTitle}>
          {title}
        </Text>
        <View style={Styles.rightButtonWrapper}>
          {rightButtons.map(this._renderButton)}
        </View>
      </View>
    );
  }

  _renderButton = ({ id, btnText, action }, index) => {
    const key = `navBarBtn_${index}_${btnText}`;

    return (
      <View key={key}>
        <NavBarButton
          id={id}
          btnText={btnText}
          action={action}
          navigator={this.props.navigator}
        />
      </View>
    );
  };
}

CustomNavBar.propTypes = {
  leftButtons: PropTypes.array.isRequired,
  rightButtons: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};
CustomNavBar.defaultProps = {
  leftButtons: {},
  rightButtons: {},
  title: ''
};

CustomNavBar.id = 'com.eSportsGlobalGamers.CustomNavBar';
CustomNavBar.title = 'CustomNavBar';

export default CustomNavBar;