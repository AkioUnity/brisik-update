import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, DatePickerIOS } from 'react-native';

import Styles from '../Modals.styles';
import DateStyles from './DateModal.styles';

class DateModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null
    };

    this._onDateChange = this._onDateChange.bind(this);
    this._submit = this._submit.bind(this);
  }

  componentDidMount() {
    this.setState({
      date: this.props.value || new Date()
    });
  }

  render() {
    const { date } = this.state;

    return (
      <View style={[Styles.container, Styles.contentCentered]}>
        <TouchableOpacity onPress={this.props.onPressOutside} style={Styles.container} />
        <View style={Styles.contentContainer}>
          <DatePickerIOS
            style={DateStyles.selector}
            date={date || new Date()}
            minimumDate={this.props.min}
            mode={this.props.mode}
            minuteInterval={5}
            onDateChange={this._onDateChange}
          />
          <View style={Styles.actionsContainer}>
            <TouchableOpacity
              style={Styles.actionsContainerButton}
              onPress={this.props.onPressOutside}
            >
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

  _onDateChange(date) {
    this.setState({
      date
    });
  }

  _submit() {
    this.props.onValueChange(this.state.date);
    this.props.onPressOutside();
  }
}

DateModal.propTypes = {
  mode: PropTypes.string.isRequired,
  min: PropTypes.date,
  value: PropTypes.date
};

export default DateModal;
