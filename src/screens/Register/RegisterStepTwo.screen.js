import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Platform
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { connect } from 'react-redux';
import ActionSheet from 'react-native-action-sheet';
import ImagePicker from 'react-native-image-crop-picker';

import Colors from '../../styles/Colors';
import ActionButton from '../../components/ActionButton/ActionButton';
import { signup, changeProfileImage } from '../../actions/User/User.actions';
import Checkbox from '../../components/Checkbox/Checkbox';
import Loader from '../../components/Loader/Loader';
import DatePicker from '../../components/DatePicker/DatePicker.screen';
import { ModalNavStyle2, NavigationEventsHandler } from '../../utils/Navigator';
import { userShape, calendarShape, registerCamera, backButton } from '../../utils/Images';
import { ScreenNames } from '../../screens';

import Styles from './Register.styles';

class RegisterStepTwo extends Component {
  static navigatorStyle = ModalNavStyle2;

  constructor(props) {
    super(props);

    this.state = {
      form: {
        firstName: {
          key: 'firstName',
          value: '',
          regex: /^[a-zA-Z ]*$/
        },
        lastName: {
          key: 'lastName',
          value: '',
          regex: /^[a-zA-Z ]*$/
        },
        dob: {
          key: 'dob',
          value: ''
        }
      },
      loading: false,
      errors: {
        dob: {
          error: false,
          message: 'Please enter a valid date'
        },
        profileImage: {
          error: false,
          message: 'Please upload a profile image'
        }
      }
    };

    this.inputs = {};

    this._updateValue = this._updateValue.bind(this);
    this._isFormValid = this._isFormValid.bind(this);
    this._submit = this._submit.bind(this);
    this._changeProfileImage = this._changeProfileImage.bind(this);
    this._onS3Response = this._onS3Response.bind(this);
    this._handleDobChange = this._handleDobChange.bind(this);
  }
  render() {
    const { form, profileImage } = this.state;
    const { loadingProfileImage } = this.props;
    const profileMiniature = profileImage ? { uri: profileImage } : registerCamera;
    const today = new Date();

    if (this.props.loading) {
      return <Loader />;
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[Styles.container, { borderTopWidth: 0, backgroundColor: 'transparent' }]}>
          <KeyboardAwareScrollView getTextInputRefs={() => Object.values(this.inputs)}
            keyboardShouldPersistTaps="always" scrollToInputAdditionalOffset={200}>
            <View style={Styles.formContainer}>
              <View style={Styles.formSeparator} />
              <View style={Styles.uploadWrapper}>
                <Image
                  source={profileMiniature}
                  style={Styles.profilePicture} />
                {loadingProfileImage &&
                  <View style={Styles.loaderPicture}>
                    <Loader size="small" />
                  </View>}
                <ActionButton
                  title="Select a photo"
                  onPress={this._changeProfileImage}
                  style={Styles.uploadButton}
                  textStyle={Styles.uploadButtonText} />
              </View>
              <View style={Styles.formSeparator} />
              <View style={Styles.formSeparator} />
              <View style={Styles.inputWrapper}>
                <Image source={userShape} style={Styles.inputShape} />
                <TextInput
                  ref={input => (this.inputs.firstName = input)}
                  style={Styles.formInput}
                  autoCorrect={false}
                  returnKeyType="next"
                  clearButtonMode="while-editing"
                  keyboardAppearance="dark"
                  autoCapitalize="words"
                  onSubmitEditing={() => this.inputs.lastName.focus()}
                  value={form.firstName.value}
                  onChangeText={text => this._updateValue('firstName', text)}
                  selectionColor={Colors.durazno}
                  underlineColorAndroid="transparent"
                  placeholder="First name (optional)"
                  placeholderTextColor={Colors.paysandu}
                />
              </View>
              <View style={Styles.formSeparator} />
              <View style={Styles.inputWrapper}>
                <Image source={userShape} style={Styles.inputShape} />
                <TextInput
                  ref={input => (this.inputs.lastName = input)}
                  style={Styles.formInput}
                  autoCorrect={false}
                  returnKeyType="next"
                  autoCapitalize="words"
                  clearButtonMode="while-editing"
                  keyboardAppearance="dark"
                  underlineColorAndroid="transparent"
                  value={form.lastName.value}
                  onChangeText={text => this._updateValue('lastName', text)}
                  selectionColor={Colors.durazno}
                  placeholder="Last name (optional)"
                  placeholderTextColor={Colors.paysandu}
                />
              </View>
              <View style={Styles.formSeparator} />
              <View style={Styles.inputWrapper}>
                <Image source={calendarShape} style={Styles.inputMailShape} />
                <DatePicker
                  mode="date"
                  label="Date of Birth"
                  onChange={this._handleDobChange}
                  maximumDate={today} />
              </View>
              <View style={Styles.formSubmitContainer}>
                <ActionButton title="Complete" onPress={this._submit} style={Styles.button} />
              </View>
              <View style={Styles.terms}>
                <Text style={Styles.termsText}>By signing up, I agree to Brisik eSports'</Text>
                <Text style={Styles.termsLink} onPress={this._goToTermsService}>
                  Terms of Service
                </Text>
                <Text style={Styles.termsText}>and</Text>
                <Text style={Styles.termsLink} onPress={this._goToPrivacyPolicy}>
                  Privacy Policy
                </Text>
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
        <View style={Styles.step} />
        <View style={Styles.step}>
          <View style={Styles.stepActive} />
        </View>
      </View>
    );
  }

  async _changeProfileImage() {
    const image = await this._openImagePicker('profile');

    if (image) {
      this.props.changeProfileImage({
        origin: 'profile',
        image
      }, this._onS3Response);
    }
  }

  async _openImagePicker(type) {
    let image;
    let pickerOptions = {
      cropping: true
    };

    if (type === 'profile') {
      pickerOptions.width = 200;
      pickerOptions.height = 200;
    }

    const option = await this._showPickerOptions();
    if (option === 0) {
      image = await ImagePicker.openCamera(pickerOptions);
    } else if (option === 1) {
      image = await ImagePicker.openPicker(pickerOptions);
    }

    if (image && image.size > 0) {
      return image;
    } else {
      return null;
    }
  }

  _showPickerOptions() {
    const buttons = ['Take Photo', 'Open Photo Library', 'Cancel'];
    const CANCEL_INDEX = 2;

    return new Promise(resolve => {
      ActionSheet.showActionSheetWithOptions(
        {
          title: 'Pick an Image',
          options: Platform.OS === 'ios' ? buttons : buttons.slice(0, 2),
          cancelButtonIndex: CANCEL_INDEX,
          tintColor: 'blue'
        },
        resolve
      );
    });
  }

  _onS3Response(signedUrl) {
    if (signedUrl && typeof signedUrl === 'string') {
      let newState = Object.assign({}, this.state);
      newState.profileImage = signedUrl;

      this.setState(newState);
    }
  }

  _updateValue(inputName, inputValue) {
    let { form } = this.state;

    form[inputName].value = inputValue;
    this.setState({ form });
  }

  _isFormValid() {
    const { form, errors, profileImage } = this.state;

    if (!form.dob.value || form.dob.value === '') {
      return errors.dob.message;
    } else if (typeof profileImage === 'undefined') {
      return errors.profileImage.message;
    }
    return '';
  }

  _submit() {
    const { form, profileImage } = this.state;
    const { formKeys } = this.props;

    const validForm = this._isFormValid();

    if (validForm.length === 0) {
      let userForm = {};
      for (let key in form) {
        if (form.hasOwnProperty(key)) {
          if (form[key].hasOwnProperty('key')) {
            if (key === 'dob') {
              userForm[form[key].key] = {
                day: form[key].value.getDate(),
                // January must be 1
                month: form[key].value.getMonth() + 1,
                year: form[key].value.getFullYear()
              };
            } else {
              userForm[form[key].key] = form[key].value;
            }
          }
        }
      }

      for (let k in formKeys) {
        if (formKeys.hasOwnProperty(k)) {
          userForm[k] = formKeys[k];
        }
      }

      userForm['profileImage'] = profileImage;
      this.props.signup(userForm);
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
          message: validForm,
          handleClose: () => this.props.navigator.dismissLightBox()
        }
      });
    }
  }

  _handleDobChange(value) {
    let newState = Object.assign({}, this.state);
    newState.form.dob.value = value;

    this.setState(newState);
  }

  _goToTermsService = () => {
    this._navigate(ScreenNames.TermsConditions.id, ScreenNames.TermsConditions.title);
  }

  _goToPrivacyPolicy = () => {
    this._navigate(ScreenNames.PrivacyPolicy.id, ScreenNames.PrivacyPolicy.title);
  }

  _navigate = (id, title) => {
    this.props.navigator.push({
      screen: id,
      title: title.toUpperCase(),
      backButtonTitle: '',
      animated: true,
      navigatorButtons: {
        leftButtons: [{
          icon: backButton,
          id: '@nav/editConfirm',
          disableIconTint: true
        }],
        rightButtons: []
      }
    });
  }
}

RegisterStepTwo.id = 'com.eSportsGlobalGamers.RegisterStepTwo';
RegisterStepTwo.title = 'Create account';

const mapDispatchToProps = dispatch => ({
  signup: (data) => dispatch(signup(data)),
  changeProfileImage: (data, callback) => dispatch(changeProfileImage(data, callback))
});

const mapStateToProps = ({ user }) => ({
  loading: user.loadingSignup,
  loadingProfileImage: user.loadingProfileImage
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterStepTwo);
