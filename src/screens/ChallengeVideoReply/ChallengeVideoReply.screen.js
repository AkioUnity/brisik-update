import React, { Component } from 'react';
import { View, ScrollView, Image, Text, Modal, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { SingleNavStyle, NavigationEventsHandler } from '../../utils/Navigator';
import * as ChallengeActions from '../../actions/Challenge/Challenge.actions';
import ChallengeExtendTime from '../../components/ChallengeExtendTime/ChallengeExtendTime';
import ChallengeParticipants from '../../components/ChallengeParticipants/ChallengeParticipants';
import ChallengeRulesHTP from '../../components/ChallengeRulesHTP/ChallengeRulesHTP';
import ChallengeButtons from '../../components/ChallengeActions/ChallengeActions';
import Loader from '../../components/Loader/Loader';
import ActionButton from '../../components/ActionButton/ActionButton';
import Styles from './ChallengeVideoReply.styles';
import { ScreenNames } from '../';
import * as Images from '../../utils/Images';
import Colors from '../../styles/Colors';
import { RNCamera } from 'react-native-camera';

class ChallengeVideoReply extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props);
    this._startCountdown = this._startCountdown.bind(this);
    this._countDown = this._countDown.bind(this);
    this.timer = 0;
    this.state = {
      loading: props.loading,
      showingChallengeVideo: false,
      showOptionsModal: false,
      showReplyVideo: false,
      challenge: {
        videoModal: false,
        recording: false,
        challengeUrl: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
        hasVideo: false,
        file: {}
      },
      showingLoader: false,
      seconds: 30,
      time: {},
      camera: {},
      data: {
        host: null,
        platform: null,
        games: null,
        coin: ''
      },
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


  }

  componentWillMount() {
    const { challenge } = this.props;

    if (!challenge) {
      return;
    }
  }

  componentDidMount() {
    if (!this.props.challenge && this.props.id) {
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

  render() {
    if (this.state.loading || !this.props.challenge) {
      return <Loader />;
    }
    let { showingChallengeVideo, showOptionsModal } = this.state
    const { challenge, onPost } = this.props;
    const { coin, host, guest, game, platform, expiration, winner, state, guestScore, hostScore, results, responseVideoUrl2 } = challenge;

    const gameLogo = { uri: game.logoUrl.replace(/^http:/, 'https:') };
    const platformLogo = { uri: platform.logo.replace(/^http:/, 'https:') };
    const platformColor = { backgroundColor: platform.color || '#fff' };
    const showTimer = !onPost && state === 4;
    const isPlatformXbox = platform && platform.title.search(/xbox/i) !== -1;
    const isFreeChallenge = coin === null || coin.toString() === '0';

    return (
      <View style={Styles.container}>

      </View>
    );
  }


  /*---- everything related to reply video recording ----*/
  _resetVideo()
  {
    clearInterval(this.timer)
    this.setState({
      challenge: {
        videoModal: true,
        recording: false,
        challengeUrl: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
        hasVideo: false,
        file: {}
      },
      seconds: 30,
      time: {},
      camera: {},
    })
    let timeLeftVar = this._secondsToTime(30);
    this.setState({ time: timeLeftVar });
    this.timer = 0
  }

  _recordButton(camera, status)
  {
    let { challenge } = this.state
    if (!challenge.recording)
    {
      return (
        <TouchableOpacity onPress={() => this._startVideo(camera)} style = {{ marginBottom: 40 }}>
          <Image
            source={Images.videoRecord}
            style={{ height: 60, width: 60, backgroundColor: '#00000000' }}
          />
        </TouchableOpacity>
      )
    }
    else if (challenge.recording)
    {
      return (
        <TouchableOpacity onPress={() => this._stopVideo(camera)} style = {{ marginBottom: 40 }}>
          <Image
            source={Images.videoRecordActive}
            style={{ height: 60, width: 60, backgroundColor: '#00000000' }}
          />
        </TouchableOpacity>
      )
    }
    else
    {
      return (
        <TouchableOpacity onPress={() => this._saveChallengeVideo()} style = {{ marginBottom: 30, alignSelf: 'flex-end', marginRight: 30 }}>
          <Image
            source={Images.videoNext}
            style={{ height: 60, width: 60, backgroundColor: '#00000000' }}
          />
        </TouchableOpacity>
      )
    }
  }

    _startCountdown() {
      if (this.timer == 0) {

        this.timer = setInterval(this._countDown, 1000);
      }
    }

    _secondsToTime(secs){
      let hours = Math.floor(secs / (60 * 60));

      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);

      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);

      let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
      };
      return obj;
    }

    _countDown() {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds - 1;

      this.setState({
        time: this._secondsToTime(seconds),
        seconds: seconds,
      });

      // Check if we're at zero.
      if (seconds == 0) {

        clearInterval(this.timer);
        this._stopVideo()
      }
    }
    _stopVideo(camera) {
      this.state.camera.stopRecording()
    }



    /*---  you made it -----*/

  _showChallengeVideo()
  {
    this.setState({ showingChallengeVideo: true })
  }

  _getVideoName()
  {
    let { user, challenge } = this.props

    if (user._id != challenge.host._id) return challenge.guest.mediaId
    else return challenge.guest.mediaId
  }

  _getVideoImage()
  {
    let { user, challenge } = this.props
    if (user._id != challenge.host._id) return challenge.guest.profileImage
    else return challenge.guest.profileImage
  }

  _showOptions()
  {
    this.props.navigator.showLightBox({
      screen: ScreenNames.VideoChallengeReply.id,
      title: '',
      style: {
       backgroundBlur: 'dark',
       backgroundColor: 'rgba(50, 50, 50, 0.2)'
      },
      passProps: {
        handleClose: () => this._closeLightboxAndModal()
      }
    });
  }

  _closeLightboxAndModal()
  {
    this.props.navigator.dismissLightBox()
    this.setState({ showingChallengeVideo: false })
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

ChallengeVideoReply.title = 'ChallengeVideoReply';
ChallengeVideoReply.id = 'com.eSportsGlobalGamers.challengeVideoReply';

const mapStateToProps = ({ challenge, user, chat, notification }, props) => {
  if (!challenge.challenges) {
    return { loading: true };
  }

  const _challenge = props.id ? challenge.challenges[props.id] : props.challenge;

  return {
    challenge: _challenge,
    loading: challenge.detailLoading,
    user: user.userData
  };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeVideoReply);
