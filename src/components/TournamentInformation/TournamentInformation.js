import React, { Component } from 'react';
import { View, Image, Text, ScrollView, Alert } from 'react-native';
import Moment from 'moment';
import * as Images from '../../utils/Images';
import ActionButton from '../../components/ActionButton/ActionButton';
import CoinAmount from '../CoinAmount/CoinAmount';
import Styles from './TournamentInformation.styles';

class TournamentInformation extends Component {
  constructor(props) {
    super(props);

    this._listPrizes = this._listPrizes.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.tournament &&
      nextProps.tournaments &&
      this.props.tournament.participants.length <
        nextProps.tournaments.participants.length
    ) {
      Alert.alert('Tournament', 'Joined successfully');
    }
  }

  render() {
    const { tournament } = this.props;
    const startDate = Moment(tournament.startDate);
    const entriesFree = this._generateIterable(
      tournament.maxEntries - tournament.participants.length,
    );
    const prizes = this._calculatePrizes(tournament.prizes);

    return (
      <ScrollView style={Styles.content}>
        <View style={Styles.tournamentCover}>
          <Image
            resizeMode="cover"
            style={Styles.touramentCoverImage}
            source={Images.gradient}
          />
          <View style={Styles.tournamentGeneral}>
            <View style={Styles.tournamentData}>
              <Image
                source={Images.psIcon}
                style={Styles.tournamentPlatformImg}
              />
              <View style={Styles.tournamentGame}>
                <Text style={Styles.tournamentGameText}>
                  {tournament.game.title}
                </Text>
                <Text style={Styles.tournamentPlatformText}>
                  {tournament.platform.name}
                </Text>
              </View>
            </View>
            <View style={Styles.coinContainer}>
              <CoinAmount amount={prizes} />
            </View>
          </View>
        </View>
        <View style={Styles.tournamentDetails}>
          <Text style={Styles.tournamentName}>{tournament.title}</Text>
          <Text style={Styles.tournamentDate}>
            {`${startDate.format('MMM D YYYY')}  |  ${startDate.format(
              'h:mmA',
            )}`.toUpperCase()}
          </Text>
        </View>
        <View style={Styles.participateSection}>
          <View style={Styles.participantsWrapper}>
            {tournament.participants.map((participant, i) => (
              <Image
                source={Images.defaultAvatarActive}
                style={Styles.avatar}
                key={`active_${i}`}
              />
            ))}
            {entriesFree.map((entry, i) => (
              <Image
                source={Images.defaultAvatar}
                style={Styles.avatar}
                key={i}
              />
            ))}
          </View>
          <View style={Styles.verticalDivider} />
          <View style={Styles.entryWrapper}>
            <View style={Styles.coinContainer}>
              <CoinAmount amount={tournament.entryFee} />
            </View>
            <Text style={Styles.entryStatic}>{'entry fee'.toUpperCase()}</Text>
          </View>
        </View>
        <View style={Styles.prizeContainer}>
          <Text style={Styles.prizeText}>Prizes</Text>
          <View style={Styles.prizesContainer}>
            {this._listPrizes(tournament.prizes)}
          </View>
          <View style={Styles.actionableWrapper}>{this._renderActions()}</View>
        </View>
        {this._renderRules()}
      </ScrollView>
    );
  }

  _listPrizes(prizes) {
    const order = ['st', 'nd', 'th'];

    return prizes.map((item, i) => {
      return (
        <View style={Styles.prizeItemContainer} key={i}>
          <Text style={Styles.prizeItemText}>
            {`${item.sort}${order[i]} place`.toUpperCase()}
          </Text>
          {item.type === 'coin' ? (
            <View style={Styles.coinContainer}>
              <View style={[Styles.coinShape, Styles.coinShapeSmall]} />
              <Text style={[Styles.coinAmount, Styles.coinAmountSmall]}>
                {item.amount}
              </Text>
            </View>
          ) : (
            <View style={Styles.prizeItemImageContainer}>
              <Image
                source={{ uri: item.image.replace(/^http:/, 'https:') }}
                style={Styles.prizeImage}
              />
              <Image
                source={Images.cartColor}
                style={Styles.tournamentDetailsItemCoinImage}
              />
            </View>
          )}
        </View>
      );
    });
  }

  _renderActions() {
    const { tournament, user } = this.props;
    const isParticipant =
      user &&
      tournament.participants.find(item => item.mediaId === user.mediaId);
    const isFull = tournament.participants.length === tournament.entries;
    const isOpen = tournament.state === 0;
    let buttons = null;

    if (isParticipant && isOpen) {
      buttons = (
        <ActionButton
          title="Leave"
          onPress={() => this.props.leaveTournament(tournament._id)}
          style={Styles.actionButton}
          type="dark"
        />
      );
    } else if (isOpen && !isFull) {
      const sufficient = user && tournament.entryFee <= user.coins;
      buttons = (
        <ActionButton
          title="Join"
          onPress={() => this.props.joinAction(tournament._id)}
          async={sufficient}
          style={Styles.actionButton}
        />
      );
    }

    return buttons;
  }

  _renderRules() {
    const {
      tournament: { description, rules },
    } = this.props;

    return (
      <View style={Styles.container}>
        <View style={Styles.rulesHeader}>
          <Text style={Styles.rulesHeaderText}>
            {'info & rules'.toUpperCase()}
          </Text>
        </View>
        <View style={Styles.rulesBody}>
          <Text style={Styles.rulesContent}>{`${description}\n${rules}`}</Text>
        </View>
      </View>
    );
  }

  _generateIterable(counter) {
    const newArr = [];

    for (let i = 0; i < counter; i++) {
      newArr.push(i);
    }

    return newArr;
  }

  _calculatePrizes(tournamentPrizes) {
    let prizeAmount = 0;

    tournamentPrizes.forEach(prize => {
      prizeAmount += prize.amount;
    });

    return prizeAmount;
  }
}

export default TournamentInformation;
