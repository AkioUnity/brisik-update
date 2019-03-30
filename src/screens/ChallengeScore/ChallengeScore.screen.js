import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
  TouchableWithoutFeedback,
  Image,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { gradient, xboxIcon, psIcon } from '../../utils/Images';
import { ScreenNames } from '../../screens';
import ActionButton from '../../components/ActionButton/ActionButton';
import Loader from '../../components/Loader/Loader';
import Styles from './ChallengeScore.styles';
import * as ChallengeActions from '../../actions/Challenge/Challenge.actions';
import CoinAmount from '../../components/CoinAmount/CoinAmount';
import {
  ModalNavStyle,
  ModalNavButtons,
  NavigationEventsHandler
} from '../../utils/Navigator';

class ChallengeScore extends Component {
  static navigatorStyle = ModalNavStyle;
  static navigatorButtons = ModalNavButtons;

  constructor(props) {
    super(props);

    this.state = {
      submit: true,
      host: 0,
      guest: 0,
      navigateToRatings: true
    };

    const options =
      (props.challenge &&
      props.challenge._id && {
        screen: 'private-chat',
        title: `${props.challenge.game.title} match`,
        chatId: props.challenge._id
      }) ||
      {};

    const navigatorEventsHandler = event =>
      NavigationEventsHandler({
        screen: this.constructor.id,
        navigator: props.navigator,
        props: options,
        event
      });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._renderButtons = this._renderButtons.bind(this);
    this._renderParticipant = this._renderParticipant.bind(this);
    this._submitAction = this._submitAction.bind(this);
    this._declineAction = this._declineAction.bind(this);
    this._dismiss = this._dismiss.bind(this);
    this._approveAction = this._approveAction.bind(this);
    this._handleWinner = this._handleWinner.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.challenge) {
      const { host, guest, results, state } = nextProps.challenge;
      const isHost = this.props.user && this.props.user._id === host._id;
      const isGuest =
        this.props.user && guest && this.props.user._id === guest._id;
      const score = isHost
        ? results.hostSubmittedScore
        : results.guestSubmittedScore;
      const { hostScore, guestScore } = score;
      const scoreSent =
        (hostScore > 0 && guestScore === 0) ||
        (hostScore === 0 && guestScore > 0);

      if (
        !nextProps.loading &&
        scoreSent &&
        this.state.navigateToRatings &&
        state !== 5
      ) {
        this.setState({
          navigateToRatings: false
        });
        if (Platform.OS === 'ios') {
          this.props.navigator.resetTo({
            screen: ScreenNames.ChallengeRating.id,
            title: ScreenNames.ChallengeRating.title.toUpperCase(),
            animated: true,
            passProps: {
              opponentData: isHost
                ? this.props.challenge.guest
                : this.props.challenge.host,
              platform: this.props.challenge.platform,
              challengeId: this.props.challenge._id
            }
          });
          this._handlePopup({
            title: 'Score submitted',
            message: 'We are waiting for your opponent to confirm the winner.',
            handleClose: () => this.props.navigator.dismissLightBox()
          });
        } else {
          this.props.navigator.resetTo({
            screen: ScreenNames.ChallengeRating.id,
            title: ScreenNames.ChallengeRating.title.toUpperCase(),
            animated: true,
            passProps: {
              opponentData: isHost
                ? this.props.challenge.guest
                : this.props.challenge.host,
              platform: this.props.challenge.platform,
              challengeId: this.props.challenge._id
            }
          });
          this._handlePopup({
            title: 'Score submitted',
            message: 'We are waiting for your opponent to confirm the winner.',
            handleClose: () => this.props.navigator.dismissLightBox()
          });
        }
      }
    }
  }

  render() {
    if (this.props.loading) {
      return <Loader />;
    }

    const { submit, challenge } = this.props;
    const { host, guest, platform, game, coin } = challenge;
    const isPlatformXbox = platform && platform.title.search(/xbox/i) !== -1;
    const isFreeChallenge = coin && coin.toString() === '0';

    return (
      <View style={Styles.container}>
        <View style={Styles.cover}>
          <Image
            resizeMode="cover"
            style={Styles.coverImage}
            source={gradient}
          />
          <View style={Styles.challengeDataHeader}>
            <View style={Styles.challengeInfoContainer}>
              <Image
                style={Styles.platformLogo}
                resizeMode="contain"
                source={isPlatformXbox ? xboxIcon : psIcon}
              />
              <View style={Styles.challengeInfo}>
                <Text style={Styles.gameTitle}>
                  {game.title}
                </Text>
                <Text style={Styles.platformName}>
                  {platform.name.toUpperCase()}
                </Text>
              </View>
            </View>
            <View style={Styles.coins}>
              <CoinAmount amount={isFreeChallenge ? 'free'.toUpperCase() : coin} />
            </View>
          </View>
        </View>
        <Text style={Styles.title}>Please select the winner</Text>
        <View style={Styles.scoreContainer}>
          {this._renderParticipant(
            host,
            this.props.challenge.hostScore,
            'host',
            isPlatformXbox
          )}
          <View style={Styles.verticalDivider} />
          {this._renderParticipant(
            guest,
            this.props.challenge.guestScore,
            'guest',
            isPlatformXbox
          )}
        </View>
        {this._renderButtons(submit)}
        <Text style={Styles.warning}>
          Warning: Submitting fake or false results will result in a permanent
          ban from Brisik eSports.
        </Text>
      </View>
    );
  }

  _renderParticipant(
    { mediaId, profileImage, xboxgamertag, ps4gamertag },
    score,
    type,
    isPlatformXbox
  ) {
    const avatar = profileImage ? { uri: profileImage } : null;
    const playerGamertag = isPlatformXbox ? xboxgamertag : ps4gamertag;
    const isWinner = this.state[type] > 0;

    return (
      <TouchableWithoutFeedback onPress={() => this._handleWinner(type)}>
        <View
          style={[Styles.userColumn, isWinner ? Styles.userColumnSelected : {}]}
        >
          <Image source={avatar} style={Styles.avatar} resizeMode="cover" />
          <Text
            style={[Styles.username, isWinner ? Styles.usernameWinner : {}]}
          >
            {mediaId}
          </Text>
          <Text
            style={[Styles.gamertag, isWinner ? Styles.gamertagWinner : {}]}
          >
            {playerGamertag ? playerGamertag.toUpperCase() : '-'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _renderButtons(submit) {
    const submitButtons = [{ title: 'Submit', action: this._submitAction }];

    const approveOrDeclineButtons = [
      { title: 'Decline', type: 'dark', action: this._declineAction },
      { title: 'Approve', action: this._approveAction }
    ];

    const actions = submit ? submitButtons : approveOrDeclineButtons;

    const buttons = actions.map(({ title, action, type }, i) => {
      return (
        <ActionButton
          title={title}
          onPress={action}
          type={type}
          key={i}
          style={Styles.button}
        />
      );
    });

    return (
      <View style={Styles.buttonsContainer}>
        {buttons}
      </View>
    );
  }

  _declineAction() {
    const title = 'Decline result';
    const description =
      'If your opponent does not accept the cancellation request, you may incur a fee';
    let buttons = [];
    if (Platform.OS === 'ios') {
      buttons = [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Decline',
          style: 'destructive',
          onPress: () => {
            this.props.declineScore(this.props.challenge._id, this.props.index);
            this.props.navigator.dismissModal({ animated: false }).then(() => {
              this.props.navigator.showModal({
                screen: ScreenNames.ChallengeDispute.id,
                title: ScreenNames.ChallengeDispute.title.toUpperCase(),
                passProps: { id: this.props.id },
                animated: true
              });
            });
          }
        }
      ];
    } else {
      buttons = [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Decline',
          style: 'destructive',
          onPress: () => {
            this.props.declineScore(this.props.challenge._id, this.props.index);
            this.props.navigator.dismissModal({ animated: false });
            this.props.navigator.showModal({
              screen: ScreenNames.ChallengeDispute.id,
              title: ScreenNames.ChallengeDispute.title.toUpperCase(),
              passProps: { id: this.props.id },
              animated: true
            });
          }
        }
      ];
    }

    Alert.alert(title, description, buttons, { cancelable: true });
  }

  _approveAction() {
    this.props.acceptScore(this.props.challenge._id, this.props.index);
    this._dismiss();
  }

  _submitAction() {
    const title = 'Game Result';
    const description = 'Are you sure?';
    const { host, guest } = this.state;
    const challengeId = this.props.challenge._id;

    if (host === guest || (host === 0 && guest === 0)) {
      this._handlePopup({
        title: 'Error',
        message: 'Please ensure that someone has won this match',
        handleClose: () => this.props.navigator.dismissLightBox()
      });
    } else {
      const form = {
        hostScore: host,
        guestScore: guest
      };

      this._handlePopup({
        title: title,
        message: description,
        buttonSet: 'inline',
        buttons: [
          {
            label: 'no',
            onPress: () => this.props.navigator.dismissLightBox(),
            type: 'dark'
          },
          {
            label: 'yes',
            onPress: () => {
              this.props.submitScore({ form, challengeId }, this.props.index);
              this.props.navigator.dismissLightBox();
            }
          }
        ]
      });
    }
  }

  _dismiss() {
    this.props.navigator.dismissModal({ animated: false });
  }

  _handleWinner(participant) {
    const newState = Object.assign({}, this.state);
    newState[participant] = 1;

    if (participant === 'host') {
      newState.guest = 0;
    } else if (participant === 'guest') {
      newState.host = 0;
    }

    this.setState(newState);
  }

  _handlePopup(props) {
    this.props.navigator.showLightBox({
      screen: ScreenNames.GeofenceRestriction.id,
      title: '',
      style: {
        backgroundBlur: 'dark',
        backgroundColor: 'rgba(50, 50, 50, 0.2)'
      },
      passProps: { ...props }
    });
  }
}

const mapStateToProps = ({ challenge, user }, props) => {
  const _challenge = props.id
    ? challenge.challenges[props.id]
    : props.challenge;

  return {
    challenge: _challenge,
    loading: challenge.detailLoading,
    settingScore: challenge.settingScore,
    user: user.userData
  };
};

const mapDispatchToProps = dispatch => ({
  submitScore: (data, index) =>
    dispatch(ChallengeActions.submitScore({ data, index })),
  acceptScore: (data, index) =>
    dispatch(ChallengeActions.acceptScore({ data, index })),
  declineScore: (data, index) =>
    dispatch(ChallengeActions.declineScore({ data, index }))
});

ChallengeScore.title = 'Results';
ChallengeScore.id = 'com.eSportsGlobalGamers.ChallengeScore';

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeScore);
