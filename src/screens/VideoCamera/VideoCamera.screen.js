import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Alert, ActivityIndicator, Dimensions, Platform } from 'react-native';
import { NavigationEventsHandler } from '../../utils/Navigator';
import { challenge as ChallengeActions } from '../../actions/index';
import * as Images from '../../utils/Images';
import Endpoints from '../../utils/Endpoints';
import { connect } from 'react-redux';
import { RNCamera } from 'react-native-camera';
import LinearGradient from "react-native-linear-gradient";
// import Video from "react-native-video";
// import { BlurView } from "react-native-blur";
import axios from 'axios';
import Colors from '../../styles/Colors';
import { ScreenNames } from '../';
import Fonts from '../../styles/Fonts';

class VideoCamera extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  constructor(props) {
    super(props);

    const navigatorEventsHandler = event =>
      NavigationEventsHandler({
        screen: this.constructor.id,
        navigator: props.navigator,
        event
      });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this.timer = 0;
    this.axios = axios;
    this.xhr;
    this.state = {
      flash: 'off',
      zoom: 0,
      autoFocus: 'on',
      depth: 0,
      type: 'front',
      whiteBalance: 'auto',
      ratio: '16:9',
      seconds : 30,
      uri : null,
      hasSwitched: false,
      onlyPlayerMode: false,
      isBuffering : !!props.uri,
      showOptionsModal: false,
      isVideoResponse: false,
      paused: false,
      replyVideoChallengeMode: false,
      recordOptions: {
        mute: false,
        maxDuration: 30,
        quality: RNCamera.Constants.VideoQuality['480p'],
      },
      isRecording: false
    };
  }

  componentDidMount() {
    const { replyVideoChallengeMode, userId, hostId, guestId, uri, uriResponse, challengeAccepted, videoImage1, videoName1 } = this.props;
    if (replyVideoChallengeMode && uri) {
      this.setState({
        uri,
        videoImage1,
        videoName1,
        uriResponse,
        replyVideoChallengeMode,
        onlyPlayerMode: (userId === hostId && (!uriResponse || uri && uriResponse)) || (userId === guestId && uri && uriResponse) || challengeAccepted
      });
    }
  }

  _takeVideo = async () => {
    if (this.camera) {
      if (this.state.isRecording) {
        this.camera.stopRecording();
        clearInterval(this.timer);
        this.props.unsetUploadingVideo();
        this.setState({ isRecording: false, seconds : 30 }); //stops Recording and follows with await promise in try
        return false;
      }

      try {
        this._startCountDown();
        const promise = this.camera.recordAsync(this.state.recordOptions);
        if (promise) {
          this.setState({ isRecording: true });
          const data = await promise;

          this.setState({
            isRecording: false,
            seconds : 30,
            uri: data.uri
          });
          this._saveVideoChallenge();
        }
      } catch (e) {
        Alert.alert(e);
      }
    }
  };

  _saveVideoChallenge = () => {
    let url;
    const videoSavedPromiseActions = {};
    this.videoSavedPromise = new Promise((resolve, reject) => {
      videoSavedPromiseActions.resolve = resolve;
      videoSavedPromiseActions.reject = reject;
    });
    const { replyVideoChallengeMode } = this.props;
    const { uri } = this.state;
    const urlArray = uri.split('/');
    const file = {
      uri: uri,
      name: urlArray[urlArray.length - 1],
      type: `video/${urlArray[urlArray.length - 1][1]}`
    };
    this.props.setUploadingVideo();
    axios.get(Endpoints.Users.requestSignedUrl(file.type, file.name))
    .then(result => {
      let signedUrl = result.data.data.signedRequest;
      url = result.data.data.url;

      this.xhr = new XMLHttpRequest();
      this.xhr.open('PUT', signedUrl);
      this.xhr.setRequestHeader('Content-Type', file.type);
      this.xhr.onreadystatechange = () => {

        if(this.xhr.readyState === 4){
          if(this.xhr.status === 200){
            this.props.unsetUploadingVideo();
            this.props.setVideoChallengeUri(url);
            if (replyVideoChallengeMode) {
              videoSavedPromiseActions.resolve(url);
            }
          }
        }
      };
      this.xhr.onerror = () => {
        videoSavedPromiseActions.reject();

      };
      this.xhr.send(file);
    }).catch(err => {
      videoSavedPromiseActions.reject();
      this._handleRequestError(err);
    });
  }

  _handleRequestError = (err) => {
    this.props.navigator.showLightBox({
      screen: ScreenNames.GeofenceRestriction.id,
      title: '',
      style: {
        backgroundBlur: 'dark',
        backgroundColor: 'rgba(50, 50, 50, 0.2)'
      },
      passProps: {
        title: 'Error',
        message: 'Something went wrong while uploading the video. Please try again',
        handleClose: () => this.props.navigator.dismissLightBox()
      }
    });

    this.props.unsetUploadingVideo();
  }

  _startCountDown = () => {
    if (this.state.seconds === 30) {
      this.timer = setInterval(this._countDown, 1000);
    }
  }

  _countDown = () => {
    const { seconds } = this.state;

    this.setState({
      seconds : seconds - 1
    });

    if (seconds <= 0) {
      clearInterval(this.timer);
    }
  }

  _submitVideoChallenge = () => {
    const { challengeId, uriVideoChallenge, replyVideoChallengeMode } = this.props;
    this.setState({ paused: true, isReplySubmiting: true });
    const onSuccess = (uriVideoChallenge = uriVideoChallenge) => {
      this.props.setVideoChallengeResponse({id: challengeId , url: uriVideoChallenge}, () => {
        this.props.setVideoChallengeUri(null);
        this.props.navigator.showLightBox({
          screen: ScreenNames.GeofenceRestriction.id,
          title: '',
          style: {
            backgroundBlur: 'dark',
            backgroundColor: 'rgba(50, 50, 50, 0.2)'
          },
          passProps: {
            title: 'Video Challenge Sent!',
            message: 'Your video reply will be sent to your opponent. When the challenge is completed, you can view and share your challenge recap!',
            handleClose: () => { this.props.navigator.dismissModal(); this.props.navigator.dismissLightBox(); }
          }
        });
      });
    };

    if (!replyVideoChallengeMode) {
      this.props.navigator.dismissModal();
    } else {
      if (uriVideoChallenge) {
        onSuccess(uriVideoChallenge);
      } else {

        this.videoSavedPromise.then((uriVideoChallenge) => {
          debugger
          onSuccess(uriVideoChallenge);
        });
      }
    }
  }

  _closeVideoPlayer = () => {
    if (this.props.isUploadingVideo) {
      this.xhr.abort();
      this.props.setVideoChallengeUri(null);
    }
    this.setState({
      uri : null
    });

    if (this.state.onlyPlayerMode) {
      this.props.navigator.dismissModal();
    }
  }

  _onLoad = () => {
    this.setState({ isBuffering: false });
  }

  _onEnd = () => {
    const { videoImage2, videoName2 } = this.props;
    const { uri, uriResponse, onlyPlayerMode, hasSwitched, replyVideoChallengeMode } = this.state;

    if (!onlyPlayerMode && replyVideoChallengeMode) {
      this.setState({
        showOptionsModal: true,
        paused: true
      });
    }

    if (uriResponse && onlyPlayerMode && !hasSwitched) {
      this.setState({
        isBuffering: true,
        uri: uriResponse,
        uriResponse: uri,
        videoImage1: videoImage2,
        videoName1: videoName2,
        hasSwitched: true
      });
    }
  }

  _replyVideoChallengeOptions = () => {
    this.setState({
      showOptionsModal: true,
      paused: true
    });
  }

  _onReplyVideoChallenge = () => {
    this.setState({
      uri: null,
      isVideoResponse: true,
      showOptionsModal: false,
      replyVideoChallengeMode: false,
      paused: false,
    });
  };

  _renderLoader = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          backgroundColor: 'rgba(0,0,0,0.8)'
        }}
      >
        <ActivityIndicator size="small" color="#fff" />
      </View>
    );
  }

  _renderVideoOptions = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 50, left: 50, bottom: 100, right: 50, zIndex: 5, borderRadius: 20}}>
        <View style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, borderRadius: 20, backgroundColor: `rgba(0,0,0, ${Platform.OS === 'ios' ? '.3' : '.7'})`}}/>
        {/*<BlurView blurType='dark' style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, borderRadius: 20}}/>*/}
        <TouchableOpacity onPress={() => this._onReplyVideoChallenge()} style = {{flexDirection: 'column', margin: 25}}>
          <Image
            source={Images.videoReply}
            style={{ height: 70, width: 70, backgroundColor: '#00000000' }}
          />
          <Text style = {{color: 'white',
            fontFamily: Fonts.get('regular'),
            textAlign: 'center',
            marginTop: 15,
            fontSize: 21}}>
            REPLY
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigator.dismissModal()} style = {{flexDirection: 'column', margin: 25}}>
          <Image
            source={Images.buttonVideoClose}
            style={{ height: 70, width: 70, backgroundColor: '#00000000' }}
          />
          <Text style = {{color: 'white',
            fontFamily: Fonts.get('regular'),
            textAlign: 'center',
            marginTop: 15,
            fontSize: 21}}>CLOSE</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderVideoPlayer = () => {
    const { uri, paused, showOptionsModal, replyVideoChallengeMode, onlyPlayerMode, videoImage1, videoName1 } = this.state;

    return (
      <View style={replyVideoChallengeMode && {height: Dimensions.get('window').height , width: Dimensions.get('window').width, paddingHorizontal: 50, paddingTop: 50, paddingBottom: 100, backgroundColor: Colors.paysandu}}>
        {replyVideoChallengeMode &&
          <LinearGradient colors={['#000000', 'rgba(0,0,0,.5)', 'rgba(0,0,0,.01)']} style={{ position: 'absolute', top: 50, left: 50, right: 50, zIndex: 1, height: 50, borderTopRightRadius: 20, borderTopLeftRadius: 20}}>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>
              <Image source = {{ uri: videoImage1 }} style = {{height: 28, width: 28, borderRadius: 15}} />
              <Text style = {{fontSize: 20, fontFamily: Fonts.get('regular'), color: 'white', marginLeft: 8}}>{videoName1}</Text>
            </View>
          </LinearGradient>
        }
        <View style={replyVideoChallengeMode && {overflow: 'hidden', borderRadius: 20}}>
          {/*<Video*/}
            {/*source={{uri}}*/}
            {/*rate={1.0}*/}
            {/*volume={1.0}*/}
            {/*resizeMode='cover'*/}
            {/*repeat={!replyVideoChallengeMode}*/}
            {/*paused={paused}*/}
            {/*onLoad={this._onLoad}*/}
            {/*onEnd={this._onEnd}*/}
            {/*style={[replyVideoChallengeMode && {borderRadius: 20}, {height: '100%', width: '100%'}]}/>*/}
        </View>
        {!paused && <TouchableOpacity onPress={!replyVideoChallengeMode || onlyPlayerMode ? this._closeVideoPlayer : this._replyVideoChallengeOptions} style={!replyVideoChallengeMode ? {position: 'absolute', top: 40, right: 30} : {alignItems: 'center', marginTop: 15}}>
          <Image
            source={Images.close}
            style={{height: 20, width: 20, backgroundColor: '#00000000'}}
          />
        </TouchableOpacity>}
        {!replyVideoChallengeMode &&
          <TouchableOpacity onPress={this._submitVideoChallenge} style={{position: 'absolute', bottom: 30, right: 15}}>
            <Image
              source={Images.videoNext}
              style={{height: 60, width: 60, backgroundColor: '#00000000'}}
            />
          </TouchableOpacity>
        }
        {showOptionsModal && !onlyPlayerMode && this._renderVideoOptions()}
      </View>
    );
  }

  render() {
    const { isRecording, seconds, uri, isBuffering, isReplySubmiting } = this.state;
    return (
      <View style={{flex: 1}}>
        {!uri &&
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {{height: '100%', width: '100%'}}
            type={this.state.type}
            flashMode={RNCamera.Constants.FlashMode.on}
            autoFocus={this.state.autoFocus}
            zoom={this.state.zoom}
            whiteBalance={this.state.whiteBalance}
            ratio={this.state.ratio}
            focusDepth={this.state.depth}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
          >
            <View style = {{flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'flex-end'}}>
              {!isRecording? (
                <TouchableOpacity onPress={this.props.navigator.dismissModal} style={{ position: 'absolute', top: 40, right: 30 }}>
                  <Image
                    source={Images.close}
                    style={{ height: 20, width: 20, backgroundColor: '#00000000' }}
                  />
                </TouchableOpacity>
              ) : (
                <Text style={{color: 'white', fontSize: 25, position: 'absolute', top: 40}}>{seconds}</Text>
              )}
            </View>
            <View style = {{flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'flex-end'}}>
              <TouchableOpacity onPress={this._takeVideo} style={{ marginBottom: 40 }}>
                {isRecording ?
                  <Image
                    source={Images.videoRecordActive}
                    style={{height: 60, width: 60, backgroundColor: '#00000000'}}
                  /> :
                  <Image
                    source={Images.videoRecord}
                    style={{height: 60, width: 60, backgroundColor: '#00000000'}}
                  />
                }
              </TouchableOpacity>
            </View>
        </RNCamera>
      }
      {!!uri && this.renderVideoPlayer()}
      {(isBuffering || isReplySubmiting) && this._renderLoader()}
    </View>
    );
  }
}

VideoCamera.title = 'Video Camera';
VideoCamera.id = 'com.eSportsGlobalGamers.videoCamera';

const mapStateToProps = ({challenge}) => {
  return {
    isUploadingVideo: challenge.isUploadingVideo,
    uriVideoChallenge: challenge.uriVideoChallenge
  };
};

const mapDispatchToProps = {
  setUploadingVideo: ChallengeActions.setUploadingVideo,
  unsetUploadingVideo: ChallengeActions.unsetUploadingVideo,
  setVideoChallengeUri: ChallengeActions.setVideoChallengeUri,
  setVideoChallengeResponse: ChallengeActions.setVideoChallengeResponse
};

export default connect(mapStateToProps,mapDispatchToProps)(VideoCamera);
