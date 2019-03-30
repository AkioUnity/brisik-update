import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { connect } from 'react-redux';

import Colors from '../../styles/Colors';
import ActionButton from '../../components/ActionButton/ActionButton';
import Loader from '../../components/Loader/Loader';
import { login } from '../../actions/User/User.actions';
import { ScreenNames } from '../';
import { ModalNavStyle2, NavigationEventsHandler } from '../../utils/Navigator';
import { logoDark, userShape, lockShape, backButton } from '../../utils/Images';
import { appLoggedIn } from '../../app';

import Styles from './Login.styles';

class Login extends Component {
  static navigatorStyle = ModalNavStyle2;

  constructor(props) {
    super(props);

    this.state = {
      form: {
        email: {
          key: 'email',
          value: '',
          regex: /^[a-zA-Z0-9]{1,15}$/
        },
        password: {
          key: 'password',
          value: '',
          regex: /^[a-zA-Z0-9!@#\$%&]+$/
        }
      },
      errors: {
        email: {
          error: false,
          message: 'Please enter a valid username\nOnly letters and numbers are allowed'
        },
        password: {
          error: false,
          message: 'Please enter a valid password'
        }
      },
      loading: false
    };

    this.inputs = {};

    const navigatorEventsHandler = (event) => NavigationEventsHandler({
      screen: this.constructor.id,
      navigator: props.navigator, event
    });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._updateValue = this._updateValue.bind(this);
    this._isFormValid = this._isFormValid.bind(this);
    this._submit = this._submit.bind(this);
    this._onResponse = this._onResponse.bind(this);
  }

  render() {
    const { form, loading } = this.state;

    if (loading) {
      return <Loader />;
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={Styles.container}>
          <KeyboardAwareScrollView
            getTextInputRefs={() => Object.values(this.inputs)}
            keyboardShouldPersistTaps="always"
          >
            <View style={Styles.containerContainer}>
              <View style={Styles.inputWrapper}>
                <Image source={userShape} style={Styles.inputShape} />
                <TextInput
                  ref={input => (this.inputs.email = input)}
                  style={Styles.formInput}
                  autoCorrect={false}
                  returnKeyType="next"
                  clearButtonMode="while-editing"
                  keyboardAppearance="dark"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onSubmitEditing={() => this.inputs.password.focus()}
                  value={form.email.value}
                  onChangeText={e => this._updateValue('email', e)}
                  selectionColor={Colors.durazno}
                  underlineColorAndroid="transparent"
                  placeholder="Username"
                  placeholderTextColor={Colors.paysandu}
                />
              </View>
              <View style={Styles.formSeparator} />
              <View style={Styles.inputWrapper}>
                <Image source={lockShape} style={Styles.inputShape} />
                <TextInput
                  ref={input => (this.inputs.password = input)}
                  style={Styles.formInput}
                  autoCorrect={false}
                  returnKeyType="send"
                  clearButtonMode="while-editing"
                  keyboardAppearance="dark"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  value={form.password.value}
                  onChangeText={e => this._updateValue('password', e)}
                  selectionColor={Colors.durazno}
                  underlineColorAndroid="transparent"
                  onSubmitEditing={this._submit}
                  placeholder="Password"
                  placeholderTextColor={Colors.paysandu}
                />
              </View>
              <View style={Styles.formSubmitContainer}>
                <ActionButton title="Login" onPress={this._submit} style={Styles.button} />
              </View>
              <TouchableOpacity 
                onPress={() => 
                  this.props.navigator.push({
                    screen: ScreenNames.ForgotPassword.id,
                    title: ScreenNames.ForgotPassword.title.toUpperCase(),
                    backButtonTitle: '',
                    navigatorButtons: {
                      leftButtons: [{
                        icon: backButton,
                        disableIconTint: true,
                        id: '@nav/editConfirm'
                      }],
                      rightButtons: []
                    }
                  })
                }>
                <Text style={Styles.formLegendText}>Forgot your password?</Text>
              </TouchableOpacity>
              <Image source={logoDark} style={Styles.logo} />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _updateValue(inputName, inputValue) {
    let { form } = this.state;

    form[inputName].value = inputValue;
    this.setState({ form });
  }

  _isFormValid() {
    const { form } = this.state;
    let { errors } = this.state;

    for (let key in form) {
      if (form.hasOwnProperty(key)) {
        const input = form[key];
        if (typeof input === 'object') {
          if (!input.regex.test(input.value)) {
            return errors[key].message;
          } else if (input.hasOwnProperty('equalsTo')) {
            if (input.value !== form[input.equalsTo].value) {
              return errors[key].message;
            }
          }
        }
      }
    }
    return '';
  }

  _submit() {
    const { form } = this.state;
    const validInput = this._isFormValid();

    if (validInput.length === 0) {
      let formKeys = {};
      for (let key in form) {
        if (form.hasOwnProperty(key)) {
          if (form[key].hasOwnProperty('key')) {
            formKeys[key] = form[key].value.trim();
          }
        }
      }

      this.setState({
        loading: true
      });

      this.props.login(formKeys, this._onResponse);
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
          message: validInput,
          handleClose: () => this.props.navigator.dismissLightBox()
        }
      });
    }
  }

  _onResponse(error) {
    this.setState({
      loading: false
    });

    if (error) {
      return this.props.navigator.showLightBox({
        screen: ScreenNames.GeofenceRestriction.id,
        title: '',
        style: {
         backgroundBlur: 'dark',
         backgroundColor: 'rgba(50, 50, 50, 0.2)'
        },
        passProps: {
          title: 'Error',
          message: 'Something went wrong, please, check your login credentials.',
          handleClose: () => this.props.navigator.dismissLightBox()
        }
      });
    }
  }
}

Login.title = 'Login';
Login.id = 'com.eSportsGlobalGamers.Login';

const mapDispatchToProps = dispatch => ({
  login: (data, callback) => dispatch(login(data, callback))
});

export default connect(null, mapDispatchToProps)(Login);
