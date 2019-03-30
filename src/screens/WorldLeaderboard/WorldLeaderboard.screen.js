import React, { Component } from 'react';
import { View, FlatList, Text, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { ScreenNames } from '../';
import ActionButton from '../../components/ActionButton/ActionButton';
import Styles from './WorldLeaderboard.styles';
import LeaderboardItem from '../../components/LeaderboardItem/LeaderboardItem';
import Loader from '../../components/Loader/Loader';
import { common as commonActions } from '../../actions';
import { menuShape, backButton } from '../../utils/Images';

class WorldLeaderboard extends Component {
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
        index={index}
        style={Styles.item}
        onPress={this._onPress}
        userData={this.props.user}
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
        screen: this.props.user && this.props.user._id === id
          ? ScreenNames.Profile.id : ScreenNames.ProfileOther.id,
        title: ScreenNames.Profile.title.toUpperCase(),
        passProps: this.props.user && this.props.user._id === id ? void 0 : { id, public: true },
        backButtonTitle: '',
        navigatorButtons: {
          leftButtons: [{
            icon: backButton,
            disableIconTint: true,
            id: '@nav/editConfirm'
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

WorldLeaderboard.title = 'World Leaderboard';
WorldLeaderboard.id = 'com.eSportsGlobalGamers.WorldLeaderboard';

const mapStateToProps = ({ common, user }) => ({
  leaderboard: common.leaderboard,
  loading: common.loadingLeaderboard,
  user: user.userData,
  lastpage: common.lastpage,
  refreshing: common.leaderboardRefreshing
});

const mapDispatchToProps = dispatch => ({
  listLeaderboard: page => dispatch(commonActions.listLeaderboard(page)),
  refreshLeaderboard: () => dispatch(commonActions.refreshLeaderboard())
});

export default connect(mapStateToProps, mapDispatchToProps)(WorldLeaderboard);
