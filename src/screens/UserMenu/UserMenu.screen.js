import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { ScreenNames } from '../';
import Register from '../Register/RegisterStepOne.screen';
import { logout } from '../../actions/User/User.actions';
import { SingleNavStyle, NavigationEventsHandler } from '../../utils/Navigator';
import Avatar from '../../components/Avatar/Avatar';
import ActionButton from '../../components/ActionButton/ActionButton';
import Styles from './UserMenu.styles';

class UserMenu extends Component {
  static navigatorStyle = SingleNavStyle;

  constructor(props) {
    super(props);

    this._links = this._links.bind(this);
    this._modal = this._modal.bind(this);
    this._navigate = this._navigate.bind(this);
    this._renderAvatar = this._renderAvatar.bind(this);
    this._editProfile = this._editProfile.bind(this);
  }

  render() {
    return (
      <View style={Styles.container}>
        <ScrollView contentContainerStyle={Styles.contentContainer} bounces={false}>
          {this.props.user ? this._renderAvatar() : this._renderUserBox(this.props.user)}
          {this._links(this.props.user)}
        </ScrollView>
      </View>
    );
  }

  _renderAvatar() {
    const avatar = this.props.user.profileImage ? { uri: this.props.user.profileImage } : null;
    return (
      <TouchableOpacity onPress={this._editProfile} style={Styles.avatarContainer}>
        <Avatar style={Styles.userAvatar} source={avatar} />
      </TouchableOpacity>
    );
  }

  _renderUserBox() {
    return (
      <View style={Styles.containerSectionWithoutUser}>
        <Avatar />
        <View style={Styles.containerActionButtons}>
          <ActionButton title="Log In" onPress={() => this._modal(ScreenNames.SignIn)} type="dark"
            style={[Styles.actionButton, Styles.firstActionButton]} />
          <ActionButton title="Sign Up" onPress={() => this._modal(ScreenNames.SignIn, { tab: Register.id })}
            style={Styles.actionButton}/>
        </View>
      </View>
    );
  }

  _links(user) {
    const commonLinks = [
      {
        label: 'FAQ',
        action: () => {
          this._navigate({
            screen: ScreenNames.Faq.id,
            title: ScreenNames.Faq.title,
            backButtonTitle: '',
            animated: true
          });
        }
      },
      {
        label: 'Tutorials',
        action: () => {
          this._navigate({
            screen: ScreenNames.Tutorials.id,
            title: ScreenNames.Tutorials.title,
            backButtonTitle: '',
            animated: true
          });
        }
      },
      {
        label: 'Terms and Conditions',
        action: () => {
          this._navigate({
            screen: ScreenNames.TermsConditions.id,
            title: ScreenNames.TermsConditions.title,
            backButtonTitle: '',
            animated: true
          });
        }
      },
      {
        label: 'Privacy Policy',
        action: () => {
          this._navigate({
            screen: ScreenNames.PrivacyPolicy.id,
            title: ScreenNames.PrivacyPolicy.title,
            backButtonTitle: '',
            animated: true
          });
        }
      }
    ];

    const userLinks = [
      {
        label: 'My Profile',
        action: () =>
          this._navigate({
            screen: ScreenNames.Profile.id,
            title: ScreenNames.Profile.title,
            backButtonTitle: ''
          })
      },
      {
        label: 'Friends',
        action: () =>
          this._navigate({
            screen: ScreenNames.Profile.id,
            title: ScreenNames.Profile.title,
            backButtonTitle: '',
            passProps: {
              tab: 'com.eSportsGlobalGamers.ProfileFriends'
            }
          })
      },
      { type: 'line' },
      {
        label: 'Coin History',
        action: () => this._navigate({
          screen: ScreenNames.Purchase.id,
          title: ScreenNames.Purchase.title,
          backButtonTitle: '',
        })
      },
      {
        label: 'Add Funds',
        type: 'coins',
        action: () =>
          this._navigate({
            screen: ScreenNames.AddFunds.id,
            title: ScreenNames.AddFunds.title,
            backButtonTitle: '',
            passProps: {
              tab: 'tab-friends',
              stack: false
            }
          })
      },
      { type: 'line' }
    ];

    const links = user ? [
      ...userLinks,
      ...commonLinks,
      { type: 'line' },
      {
        label: 'Logout',
        action: this.props.logout
      }
    ] : commonLinks;

    const items = links.map(({ label, action, type }, i) => {
      if (type === 'line') {
        return <View style={Styles.divider} key={i} />;
      }

      return (
        <TouchableOpacity style={Styles.containerSectionLink} onPress={action} key={i}>
          <Text style={Styles.containerSectionLinkText}>{label}</Text>
        </TouchableOpacity>
      );
    });

    return (
      <View style={Styles.links}>
        {items}
      </View>
    );
  }

  _navigate(data) {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true
    });

    this.props.navigator.handleDeepLink({
      link: `drawer://${data.screen}`,
      payload: JSON.stringify(data)
    });
  }

  _modal(screen, props = {}) {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true
    });

    this.props.navigator.showModal({
      screen: screen.id,
      title: screen.title.toUpperCase(),
      passProps: {
        ...props,
        reset: true
      }
    });
  }

  _editProfile() {
    this._navigate({
      screen: ScreenNames.Profile.id,
      title: ScreenNames.Profile.title,
      backButtonTitle: '',
      animated: true
    });
  }
}

UserMenu.title = 'User Menu';
UserMenu.id = 'com.eSportsGlobalGamers.UserMenu';

const mapStateToProps = ({ user }) => ({
  user: user.userData
});

const mapDispatchToProps = dispatch => ({
  logout: (data, callback) => dispatch(logout(data, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
