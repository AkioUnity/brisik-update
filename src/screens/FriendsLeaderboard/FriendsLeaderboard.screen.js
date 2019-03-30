import React, { Component } from 'react';
import { View, FlatList, Text, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { ScreenNames } from '../';
import ActionButton from '../../components/ActionButton/ActionButton';
import Styles from './FriendsLeaderboard.styles';
import LeaderboardItem from '../../components/LeaderboardItem/LeaderboardItem';
import Loader from '../../components/Loader/Loader';
import { common as commonActions } from '../../actions';
import { menuShape, backButton } from '../../utils/Images';

class FriendsLeaderboard extends Component {
  constructor(props) {
    super(props);

    this._onPress = this._onPress.bind(this);
    this._renderItem = this._renderItem.bind(this);
  }

  componentDidMount() {
    if (this.props.leaderboard === null) {
      this.props.listLeaderboard();
    } else {
      this.props.refreshLeaderboard();
    }
  }

  render() {
    if (this.props.leaderboard === null) {
      return <Loader />;
    }

    const { loading, lastpage } = this.props;
    const isLastPage = parseInt(lastpage.page) === lastpage.pages;

    return (
      <View style={Styles.container}>
        <View style={Styles.title}>
          <Text style={[Styles.rank, Styles.titleText]}>{'rank'.toUpperCase()}</Text>
          <Text style={[Styles.user, Styles.titleText]}>{'gamer'.toUpperCase()}</Text>
          <Text style={[Styles.wins, Styles.titleText]}>{'wins'.toUpperCase()}</Text>
          <Text style={[Styles.winsPercentage, Styles.titleText]}>{'win%'.toUpperCase()}</Text>
          <Text style={[Styles.earnings, Styles.titleText]}>{'earnings'.toUpperCase()}</Text>
        </View>
        <ScrollView
          style={Styles.container}
          refreshControl={
            <RefreshControl
              onRefresh={this.props.refreshLeaderboard}
              refreshing={this.props.refreshing}
            />
          }
        >
          <FlatList
            style={Styles.container}
            data={this.props.leaderboard}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />
          {!isLastPage && !loading
            ? <ActionButton
                title="Load More"
                style={Styles.loadmoreButton}
                type="dark"
                loading={loading}
                onPress={() => {
                  this.props.listLeaderboard(parseInt(lastpage.page) + 1);
                }}
              />
            : !isLastPage && loading && <Loader />
          }
        </ScrollView>
      </View>
    );
  }

  _renderItem({ item, index }) {
    return (
      <LeaderboardItem
        {...item}
        style={Styles.item}
        onPress={this._onPress}
        userData={this.props.user}
        index={index}
      />
    );
  }

  _keyExtractor(item) {
    return item._id;
  }

  _onPress(id, mediaId) {
    if (this.props.user._id === id) {
      this.props.navigator.switchToTab({
        tabIndex: 4
      });
    } else {
      this.props.navigator.push({
        screen: ScreenNames.Profile.id,
        title: ScreenNames.Profile.title.toUpperCase(),
        passProps: this.props.user && this.props.user._id === id ? void 0 : { id, public: true },
        backButtonTitle: '',
        navigatorButtons: {
          leftButtons: [{
            icon: backButton,
            id: '@nav/editConfirm',
            disableIconTint: true
          }],
          rightButtons: [{
            icon: menuShape,
            id: '@nav/menu',
            disableIconTint: true
          }]
        }
      });
    }
  }
}

FriendsLeaderboard.title = 'Friend Leaderboard';
FriendsLeaderboard.id = 'com.eSportsGlobalGamers.FriendsLeaderboard';

const mapStateToProps = ({ common, user }) => ({
  leaderboard: common.friendsLeaderboard,
  loading: common.loadingLeaderboard,
  user: user.userData,
  lastpage: common.lastpage,
  refreshing: common.leaderboardRefreshing
});

const mapDispatchToProps = dispatch => ({
  listLeaderboard: page => dispatch(commonActions.listFriendsLeaderboard(page)),
  refreshLeaderboard: () => dispatch(commonActions.refreshFriendsLeaderboard())
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsLeaderboard);
