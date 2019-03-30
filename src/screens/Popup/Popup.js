import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import * as Images from '../../utils/Images';
import { capitalize } from '../../utils/Utils';
import ActionButton from '../../components/ActionButton/ActionButton';
import Colors from '../../styles/Colors';

import Styles from './Popup.styles';

class Popup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: ''
    };
  }

  render() {
    const { buttonSet, title, message, customContent } = this.props;

    return (
      <View style={Styles.container}>
        <View style={Styles.verticalDivider} />
        <View style={Styles.contentWrapper}>
          <Text style={Styles.title}>{ title }</Text>
          <Text style={Styles.legend}>{ message }</Text>
          {customContent && <View style={Styles.content}>{ customContent() }</View>}
          { buttonSet !== 'cross' && this._handleButtons(buttonSet) }
        </View>
        <View style={Styles.verticalDivider} />
        { buttonSet === 'cross' &&
          <View>
            { this._handleButtons(buttonSet) }
          </View>}
      </View>
    );
  }

  _handleButtons(buttonSet) {
    let content = null;

    switch(buttonSet) {
      case 'cross':
        content = (
          <TouchableOpacity onPress={() => this._handleAction('close')} style={Styles.crossBtnContainer}>
            <Image source={Images.crossIconWhite} resizeMode="contain" />
          </TouchableOpacity>
        );
        break;
      case 'vertical':
        content = (
          <View style={Styles.btnContainer}>
            {this.props.buttons.map((btn, i) => {
              const { label, onPress, type } = btn;

              return (
                <ActionButton
                  key={i}
                  title={label}
                  onPress={() => this._handleAction(typeof onPress, onPress)}
                  type={type || null}
                  style={Styles.fullButton}
                />
              );
            })}
          </View>
        );
        break;
      case 'inline':
        content = (
          <View style={[Styles.btnContainer, Styles.btnContainerInline]}>
            {this.props.buttons.map((btn, i) => {
              const { label, onPress, type } = btn;
              const isLastItem = i === (this.props.buttons.length - 1);

              return (
                <ActionButton
                  key={i}
                  title={label}
                  onPress={() => this._handleAction(typeof onPress, onPress)}
                  type={type || null}
                  style={[Styles.button, isLastItem ? Styles.lastButton : null]}
                />
              );
            })}
          </View>
        );
        break;
      case 'gamertag':
        content = (
          <View>
            <View style={Styles.inputContainer}>
              <TextInput
                value={this.state.inputValue}
                onChangeText={this._handleInputChange}
                onSubmitEditting={() => this._handleAction('function', this._handleSubmit)}
                style={Styles.input}
                placeholder={`Enter ${capitalize(this.props.inputAddon)} gamertag`}
                autoCorrect={false}
                returnKeyType="send"
                keyboardAppearance="dark"
                autoCapitalize="none"
                selectionColor={Colors.durazno}
                underlineColorAndroid="transparent"
                placeholderTextColor={Colors.paysandu}
                maxLength={15}
              />
              {this.props.inputAddon &&
                <Image
                  source={Images[`addon${capitalize(this.props.inputAddon)}`]}
                  resizeMode="contain"
                  style={Styles.inputAddon}
                />}
            </View>
            <View style={[Styles.btnContainer, Styles.btnContainerInline]}>
              {this.props.buttons.map((btn, i) => {
                const { label, onPress, type } = btn;
                const isLastItem = i === (this.props.buttons.length - 1);

                return (
                  <ActionButton
                    key={i}
                    title={label}
                    onPress={() => this._handleAction(typeof onPress, onPress)}
                    type={type || null}
                    style={[Styles.button, isLastItem ? Styles.lastButton : null]}
                  />
                );
              })}
            </View>
          </View>
        );
        break;
      default:
        content = (
          <View style={Styles.btnContainer}>
            <ActionButton
              title="okay"
              onPress={() => this._handleAction('close')}
              style={Styles.fullButton}
            />
          </View>
        );
    }

    return content;
  }

  _handleAction(actionName, action = null) {
    const { handleClose } = this.props;

    switch(actionName) {
      case 'close':
        if (typeof handleClose === 'function') {
          return this.props.handleClose();
        }
        break;
      case 'function':
        if (action !== null) {
          return action();
        }
      default:
        this._handleSubmit();
        break;
    }
  }

  _handleInputChange = char => {
    this.setState({ inputValue: char });
  }

  _handleSubmit = () => {
    if (typeof this.props.handleSubmit === 'function') {
      return this.props.handleSubmit(this.state.inputValue);
    }
  }
}

Popup.id = 'com.eSportsGlobalGamers.Popup';
Popup.title = 'Popup';

Popup.propTypes = {
  handleClose: PropTypes.func,
  buttonSet: PropTypes.string,
  title: PropTypes.string.isRequired,
  message: PropTypes.string
};

export default Popup;
