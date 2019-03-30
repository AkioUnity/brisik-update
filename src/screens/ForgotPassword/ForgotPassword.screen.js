import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import ActionButton from '../../components/ActionButton/ActionButton';
import Colors from '../../styles/Colors';
import { SingleNavStyle, NavigationEventsHandler } from '../../utils/Navigator';
import * as UserActions from '../../actions/User/User.actions';
import { logoDark, mailShape } from '../../utils/Images';
import { ScreenNames } from '../../screens';

import Styles from './ForgotPassword.styles';

class ForgotPassword extends Component {
  static navigatorStyle = SingleNavStyle;

  constructor(props) {
    super(props);

    this.state = {
      form: {
        email: {
          key: 'email',
          value: '',
          regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        }
      }
    };

    const navigatorEventsHandler = (event) => NavigationEventsHandler({
      screen: this.constructor.id,
      navigator: props.navigator, event
    });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._submit = this._submit.bind(this);
  }

  render() {
    const { form } = this.state;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={Styles.container}>
          <KeyboardAwareScrollView
            getTextInputRefs={() => [this.input]}
            keyboardShouldPersistTaps="always"
          >
            <View style={Styles.contentContainer}>
              <Text style={Styles.title}>
                {'We will send you an email with\ninstructions to reset your password.'}
              </Text>
              <View style={Styles.inputContainer}>
                <Image source={mailShape} style={Styles.inputShape} />
                <TextInput
                  style={Styles.textInput}
                  value={form.email.value}
                  onChangeText={e => this._updateValue('email', e)}
                  onSubmitEditing={() => this._submit()}
                  autoCorrect={false}
                  returnKeyType="send"
                  clearButtonMode="while-editing"
                  keyboardAppearance="dark"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  selectionColor={Colors.durazno}
                  underlineColorAndroid="transparent"
                  placeholder="Email"
                  placeholderTextColor={Colors.paysandu}
                  ref={input => this.input = input}
                />
              </View>
              <View style={Styles.buttonContainer}>
                <ActionButton
                  title="next"
                  loading={this.props.loadingPassword}
                  onPress={this._submit}
                  style={Styles.button} />
              </View>
              <Image source={logoDark} style={Styles.logo} />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _isFormValid() {
    const { form } = this.state;

    for (let key in form) {
      if (form.hasOwnProperty(key)) {
        const input = form[key];
        if (!input.regex.test(input.value.trim())) {
          return false;
        }
      }
    }

    return true;
  }

  _updateValue(inputName, inputValue) {
    let { form } = this.state;

    form[inputName].value = inputValue;

    this.setState({ form });
  }

  _submit() {
    let { form } = this.state;

    if (this._isFormValid()) {
      let formKeys = {};

      for (let key in form) {
        if (form.hasOwnProperty(key)) {
          if (form[key].hasOwnProperty('key')) {
            formKeys[key] = form[key].value.trim();
          }
        }
      }
      this.props.forgotPassword(formKeys, this._handleResult);
    } else {
      this.props.navigator.showLightBox({
        screen: ScreenNames.GeofenceRestriction.id,
        title: '',
        style: {
         backgroundBlur: 'dark',
         backgroundColor: 'rgba(50, 50, 50, 0.2)'
        },
        passProps: {
          title: 'Error',
          message: 'Please check your email address',
          handleClose: () => this.props.navigator.dismissLightBox()
        }
      });
    }
  }

  _handleResult = ({ status, message }) => {
    let title, popupMessage;

    if (status === 'error') {
      title = 'Error';
      popupMessage = message;
    } else if (status === 'success') {
      title = 'Success!';
      popupMessage = 'We sent an email with the instructions to reset your password.';
    }

    this.props.navigator.showLightBox({
      screen: ScreenNames.GeofenceRestriction.id,
      title: '',
      style: {
        backgroundBlur: 'dark',
        backgroundColor: 'rgba(50, 50, 50, 0.2)'
      },
      passProps: {
        title,
        message: popupMessage,
        handleClose: () => {
          this.props.unsetLoading('password');
          this.props.navigator.dismissLightBox();

          if (status === 'success') {
            this.props.navigator.popToRoot({ animated: true });
          }
        }
      }
    });
  };
}

ForgotPassword.id = 'com.eSportsGlobalGamers.ForgotPassword';
ForgotPassword.title = 'Forgot Password';

const mapStateToProps = ({ user }) => {
  return {
    loadingPassword: user.loadingPassword
  };
};

const mapDispatchToProps = dispatch => ({
  forgotPassword: (data, cb) => dispatch(UserActions.forgotPassword(data, cb)),
  unsetLoading: target => dispatch(UserActions.unsetLoading(target))
});


export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
