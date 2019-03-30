import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { appLoggedIn } from '../../app';
import { ScreenNames } from '../../screens';
import { challenge as challengeActions } from '../../actions';
import * as Images from '../../utils/Images';
import { SkipNavButton, NavigationEventsHandler, ModalNavStyle } from '../../utils/Navigator';
import ActionButton from '../../components/ActionButton/ActionButton';
import Loader from '../../components/Loader/Loader';

import Styles from './ChallengeRating.styles';

class ChallengeRating extends Component {
  static navigatorStyle = ModalNavStyle;
  static navigatorButtons = SkipNavButton;

  constructor(props) {
    super(props);

    this.state = {
      competitor: null,
      community: null
    };

    const navigatorEventsHandler = (event) => NavigationEventsHandler({
      screen: this.constructor.id,
      navigator: props.navigator, event
    });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.success && nextProps.success !== this.props.success) {
      this.props.resetSuccess();
      Navigation.startTabBasedApp(appLoggedIn(ScreenNames));
    }
  }

  render() {
    const { profileImage, mediaId, xboxgamertag, ps4gamertag } = this.props.opponentData;

    const rateUnfulfilled = this.state.community === null || this.state.competitor === null;
    const buttonType = rateUnfulfilled ? 'dark' : null;
    const avatar = profileImage ? { uri: profileImage } : null;
    const isPlatformXbox = this.props.platform && this.props.platform.title.search(/xbox/i) !== -1;
    const playerGamertag = isPlatformXbox ? xboxgamertag : ps4gamertag;

    return (
      <View style={Styles.container}>
        <View style={Styles.cover}>
          <Image
            resizeMode="cover"
            style={Styles.coverImage}
            source={Images.gradient} />
          <View style={Styles.headerContainer}>
            <Image source={avatar} style={Styles.avatarImage} resizeMode="cover" />
            <View style={{ marginRight: 10 }}>
              <Text style={Styles.playerName}>
                {mediaId}
              </Text>
              <Text style={Styles.playerGamertag}>
                {playerGamertag ? playerGamertag.toUpperCase() : '-'}
              </Text>
            </View>
          </View>
        </View>
        <View style={Styles.contentWrapper}>
          {this._renderRateItem('community')}
          {this._renderRateItem('competitor')}
          <View style={Styles.btnContainer}>
            {this.props.loading
              ? <Loader />
              : <ActionButton
                  title="submit"
                  onPress={this._handleSubmit}
                  type={buttonType}
                  style={Styles.button}
                />
            }
          </View>
        </View>
      </View>
    );
  }

  _renderRateItem(type) {
    const currentValue = this.state[type];
    const subtitle = type === 'community' ? 'Was your opponent pleasant?' : 'Did your opponent play fair?';

    return (
      <View style={Styles.rateContainer}>
        <Text style={Styles.rateTitle}>{`${type} rating`.toUpperCase()}</Text>
        <Text style={Styles.rateSubtitle}>{subtitle}</Text>
        <View style={Styles.rateImages}>
          <TouchableOpacity onPress={() => this._handleRateChange(type, 1)}>
            <Image
              source={
                currentValue !== null && currentValue > 0 ? Images.ratePositiveActive : Images.ratePositive
              }
              style={Styles.rateImage}
            />
          </TouchableOpacity>
          <View style={Styles.divider} />
          <TouchableOpacity onPress={() => this._handleRateChange(type, 0)}>
            <Image
              source={
                currentValue !== null && currentValue === 0 ? Images.rateNegativeActive : Images.rateNegative
              }
              style={Styles.rateImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _handleRateChange(type, value) {
    this.setState({ [type]: value });
  }

  _handleSubmit() {
    const { community, competitor } = this.state;
    const userFilledForm = community !== null || competitor !== null;

    if (userFilledForm) {
      const form = {
        challenge: this.props.challengeId,
        rated: this.props.opponentData._id,
        communityRating: community !== null && community,
        competitorRating: competitor !== null && competitor
      };

      this.props.rateOpponent(form);
    } else {
      Navigation.startTabBasedApp(appLoggedIn(ScreenNames));
    }
  }
}

ChallengeRating.title = 'Rate your opponent';
ChallengeRating.id = 'com.eSportsGlobalGamers.ChallengeRating';

const mapStateToRate = state => {
  return {
    loading: state.challenge.loadingRating,
    success: state.challenge.ratedSuccess
  };
};

const mapDispatchToRate = dispatch => {
  return {
    rateOpponent: data => dispatch(challengeActions.rateOpponent(data)),
    resetSuccess: () => dispatch(challengeActions.resetRatingSuccess())
  };
};

export default connect(mapStateToRate, mapDispatchToRate)(ChallengeRating);