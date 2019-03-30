import React from 'react';
import { View, Alert, Text, TouchableOpacity } from 'react-native';

import ActionButton from '../ActionButton/ActionButton';
import Styles from './ChallengeActions.styles';
import { ScreenNames } from '../../screens';

const ChallengeActions = props => {
  return (
    <View style={Styles.actionButtonContainer}>
      {resolveActions(props)}
    </View>
  );
};

const resolveActions = ({ challenge, actions, user, insufficient, navigator }) => {
  const isOpen = !challenge.guest;
  const isAccepted = challenge.state === 4;
  const isPending = challenge.state === 0;
  const isDispute = challenge.state === 5;
  const isPendingPrivate = challenge.guest && isPending;
  const isMain = user && challenge.host._id === user._id;
  const wasPlayed = challenge.results.hostSelectedWinner || challenge.results.guestSelectedWinner;

  if (isOpen && isMain) {
    return CancelMyChallengeButton(challenge, actions);
  }

  if (isAccepted) {
    return ScoreChallengeButton(challenge, actions, wasPlayed);
  }

  if (isOpen) {
    return OpenChallengeButtons(challenge, actions, insufficient, navigator);
  }

  if (isPendingPrivate && isMain) {
    return CancelMyChallengeButton(challenge, actions);
  }

  if (isPendingPrivate) {
    return PendingChallengeButtons(challenge, actions, insufficient, navigator);
  }

  if (isDispute) {
    return DisputeChallengeButton(challenge, actions);
  }
};

const OpenChallengeButtons = (challenge, actions, insufficient, navigator) => {
  insufficient = false;
  return (
    <View style={Styles.actionButton}>
      <ActionButton title="Join" 
        onPress={() => {
          !insufficient 
            ? actions.joinChallenge(challenge._id)
            : Alert.alert(
                'Not enough coins!',
                'Whould you like to purchase more coins?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Confirm', style: 'destructive',
                  onPress: () =>
                  navigator.push({
                    screen: ScreenNames.AddFunds.id,
                    title: ScreenNames.AddFunds.title,
                    animated: true,
                    backButtonTitle: '',
                    passProps: {stack: true}
                  })
                }
              ],{ cancelable: true });
        }}
        style={Styles.button} />
    </View>
  );
};

const PendingChallengeButtons = (challenge, actions, insufficient) => {
  insufficient = false;
  return [
    <View style={[Styles.actionButton, Styles.firstMargin]} key={this.title + 'button02'}>
      <ActionButton title="Accept" onPress={() => {
        !insufficient
          ? actions.acceptChallenge(challenge._id)
          : Alert.alert(
            'Not enough coins!',
            'Whould you like to purchase more coins?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Confirm', style: 'destructive',
                onPress: () =>
                  navigator.push({
                    screen: ScreenNames.AddFunds.id,
                    title: ScreenNames.AddFunds.title,
                    animated: true,
                    backButtonTitle: '',
                    passProps: {stack: true}
                  })
              }
            ], { cancelable: true });}}
        style={Styles.buttonInline} />
    </View>,
    <View style={Styles.actionButton} key={this.title + 'button01'}>
      <ActionButton
        title="Deny"
        type="dark"
        onPress={() => actions.decline(challenge._id)}
        style={Styles.buttonInline} />
    </View>
  ];
};

const ScoreChallengeButton = (challenge, actions, wasPlayed) => {
  return (
    <View>
      <View style={[Styles.actionButton, Styles.bottomAtTop]} key={this.title + 'button02'}>
        <ActionButton
          style={Styles.button}
          title="Enter results"
          onPress={() => actions.score({ challenge })} />
      </View>
      <TouchableOpacity
        onPress={() => actions.forfeit({ challenge })}
        key={this.title + 'button01'}>
        <Text style={Styles.cancelLabel}>Cancel Challenge</Text>
      </TouchableOpacity>
    </View>
  );
};

const DisputeChallengeButton = (challenge, actions) => {
  return (
    <View style={Styles.actionButton}>
      <ActionButton title="See more" onPress={() => actions.dispute({ challenge })} />
    </View>
  );
};

const CancelMyChallengeButton = (challenge, actions) => {
  return (
    <View style={Styles.actionButton}>
      <ActionButton
        style={Styles.button}
        title="Cancel"
        onPress={() => actions.cancel({ challenge })}
        type="dark" />
    </View>
  );
};
export default ChallengeActions;
