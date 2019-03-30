import React, { Component } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import Moment from 'moment';
import { isObjectEmpty } from '../../utils/Utils.js';
import Avatar from '../Avatar/Avatar';
import Styles from './TournamentCalender.styles';
import * as Images from '../../utils/Images';

class TournamentCalendar extends Component {
  constructor(props) {
    super(props);

    this._roundOne = this._roundOne.bind(this);
    this._renderCalendarMatch = this._renderCalendarMatch.bind(this);
    this._renderCalendarNotDefinedMatch = this._renderCalendarNotDefinedMatch.bind(this);
    this._final = this._final.bind(this);
  }

  render() {
    return (
      <ScrollView style={Styles.bracketContent}>
        <View style={Styles.bracketContent}>
          {this._roundOne()}
          {this._final()}
        </View>
      </ScrollView>
    );
  }
  
  _roundOne() {
    const [roundOne] = this.props.tournament.rounds;
    const [matchOne, matchTwo] = roundOne.matches;

    const areMatchesFinished =
      matchOne && !isObjectEmpty(matchOne.winner) && (matchTwo && !isObjectEmpty(matchTwo.winner));

    if (areMatchesFinished) {
      return null;
    }
    
    if (matchOne && isObjectEmpty(matchOne.winner) && matchTwo && isObjectEmpty(matchTwo.winner)) {
      return (
        <View>
          {this._renderCalendarMatch(matchOne, 'round 1')}
          {this._renderCalendarMatch(matchTwo)}
        </View>
      );
    }

    if (matchOne && !isObjectEmpty(matchOne.winner) && matchTwo && isObjectEmpty(matchTwo.winner)) {
      return this._renderCalendarMatch(matchTwo, 'round 1');
    }

    if (matchTwo && !isObjectEmpty(matchTwo.winner) && matchOne && isObjectEmpty(matchOne.winner)) {
      return this._renderCalendarMatch(matchOne, 'round 1');
    }

    if (matchOne && !isObjectEmpty(matchOne.winner) && matchTwo && isObjectEmpty(matchTwo.winner)) {
      return this._renderCalendarMatch(matchTwo, 'round 1');
    }

    if (matchTwo && !isObjectEmpty(matchTwo.winner) && matchOne && isObjectEmpty(matchOne.winner)) {
      return this._renderCalendarMatch(matchOne, 'round 1');
    }
    
    return (
      <View>
        {this._renderCalendarNotDefinedMatch('round 1', true)}
        {this._renderCalendarNotDefinedMatch()}
      </View>
    );
  }

  _final() {
    const [, final] = this.props.tournament.rounds;
    const [finalMatch] = final.matches;
    if (!finalMatch) {
      return this._renderCalendarNotDefinedMatch('final');
    }
    return this._renderCalendarMatch(finalMatch, 'final');
  }

  _renderCalendarMatch(match, title = '') {
    const { host, guest, date } = match;
    let hostImage = Images.unknownAvatar;
    let guestImage = Images.unknownAvatar;
    if (!isObjectEmpty(host)) {
      hostImage = host.profileImage ? { uri: host.profileImage } : null;
    }

    if (!isObjectEmpty(guest)) {
      guestImage = guest.profileImage ? { uri: guest.profileImage } : null;
    }
    return (
      <View>
        {title !== '' &&
          <View style={Styles.calenderSubtitleContainer}>
            <Text style={Styles.roundText}> {title.toUpperCase()} </Text>
          </View>}
        <View style={Styles.calenderDateContainer}>
          <Text style={Styles.roundText}> { Moment(date).format('MMM DD, YYYY - hh:mm A') } </Text>
        </View>
        <View style={Styles.challengeContainer}>
          <View style={Styles.bracketItem}>
            <Avatar source={hostImage}
              style={!isObjectEmpty(host) ? Styles.calenderAvatar : Styles.undefinedAvatar}
              fill={!isObjectEmpty(host) ? host.expierence || 50 : 0} progress={true}/>
            { !isObjectEmpty(match.guest) 
              ? <View style={Styles.levelTextContainer}>
                  <Text style={Styles.roundText}> {host.mediaId}</Text>
                  <Text style={Styles.levelText}> {host.level}</Text>
                  <Image source={Images.star}
                        style={Styles.starImage}/>
                </View> : null}
          </View>
          <Text style={[Styles.vsText]}> VS </Text>
          <View style={Styles.bracketItem}>
            <Avatar source={guestImage} 
              style={!isObjectEmpty(guest) ? Styles.calenderAvatar : Styles.undefinedAvatar}
              fill={!isObjectEmpty(guest) ? guest.expierence || 50 : 0} progress={true}/>
            { !isObjectEmpty(match.guest) 
              ? <View style={Styles.levelTextContainer}>
                  <Text style={Styles.roundText}> {guest.mediaId}</Text>
                  <Text style={Styles.levelText}> {guest.level}</Text>
                  <Image source={Images.star}
                        style={Styles.starImage}/>
                </View> : null}
          </View>
        </View>
      </View>
    );
  }

  _renderCalendarNotDefinedMatch(title = '') {
    return (
      <View>
        {title !== '' &&
          <View style={Styles.calenderSubtitleContainer}>
            <Text style={Styles.roundText}> {title.toUpperCase()} </Text>
          </View>}
        <View style={Styles.challengeContainer}>
          <Avatar source={Images.unknownAvatar} style={Styles.undefinedAvatar} />
          <Text style={Styles.roundText}> VS </Text>
          <Avatar source={Images.unknownAvatar} style={Styles.undefinedAvatar} />
        </View>
      </View>
    );
  }
}

export default TournamentCalendar;