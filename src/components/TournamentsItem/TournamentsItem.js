import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment';
import { ScreenNames } from '../../screens/';
import ActionButton from '../ActionButton/ActionButton';
import * as TournamentActions from '../../actions/Tournament/Tournament.actions';
import CoinAmount from '../CoinAmount/CoinAmount';
import Styles from './TournamentsItem.styles';
import * as Images from '../../utils/Images';

const TournamentsItem = props => {
  const {
    title,
    entryFee,
    startDate,
    onPress,
    participants,
    maxEntries,
    game,
    platform,
    minDivision,
  } = props;
  const time = Moment(startDate);
  const platformRegex = new RegExp('xbox', 'i');
  const isXbox = platformRegex.test(platform.name);
  const startsIn = time.from(Moment());
  const alreadyStarted = /ago/i.test(startsIn);

  return (
    <TouchableOpacity onPress={onPress} style={[Styles.container, props.style]}>
      <View style={Styles.topRow}>
        <View style={Styles.tournamentDataWrapper}>
          <Image
            source={isXbox ? Images.xboxIcon : Images.psIcon}
            style={Styles.platformLogo}
          />
          <View style={Styles.tournamentData}>
            <Text style={Styles.tournamentName}>{game.title}</Text>
            <Text style={Styles.tournamentPlatform}>{platform.name}</Text>
          </View>
        </View>
        <View style={Styles.coinContainer}>
          <CoinAmount amount={entryFee} />
        </View>
      </View>
      <View style={Styles.body}>
        <Text style={Styles.title}>{title}</Text>
        <Text style={Styles.details}>
          {`min div ${minDivision}  |  ${time.format(
            'MMM D YYYY',
          )}  |  ${time.format('h:mmA')}`.toUpperCase()}
        </Text>
      </View>
      <View style={Styles.footer}>
        <View style={Styles.footerTextWrapper}>
          <Text style={Styles.footerText}>
            {`${participants.length}/${maxEntries} Entries  |  Start${
              alreadyStarted ? 'ed' : 's'
            } ${startsIn}`}
          </Text>
        </View>
        {resolveAction(props)}
      </View>
    </TouchableOpacity>
  );
};

function resolveAction({
  _id,
  user,
  sectionKey,
  join,
  unauthAction,
  joined,
  participants,
  maxEntries,
  entryFee,
  navigator,
  leave,
}) {
  const isFull = participants && participants.length === maxEntries;
  const action = () =>
    onAction(
      _id,
      user,
      join,
      unauthAction,
      entryFee,
      navigator,
      joined,
      isFull,
      leave,
    );
  const sufficient = user && entryFee <= user.coins;
  if ((sectionKey === 'OPEN' && !joined && !isFull) || !user) {
    return <ActionButton onPress={action} title="Join" style={Styles.button} />;
  } else if (sectionKey === 'OPEN' && joined && !isFull) {
    return (
      <ActionButton
        type="dark"
        onPress={action}
        title="Leave"
        style={Styles.button}
      />
    );
  }

  return null;
}

function onAction(
  id,
  user,
  join,
  unauthAction,
  entryFee,
  navigator,
  joined,
  isFull,
  leave,
) {
  if (!user) {
    return unauthAction();
  }

  if (user && entryFee > user.coins) {
    Alert.alert(
      'Not enough coins!',
      'Whould you like to purchase more coins?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: () =>
            navigator.push({
              screen: ScreenNames.AddFunds.id,
              title: ScreenNames.AddFunds.title,
              animated: true,
              backButtonTitle: '',
              passProps: { stack: true },
            }),
        },
      ],
      { cancelable: true },
    );
    return;
  }
  if (!joined && !isFull) {
    join(id, (message, status) => {
      if (status === 'error') {
        return navigator.showLightBox({
          screen: ScreenNames.GeofenceRestriction.id,
          title: '',
          style: {
            backgroundBlur: 'dark',
            backgroundColor: 'rgba(50, 50, 50, 0.2)',
          },
          passProps: {
            title: 'Error!',
            message: message,
            handleClose: () => navigator.dismissLightBox(),
          },
        });
      }
    });
  } else if (joined && !isFull) {
    leave(id, handleSuccess(navigator));
  }
}

function handleSuccess(navigator) {
  return navigator.showLightBox({
    screen: ScreenNames.GeofenceRestriction.id,
    title: '',
    style: {
      backgroundBlur: 'dark',
      backgroundColor: 'rgba(50, 50, 50, 0.2)',
    },
    passProps: {
      title: 'Success!',
      message: 'You successfully left the tournament',
      handleClose: () => navigator.dismissLightBox(),
    },
  });
}

const mapStateToProps = ({ user }) => ({
  user: user.userData,
});

const mapDispatchToProps = dispatch => ({
  join: (id, cb) => dispatch(TournamentActions.join(id, cb)),
  leave: (id, cb) => dispatch(TournamentActions.leave(id, cb)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TournamentsItem);
