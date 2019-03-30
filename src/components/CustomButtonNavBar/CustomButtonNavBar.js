import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { NavigationEventsHandler } from '../../utils/Navigator';

import Styles from './CustomButtonNavBar.styles';

class CustomButtonNavBar extends React.Component {
  constructor(props) {
    super(props);

    this._handleAction = this._handleAction.bind(this);
  }

  render() {
    return (
      <TouchableOpacity onPress={this._handleAction} style={{ width: 50, height: 50 }}>
        <Text style={[Styles.btnText, { lineHeight: 50 }]}>{ this.props.btnText }</Text>
      </TouchableOpacity>
    );
  }

  _handleAction() {
    switch (this.props.id) {
      case '@nav/cancel':
        return this.props.navigator.pop({ animated: true, animationType: 'fade' });
      case '@nav/editConfirm':
        if (typeof this.props.action === 'function') {
          return this.props.action();
        }
        return this.props.navigator.pop({ animated: true });
    }
  }
}

CustomButtonNavBar.id = 'com.eSportsGlobalGamers.CustomButtonNavBar';
CustomButtonNavBar.title = 'CustomButtonNavBar';

export default CustomButtonNavBar;