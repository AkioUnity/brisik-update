import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Keyboard, TextInput, Alert } from 'react-native';
import { connect } from 'react-redux';

import { ScreenNames } from '../../screens/';
import { ModalNavStyle, EditNavButtons, NavigationEventsHandler } from '../../utils/Navigator';
import * as userActions from '../../actions/User/User.actions';
import Colors from '../../styles/Colors';
import { lockShape } from '../../utils/Images';
import Loader from '../../components/Loader/Loader';

import Styles from './EditPassword.styles';

class EditPassword extends React.Component {
  static navigatorStyle = ModalNavStyle;

  constructor(props) {
    super(props);

    this.inputs = {};

    this.state = {
      form: {
        currentPassword: {
          value: '',
          key: 'currentPassword'
        },
        newPassword: {
          value: '',
          key: 'newPassword'
        },
        confirmPassword: {
          value: '',
          key: 'confirmPassword'
        }
      },
      regex: /^[a-zA-Z0-9!@#\$%&]+$/,
      loading: false
    };

    const navigatorEventsHandler = event => NavigationEventsHandler({
      screen: this.constructor.id,
      navigator: props.navigator,
      event
    });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._submitForm = this._submitForm.bind(this);
  }

  componentDidMount() {
    this.props.navigator.setStyle({
      ...ModalNavStyle,
      navBarCustomView: 'com.eSportsGlobalGamers.CustomNavBar',
      navBarComponentAlignment: 'fill',
      navBarCustomViewInitialProps: {
        leftButtons: [{
          btnText: 'Cancel',
          id: '@nav/cancel'
        }],
        rightButtons: [{
          btnText: 'Done',
          id: '@nav/editConfirm',
          action: () => this._submitForm()
        }],
        title: this.constructor.title.toUpperCase(),
        navigator: this.props.navigator
      }
    });
    this.props.navigator.toggleTabs({
      to: 'hidden',
      animated: true
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userData && nextProps.userData !== this.props.userData) {
      this.setState({ loading: false });
      return this.props.navigator.pop({ animated: true });
    }
  }

  render() {
    const { form, loading } = this.state;

    if (loading) {
      return (
        <View style={Styles.container}>
          <View style={Styles.formContainer}>
            <Loader />
          </View>
        </View>
      );
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={Styles.container}>
          <View style={Styles.formContainer}>
            <View style={Styles.formRow}>
              <View style={Styles.static}>
                <Image source={lockShape} resizeMode="contain" style={Styles.icon} />
                <Text style={Styles.staticText}>Current</Text>
              </View>
              <TextInput
                ref={input => (this.inputs.currentPassword = input)}
                style={Styles.formInput}
                autoCorrect={false}
                returnKeyType="next"
                clearButtonMode="never"
                keyboardAppearance="dark"
                autoCapitalize="none"
                keyboardType="default"
                onSubmitEditing={() => this.inputs.newPassword.focus()}
                value={form.currentPassword.value}
                onChangeText={e => this._updateValue('currentPassword', e)}
                selectionColor={Colors.colonia}
                underlineColorAndroid="transparent"
                placeholder="Current Password"
                placeholderTextColor={Colors.paysandu}
                secureTextEntry={true}
              />
            </View>
            <View style={Styles.formRow}>
              <View style={Styles.static}>
                <Image source={lockShape} resizeMode="contain" style={Styles.icon} />
                <Text style={Styles.staticText}>New</Text>
              </View>
              <TextInput
                ref={input => (this.inputs.newPassword = input)}
                style={Styles.formInput}
                autoCorrect={false}
                returnKeyType="next"
                clearButtonMode="never"
                keyboardAppearance="dark"
                autoCapitalize="none"
                keyboardType="default"
                onSubmitEditing={() => this.inputs.confirmPassword.focus()}
                value={form.newPassword.value}
                onChangeText={e => this._updateValue('newPassword', e)}
                selectionColor={Colors.colonia}
                underlineColorAndroid="transparent"
                placeholder="New Password"
                placeholderTextColor={Colors.paysandu}
                secureTextEntry={true}
              />
            </View>
            <View style={Styles.formRow}>
              <View style={Styles.static}>
                <Image source={lockShape} resizeMode="contain" style={Styles.icon} />
                <Text style={Styles.staticText}>Verify</Text>
              </View>
              <TextInput
                ref={input => (this.inputs.confirmPassword = input)}
                style={Styles.formInput}
                autoCorrect={false}
                returnKeyType="go"
                clearButtonMode="never"
                keyboardAppearance="dark"
                autoCapitalize="none"
                keyboardType="default"
                onSubmitEditing={this._submitForm}
                value={form.confirmPassword.value}
                onChangeText={e => this._updateValue('confirmPassword', e)}
                selectionColor={Colors.colonia}
                underlineColorAndroid="transparent"
                placeholder="New Password Again"
                placeholderTextColor={Colors.paysandu}
                secureTextEntry={true}
              />
            </View>
          </View>
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
    const { userData } = this.props;
    const { form, regex } = this.state;

    for (let key in form) {
      if (form.hasOwnProperty(key)) {
        const input = form[key];
        if (typeof input === 'object') {
          if (!input.value) {
            return 'Please fill all the fields before continue';
          } else if (!regex.test(input.value)) {
            return `Please verify your entry, you're using invalid symbols`;
          } else if (input.key === 'confirmPassword') {
            if (input.value !== form.newPassword.value) {
              return `Your new password doesn't match with the confirm password you provided`;
            }
          }
        }
      }
    }

    return '';
  }

  _submitForm() {
    const validForm = this._isFormValid();

    if (validForm === '') {
      this.setState({ loading: true });

      this.props.navigator.showLightBox({
        screen: ScreenNames.GeofenceRestriction.id,
        title: '',
        style: {
         backgroundBlur: 'dark',
         backgroundColor: 'rgba(50, 50, 50, 0.2)'
        },
        passProps: {
          title: 'Are you sure?',
          message: 'Your password will be updated, press Yes to confirm.',
          buttonSet: 'inline',
          buttons: [
            { label: 'No', type: 'dark', onPress: () => this.props.navigator.dismissLightBox() },
            {
              label: 'Yes',
              onPress: () => this.props.checkCurrentPass({
                email: this.props.userData.mediaId,
                password: this.state.form.currentPassword.value
              }, response => {
                this.props.navigator.dismissLightBox();

                if (response === 'error') {
                  this.setState({ loading: false });
                  return Alert.alert('Wrong password', 'Your current password doesn\'t match, please enter again.');
                }
                return this.props.updatePassword({ password: this.state.form.newPassword.value });
              })
            }
          ]
        }
      });
    } else {
      Alert.alert('An error has occurred', validForm);
    }
  }
}

EditPassword.title = 'Edit password';
EditPassword.id = 'com.eSportsGlobalGamers.EditPassword';

const mapStateToProfile = state => {
  return {
    userData: state.user.userData
  };
};

const mapDispatchToProfile = dispatch => {
  return {
    updatePassword: data => dispatch(userActions.updateProfile(data)),
    checkCurrentPass: (data, cb) => dispatch(userActions.login(data, cb))
  };
};

export default connect(mapStateToProfile, mapDispatchToProfile)(EditPassword);