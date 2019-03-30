import React, { Component } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import Moment from 'moment-timezone';

import { isObjectEmpty } from '../../utils/Utils.js';
import * as Images from '../../utils/Images';
import { ScreenNames } from '../../screens';

import Styles from './TournamentBracket.styles';

class TournamentBracket extends Component {
  constructor(props) {
    super(props);

    this._renderBracketMatch = this._renderBracketMatch.bind(this);
  }

  render() {
    const { rounds } = this.props.tournament;
    const [firstRound, final] = rounds;
    const [matchOne, matchTwo] = firstRound.matches;
    const [finalMatch] = final.matches;

    if (final && finalMatch && finalMatch.winner) {
      const winner = (
        finalMatch &&
        typeof finalMatch.winner !== 'undefined' &&
        !isObjectEmpty(finalMatch.winner)
      ) ? finalMatch.winner : null;
    }

    return (
      <ScrollView style={Styles.bracketContent}>
        <View style={Styles.headerContainer}>
          <Text style={Styles.headerText}>{ 'semifinals'.toUpperCase() }</Text>
        </View>
        <View style={Styles.contentWrapper}>
          { this._renderBracketMatch(matchOne, 1) }
          { this._renderBracketMatch(matchTwo, 2) }
        </View>
        <View style={Styles.headerContainer}>
          <Text style={Styles.headerText}>{ 'finals'.toUpperCase() }</Text>
        </View>
        <View style={Styles.contentWrapper}>
          { final && this._renderBracketMatch(finalMatch, null, true, matchOne) }
        </View>
      </ScrollView>
    );
  }

  _renderBracketMatch(match, matchNumber, isFinal, matchOne) {
    const { tournament: { platform }, user } = this.props;
    const matchDate = match
      ? Moment.tz(match.expiration, Moment.tz.guess()).format('MMM DD h:mmA Z')
      : 'to be defined';
    const matchWinner = match ? this._selectWinner(match.results) : match ? match.winner : null;
    const hostWon = matchWinner && match.host && (matchWinner === match.host._id);
    const guestWon = matchWinner && match.guest && (matchWinner === match.guest._id);
    const xboxPlatform = /xbox/i.test(platform.title);
    const onPress = () => this._navigateToDetail(match._id);
    const userIsParticipant = (match && match.host && user._id === match.host._id) ||
      (match && match.guest && user._id === match.guest._id);
    const Wrapper = userIsParticipant && match.state === 4 ? TouchableOpacity : View;
    const hostPlayedFirstMatch = (isFinal && match && match.host && matchOne.state === 3) &&
      match.host._id === matchOne.results.hostSelectedWinner;

    return (
        <Wrapper style={Styles.matchContainer} onPress={onPress}>
          <View style={Styles.matchHeader}>
            <Text style={Styles.matchDate}>{ matchDate.toUpperCase() }</Text>
            {matchNumber !== null &&
              <Text style={Styles.matchNumber}>{ `match ${matchNumber}`.toUpperCase() }</Text>
            }
          </View>
          <View style={Styles.matchBody}>
            <View style={Styles.matchHost}>
              { (!match || !match.host) && !isFinal &&
                <Text style={Styles.playerStatic}>Player 1</Text> }
              { (!match || !match.host) && isFinal &&
                <Text style={Styles.playerStatic}>{'Winner of\nMatch 1'}</Text> }
              { match && match.host && (
                  <View>
                    <Text style={[Styles.playerStatic, hostWon ? Styles.winner : {}]}>
                      {match.host.mediaId}
                    </Text>
                    <Text style={[Styles.playerGametagStatic, hostWon ? Styles.winner : {}]}>
                      {
                        match.host[xboxPlatform ? 'xboxgamertag' : 'ps4gamertag']
                          ? match.host[xboxPlatform ? 'xboxgamertag' : 'ps4gamertag'].toUpperCase()
                          : '-'
                      }
                    </Text>
                    {!hostWon && !guestWon &&
                      <Text style={Styles.playerEloStatic}>
                        {
                          `div ${match.host.eloData.division}  elo ${Math.floor(match.host.eloData.elo)}`
                            .toUpperCase()
                        }
                      </Text>
                    }
                  </View>
                )
              }
            </View>
            { hostWon && <Image source={Images.winnerPointer} style={Styles.winnerPointer} /> }
            <View style={Styles.vsContainer}>
              <Text style={Styles.vsText}>{ 'vs'.toUpperCase() }</Text>
            </View>
            { guestWon && <Image source={Images.winnerPointer} style={Styles.winnerPointerRight} /> }
            <View style={Styles.matchGuest}>
              { (!match || !match.guest) && !isFinal &&
                <Text style={[Styles.playerStatic, Styles.playerStaticRight]}>Player 2</Text> }
              { (!match || !match.guest) && isFinal &&
                <Text style={[Styles.playerStatic, Styles.playerStaticRight]}>
                  {(hostPlayedFirstMatch || typeof hostPlayedFirstMatch === 'undefined')
                    ? 'Winner of\nMatch 2' : 'Winner of\nMatch 1'}
                </Text> }
              { match && match.guest && (
                  <View>
                    <Text
                      style={[
                        Styles.playerStatic,
                        Styles.playerStaticRight,
                        guestWon ? Styles.winner : {}
                      ]}
                    >
                      {match.guest.mediaId}
                    </Text>
                    <Text
                      style={[
                        Styles.playerGametagStatic,
                        Styles.playerStaticRight,
                        guestWon ? Styles.winner : {}
                      ]}
                    >
                      {
                        match.guest[xboxPlatform ? 'xboxgamertag' : 'ps4gamertag']
                          ? match.guest[xboxPlatform ? 'xboxgamertag' : 'ps4gamertag'].toUpperCase()
                          : '-'
                      }
                    </Text>
                    {!hostWon && !guestWon &&
                      <Text style={[Styles.playerEloStatic, Styles.playerStaticRight]}>
                        {
                          `div ${match.guest.eloData.division}  elo ${Math.floor(match.guest.eloData.elo)}`
                            .toUpperCase()
                        }
                      </Text>
                    }
                  </View>
                )
              }
            </View>
          </View>
        </Wrapper>
    );
  }

  _selectWinner(results) {
    let winner = null;

    if (results) {
      if (results.hostSelectedWinner &&
      results.guestSelectedWinner &&
      (results.hostSelectedWinner === results.guestSelectedWinner)) {
        winner = results.hostSelectedWinner;
      }
    }

    return winner;
  }

  _navigateToDetail(id) {
    this.props.navigator.push({
      screen: ScreenNames.ChallengeDetail.id,
      title: ScreenNames.ChallengeDetail.title.toUpperCase(),
      animated: true,
      backButtonTitle: '',
      navigatorButtons: {
        leftButtons: [{
          icon: Images.backButton,
          disableIconTint: true,
          id: '@nav/editConfirm'
        }],
        rightButtons: []
      },
      passProps: { id }
    });
  }
}

export default TournamentBracket;