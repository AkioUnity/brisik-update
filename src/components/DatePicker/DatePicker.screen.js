import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  DatePickerIOS,
  DatePickerAndroid,
  TimePickerAndroid,
  Platform
} from 'react-native';
import moment from 'moment';

import Colors from '../../styles/Colors';

import Styles from './DatePicker.styles';

class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: null,
      showPicker: false
    };

    this._togglePicker = this._togglePicker.bind(this);
    this._setPickerValue = this._setPickerValue.bind(this);
    this._renderAndroidPicker = this._renderAndroidPicker.bind(this);
  }

  componentDidMount() {
    const { value } = this.props;
    if (value) {
      this.setState({
        selectedValue: value
      });
    }
  }

  render() {
    const { selectedValue, showPicker } = this.state;
    const { mode } = this.props;

    if (Platform.OS === 'android') {
      this._renderAndroidPicker();
    }

    const hasSelectedValue = typeof selectedValue !== 'undefined' && selectedValue !== null;

    return (
      <View style={Styles.formPickerContainer}>
        {!hasSelectedValue &&
          <View>
            <Text style={Styles.formPickerLabel}>{this.props.label}</Text>
          </View>}
        <TouchableOpacity
          onPress={this._togglePicker}
          activeOpacity={0.8}
          style={Styles.formPickerFieldContainer}
        >
          <Text style={Styles.formPickerField}>
            {selectedValue && moment(selectedValue).format(mode === 'date' ? 'l' : 'LT')}
          </Text>
        </TouchableOpacity>
        <Modal animationType="slide" visible={showPicker} transparent={true} onRequestClose={this._togglePicker}>
          <View style={Styles.modalContentContainer}>
            <TouchableHighlight
              style={Styles.modalContent}
              activeOpacity={1}
              underlayColor="rgba(28, 28, 29, 0.5)"
              onPress={this._togglePicker}
            >
              <TouchableHighlight underlayColor={Colors.colonia} style={Styles.modalContentContainer}>
                <View style={Styles.pickerContainer}>
                  <DatePickerIOS
                    date={selectedValue || new Date()}
                    mode={this.props.mode}
                    maximumDate={this.props.maximumDate || null}
                    minimumDate={this.props.minimumDate || null}
                    onDateChange={this._setPickerValue}
                    style={Styles.picker}
                  />
                  <TouchableHighlight
                    underlayColor="rgba(0, 0, 0, 0)"
                    onPress={this._togglePicker}
                    style={[Styles.pickerBtn, Styles.cancelBtnContainer]}
                  >
                    <Text style={Styles.cancelBtnText}>
                      Cancel
                    </Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor="rgba(0, 0, 0, 0)"
                    onPress={() => this._togglePicker('confirm')}
                    style={[Styles.pickerBtn, Styles.confirmBtnContainer]}
                  >
                    <Text style={Styles.confirmBtnText}>
                      Confirm
                    </Text>
                  </TouchableHighlight>
                </View>
              </TouchableHighlight>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }

  _renderAndroidPicker() {
    const { selectedValue, showPicker } = this.state;
    const { mode } = this.props;

    const hasSelectedValue = typeof selectedValue !== 'undefined' && selectedValue !== null;

    return (
      <View style={Styles.formPickerContainer}>
        {!hasSelectedValue &&
          <View>
            <Text style={Styles.formPickerLabel}>{this.props.label}</Text>
          </View>}
        <TouchableOpacity onPress={this._togglePicker} activeOpacity={0.8}>
          <View style={Styles.formPickerFieldContainer}>
            <TextInput
              style={Styles.formPickerField}
              editable={false}
              value={selectedValue && moment(selectedValue).format(mode === 'date' ? 'l' : 'LT')}
              underlineColorAndroid="rgba(0,0,0,0)"
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  async _togglePicker(origin) {
    const { onChange, mode, value } = this.props;

    if (Platform.OS === 'android') {
      if (mode === 'date') {
        const { action, year, month, day } = await DatePickerAndroid.open({
          data: value || new Date(),
          maxDate: this.props.maximumDate && this.props.maximumDate,
          minDate: this.props.minimumDate && this.props.minimumDate,
          mode: 'calendar'
        });

        if (action === DatePickerAndroid.dateSetAction) {
          const date = new Date(year, month, day);
          this.setState({
            selectedValue: date,
            showPicker: false
          });
          onChange(date);
        } else {
          this.setState({
            showPicker: false
          });
        }
      } else if (mode === 'time') {
        const { action, hour, minute } = await TimePickerAndroid.open({
          hour: value ? parseInt(moment(value).format('HH')) : parseInt(moment().format('HH')),
          minute: value ? parseInt(moment(value).format('mm')) : parseInt(moment().format('mm')),
          is24Hour: false
        });

        if (action === TimePickerAndroid.timeSetAction) {
          const time = moment(
            `${moment().format('YYYY-MM-DD')}T${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:00`,
            moment.ISO_8601
          );
          this.setState({
            selectedValue: time,
            showPicker: false
          });
          onChange(time);
        } else {
          this.setState({
            showPicker: false
          });
        }
      }
    } else {
      let newState = {
        showPicker: !this.state.showPicker
      };

      if (origin === 'confirm' && !this.state.selectedValue) {
        newState.selectedValue = new Date();
        onChange(newState.selectedValue);
      }

      setTimeout(() => this.setState(newState), 0);
    }
  }

  _setPickerValue(value) {
    const { onChange } = this.props;

    onChange(value);

    setTimeout(() => this.setState({ selectedValue: value }), 0);
  }
}

export default DatePicker;
