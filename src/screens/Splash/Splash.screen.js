import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

import { ScreenNames } from '../../screens';
import { SplashStyle, NavigationEventsHandler } from '../../utils/Navigator';
import * as Images from '../../utils/Images';
import ActionButton from '../../components/ActionButton/ActionButton';

import Styles from './Splash.styles';

const alertContent = {
  title: 'Location Restriction',
  message: 'Unfortunately you\'re in a restricted\nstate and can\'t access our\nplatform. For more information\nplease contact us at\nteam@brisikesports.com'
};

class Splash extends Component {
  static navigatorStyle = SplashStyle;

  constructor(props) {
    super(props);

    this.state = {};

    const navigatorEventsHandler = (event) => NavigationEventsHandler({
      screen: this.constructor.id,
      navigator: props.navigator, event
    });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.blockedByGeoFence && this.props.blockedByGeoFence !== nextProps.blockedByGeoFence) {
      const newState = Object.assign({}, this.state);
      newState.blocked = true;

      this.setState(newState);
    }
  }

  componentDidMount() {
    if (this.props.blockedByGeoFence) {
      const newState = Object.assign({}, this.state);
      newState.blocked = true;

      this.setState(newState);
    }
  }

  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.wrapper}>
          <Image source={Images.brisikLogo} style={Styles.logo} />
          <View style={Styles.buttonWrapper}>
            <ActionButton
              title="create an account"
              onPress={() => this._navigate('Register')}
              style={Styles.button} />
            <Text style={Styles.label}>Already a user?</Text>
            <ActionButton
              title="log in"
              onPress={() => this._navigate('Login')}
              textStyle={Styles.buttonWhiteText}
              style={[Styles.button, Styles.buttonWhite]} />
          </View>
        </View>
      </View>
    );
  }

  _navigate(target) {
    if (this.state.blocked) {
      this.props.navigator.showLightBox({
        screen: ScreenNames.GeofenceRestriction.id,
        title: '',
        style: {
         backgroundBlur: 'dark',
         backgroundColor: 'rgba(50, 50, 50, 0.2)'
        },
        passProps: {
          handleClose: () => this.props.navigator.dismissLightBox(),
          buttonSet: 'cross',
          title: alertContent['title'],
          message: alertContent['message']
        }
      });
    } else {
      this.props.navigator.push({
        screen: ScreenNames[target].id,
        title: ScreenNames[target].title.toUpperCase(),
        animated: true,
        backButtonTitle: '',
        navigatorButtons: {
          leftButtons: [{
            icon: Images.backButton,
            disableIconTint: true,
            id: '@nav/editConfirm'
          }],
          rightButtons: []
        }
      });
    }
  }
}

Splash.title = 'Splash';
Splash.id = 'com.eSportsGlobalGamers.Splash';

const mapStateToGeofence = ({ common }) => {
  return {
    blockedByGeoFence: common.blockedByGeoFence
  };
};

export default connect(mapStateToGeofence)(Splash);