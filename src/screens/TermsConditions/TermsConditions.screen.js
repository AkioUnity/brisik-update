import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { SingleNavStyle, NavigationEventsHandler } from '../../utils/Navigator';
import Styles from './TermsConditions.styles';

class TermsConditions extends Component {
  static navigatorStyle = SingleNavStyle;

  constructor(props) {
    super(props);

    const navigatorEventsHandler = (event) => NavigationEventsHandler({
      screen: this.constructor.id,
      navigator: props.navigator, event
    });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);
  }

  render() {
    return (
      <View style={Styles.container}>
        <ScrollView contentContainerStyle={Styles.contentContainer}>
          <Text style={Styles.titleText}>
            Lorem Ipsum dolor sit amet
          </Text>
          <Text style={Styles.bodyText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget lobortis purus.
            Nam quis arcu id diam suscipit scelerisque. Nullam facilisis a magna at lobortis.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget lobortis purus.
            Nam quis arcu id diam suscipit scelerisque. {'\n'}{'\n'}

            Nullam facilisis a magna at lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Utipsum dolor sit amet, consectetur adipiscing elit. {'\n'}{'\n'}

            Ut eget lobortis purus. Nam quis arcu id diam suscipit scelerisque.
            Nullam facilisis a magna at lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Ut eget lobortis purus. Nam quis arcu id diam suscipit scelerisque.
            Nullam facilisis a magna at lobortis. {'\n'}
          </Text>
        </ScrollView>
      </View>
    );
  }
}

TermsConditions.id = 'com.eSportsGlobalGamers.TermsConditions';
TermsConditions.title = 'Terms & Conditions';

const mapStateToProps = ({ user, chat, notification }) => ({
  navigatorParams: {
    hasUser: !!user.userData,
    hasNotification: !!notification.hasNotification,
    hasChatNotification: !!chat.hasNotification
  }
});

export default connect(mapStateToProps, null)(TermsConditions);
