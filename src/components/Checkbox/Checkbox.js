import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';

import Styles from './Checkbox.styles';

class Checkbox extends Component {
  constructor(props) {
    super(props);

    this._toggle = this._toggle.bind(this);
  }

  render() {
    return (
      <TouchableOpacity style={Styles.checkboxWrapper} onPress={this._toggle}>
        <View style={[Styles.checkbox, this.props.style]}>
          {this.props.selected ? <View style={Styles.checkboxSelected} /> : null}
        </View>
        <View style={Styles.checkboxLabelWrapper}>
          <Text style={Styles.checkboxLabel}>{this.props.label || ''}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _toggle() {
    this.props.onChange();
  }
}

Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default Checkbox;
