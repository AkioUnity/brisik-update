import React, { Component } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Navigation } from 'react-native-navigation';

import ActionButton from '../../components/ActionButton/ActionButton';
import Colors from '../../styles/Colors';
import { SingleNavStyle, NavigationEventsHandler } from '../../utils/Navigator';
import { connect } from 'react-redux';
import * as UserActions from '../../actions/User/User.actions';
import { ScreenNames } from '../';

import Styles from './RestorePassword.styles';

class RestorePassword extends Component {
  static navigatorStyle = SingleNavStyle;

  constructor(props) {
    super(props);

    this.state = {
      form: {
        newPassword: {
          key: 'newPassword',
          value: '',
          regex: /^[a-zA-Z0-9!@#\$%&]+$/
        },
        confirmPassword: {
          key: 'confirmPassword',
          value: '',
          regex: /^[a-zA-Z0-9!@#\$%&]+$/
        }
      }
    };

    this.inputs = {};

    const navigatorEventsHandler = event =>
      NavigationEventsHandler({
        screen: this.constructor.id,
        navigator: props.navigator,
        event
      });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._submit = this._submit.bind(this);
  }

  render() {
    const { form } = this.state;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={Styles.container}>
          <View style={Styles.topShadow} />
          <KeyboardAwareScrollView
            getTextInputRefs={() => Object.values(this.inputs)}
            keyboardShouldPersistTaps="always"
          >
            <View style={Styles.containerContainer}>
              <Text style={Styles.formInputLabel}>New Password</Text>
              <TextInput
                ref={input => (this.inputs.newPassword = input)}
                style={Styles.formInput}
                autoCorrect={false}
                returnKeyType="next"
                clearButtonMode="while-editing"
                keyboardAppearance="dark"
                autoCapitalize="none"
                secureTextEntry={true}
                onSubmitEditing={() => this.inputs.confirmPassword.focus()}
                value={form.newPassword.value}
                onChangeText={e => this._updateValue('newPassword', e)}
                selectionColor={Colors.durazno}
                underlineColorAndroid="transparent"
              />
              <View style={Styles.formSeparator} />
              <Text style={Styles.formInputLabel}>Confirm Password</Text>
              <TextInput
                ref={input => (this.inputs.confirmPassword = input)}
                style={Styles.formInput}
                autoCorrect={false}
                returnKeyType="send"
                clearButtonMode="while-editing"
                keyboardAppearance="dark"
                secureTextEntry={true}
                autoCapitalize="none"
                value={form.confirmPassword.value}
                onChangeText={e => this._updateValue('confirmPassword', e)}
                selectionColor={Colors.durazno}
                underlineColorAndroid="transparent"
                onSubmitEditing={this._submit}
              />
              <View style={Styles.formSubmitContainer}>
                <ActionButton title="Confirm" onPress={this._submit} loading={this.props.loadingPassword} />
              </View>
              <View style={Styles.cancelButton}>
                <ActionButton
                  title="Cancel"
                  type={'dark'}
                  onPress={() => {
                    Navigation.startSingleScreenApp({
                      screen: {
                        screen: ScreenNames.Dashboard.id,
                        title: ScreenNames.Dashboard.title,
                        navigatorButtons: {
                          leftButtons: [
                            {
                              id: 'sideMenu'
                            }
                          ]
                        }
                      },
                      portraitOnlyMode: true,
                      drawer: {
                        left: {
                          screen: ScreenNames.UserMenu.id
                        },
                        disableOpenGesture: true
                      }
                    });
                  }}
                />
              </View>
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

  _submit() {
    const { form } = this.state;
    let errorMessage = '';
    if (/^[a-zA-Z0-9!@#\$%&]+$/.test(form.confirmPassword.value)) {
      if (form.confirmPassword.value === form.newPassword.value) {
        this.props.setNewPassword({
          password: form.confirmPassword.value,
          token: this.props.token
        });
        return;
      } else {
        errorMessage = 'Passwords must match.';
      }
    } else {
      errorMessage = 'Please fill the fields.';
    }
    this.props.navigator.showLightBox({
      screen: ScreenNames.GeofenceRestriction.id,
      title: '',
      style: {
       backgroundBlur: 'dark',
       backgroundColor: 'rgba(50, 50, 50, 0.2)'
      },
      passProps: {
        title: 'Error',
        message: errorMessage,
        handleClose: () => this.props.navigator.dismissLightBox()
      }
    });
  }
}

RestorePassword.id = 'com.eSportsGlobalGamers.RestorePassword';
RestorePassword.title = 'Restore Password';

const mapStateToProps = ({ user }) => {
  return {
    loadingPassword: user.loadingPassword
  };
};

const mapDispatchToProps = dispatch => ({
  setNewPassword: data => dispatch(UserActions.setNewPassword(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(RestorePassword);
