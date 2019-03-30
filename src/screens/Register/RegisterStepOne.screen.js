import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { connect } from 'react-redux';

import Colors from '../../styles/Colors';
import ActionButton from '../../components/ActionButton/ActionButton';
import { signup } from '../../actions/User/User.actions';
import Checkbox from '../../components/Checkbox/Checkbox';
import Loader from '../../components/Loader/Loader';
import { ModalNavStyle2, NavigationEventsHandler } from '../../utils/Navigator';
import { userShape, lockShape, mailShape } from '../../utils/Images';
import { ScreenNames } from '../../screens';

import Styles from './Register.styles';

class RegisterStepOne extends Component {
  static navigatorStyle = ModalNavStyle2;

  constructor(props) {
    super(props);

    this.state = {
      form: {
        email: {
          key: 'email',
          value: '',
          regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        },
        password: {
          key: 'password',
          value: '',
          regex: /^[a-zA-Z0-9!@#\$%&]+$/
        },
        confirmPassword: {
          value: '',
          regex: /^[a-zA-Z0-9!@#\$%&]+$/,
          equalsTo: 'password'
        },
        publicId: {
          key: 'mediaId',
          value: '',
          regex: /^[a-zA-Z0-9]{1,15}$/
        }
      },
      loading: false,
      errors: {
        email: {
          error: false,
          message: 'Please enter a valid email address'
        },
        publicId: {
          error: false,
          message: 'Please enter a valid username\nOnly letters and numbers are allowed'
        },
        password: {
          error: false,
          message: 'Please enter a valid password'
        },
        confirmPassword: {
          error: false,
          message: 'Passwords must match'
        }
      }
    };

    this.inputs = {};

    this._updateValue = this._updateValue.bind(this);
    this._isFormValid = this._isFormValid.bind(this);
    this._submit = this._submit.bind(this);
  }
  render() {
    const { form } = this.state;

    if (this.props.loading) {
      return <Loader />;
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[Styles.container, { borderTopWidth: 0, backgroundColor: 'transparent' }]}>
          <KeyboardAwareScrollView getTextInputRefs={() => Object.values(this.inputs)}
            keyboardShouldPersistTaps="always" scrollToInputAdditionalOffset={200}>
            <View style={Styles.formContainer}>
              <View style={Styles.formGroupTitle}>
                <Text style={Styles.formGroupTitleText}>
                  Welcome to Brisik!
                </Text>
                <Text style={Styles.formGroupSubTitleText}>
                  Create an account to start playing.
                </Text>
              </View>
              <View style={Styles.formSeparator} />
              <View style={Styles.inputWrapper}>
                <Image source={mailShape} style={Styles.inputMailShape} />
                <TextInput
                  ref={input => (this.inputs.email = input)}
                  style={Styles.formInput}
                  autoCorrect={false}
                  returnKeyType="next"
                  clearButtonMode="while-editing"
                  keyboardAppearance="dark"
                  autoCapitalize="none"
                  onSubmitEditing={() => this.inputs.publicId.focus()}
                  value={form.email.value}
                  onChangeText={text => this._updateValue('email', text)}
                  selectionColor={Colors.durazno}
                  underlineColorAndroid="transparent"
                  keyboardType="email-address"
                  placeholder="Email"
                  placeholderTextColor={Colors.paysandu}
                />
              </View>
              <View style={Styles.formSeparator} />
              <View style={Styles.inputWrapper}>
                <Image source={userShape} style={Styles.inputShape} />
                <TextInput
                  ref={input => (this.inputs.publicId = input)}
                  style={Styles.formInput}
                  autoCorrect={false}
                  returnKeyType="next"
                  autoCapitalize="none"
                  clearButtonMode="while-editing"
                  keyboardAppearance="dark"
                  underlineColorAndroid="transparent"
                  onSubmitEditing={() => this.inputs.password.focus()}
                  value={form.publicId.value}
                  onChangeText={text => this._updateValue('publicId', text)}
                  selectionColor={Colors.durazno}
                  maxLength={15}
                  placeholder="Choose Username"
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
                  returnKeyType="next"
                  clearButtonMode="while-editing"
                  keyboardAppearance="dark"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  onSubmitEditing={() => this.inputs.confirmPassword.focus()}
                  value={form.password.value}
                  onChangeText={text => this._updateValue('password', text)}
                  selectionColor={Colors.durazno}
                  underlineColorAndroid="transparent"
                  placeholder="Choose Password"
                  placeholderTextColor={Colors.paysandu}
                />
              </View>
              <View style={Styles.formSeparator} />
              <View style={Styles.inputWrapper}>
                <Image source={lockShape} style={Styles.inputShape} />
                <TextInput
                  ref={input => (this.inputs.confirmPassword = input)}
                  style={Styles.formInput}
                  autoCorrect={false}
                  returnKeyType="next"
                  clearButtonMode="while-editing"
                  keyboardAppearance="dark"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  onSubmitEditing={this._submit}
                  value={form.confirmPassword.value}
                  onChangeText={text => this._updateValue('confirmPassword', text)}
                  selectionColor={Colors.durazno}
                  underlineColorAndroid="transparent"
                  placeholder="Confirm Password"
                  placeholderTextColor={Colors.paysandu}
                />
              </View>
              <View style={Styles.formSubmitContainer}>
                <ActionButton title="Next" onPress={this._submit} style={Styles.button} />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _renderFormSteps() {
    return (
      <View style={Styles.stepContainer}>
        <View style={Styles.step}>
          <View style={Styles.stepActive} />
        </View>
        <View style={Styles.step} />
      </View>
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
            formKeys[form[key].key] = form[key].value;
          }
        }
      }

      this.props.switchStep({
        key: 1,
        props: {
          formKeys
        }
      });
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
}

RegisterStepOne.id = 'com.eSportsGlobalGamers.RegisterStepOne';
RegisterStepOne.title = 'Create account';

const mapDispatchToProps = dispatch => ({
  signup: (data) => dispatch(signup(data)),
});

const mapStateToProps = ({ user }) => ({
  loading: user.loadingSignup
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterStepOne);
