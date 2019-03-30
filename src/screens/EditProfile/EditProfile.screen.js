import React from 'react';
import { View, Text, Platform, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-action-sheet';

import { ScreenNames } from '../../screens/';
import { ModalNavStyle, EditNavButtons, NavigationEventsHandler } from '../../utils/Navigator';
import * as userActions from '../../actions/User/User.actions';
import { lockShape, chevronRight, backButton } from '../../utils/Images';
import Avatar from '../../components/Avatar/Avatar';
import ActionButton from '../../components/ActionButton/ActionButton';
import Loader from '../../components/Loader/Loader';
import ProfileGamertags from '../../components/ProfileGamertags/ProfileGamertags';

import Styles from './EditProfile.styles';

class EditProfile extends React.Component {
  static navigatorStyle = {
    ...ModalNavStyle,
    drawUnderTabBar: true
  };

  constructor(props) {
    super(props);

    this.state = {};

    const navigatorEventsHandler = (event) => NavigationEventsHandler({
      screen: this.constructor.id,
      navigator: props.navigator, event
    });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._changeProfileImage = this._changeProfileImage.bind(this);
    this._goToNewPassword = this._goToNewPassword.bind(this);
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
          id: '@nav/editConfirm'
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

  render() {
    return (
      <View style={Styles.container}>
        { this._renderAvatar() }
        { this._renderInfo() }
        { this._renderGamertags() }
      </View>
    );
  }

  _renderAvatar() {
    const { userData, loadingProfileImage } = this.props;
    const avatar = userData.profileImage ? { uri: userData.profileImage } : null;
    const onPress = !loadingProfileImage ? this._changeProfileImage : {};

    return (
      <View style={Styles.avatarContainer}>
        <View style={Styles.loaderContainer}>
          <Avatar source={avatar} style={Styles.avatarImage} />
          { loadingProfileImage &&
            <View style={Styles.avatarLoaderContainer}><Loader size="small" /></View> }
        </View>
        <ActionButton title="change profile photo" onPress={onPress}
          style={Styles.button} textStyle={Styles.selectText} />
      </View>
    );
  }

  _renderInfo() {
    return (
      <View style={[Styles.wrapper, Styles.personalWrapper]}>
        <View style={Styles.sectionHeader}>
          <Text style={Styles.sectionHeaderText}>{ 'personal info'.toUpperCase() }</Text>
        </View>
        <View style={Styles.sectionBody}>
          <TouchableOpacity style={Styles.passwordRow} activeOpacity={0.8} onPress={this._goToNewPassword}>
            <View style={Styles.passwordRight}>
              <Image source={lockShape} resizeMode="contain" />
              <Text style={Styles.passwordText}>Change Password</Text>
            </View>
            <Image source={chevronRight} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _renderGamertags() {
    return (
      <View style={[Styles.wrapper, Styles.wrapperGamertags]}>
        <View style={Styles.sectionHeader}>
          <Text style={Styles.sectionHeaderText}>{ 'gamertags'.toUpperCase() }</Text>
        </View>
        <View style={Styles.sectionBody}>
          <ProfileGamertags
            public={this.props.public}
            xboxgamertag={this.props.userData.xboxgamertag}
            ps4gamertag={this.props.userData.ps4gamertag}
            twitchgamertag={this.props.userData.twitchgamertag}
            navigator={this.props.navigator}
            edit
          />
        </View>
      </View>
    );
  }

  async _changeProfileImage() {
    if (this.props.public || !this.props.userData) { return; }

    const image = await this._openImagePicker('profile');

    if (image) {
      this.props.changeProfileImage({
        origin: 'profile',
        image
      });
    }
  }

  async _openImagePicker(type) {
    let image;
    let pickerOptions = {
      cropping: true
    };

    if (type === 'cover') {
      pickerOptions.width = 300;
      pickerOptions.height = 100;
    } else if (type === 'profile') {
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

  _goToNewPassword() {
    setTimeout(() => {
      this.props.navigator.push({
        screen: ScreenNames.EditPassword.id,
        animated: true,
        backButtonHidden: true,
        passProps: {
          public: this.props.public
        }
      });
    }, 100);
  }
}

EditProfile.title = 'Edit profile';
EditProfile.id = 'com.eSportsGlobalGamers.EditProfile';

const mapStateToProfile = (state, props) => {
  let userData = null;

  if (props.public && state.user.playerProfile && state.user.playerProfile._id === props.id) {
    userData = state.user.playerProfile;
  } else if (!props.public) {
    userData = state.user.userData;
  }

  return {
    loadingProfileImage: state.user.loadingProfileImage,
    userData
  };
};

const mapDispatchToProfile = dispatch => {
  return {
    changeProfileImage: data => dispatch(userActions.changeProfileImage(data))
  };
};

export default connect(mapStateToProfile, mapDispatchToProfile)(EditProfile);