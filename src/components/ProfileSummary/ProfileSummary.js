import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Image,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as Images from '../../utils/Images';
import * as UserActions from '../../actions/User/User.actions';
import * as ChallengeActions from '../../actions/Challenge/Challenge.actions';
import ProfileGamertags from '../../components/ProfileGamertags/ProfileGamertags';
import Avatar from '../../components/Avatar/Avatar';
import ActionButton from '../../components/ActionButton/ActionButton';
import ChallengesItem from '../../components/ChallengesItem/ChallengesItem';
import Loader from '../../components/Loader/Loader';
import { ScreenNames } from '../../screens';
import Styles from './ProfileSummary.styles';

const pingAssets = {
  green: Images.pingGreen,
  yellow: Images.pingYellow,
  red: Images.pingRed,
};

class ProfileSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPickerModal: false,
      loading: false,
    };

    this._renderAvatar = this._renderAvatar.bind(this);
    this._navigateToCoinHistory = this._navigateToCoinHistory.bind(this);
    this._navigateToEditProfile = this._navigateToEditProfile.bind(this);
    this._addFriend = this._addFriend.bind(this);
    this._challenge = this._challenge.bind(this);
    this._chat = this._chat.bind(this);
    this._loadMore = this._loadMore.bind(this);
    this._acceptFriend = this._acceptFriend.bind(this);
  }

  componentDidMount() {
    this.props.getCompleted();
    this.props.getPendingFriendRequests();
    this.props.getFriendRequests();
  }

  render() {
    const { userData } = this.props;

    let balance = 0.0;
    
    if (userData && !this.props.public) {
      balance = userData.cash;
      try {
        balance = parseFloat(balance).toFixed(2);
      } catch (e) {
        balance = 0.0;
      }
    }

    if (this.state.loading) {
      return <Loader />;
    }

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
        <View style={Styles.container}>
          <View style={Styles.containerTopSection}>
            <View style={Styles.row}>
              {this._renderAvatar()}
              {!this.props.public && (
                <ActionButton
                  title="edit profile"
                  onPress={this._navigateToEditProfile}
                  style={[Styles.button, { position: 'absolute' }]}
                  textStyle={Styles.selectText}
                />
              )}
            </View>
            <View style={Styles.row}>
              <View style={Styles.containerUserInfo}>
                <Text style={Styles.username}>
                  {userData.mediaId.length > 10
                    ? userData.mediaId.substring(0, 9) + '...'
                    : userData.mediaId}
                </Text>
                <View style={Styles.locationWrapper}>
                  {userData.city && (
                    <Image
                      source={pingAssets[userData.ping]}
                      resizeMode="contain"
                      style={Styles.locationIcon}
                    />
                  )}
                  <Text style={Styles.locationText}>
                    {userData.city || 'No city found'}
                  </Text>
                </View>
                <View style={Styles.ratingsContainer}>
                  <View style={[Styles.ratingRow, { marginBottom: 5 }]}>
                    <Text style={Styles.ratingValue}>
                      {Math.floor(userData.communityRating)}
                    </Text>
                    <Text style={Styles.ratingStatic}>
                      {'community rating'.toUpperCase()}
                    </Text>
                  </View>
                  <View style={Styles.ratingRow}>
                    <Text style={Styles.ratingValue}>
                      {Math.floor(userData.competitorRating)}
                    </Text>
                    <Text style={Styles.ratingStatic}>
                      {'competitor rating'.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </View>
              { !this.props.public &&
                <TouchableOpacity
                  style={Styles.coinsContainer}
                  activeOpacity={0.8}
                  onPress={this._navigateToCoinHistory}
                >
                  <View style={Styles.amountWrapper}>
                    <Text style={Styles.coinAmount}>{`$${balance}`}</Text>
                  </View>
                </TouchableOpacity>
              }
            </View>
            {this.props.public && this._renderActionButtons()}
          </View>
          <View>{this._renderElo()}</View>
          <View>
            {this._renderGametags()}
            {this.props.challenges &&
              this.props.challenges.length > 0 &&
              !this.props.public &&
              this._renderRecentMatches()}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _renderAvatar() {
    const { userData } = this.props;
    const avatar = userData.profileImage
      ? { uri: userData.profileImage }
      : null;
    return (
      <View style={Styles.avatarContainer}>
        <Avatar
          progress={true}
          source={avatar}
          style={Styles.avatarImage}
          fill={userData.experience || 0}
        />
      </View>
    );
  }

  _renderGametags() {
    return (
      <View style={Styles.wrapper}>
        <View style={Styles.sectionHeader}>
          <Text style={Styles.sectionHeaderText}>
            {'gamertags'.toUpperCase()}
          </Text>
        </View>
        <View style={Styles.sectionBody}>
          <ProfileGamertags
            public={this.props.public}
            xboxgamertag={this.props.userData.xboxgamertag}
            ps4gamertag={this.props.userData.ps4gamertag}
            twitchgamertag={this.props.userData.twitchgamertag}
          />
        </View>
      </View>
    );
  }

  _renderRecentMatches() {
    const { challenges, paginationMeta } = this.props;

    const isLastPage =
      paginationMeta &&
      parseInt(paginationMeta.page) === parseInt(paginationMeta.pages);

    return (
      <View style={Styles.wrapper}>
        <View style={Styles.sectionHeader}>
          <Text style={Styles.sectionHeaderText}>
            {'recent matches'.toUpperCase()}
          </Text>
        </View>
        <View style={Styles.sectionBody}>
          {challenges.map((challenge, i) => {
            const handlePress = () => this._navigateToChallenge(challenge);
            return (
              <ChallengesItem
                {...challenge}
                key={challenge._id}
                style={Styles.challengeItem}
                stitchedVideo={challenge.stitchedChallengeVideo}
                index={i}
                totalItems={this.props.challenges.length}
                navigator={this.props.navigator}
                onPress={handlePress}
              />
            );
          })}
        </View>
      </View>
    );
  }

  /* removed from above func
  {!isLastPage &&
            <ActionButton
              title="Load more"
              onPress={this._loadMore}
              key="more"
              type="dark"
              style={Styles.loadmoreButton}
            />}
      */
  _renderActionButtons() {
    const { userData } = this.props;

    const buttons = [
      !userData.isFriend && !userData.requestSent && !userData.isPending ? (
        <ActionButton
          title="Add friend"
          onPress={this._addFriend}
          key="add"
          style={[Styles.button, Styles.buttonAdd]}
          textStyle={Styles.selectText}
        />
      ) : userData.isPending ? (
        <ActionButton
          title="Accept request"
          onPress={this._acceptFriend}
          key="accept"
          style={[Styles.button, Styles.buttonAdd]}
          textStyle={Styles.selectText}
        />
      ) : null,
      <ActionButton
        title="+ Challenge"
        onPress={this._challenge}
        key="challenge"
        style={[Styles.button, Styles.buttonChallenge]}
        textStyle={Styles.selectText}
      />,
      <ActionButton
        title="Chat"
        onPress={this._chat}
        key="chat"
        style={[Styles.button, Styles.buttonChat]}
        textStyle={Styles.selectText}
      />,
    ];

    return <View style={Styles.buttonsContainer}>{buttons}</View>;
  }

  _renderElo() {
    const {
      userData: { eloData, freeEloData },
    } = this.props;
    const gamesList = this._generateGameList(eloData, freeEloData);

    return (
      <View style={Styles.wrapper}>
        <View style={Styles.sectionHeader}>
          <Text style={Styles.sectionHeaderText}>{'elo'.toUpperCase()}</Text>
        </View>
        <View style={Styles.sectionBody}>
          <View style={[Styles.sectionHeader, Styles.eloTableHeader]}>
            <Text style={[Styles.eloTableHeading, { flex: 0.4 }]}>
              {'game'.toUpperCase()}
            </Text>
            <Text style={[Styles.eloTableHeading, { flex: 0.2 }]}>
              {'division'.toUpperCase()}
            </Text>
            <Text style={[Styles.eloTableHeading, { flex: 0.4 }]}>
              {'elo (paid games)'.toUpperCase()}
            </Text>
            <Text style={[Styles.eloTableHeading, { flex: 0.4 }]}>
              {'elo (free games)'.toUpperCase()}
            </Text>
          </View>
          <View style={Styles.eloTableBody}>
            {gamesList.map((gameId, i) => {
              const eloIndex = _.findIndex(
                eloData,
                eloItem => eloItem.game._id === gameId,
              );
              const freeEloIndex = _.findIndex(
                freeEloData,
                eloItem => eloItem.game._id === gameId,
              );

              return (
                <View key={i} style={Styles.eloTableRow}>
                  <Text
                    style={[
                      Styles.eloTableItem,
                      Styles.eloTableItemGame,
                      { flex: 0.4 },
                    ]}
                  >
                    {eloData[eloIndex]
                      ? eloData[eloIndex].game.title
                      : freeEloData[freeEloIndex].game.title}
                  </Text>
                  <Text
                    style={[
                      Styles.eloTableItem,
                      Styles.eloTableItemCentered,
                      Styles.eloTableItemBold,
                      { flex: 0.2 },
                    ]}
                  >
                    {eloData[eloIndex]
                      ? eloData[eloIndex].division
                      : freeEloData[freeEloIndex].division}
                  </Text>
                  <Text
                    style={[
                      Styles.eloTableItem,
                      Styles.eloTableItemCentered,
                      { flex: 0.4 },
                    ]}
                  >
                    {eloData[eloIndex]
                      ? Math.floor(eloData[eloIndex].elo)
                      : '-'}
                  </Text>
                  <Text
                    style={[
                      Styles.eloTableItem,
                      Styles.eloTableItemCentered,
                      { flex: 0.4 },
                    ]}
                  >
                    {freeEloData[freeEloIndex]
                      ? Math.floor(freeEloData[freeEloIndex].elo)
                      : '-'}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  }

  _navigateToCoinHistory() {
    setTimeout(() => {
      this.props.navigator.push({
        screen: ScreenNames.Purchase.id,
        title: ScreenNames.Purchase.title.toUpperCase(),
        backButtonTitle: '',
        navigatorButtons: {
          leftButtons: [
            {
              icon: Images.backButton,
              id: '@nav/editConfirm',
              disableIconTint: true,
            },
          ],
          rightButtons: [],
        },
      });
    }, 100);
  }

  _navigateToEditProfile() {
    setTimeout(() => {
      this.props.navigator.push({
        screen: ScreenNames.EditProfile.id,
        animated: true,
        backButtonHidden: true,
        passProps: {
          public: this.props.public,
        },
      });
    }, 100);
  }

  _addFriend() {
    this.setState({ loading: true });
    this.props.sendFriendRequest(this.props.userData._id, () => {
      this.setState({ loading: false });
      return this._handlePopup(
        'Success!',
        `We sent a friend request to ${this.props.userData.mediaId}`,
      );
    });
  }

  _acceptFriend() {
    this.setState({ loading: true });
    this.props.acceptFriendRequest(this.props.userData.requestId, () => {
      this.setState({ loading: false });
      return this._handlePopup(
        'Success!',
        `Congratulations, now ${this.props.userData.mediaId} is your friend!`,
      );
    });
  }

  _challenge() {
    this.setState({ loading: true });

    this.props.navigator.push({
      screen: ScreenNames.PostChallenge.id,
      title: ScreenNames.PostChallenge.title,
      passProps: {
        defaultType: 'my',
        opponent: this.props.userData,
      },
      backButtonTitle: '',
    });
  }

  _chat() {
    this.props.navigator.push({
      screen: ScreenNames.ChatPrivate.id,
      title: this.props.userData.mediaId.toUpperCase(),
      backButtonTitle: '',
      navigatorButtons: {
        leftButtons: [
          {
            icon: Images.backButton,
            id: '@nav/editConfirm',
            disableIconTint: true,
          },
        ],
        rightButtons: [],
      },
      passProps: {
        chatId: `${this.props.myUser._id}_${this.props.userData._id}`,
      },
    });
  }

  _generateGameList(eloData, freeEloData) {
    const gamesList = [];

    eloData.forEach(data => {
      gamesList.push(data.game._id);
    });

    freeEloData.forEach(data => {
      const index = gamesList.map(id => id).indexOf(data.game._id);

      if (index === -1) {
        gamesList.push(data.game._id);
      }
    });

    return gamesList;
  }

  _loadMore() {
    this.props.getCompleted();
  }

  _handlePopup(title, message) {
    this.props.navigator.showLightBox({
      screen: ScreenNames.GeofenceRestriction.id,
      title: '',
      style: {
        backgroundBlur: 'dark',
        backgroundColor: 'rgba(50, 50, 50, 0.2)',
      },
      passProps: {
        title: title,
        message: message,
        handleClose: () => this.props.navigator.dismissLightBox(),
      },
    });
  }

  _navigateToChallenge(challenge) {
    this.props.navigator.push({
      screen: ScreenNames.ChallengeDetail.id,
      title: ScreenNames.ChallengeDetail.title.toUpperCase(),
      backButtonTitle: '',
      animated: true,
      navigatorButtons: {
        leftButtons: [
          {
            icon: Images.backButton,
            disableIconTint: true,
            id: '@nav/editConfirm',
          },
        ],
        rightButtons: [],
      },
      passProps: {
        challenge,
      },
    });
  }
}

ProfileSummary.title = 'Summary';
ProfileSummary.id = 'com.eSportsGlobalGamers.Profile';

const mapStateToProps = ({ challenge, user }) => {
  return {
    ready: challenge.listReady,
    challenges: challenge.completedChallenges,
    myUser: user.userData || {},
    paginationMeta: challenge.completedMeta,
  };
};

const mapDispatchToProps = dispatch => ({
  getCompleted: () => dispatch(ChallengeActions.getCompleted()),
  getPendingFriendRequests: () =>
    dispatch(UserActions.getPendingFriendRequests()),
  getFriendRequests: () => dispatch(UserActions.getFriendRequests()),
  sendFriendRequest: (friendId, cb) =>
    dispatch(UserActions.sendFriendRequest(friendId, cb)),
  acceptFriendRequest: (friendId, cb) =>
    dispatch(UserActions.acceptFriendRequest(friendId, cb)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileSummary);
