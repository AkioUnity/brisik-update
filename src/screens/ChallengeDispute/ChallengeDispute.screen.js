import React, { PureComponent } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, Clipboard, Alert, Linking } from 'react-native';
import { connect } from 'react-redux';
import ActionButton from '../../components/ActionButton/ActionButton';
import Styles from './ChallengeDispute.styles';
import { SingleNavStyle, NavigationEventsHandler } from '../../utils/Navigator';

class ChallengeDispute extends PureComponent {
  static navigatorStyle = SingleNavStyle;

  constructor(props) {
    super(props);

    const options = (props.challenge._id && {
      screen: 'private-chat',
      title: `${props.challenge.game.title} match`,
      chatId: props.challenge._id
    }) || {};

    const navigatorEventsHandler = event => NavigationEventsHandler({
      screen: this.constructor.id,
      props: options,
      navigator: props.navigator, event
    });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._copyId = this._copyId.bind(this);
    this._sendMail = this._sendMail.bind(this);
  }

  render() {
    const { challenge } = this.props;

    return (
      <View style={Styles.container}>
        <View style={Styles.topShadow} />
        <ScrollView>
          <Text style={Styles.title}>Challenge Dispute</Text>
          <View style={Styles.scoreContainer}>
            <Text style={Styles.warningWord}>
              {'This match has entered the dispute process because both players submitted contradicting result.\n\n'}
              {'Send us pictures/screenshots of your challenge to show us who won and what the score was and we’ll award the winnings to the correct player.\n\n'}
              {'Send evidence to disputes@eglobalgamers.com and be sure to include the match ID number: '}
            </Text>
            <TouchableOpacity onPress={this._copyId} style={Styles.code}>
              <Text style={Styles.codeText} >
                {challenge._id}
              </Text>
            </TouchableOpacity>
            <Text style={Styles.warningWord}>
              {'in the email for us to reference this match.\n\n'}
              {'Disputes will be resolved within 24 hours, please be patient.'}
            </Text>
          </View>
          <Text style={Styles.warning}>
            <Text style={Styles.warningWord}>Warning: </Text>
            Submitting fake or false results will result in a permanent ban from the site.
          </Text>
        </ScrollView>
        <View style={Styles.buttonsContainer}>
          <ActionButton title="Accept" style={Styles.button} type="dark"
            onPress={() => {
              if (Platform.OS === 'ios') {
                this.props.navigator.dismissModal({
                  animated: true
                }).then(() => {
                  this.props.navigator.dismissModal();
                });
              } else {
                this.props.navigator.dismissModal({
                  animated: true
                });
                this.props.navigator.dismissModal();
              }
            }} />
          <ActionButton title="Send Evidence" style={Styles.button}
            onPress={this._sendMail} />
        </View>
      </View>
    );
  }

  _sendMail() {
    const mail = 'nicolas.castellanos@dixtra.co'; //'disputes@eglobalgamers.com';
    const subject = `Challenge\'s Dispute ${this.props.challenge._id}`;
    const link = `mailto:${mail}?subject=${subject}&body=${this.props.challenge._id}`;
    Linking.openURL(link);
  }

  _copyId() {
    Clipboard.setString(this.props.challenge._id);
    Alert.alert('Clipboard', 'Copied to clipboard');
  }
}

ChallengeDispute.title = 'Result';
ChallengeDispute.id = 'com.eSportsGlobalGamers.ChallengeDispute';

const mapStateToProps = ({ user, chat, notification }) => ({
  navigatorParams: {
    hasUser: !!user.userData,
    hasNotification: !!notification.hasNotification,
    hasChatNotification: !!chat.hasNotification
  }
});

export default connect(mapStateToProps, null)(ChallengeDispute);
