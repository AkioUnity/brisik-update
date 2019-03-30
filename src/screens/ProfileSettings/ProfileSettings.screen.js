import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';
import { connect } from 'react-redux';

import * as userActions from '../../actions/User/User.actions';
import { ScreenNames } from '../../screens';
import { ModalNavStyle, NavigationEventsHandler } from '../../utils/Navigator';
import { chevronRight, backButton } from '../../utils/Images';
import ActionButton from '../../components/ActionButton/ActionButton';
import Loader from '../../components/Loader/Loader';

import Styles from './ProfileSettings.styles';

class ProfileSettings extends React.Component {
  static navigatorStyle = {
    ...ModalNavStyle,
    drawUnderTabBar: true
  };
  static navigatorButtons = {
    leftButtons: [{
      icon: backButton,
      id: '@nav/editConfirm',
      disableIconTint: true
    }],
    rightButtons: []
  };

  constructor(props) {
    super(props);

    this.lists = {
      shop: [
        { title: 'Account History', target: 'Purchase' },
        { title: 'Add Funds', target: 'AddFunds' },
        { title: 'Withdraw Funds', target: 'WithdrawFunds' }
      ],
      support: [
        { title: 'FAQ', target: 'FaqMenu' },
        { title: 'Tutorials', target: 'Tutorials' },
        { title: 'Contact Us', target: 'ContactUs' },
        { title: 'Terms and Conditions', target: 'TermsConditions' },
        { title: 'Privacy Policy', target: 'PrivacyPolicy' }
      ]
    };

    this.state = {
      loading: false
    };

    const navigatorEventsHandler = event =>
      NavigationEventsHandler({
        screen: this.constructor.id,
        navigator: props.navigator,
        event
      });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._handleLogout = this._handleLogout.bind(this);
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    return (
      <View style={Styles.container}>
        <ScrollView style={Styles.listsWrapper}>
          { this._renderListing(this.lists.shop, '') }
          { this._renderListing(this.lists.support, 'support') }
        </ScrollView>
        <ActionButton title="Log out" type="dark" onPress={this._handleLogout} style={Styles.button} />
      </View>
    );
  }

  _renderListing(list = [], title = '') {
    let titleView = (<View/>);
    if(title !== ''){
      titleView=(
        <View style={Styles.sectionHeader}>
          <Text style={Styles.sectionTitle}>{ title.toUpperCase() }</Text>
        </View>
      );
    }
    return (
      <View style={Styles.listContainer}>
        {titleView}
        { list.map((item, key) => this._renderListItem({ item, key })) }
      </View>
    );
  }

  _renderListItem({ item, key }) {
    const decor = /coins/i.test(item.title) ? ( <View style={Styles.coinShape} /> ) : null;
    const itemTitle = decor !== null
      ? (
          <View style={Styles.listItemWithDecor}>
            <Text style={[Styles.listItemText, { flex: 0 }]}>{ item.title }</Text>
            { decor }
          </View>
        )
      : ( <Text style={Styles.listItemText}>{ item.title }</Text> );

    return (
      <TouchableOpacity key={key} style={Styles.listItem} onPress={() => this._navigate(item.target)}>
        { itemTitle }
        <Image source={chevronRight} resizeMode="contain" />
      </TouchableOpacity>
    );
  }

  _navigate(target) {
    if (target && typeof target === 'string') {
      if (target !== 'ContactUs') {
        this.props.navigator.push({
          screen: ScreenNames[target].id,
          title: ScreenNames[target].title.toUpperCase(),
          backButtonTitle: '',
          navigatorButtons: {
            leftButtons: [{
              icon: backButton,
              id: '@nav/editConfirm',
              disableIconTint: true
            }],
            rightButtons: []
          },
          animated: true
        });
      } else {
        Linking.openURL('mailto:team@brisik.com').catch(e => console.warn(JSON.stringify(e)));
      }
    }
  }

  _handleLogout() {
    this.props.navigator.showLightBox({
      screen: ScreenNames.GeofenceRestriction.id,
      title: '',
      style: {
       backgroundBlur: 'dark',
       backgroundColor: 'rgba(50, 50, 50, 0.2)'
      },
      passProps: {
        buttonSet: 'vertical',
        title: 'Are you sure?',
        message: 'If yes, the next time you access the app we are going to ask for your credentials to login.',
        buttons: [
          { label: 'Stay logged in', onPress: () => this.props.navigator.dismissLightBox() },
          { label: 'Logout', onPress: () => this._logout(), type: 'dark' }
        ]
      }
    });
  }

  _logout() {
    this.setState({ loading: true });
    this.props.logout();
  }
}

ProfileSettings.id = 'com.eSportsGlobalGamers.ProfileSettings';
ProfileSettings.title = 'Options';

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(userActions.logout())
  };
};

export default connect(null, mapDispatchToProps)(ProfileSettings);