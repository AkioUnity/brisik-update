import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, TouchableHighlight, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { connect } from 'react-redux';
import moment from 'moment';
import { ScreenNames } from '../index';
import ActionButton from '../../components/ActionButton/ActionButton';
import Inputs from '../../components/Inputs/Inputs';
import { challenge as ChallengeActions } from '../../actions/index';
import Colors from '../../styles/Colors';
import { SingleNavStyle, NavigationEventsHandler } from '../../utils/Navigator';
import Styles from './PostChallenge.styles';
import MultiplePicker from '../../components/MultiplePicker/MultiplePicker';
import * as Images from '../../utils/Images';

const challengeTypes = [{ label: 'Free', value: 0 }, { label: 'Paid', value: 1 }];

class PostChallenge extends Component {
  static navigatorStyle = SingleNavStyle;
  static navigatorButtons = {
    leftButtons: [{
      icon: Images.backButton,
      disableIconTint: true,
      id: '@nav/editConfirm'
    }],
    rightButtons: []
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

    const hasOpponent = typeof this.props.opponent !== 'undefined' && this.props.opponent._id;
  
    this.state = {
      form: {
        opponent: {
          value: ''
        },
        platform: {
          value: ''
        },
        games: {
          value: ''
        },
        coins: {
          value: 1
        },
        type: {
          value: ''
        }
      },
      challenge: {
        recording: false,
        challengeUrl: null,
        hasVideo: false,
      },
      data: {
        host: null,
        platform: null,
        games: null,
        coin: ''
      },
      modal: null,
      options: [{ label: 'Direct Challenge', value: 0 }, { label: 'Open Challenge', value: 1 }],
      optionValue: hasOpponent ? 0 : 1,
      gameList: [],
      originGameList: this.props.gameList,
      platformList: [],
      originPlatformList: this.props.platformList,
      opponentData: null,
      hasOpponent: hasOpponent
    };

    this._handleInputPress = this._handleInputPress.bind(this);
    this._onModalValueChange = this._onModalValueChange.bind(this);
    this._renderPicker = this._renderPicker.bind(this);
    this._onGamesList = this._onGamesList.bind(this);
    this._onPlatformList = this._onPlatformList.bind(this);
    this._postChallenge = this._postChallenge.bind(this);
    this._handleGameInputPress = this._handleGameInputPress.bind(this);
    this._setOpponentData = this._setOpponentData.bind(this);
    this._renderRadios = this._renderRadios.bind(this);
    this._seeDetail = this._seeDetail.bind(this);
    this._opponentFiled = this._opponentFiled.bind(this);
    this._filterSearch = this._filterSearch.bind(this);
    this._onChangeCoin = this._onChangeCoin.bind(this);
    this._onCoinBlur = this._onCoinBlur.bind(this);
  }

  componentWillMount() {
    if (this.props.defaultType && this.props.defaultType === 'my') {
      this.setState({
        optionValue: 0,
        opponentData: null
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      platformList: this._onPlatformList()
    });

    if (nextProps.postSuccess) {
      this.props.navigator.popToRoot({
        animated: true
      });

      return this._renderError('Success!', 'Challenge created!');
    } else if (nextProps.postError && nextProps.postError !== '' && nextProps.postError !== this.props.postError) {
      this.props.navigator.pop();

      return this._renderError('Ups, something went wrong!', nextProps.postError);
    }
  }

  componentDidMount() {
    const { user } = this.props;
    const newState = Object.assign({}, this.state);
    const thisYear = new Date().getFullYear();
    const userIsUnderage = user.dob && (thisYear - user.dob.year) < 21;
  
    newState.platformList = this._onPlatformList();

    if (this.props.opponent) {
      newState.opponentData = this.props.opponent;
    }
    if (userIsUnderage) {
      newState.isUnderage = userIsUnderage;
      newState.form.type.value = 0;
    }

    this.setState(newState);
  }

  render() {
    const {
      form,
      modal,
      options,
      optionValue,
      gameList,
      platformList,
      isUnderage,
    } = this.state;

    const coins = form.coins.value ? form.coins.value.toString() : '';
    const formIsCompleted = form.platform.value !== '' && form.games.value !== '' && form.type.value !== '';

    return (
      <View style={Styles.container}>
        <KeyboardAwareScrollView
          style={Styles.scrollView}
          getTextInputRefs={() => {
            return typeof this.coinInput !== 'undefined' ? [this.coinInput] : []
          }}
        >
          {this._renderRadios(options)}
          <View style={Styles.gameContent}>
            <View style={Styles.inputContent}>
              {optionValue === 0 && this._opponentFiled()}
              <View style={Styles.formRow}>
                <View style={Styles.formRowLabel}>
                  <Text style={Styles.formRowLabelText}>
                    {'Platform'}
                  </Text>
                </View>
                <View style={Styles.formRowInput}>
                  <Inputs.Touchables
                    type="options"
                    values={platformList}
                    selected={form.platform.value}
                    onPress={modalData => this._onModalValueChange('platform', modalData)}
                  />
                </View>
              </View>
              <View style={Styles.formRow}>
                <View style={Styles.formRowLabel}>
                  <Text style={Styles.formRowLabelText}>
                    {'Game'}
                  </Text>
                </View>
                <View style={Styles.formRowInput}>
                  <Inputs.Select
                    type="options"
                    value={form.games.value}
                    options={gameList}
                    onPress={modalData => this._handleGameInputPress('games', modalData)}
                    placeholder="Select a Game"
                  />
                </View>
              </View>
              <View style={Styles.formRow}>
                <View style={Styles.formRowLabel}>
                  <Text style={Styles.formRowLabelText}>
                    {'Type'}
                  </Text>
                </View>
                <View style={Styles.formRowInput}>
                  <Inputs.Touchables
                    type="options"
                    selected={form.type.value}
                    values={!isUnderage ? challengeTypes : [{ label: 'Free', value: 0 }]}
                    onPress={modalData => this._onModalValueChange('type', modalData)}
                  />
                </View>
              </View>
              {form.type.value === 1 && !isUnderage &&
                <View style={Styles.formRow}>
                  <View style={Styles.formRowLabel}>
                    <Text style={Styles.formRowLabelText}>
                      {'$'}
                    </Text>
                  </View>
                  <View style={[Styles.formRowInput, Styles.formRowCoins]}>
                    <TextInput
                      ref={coinInput => {
                        this.coinInput = coinInput;
                      }}
                      style={Styles.textInput}
                      returnKeyType="send"
                      autoCorrect={true}
                      autoCapitalize="sentences"
                      onChangeText={this._onChangeCoin}
                      value={coins}
                      selectionColor={Colors.rivera}
                      underlineColorAndroid={'transparent'}
                      keyboardType="numeric"
                      onBlur={this._onCoinBlur}
                    />
                    <Image style={Styles.inputChevron} source={Images.chevronRight} />
                  </View>
                </View>
              }
              {optionValue === 0 && form.type.value === 1 && !isUnderage && 
                <View style={Styles.formRow}>
                  <View style={Styles.formRowLabel}>
                    <Text style={Styles.formRowLabelText}>
                      
                      {'Record Video Challenge'}
                    </Text>
                  </View>
                  {this.detailsImage()}
                  <View style={Styles.formRowInput}>
                    <Inputs.Select
                      type="options"
                      value=""
                      options={gameList}
                      onPress={() => this.props.navigator.showModal({
                        screen: 'com.eSportsGlobalGamers.videoCamera'})}
                      placeholder=""
                    />
                  </View>
                </View>
              }
              
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={Styles.buttonContainer}>
          <ActionButton
            type={!formIsCompleted ? 'dark' : ''}
            title="Next"
            onPress={this._seeDetail}
            style={Styles.actionButton}
          />
        </View>
        {modal && this._renderPicker(modal)}
        { this._showLoader() &&
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
        }
      </View>
    );
  }

  _onCoinBlur() {
    if (!this.state.form.coins.value) {
      this._onChangeCoin(1);
    }
  }

  _showLoader() {
    if (this.props.isUploadingVideo) 
      return true;
    else
      return false;
  }

  detailsImage() {
    if (this.props.uriVideoChallenge) 
      return <Image style={Styles.videoAttached} source={Images.videoAttached} />
    else
      return <View />
  }

  _handleRecordVideoChallenge() {
    this.props.navigator.showModal({
      screen: ScreenNames.VideoCamera.id,
      title: '',
      passProps: {}
    });
  }

  _onChangeCoin(data) {
    this.setState(state => ({
      modal: null,
      form: {
        ...state.form,
        coins: { value: parseInt(data) || null }
      }
    }));
  }

  _opponentFiled() {
    const noOpponentSet = !this.state.opponentData && !this.props.opponent;
    const content = (
      <TouchableOpacity
        onPress={() =>
          this.props.navigator.push({
            screen: ScreenNames.SearchUsers.id,
            title: ScreenNames.SearchUsers.title.toUpperCase(),
            backButtonTitle: '',
            passProps: {
              filter: this._filterSearch,
              setOpponent: this._setOpponentData,
              challenging: true
            }
          })}
      >
        <Text style={[Styles.opponentInput, !noOpponentSet && Styles.opponentInputSet]}>
          {noOpponentSet
            ? 'Search for Player'
            : this.state.opponentData ? this.state.opponentData.mediaId : this.props.opponent.mediaId}
        </Text>
        <Image style={Styles.inputChevron} source={Images.chevronRight} />
      </TouchableOpacity>
    );

    return (
      <View style={Styles.formRow}>
        <View style={Styles.formRowLabel}>
          <Text style={Styles.formRowLabelText}>
            {'Opponent'}
          </Text>
        </View>
        <View style={Styles.containerContent}>
          {content}
        </View>
      </View>
    );
  }

  _handleInputPress(inputName, modalData) {
    const { form } = this.state;

    if (inputName === 'platform') {
      form.games.value = '';
      this.setState({
        modal: inputName,
        form,
        modalData
      });
      this.setState({ form });
    } else {
      this.setState({
        modal: inputName,
        modalData
      });
    }
  }


  _handleGameInputPress(inputName, modalData) {
    const { form, originPlatformList, originGameList } = this.state;

    if (form.platform.value === '' || form.platform.value === 'select') {
      this.setState({
        modal: null,
        modalData
      });
      this.props.navigator.showLightBox({
        screen: ScreenNames.GeofenceRestriction.id,
        title: '',
        style: {
          backgroundBlur: 'dark',
          backgroundColor: 'rgba(50, 50, 50, 0.2)'
        },
        passProps: {
          title: 'Error!',
          message: 'You have to pick a platform before continue',
          handleClose: () => this.props.navigator.dismissLightBox()
        }
      });
    } else {
      const platform = originPlatformList.find(platform => {
        return platform._id === form.platform.value;
      });

      const gamelistForm = [];

      let platformGame = null;
      platform.games.map(id => {
        platformGame = originGameList.find(game => {
          return game._id === id;
        });
        gamelistForm.push({
          label: platformGame.title,
          value: platformGame._id
        });
      });

      modalData.values = gamelistForm;

      this.setState({
        modal: inputName,
        gameList: gamelistForm,
        modalData
      });
    }
  }

  _onGamesList() {
    const originGameList = this.props.gameList;
    const gameList = originGameList.map(game => {
      return {
        label: game.title,
        value: game._id
      };
    });

    return gameList;
  }

  _onPlatformList() {
    const originPlatformList = this.props.platformList;

    const platformList = originPlatformList.map(platform => {
      return {
        label: platform.title,
        value: platform._id
      };
    });

    return platformList;
  }

  _renderPicker(type) {
    const { modalData } = this.state;
    let content = null;

    if (modalData.values && modalData.values.length > 0) {
      content = (
        <View>
          {modalData.values.map(({ label, value }, i) => {
            const onPress = () => this._onModalValueChange(type, value);

            return (
              <View
                style={[
                  Styles.modalItem,
                  i === (modalData.values.length - 1) && { marginBottom: 0 }
                ]}
                key={i}
              >
                <Text style={Styles.modalItemText}>{label}</Text>
                <TouchableOpacity onPress={onPress} style={Styles.modalItemBtn}>
                  <Text style={Styles.modalItemBtnText}>{'Select'.toUpperCase()}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      );
    }

    return this.props.navigator.showLightBox({
      screen: ScreenNames.GeofenceRestriction.id,
      title: '',
      style: {
       backgroundBlur: 'dark',
       backgroundColor: 'rgba(50, 50, 50, 0.2)'
      },
      passProps: {
        title: `Select a ${type}`,
        buttonSet: 'cross',
        customContent: () => content,
        handleClose: () => this.props.navigator.dismissLightBox()
      }
    });
  }

  _onModalValueChange(type, _data) {
    const { form, data, originPlatformList, originGameList } = this.state;

    let formData = null;

    if (type === 'games') {
      formData = originGameList.find(gameData => {
        return gameData._id === _data;
      });
    } else if (type === 'platform') {
      formData = originPlatformList.find(platformData => {
        return platformData._id === _data;
      });
    }

    data[type] = formData;
    form[type].value = _data;
    this.setState({ form, data, modal: false });
    this.props.navigator.dismissLightBox();
  }

  _seeDetail() {
    const { form, optionValue, opponentData, originGameList, originPlatformList, hasOpponent } = this.state;

    if (!this._isValidToPost(form, optionValue, opponentData)) {
      return;
    }

    const isFreeChallenge = form.type.value === 0;

    if (!isFreeChallenge && this.props.user.cash < parseInt(form.coins.value)) {
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
    }

    const platform = originPlatformList.find(({ _id }) => _id === form.platform.value);
    const game = originGameList.find(({ _id }) => _id === form.games.value);

    const challenge = {
      host: this.props.user,
      guest: hasOpponent ? opponentData : opponentData ? opponentData : void 0,
      coin: isFreeChallenge ? form.type.value.toString() : form.coins.value.toString(),
      time: moment().format(),
      game,
      platform,
      responseVideoUrl1: this.props.uriVideoChallenge
    };

    this.props.navigator.push({
      screen: ScreenNames.ChallengeDetail.id,
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
      title: ScreenNames.ChallengeDetail.title.toUpperCase(),
      passProps: {
        challenge,
        onPost: this._postChallenge
      }
    });
  }

  _setOpponentData(opponent) {
    this.setState({
      opponentData: opponent,
      hasOpponent: true
    });
  }

  _renderRadios(options) {
    const radios = options.map((obj, i) => {
      const onPress = (value, index) =>
        this.setState({
          optionValue: index,
          opponentData: null
        });

        return (
          <View key={i}>
            <MultiplePicker
              obj={obj}
              index={i}
              isSelected={this.state.optionValue === i}
              onPress={onPress}
              borderWidth={1}
              borderColor={Colors.cerroLargo}
              innerColor={Colors.artigas}
              defaultColor={Colors.montevideo}
              firstOpt={i === 0}
              lastOpt={i === (options.length - 1)} />
          </View>
        );
    });

    return (
      <View style={Styles.pageTitle}>
        <View style={Styles.radioContainer}>
          {radios}
        </View>
      </View>
    );
  }

  _postChallenge() {
    const { form, optionValue, opponentData, hasOpponent } = this.state;

    if (!this._isValidToPost(form, optionValue, opponentData)) {
      return;
    }

    this.props.postChallenge({
      host: this.props.user._id,
      guest: hasOpponent && this.props.opponent ? this.props.opponent._id : opponentData ? opponentData._id : null,
      game: form.games.value,
      cash: form.type.value === 1 ? form.coins.value.toString() : '0',
      coin: form.type.value === 1 ? form.coins.value.toString() : '0',
      platform: form.platform.value,
      time: moment().format(),
      responseVideoUrl1: this.props.uriVideoChallenge
    });
    this.props.setVideoChallengeUri(null);
  }

  _isValidToPost(form, option, opponent) {
    if (this.state.hasOpponent) {
      if (
        form.games.value === '' ||
        form.games.value === 'select' ||
        form.platform.value === '' ||
        form.platform.value === 'select' ||
        form.type.value === '' ||
        form.type.value === 1 && form.coins.value === 'select' ||
        form.type.value === 1 && form.coins.value === '' ||
        !form.coins.value
      ) {
        this._renderError('Error', 'Please fill all the fields before continue');
        return false;
      }
    } else {
      if (
        (option === 0 && !opponent) ||
        form.games.value === '' ||
        form.games.value === 'select' ||
        form.platform.value === '' ||
        form.platform.value === 'select' ||
        form.type.value === '' ||
        form.type.value === 1 && form.coins.value === 'select' ||
        form.type.value === 1 && form.coins.value === '' ||
        !form.coins.value
      ) {
        this._renderError('Error', 'Please fill all the fields before continue');
        return false;
      }
    }

    return true;
  }

  _filterSearch(data) {
    return data.filter(({ _id }) => _id !== this.props.user._id).map(item => {
      return {
        ...item,
        action: () => this._setOpponentData(item),
        legend: 'Select'
      };
    });
  }

  _renderError(title, message) {
    this.props.navigator.showLightBox({
      screen: ScreenNames.GeofenceRestriction.id,
      title: '',
      style: {
       backgroundBlur: 'dark',
       backgroundColor: 'rgba(50, 50, 50, 0.2)'
      },
      passProps: {
        title: title,
        message: message,
        handleClose: () => {
          this.props.resetPostStatus();
          this.props.navigator.dismissLightBox();
        }
      }
    });
  }
}

PostChallenge.title = 'Post a Challenge';
PostChallenge.id = 'com.eSportsGlobalGamers.postChallenge';

const mapStateToProps = ({ common, user, challenge }) => ({
  gameList: common.gameList,
  platformList: common.platformList,
  postSuccess: challenge.postSuccess,
  user: user.userData,
  postError: challenge.postError,
  uriVideoChallenge: challenge.uriVideoChallenge,
  isUploadingVideo: challenge.isUploadingVideo
});

const mapDispatchToProps = dispatch => ({
  postChallenge: data => dispatch(ChallengeActions.postChallenge(data)),
  resetPostStatus: () => dispatch(ChallengeActions.resetPostChallengeStatus()),
  setVideoChallengeUri: data =>  dispatch(ChallengeActions.setVideoChallengeUri(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostChallenge);
