import React, { Component } from 'react';
import { View, ScrollView, Image, Text, Modal, TouchableOpacity, Share } from 'react-native';
import { connect } from 'react-redux';
import { SingleNavStyle, NavigationEventsHandler } from '../../utils/Navigator';
import * as ChallengeActions from '../../actions/Challenge/Challenge.actions';
import ChallengeExtendTime from '../../components/ChallengeExtendTime/ChallengeExtendTime';
import ChallengeParticipants from '../../components/ChallengeParticipants/ChallengeParticipants';
import ChallengeRulesHTP from '../../components/ChallengeRulesHTP/ChallengeRulesHTP';
import ChallengeButtons from '../../components/ChallengeActions/ChallengeActions';
import Loader from '../../components/Loader/Loader';
import ActionButton from '../../components/ActionButton/ActionButton';
import Styles from './ChallengeDetail.styles';
import { ScreenNames } from '../';
import * as Images from '../../utils/Images';
import Colors from '../../styles/Colors';

class ChallengeDetail extends Component {
  static navigatorStyle = SingleNavStyle;

  constructor(props) {
    super(props);
    this.state = {
      loading: props.loading,
      seconds: 30,
      time: {},
      camera: {},
      data: {
        host: null,
        platform: null,
        games: null,
        coin: ''
      },
      challengeVideo: {
        videoModal: true,
        recording: false,
        challengeUrl: null,
        whoseVideo: 'host',
        hasVideo: false,
        file: {}
      }
    };

    const options =
      (props.challenge &&
      props.challenge._id && {
        screen: 'private-chat',
        title: `${props.challenge.game.title} match`.toUpperCase(),
        chatId: props.challenge._id
      }) ||
      {};

    const navigatorEventsHandler = event =>
      NavigationEventsHandler({
        screen: this.constructor.id,
        props: options,
        navigator: props.navigator,
        event
      });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._joinChallenge = this._joinChallenge.bind(this);
    this._declineChallenge = this._declineChallenge.bind(this);
    this._renderButtons = this._renderButtons.bind(this);
    this._acceptChallenge = this._acceptChallenge.bind(this);
    this._renderPostChallengeButtons = this._renderPostChallengeButtons.bind(this);
    this._cancelChallenge = this._cancelChallenge.bind(this);
    this._extendChallenge = this._extendChallenge.bind(this);
    this._navigateToScore = this._navigateToScore.bind(this);
    this._navigateToDispute = this._navigateToDispute.bind(this);
    this._onTimerEnds = this._onTimerEnds.bind(this);
    this._renderFooter = this._renderFooter.bind(this);
    this._canExecuteAction = this._canExecuteAction.bind(this);
    this._forfeitChallenge = this._forfeitChallenge.bind(this);
  }

  componentWillMount() {
    const { challenge } = this.props;
   
    if (!challenge) {
      return;
    }
  }

  componentDidMount() {
    let { challenge } = this.props;
    if (!challenge && this.props.id) {
      this.props.getOne(this.props.id);
    }
    
  }

  componentWillReceiveProps({ challenge, loading }) {
    if (this.state.loading !== loading) {
      this.setState({ loading });
    }

    if (!challenge || !this.props.challenge) {
      return;
    }

    if (challenge.state !== this.props.challenge.state) {
      if (challenge.state === 5) {
        this._navigateToDispute({ challenge });
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    if (!nextProps.challenge && !nextProps.loading) {
      return false;
    }

    return true;
  }

  // <TouchableOpacity 
  //   onPress = {() => this._socialShare(challenge)} 
  //   style = {{
  //     position: 'absolute',
  //     top: '70%',
  //     right: '10%'
  //   }}
  // > 
  //   <Image 
  //     source={Images.shareButton}
  //     style={{ height: 60, width: 60, backgroundColor: '#00000000' }}
  //   />
  // </TouchableOpacity>

  render() {
    if (this.state.loading || !this.props.challenge) {
      return <Loader />;
    }
    
    const { challenge, onPost } = this.props;
    const { coin, host, guest, game, platform, expiration, winner, state, guestScore, hostScore, results, responseVideoUrl1, responseVideoUrl2 } = challenge;
   
    const showTimer = !onPost && state === 4;
    const isPlatformXbox = platform && platform.title.search(/xbox/i) !== -1;
    const isFreeChallenge = coin === null || coin.toString() === '0';

    return (
      <View style={Styles.container}>
        <ScrollView style={Styles.scrollView}>
          {typeof challenge.tournament === 'object' && this._renderTournamentData()}
          <View style={Styles.cover}>
            <Image
              resizeMode="cover"
              style={Styles.coverImage}
              source={Images.gradient} />
            <View style={Styles.challengeDataHeader}>
              <View style={Styles.challengeInfoContainer}>
                <Image
                  style={Styles.platformLogo}
                  resizeMode="contain"
                  source={isPlatformXbox ? Images.xboxIcon : Images.psIcon} />
                <View style={Styles.challengeInfo}>
                  <Text style={Styles.gameTitle}>
                    {game.title}
                  </Text>
                  <Text style={Styles.platformName}>
                    {platform.name.toUpperCase()}
                  </Text>
                </View>
              </View>
              <View style={[Styles.infoBarItem, Styles.coins]}>
                <Text style={Styles.coinText}>
                  {isFreeChallenge ? 'free'.toUpperCase() : `$${coin}`}
                </Text>
              </View>
            </View>
          </View>
          {!onPost && this._renderMessage(challenge)}
          {showTimer &&
            <ChallengeExtendTime
              time={expiration}
              style={Styles.timer}
              onPress={this._extendChallenge}
              showBtn={this._resolveShowBtn()}
              onEnd={this._onTimerEnds}
              endingColor={Colors.artigas}
            />}
          <ChallengeParticipants
            host={host}
            guest={guest || {}}
            style={Styles.participants}
            winner={winner}
            guestScore={guestScore}
            hostScore={hostScore}
            results={results}
            navigator={this.props.navigator}
            user={this.props.user}
            challengeVideo={responseVideoUrl1}
            challengeState={state}
            showChallengeVideo={this._handleVideoChallenge}
            platform={platform}
            game={game._id}
            isFreeChallenge={isFreeChallenge}
          />
          {this._renderFooter(onPost, challenge)}
          <ChallengeRulesHTP rules={game.rule} htp={game.howToPlay} />
        </ScrollView>
      </View>
    );
  }

  _handleVideoChallenge = () => {
    const { responseVideoUrl1, responseVideoUrl2, host, guest, state } = this.props.challenge;
    const { _id } = this.props.user;
    
    this.props.navigator.showModal({
      screen: ScreenNames.VideoCamera.id,
      title: '',
      passProps: {
        replyVideoChallengeMode: true,
        uri: responseVideoUrl1, //stitchedChallengeVideo
        uriResponse: responseVideoUrl2,
        videoImage1: host.profileImage,
        videoName1: host.mediaId,
        videoImage2: guest.profileImage,
        videoName2: guest.mediaId,
        challengeId: this.props.challenge._id,
        hostId: host._id,
        guestId: guest._id,
        userId: _id,
        challengeAccepted: state === 4
      } 
    });
  }

  _socialShare() {
    let { challenge } = this.props;
    Share.share({
      message: 'Challenge video message',
      url: challenge.stitchedChallengeVideo,
      title: 'Challenge video title'
    }, {
      // Android only:
      dialogTitle: 'Challenge video',
      /* iOS only:
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
      */
    });
  }

  _getVideoName(type)
  {
    let { user, challenge } = this.props;
    if (user._id != challenge.host._id) return challenge.host.mediaId;
    else if (challenge && challenge.guest && challenge.guest.mediaId) return challenge.host.mediaId;
  }

  _getVideoImage()
  {
    let { user, challenge } = this.props;
    if (user._id != challenge.host._id) return challenge.host.profileImage;
    else if (challenge && challenge.guest && challenge.guest.profileImage) return challenge.host.profileImage;
  }

  _renderFooter(onPost, challenge) {
    const { state, results, host, guest } = challenge;
    const isHost = this.props.user && this.props.user._id === host._id;
    const isGuest = this.props.user && guest && this.props.user._id === guest._id;
    const scoreSent = results && ((isHost && results.hostSelectedWinner) || (isGuest && results.guestSelectedWinner));

    if (onPost) {
      return this._renderPostChallengeButtons();
    }

    if (state === 3 || scoreSent || state === 2 || state === 6) {
      return null;
    }

    return this._renderButtons(challenge);
  }

  _resolveShowBtn() {
    const { user, challenge } = this.props;
    if (user && user._id) {
      const { host, guest, hostExtendRequested, guestExtendRequested, state } = challenge;

      if (host._id === user._id && hostExtendRequested) {
        return false;
      }

      if (guest && guest._id === user._id && guestExtendRequested) {
        return false;
      }

      if (state === 0 && user._id !== host._id) {
        return false;
      }

      return true;
    }
    return false;
  }

  _renderPostChallengeButtons() {
    return (
      <View style={Styles.bottomContainer}>
        <ActionButton
          title="Confirm & post"
          onPress={this.props.onPost}
          async={true}
          style={Styles.postChallengeBtn}
          loadingSize="small" />
      </View>
    );
  }

  _renderButtons(challenge) {
    const actions = {
      joinChallenge: this._joinChallenge,
      acceptChallenge: this._acceptChallenge,
      decline: this._declineChallenge,
      score: this._navigateToScore,
      dispute: this._navigateToDispute,
      cancel: this._cancelChallenge,
      forfeit: this._forfeitChallenge
    };

    const insufficientCoins = this.props.user && challenge.coin > this.props.user.cash;

    return (
      <ChallengeButtons
        challenge={challenge}
        user={this.props.user}
        actions={actions}
        navigator={this.props.navigator}
        insufficient={insufficientCoins}
      />
    );
  }

  _joinChallenge() {
    this._canExecuteAction() && this.props.join(this.props.id, this.props.index);
  }

  _acceptChallenge() {
    const insufficientCoins = this.props.user && this.props.challenge.coin > this.props.user.cash;
    if (insufficientCoins) {
      this.props.navigator.showLightBox({
        screen: ScreenNames.GeofenceRestriction.id,
        title: '',
        style: {
         backgroundBlur: 'dark',
         backgroundColor: 'rgba(50, 50, 50, 0.2)'
        },
        passProps: {
          title: 'Not enough balance!',
          message: 'Would you like to purchase more balance?',
          buttonSet: 'inline',
          buttons: [
            { label: 'cancel', onPress: () => this.props.navigator.dismissLightBox() },
            { label: 'confirm', onPress: () => {
              this.props.navigator.dismissLightBox();
              this.props.navigator.push({
                screen: ScreenNames.AddFunds.id,
                title: ScreenNames.AddFunds.title,
                animated: true,
                backButtonTitle: '',
                passProps: { stack: true }
              });
            }}
          ]
        }
      });
      return;
    } else {
      this._canExecuteAction() && this.props.accept(this.props.id, this.props.index);
    }
  }

  _declineChallenge() {
    this._canExecuteAction() &&
      this._handlePopup({
        title: 'Decline challenge',
        message: 'Are you sure you want to decline this challenge?',
        buttonSet: 'vertical',
        buttons: [
          { label: 'Cancel', onPress: () => this.props.navigator.dismissLightBox(), type: 'dark' },
          {
            label: 'Decline',
            onPress: () => {
              this.props.decline(this.props.id, this.props.index);
              this.props.navigator.dismissLightBox();
            }
          }
        ]
      });
  }

  _cancelChallenge() {
    this._canExecuteAction() &&
      this._handlePopup({
        title: 'Cancel challenge',
        message: 'Are you sure you want to cancel this challenge?',
        buttonSet: 'inline',
        buttons: [
          { label: 'no', onPress: () => this.props.navigator.dismissLightBox(), type: 'dark' },
          {
            label: 'yes',
            onPress: () => {
              this.props.cancel(this.props.id, this.props.index);
              this.props.navigator.dismissLightBox();
            }
          }
        ]
      });
  }

  _forfeitChallenge() {
    this._canExecuteAction() &&
      this._handlePopup({
        title: 'Forfeit challenge',
        message: 'Are you sure you want to forfeit this challenge?',
        buttonSet: 'inline',
        buttons: [
          { label: 'no', onPress: () => this.props.navigator.dismissLightBox(), type: 'dark' },
          {
            label: 'yes',
            onPress: () => {
              this.props.forfeit(this.props.id, this.props.index);
              this.props.navigator.dismissLightBox();
            }
          }
        ]
      });
  }

  _extendChallenge() {
    this._canExecuteAction() &&
      this._handlePopup({
        title: 'Extend Challenge',
        message: 'This will extend the challenge 30 minutes',
        buttonSet: 'inline',
        buttons: [
          { label: 'no', onPress: () => this.props.navigator.dismissLightBox(), type: 'dark' },
          {
            label: 'yes',
            onPress: () => {
              this.props.extend(this.props.id, this.props.index);
              this.props.navigator.dismissLightBox();
            }
          }
        ]
      });
  }

  _navigateToScore() {
    const accepted = this.props.challenge.guestScore === this.props.challenge.hostScore;

    this._canExecuteAction() &&
      this.props.navigator.push({
        screen: ScreenNames.ChallengeScore.id,
        title: ScreenNames.ChallengeScore.title.toUpperCase(),
        backButtonTitle: '',
        passProps: { id: this.props.id, submit: accepted, index: this.props.index },
        animated: true
      });
  }

  _navigateToDispute(data) {
    this._canExecuteAction() &&
      this.props.navigator.showModal({
        screen: ScreenNames.ChallengeDispute.id,
        title: ScreenNames.ChallengeDispute.title.toUpperCase(),
        passProps: data,
        animated: true
      });
  }

  _onTimerEnds() {
    this.props.navigator.popToRoot({
      animated: true,
      passProps: { reload: true }
    });
    this._handlePopup({
      title: 'Challenge expired',
      message: 'This challenge has expired!',
      handleClose: () => this.props.navigator.dismissLightBox()
    });

    this.props.get();
  }

  _renderMessage({ state, host, guest, results }) {
    const { user } = this.props;
    const isHost = this.props.user && this.props.user._id === host._id;
    const isGuest = this.props.user && guest && this.props.user._id === guest._id;
    const scoreSent = (isHost && results.hostSelectedWinner) || (isGuest && results.guestSelectedWinner);
    let content = null;

    if (user && user._id) {
      if (state === 0 && guest && isHost) {
        content = <Text style={Styles.awaitingText}>{'Awaiting answer from invitation.'.toUpperCase()}</Text>;
      }

      if (state === 4 && scoreSent) {
        content = <Text style={Styles.awaitingText}>{'Pending score by your opponent'.toUpperCase()}</Text>;
      }

      if (state === 3) {
        content = <Text style={Styles.awaitingText}>{'Completed'.toUpperCase()}</Text>;
      }

      if (state === 5) {
        content = (
          <View>
            <Text style={Styles.awaitingText}>{'Your match results are in dispute'.toUpperCase()}</Text>
            <Text style={Styles.disputeText}>
              {'Brisik will contact you within 24 hours. Please'}
              {'\n'}
              {'make sure you can submit photo or video evidence\nalong with your explanation to our staff.'}
            </Text>
          </View>
        );
      }

      if (state === 2 || state === 6) {
        content = <Text style={Styles.awaitingText}>{'Canceled'.toUpperCase()}</Text>;
      }

      if (content !== null) {
        return (
          <View style={Styles.statusContainer}>
            <Text style={Styles.statusText}>{'status:'.toUpperCase()}</Text>
            {content}
          </View>
        );
      }
    }
    return null;
  }

  _renderTournamentData() {
    const { tournament: { title, stage } } = this.props.challenge;
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

  _canExecuteAction() {
    const { user } = this.props;

    if (user && user._id) {
      return true;
    }

    this.props.navigator.showModal({
      screen: ScreenNames.SignIn.id,
      title: ScreenNames.SignIn.title.toUpperCase()
    });

    return false;
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

ChallengeDetail.title = 'Challenge';
ChallengeDetail.id = 'com.eSportsGlobalGamers.challengeDetail';

const mapStateToProps = ({ challenge, user, chat, notification }, props) => {
  if (!challenge.challenges) {
    return { loading: true };
  }

  const _challenge = props.id ? challenge.challenges[props.id] : props.challenge;

  return {
    challenge: _challenge,
    loading: challenge.detailLoading,
    user: user.userData,
    sessionToken: user.sessionToken
  };
};

const mapDispatchToProps = dispatch => ({
  get: () => dispatch(ChallengeActions.refresh()),
  join: (id, index) => dispatch(ChallengeActions.join({ id, index })),
  accept: (id, index) => dispatch(ChallengeActions.accept({ id, index })),
  decline: (id, index) => dispatch(ChallengeActions.decline({ id, index })),
  cancel: (id, index) => dispatch(ChallengeActions.cancel({ id, index })),
  extend: (id, index) => dispatch(ChallengeActions.extend({ id, index })),
  getOne: id => dispatch(ChallengeActions.getOne(id)),
  forfeit: (id, index) => dispatch(ChallengeActions.forfeit({ id, index }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeDetail);
