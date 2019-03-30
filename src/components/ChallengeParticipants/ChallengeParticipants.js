import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import { ScreenNames } from '../../screens';
import Styles from './ChallengeParticipants.styles';
import Avatar from '../Avatar/Avatar';
import * as Images from '../../utils/Images';

const pingAssets = {
  green: Images.pingGreen,
  yellow: Images.pingYellow,
  red: Images.pingRed
};

const ChallengeParticipants = ({
  host,
  guest,
  style,
  winner,
  results,
  navigator,
  user,
  platform,
  game,
  isFreeChallenge,
  challengeState,
  showChallengeVideo,
  challengeVideo
}) => {
 
  return (
    <View style={[Styles.container, style]}>
      {challengeVideo && 
        <TouchableOpacity style = {Styles.challengeContainer} onPress = {() => showChallengeVideo()}>
          <Image style={Styles.videoAttached} source={Images.videoAttached} />
          <View style = {Styles.challengeTextContainer}>
            <Text style = {Styles.challengeText}>VIDEO</Text>
            <Text style = {Styles.challengeText}>CHALLENGE</Text>
          </View>
        </TouchableOpacity>
      }
      
      <View style={Styles.avatarsContainer}>
        {renderAvatar(host, user, navigator)}
        <Text style={Styles.vs}>VS</Text>
        {renderAvatar(guest, user, navigator)}
      </View>
      <View style={[Styles.columnsContainer, !guest ? Styles.columnsContainerWithoutOpponent : {}]}>
        {renderUserData(host, winner, results, platform, game, isFreeChallenge, challengeState, true)}
        <Text style={[Styles.vs, Styles.hidden]}>VS</Text>
        {renderUserData(guest, winner, results, platform, game, isFreeChallenge, challengeState)}
      </View>
    </View>
  );
};

function renderAvatar(data = {}, user, navigator) {
  const hasUser = !!data.mediaId;
  const avatar = data.profileImage ? { uri: data.profileImage } : null;
  const experience = hasUser ? 35 : 0;

  return (
    <TouchableOpacity onPress={() => {
      if (user && data._id) {
        navigator.push({
          screen: ScreenNames.Profile.id,
          animated: 'true',
          title: data.mediaId,
          backButtonTitle: '',
          passProps: {
            id: data._id,
            public: data._id !== user._id
          }
        });
      }
    }}>
      <Avatar style={Styles.avatar} source={avatar} />
    </TouchableOpacity>
  );
}

function renderUserData(data = {}, winner, results, platform, game, isFreeChallenge, state, host = false) {
  const hasUser = !!data.mediaId;
  const mediaId = hasUser ? data.mediaId : 'Awaiting\nOpponent';
  const gamerTag = hasUser ? resolveGamertag(data, platform) : null;
  const score = results && (host ? results.hostSubmittedScore.hostScore : results.hostSubmittedScore.guestScore);

  return (
    <View style={Styles.column}>
      <View style={[Styles.lineMediaId, !host ? Styles.lineMediaIdGuest : {}]}>
        <Text
          style={[
            Styles.lineUserName,
            !host && Styles.lineUserNameGuest,
            (hasUser && winner === data._id) && Styles.challengeWinner
          ]}
        >
          {mediaId}
        </Text>
        {gamerTag !== null &&
          <Text
            style={[
              Styles.lineGamertag,
              (hasUser && winner === data._id) && Styles.challengeWinner
            ]}
          >
            {gamerTag.toUpperCase()}
          </Text>}
        {hasUser &&
          <View style={[Styles.locationWrapper, !host && Styles.locationWrapperGuest]}>
            {data.city &&
              <Image
                source={pingAssets[data.ping]}
                resizeMode="contain"
                style={Styles.locationIcon}
              />}
            <Text style={Styles.locationText}>
              {data.city || 'No city found'}
            </Text>
          </View>}
      </View>
      {(hasUser && winner && results) && resolveWinner(host, winner, data)}
      {resolveUserInfo(hasUser, data, host, game, isFreeChallenge, state)}
    </View>
  );
}

function resolveUserInfo(hasUser, data, host, game, isFreeChallenge, state) {
  if (hasUser) {
    return renderUserStatiscs(data, host, game, isFreeChallenge, state);
  } else if (!hasUser) {
    return (
      <Text style={Styles.anyAccept}>
        {'Any user can\naccept this\nchallenge'.toUpperCase()}
      </Text>
    );
  }

  return null;
}

function renderUserStatiscs(data, host, game, isFreeChallenge, state) {
  const userElo = typeof state !== 'undefined'
    ? data.eloData
    : getUserEloForGame(data.eloData, data.freeEloData, game, isFreeChallenge, state);

  return (
    <View style={Styles.userInfo}>
      <View style={[Styles.line, !host && Styles.lineGuest]}>
        <Text style={[Styles.lineLabel, Styles.lineElo]}>
          {`div ${userElo.division || '0'}`.toUpperCase()}
        </Text>
        <Text style={[Styles.lineText, Styles.lineElo]}>
          {`elo ${Math.floor(userElo.elo) || '0'}`.toUpperCase()}
        </Text>
      </View>
      <View style={[Styles.line, !host && Styles.lineGuest]}>
        <Text style={host ? Styles.lineLabel : Styles.lineText}>
          {host ? Math.floor(data.communityRating) : 'community rating'.toUpperCase()}
        </Text>
        <Text style={host ? Styles.lineText : [Styles.lineLabel, Styles.lineLabelGuest]}>
          {host ? 'community rating'.toUpperCase() : Math.floor(data.communityRating)}
        </Text>
      </View>
      <View style={[Styles.line, !host && Styles.lineGuest]}>
        <Text style={host ? Styles.lineLabel : Styles.lineText}>
          {host ? Math.floor(data.competitorRating) : 'competitor rating'.toUpperCase()}
        </Text>
        <Text style={host ? Styles.lineText : [Styles.lineLabel, Styles.lineLabelGuest]}>
          {host ? 'competitor rating'.toUpperCase() : Math.floor(data.competitorRating)}
        </Text>
      </View>
    </View>
  );
}

function resolveGamertag(data, platform) {
  const gamertagKey = platform.name.search(/xbox/i) !== -1 ? 'xboxgamertag' : 'ps4gamertag';
  return data[gamertagKey] || '-';
}

function getUserEloForGame(eloData, freeEloData, game, isFreeChallenge, state) {
  const eloList = isFreeChallenge ? [...freeEloData] : [...eloData];
  let eloValues = {};

  if (eloList && eloList.length > 0) {
    const userCurrentElo = _.findIndex(eloList, eloGame =>
      typeof eloGame.game === 'string' ? eloGame.game === game : eloGame.game._id === game);

    eloValues.division = eloList[userCurrentElo].division.toString();
    eloValues.elo = eloList[userCurrentElo].elo.toString();
  } else {
    eloValues.division = '0';
    eloValues.elo = '0';
  }

  return eloValues;
}

function resolveWinner(host, winner, { _id }) {
  const styles = [
    Styles.challengeWinSelector,
    !host && Styles.challengeWinSelectorGuest
  ];
  const content = winner === _id
    ? <Image source={Images.winnerTriangle} style={styles} resizeMode="contain" />
    : null;

  return content;
}

export default ChallengeParticipants;