import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import { ScreenNames } from '../../screens';
import * as ChallengeActions from '../../actions/Challenge/Challenge.actions';
import ActionButton from '../ActionButton/ActionButton';
import Styles from './ChallengesItem.styles';
import Avatar from '../Avatar/Avatar';
import Colors from '../../styles/Colors';
import * as Images from '../../utils/Images';
import CoinAmount from '../CoinAmount/CoinAmount';

const cups = {
  full: Images.fullCup,
  empty: Images.emptyCup,
  mid: Images.midCup,
  disputed: Images.disputedCup,
  tournament: Images.tournamentChallengeIcon
};

const platformLogo = {
  xbox: require('../../../assets/images/ic_console_xbox.png'),
  ps: require('../../../assets/images/ic_console_ps.png')
};

const ChallengesItem = props => {
  if (!props._id) {
    return <View />;
  }

  const {
    coin,
    sectionKey,
    host,
    guest,
    _id,
    state,
    user,
    accept,
    join,
    index,
    onPress,
    game,
    platform,
    unauthAction,
    results,
    navigator,
    tournament,
    winner,
    decline,
    stitchedVideo
  } = props;
  const platformRegex = new RegExp('xbox', 'i');
  const isXbox = platformRegex.test(platform.name);

  return (
    <TouchableOpacity onPress={onPress} style={[Styles.container, props.style]}>
      <View style={Styles.wrapper}>
        {typeof tournament === 'object' && renderTournamentData(tournament)}
        <View style={Styles.content}>
          <View style={Styles.challengeInfo}>
            <Image
              source={platformLogo[isXbox ? 'xbox' : 'ps']}
              style={Styles.platformLogo} />
            <View style={Styles.matchDetails}>
              <Text style={Styles.gameTitle}>{game.title}</Text>
              {platform && platform.name && 
                <Text style={Styles.platformName}>
                  {platform.name.toUpperCase()}
                </Text>
              }
            </View>
          </View>
          <View style={Styles.coins}>
            <CoinAmount amount={coin} />
          </View>
        </View>
        <View style={Styles.body}>
          {renderParticipants({
            host,
            guest,
            results,
            state,
            winner,
            user,
            sectionKey,
            _id,
            accept,
            join,
            index,
            unauthAction,
            coin,
            navigator,
            isXbox
          })}
          {state !== 0 &&
            resolveAction({
              sectionKey,
              state,
              _id,
              host,
              user,
              accept,
              join,
              index,
              unauthAction,
              coin,
              navigator,
              decline
            })}
        </View>
        {!!stitchedVideo && stitchedVideo != '' && 
          <View style={Styles.videoContent}>
            <Image
              source={Images.videoAttached}
              style={Styles.platformLogo} />
            <View style={Styles.challengeInfo}>
              <Text style = {Styles.gamertag}>CHALLENGE RECAP</Text>
            </View>
          </View>
        }  
      </View>
    </TouchableOpacity>
  );
};

function resolveAction({
  sectionKey,
  state,
  _id,
  host,
  user,
  accept,
  join,
  index,
  unauthAction,
  coin,
  navigator,
  decline
}) {
  let action, title;

  if (user && host && host._id === user._id) {
    return null;
  }

  if (sectionKey === 'OPEN') {
    action = join;
    title = 'join';
  } else if (sectionKey === 'MY' && state === 0 && host._id !== user._id) {
    return (
      <View style={Styles.actionsContainer}>
        {renderButton('accept', cb => {
          if (!user) {
            cb();
            unauthAction();
            return;
          }

          accept({ id: _id, index }, cb);
        })}
        <View style={Styles.buttonDivider} />
        {renderButton('deny', cb => {
          if (!user) {
            cb();
            unauthAction();
            return;
          }

          decline(_id, index);
        }, 'dark')}
      </View>
    );
  } else {
    return null;
  }

  if (false) { //user && coin > user.coins
    return (
      <ActionButton
        onPress={() => {
          Alert.alert(
            'Not enough coins!',
            'Would you like to purchase more coins?',
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
                    passProps: { stack: true }
                  })
              }
            ],
            { cancelable: true }
          );
        }}
        title={title}
        style={Styles.button}
        async={coin <= user.coins}
      />
    );
  }

  return renderButton(title, cb => {
    if (!user) {
      cb();
      unauthAction();
      return;
    }

    action({ id: _id, index }, cb);
  });
}

function renderParticipants({
  host,
  guest,
  results,
  state,
  winner,
  user,
  sectionKey,
  _id,
  accept,
  join,
  index,
  unauthAction,
  coin,
  navigator,
  isXbox
}) {
  return (
    <View style={Styles.participants}>
      {renderParticipant(host, isXbox, results, state, winner)}
      <Text style={Styles.versus}>VS</Text>
      {state === 0 && !guest && host._id !== user._id
        ? resolveAction({
            sectionKey,
            state,
            _id,
            host,
            user,
            accept,
            join,
            index,
            unauthAction,
            coin,
            navigator})
        : renderParticipant(guest, isXbox, results, state, winner, true)}
    </View>
  );
}

function resolveCup(state, tournament) {
  if (tournament) {
    return cups.tournament;
  }

  switch (state) {
    case 0:
      return cups.empty;
    case 4:
      return cups.mid;
    case 3:
      return cups.full;
    case 5:
      return cups.disputed;
  }
}

function renderParticipant(data = {}, isXbox, results, state, winner, isGuest = false) {
  const mediaId = data.mediaId || 'Awaiting\nOpponent';
  const isWinner = winner && winner === data._id;
  const hasElo = !!data.eloData;
  const gamertag = isXbox ? data.xboxgamertag : data.psgamertag;

  return (
    <View style={Styles.participant}>
      <Text style={[
        data.mediaId ? Styles.participantName : Styles.tbdText,
        mediaId.length > 8 ? Styles.participantsNameSmall : null,
        isGuest && Styles.guestParticipant,
        isWinner ? Styles.winner : null
      ]}>
        {mediaId}
      </Text>
      {winner &&
        <Text style={[
          Styles.gamertag,
          isGuest && Styles.guestParticipant,
          isWinner ? Styles.winner : null
        ]}>
          {gamertag || '-'}
        </Text> }
      {mediaId !== 'Awaiting\nOpponent' && hasElo && !winner && data.eloData &&
        <Text style={[Styles.elo, isGuest && Styles.guestElo]}>
          {`div ${data.eloData.division}    elo ${Math.floor(data.eloData.elo)}`.toUpperCase()}
        </Text>}
    </View>
  );
}

function renderButton(title, action, type) {
  return (
    <ActionButton
      type={type || ''}
      onPress={action}
      title={title}
      style={Styles.button}
      async={true}
      loadingSize="small"
    />
  );
}

function renderTournamentData({ title, stage }) {
  const tournamentStage = stage === 1 ? 'semifinals' : 'final';

  return (
    <View style={Styles.tournamentDataWrapper}>
      <Text style={Styles.tournamentDataName}>
        {title}
      </Text>
      <Text style={Styles.tournamentDataStage}>
        {tournamentStage.toUpperCase()}
      </Text>
    </View>
  );
}

const mapStateToProps = ({ user }) => ({
  user: user.userData
});

const mapDispatchToProps = dispatch => ({
  join: (id, cb) => dispatch(ChallengeActions.join(id, cb)),
  accept: (id, cb) => dispatch(ChallengeActions.accept(id, cb)),
  decline: (id, index) => dispatch(ChallengeActions.decline({ id, index }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengesItem);
