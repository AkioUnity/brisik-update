import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Picker } from 'react-native';

import Styles from '../Modals.styles';
import PickerStyles from './PickerModal.styles';

class PickerModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null
    };

    this._handleValueChange = this._handleValueChange.bind(this);
    this._submit = this._submit.bind(this);
  }

  componentDidMount() {
    this.setState({
      value: this.props.value || this.props.data[0].value
    });
  }

  render() {
    return (
      <View style={[Styles.container, Styles.contentCentered]}>
        <TouchableOpacity onPress={this.props.onPressOutside} style={Styles.container} />
        <View style={Styles.contentContainer}>
          <Picker
            style={PickerStyles.picker}
            selectedValue={this.state.value || this.props.value}
            onValueChange={this._handleValueChange}
          >
            {this.props.data.map(({ label, value }, i) => (
              <Picker.Item style={PickerStyles.pickerItem} key={i} label={label} value={value} />
            ))}
          </Picker>
          <View style={Styles.actionsContainer}>
            <TouchableOpacity style={Styles.actionsContainerButton} onPress={this.props.onPressOutside}>
              <Text style={Styles.actionsContainerButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.actionsContainerButton} onPress={this._submit}>
              <Text style={Styles.actionsContainerButtonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  _handleValueChange(value) {
    this.setState({ value });
  }

  _submit() {
    this.props.onValueChange(this.state.value);
    this.props.onPressOutside();
  }
}

export default PickerModal;
