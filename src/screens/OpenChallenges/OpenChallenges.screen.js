import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import * as ChallengeActions from '../../actions/Challenge/Challenge.actions';
import ChallengesItem from '../../components/ChallengesItem/ChallengesItem';
import Loader from '../../components/Loader/Loader';
import { ScreenNames } from '../../screens';
import PostChallengeButton from '../../components/PostChallengeButton/PostChallengeButton';
import { emptyChallenges, backButton } from '../../utils/Images';

import Styles from './OpenChallenges.styles';

class OpenChallenges extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false
    };

    this._onRefresh = this._onRefresh.bind(this);
    this._renderChallengeItem = this._renderChallengeItem.bind(this);
    this._navigateToPostChallenge = this._navigateToPostChallenge.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
  }

  componentDidMount() {
    this.props.fetchOpenChallenges();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ready && !nextProps.refreshing && nextProps.openChallengesList) {
      let newState = Object.assign({}, this.state);
      newState.challenges = nextProps.openChallengesList;
      this.setState(newState);
    }

    if (this.state.refreshing && !nextProps.refreshing) {
      this.setState({
        refreshing: false
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    if (!this.props.ready && !nextProps.ready) {
      return false;
    }

    if (this.props.refreshing && nextProps.refreshing) {
      return false;
    }

    if (!nextProps.openChallengesList && nextProps.refreshing) {
      return false;
    }

    return true;
  }

  render() {
    if (!this.props.ready) {
      return <Loader />;
    }

    return (
      <SafeAreaView style={Styles.container}>
        {this._renderopenChallenges()}
      </SafeAreaView>
    );
  }

  _renderopenChallenges() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.challenges}
            renderItem={this._renderChallengeItem}
            initialNumToRender={4}
            onRefresh={this._onRefresh}
            refreshing={this.state.refreshing}
            style={Styles.list}
            onEndReached={() => this._loadMore('OPEN')}
            keyExtractor={item => item._id}
            ListHeaderComponent={this._renderHeader}
          />
          <PostChallengeButton
            style={Styles.postButton}
            onPress={this._navigateToPostChallenge} />
        </View>
      </View>
    );
  }

  _renderChallengeItem({ item, index }) {
    return (
      <ChallengesItem
        {...item}
        key={item}
        style={Styles.challengeItem}
        index={index}
        totalItems={this.state.challenges.length}
        onPress={() => this._navigateChallenge(item._id, index)}
        unauthAction={this._navigateLogin}
        navigator={this.props.navigator}
      />
    );
  }

  _renderHeader() {
    if (this.state.challenges && this.state.challenges.length === 0) {
      return (
        <View style={Styles.emptyContainer}>
          <Image source={emptyChallenges} />
          <Text style={Styles.emptyText}>
            {`There are no open\nchallenges right now.`}
          </Text>
        </View>
      );
    } else {
      return null;
    }
  }

  _loadMore(type, cb) {
    this.props.loadMoreChallenges(type, cb);
  }

  _onRefresh() {
    this.setState({
      refreshing: true
    });

    this.props.refreshAllChallenges();
  }

  _navigateToPostChallenge() {
    if (this.props.user) {
      this.props.navigator.push({
        screen: ScreenNames.PostChallenge.id,
        title: ScreenNames.PostChallenge.title.toUpperCase(),
        animated: true,
        backButtonTitle: ''
      });
    } else {
      this.props.navigator.showModal({
        screen: ScreenNames.SignIn.id,
        title: ScreenNames.SignIn.title.toUpperCase()
      });
    }
  }

  _navigateChallenge(id, index) {
    this.props.setActualChallenge({ id, index });
    this.props.navigator.push({
      screen: ScreenNames.ChallengeDetail.id,
      title: ScreenNames.ChallengeDetail.title.toUpperCase(),
      animated: 'true',
      backButtonTitle: '',
      navigatorButtons: {
        leftButtons: [{
          icon: backButton,
          disableIconTint: true,
          id: '@nav/editConfirm'
        }],
        rightButtons: []
      },
      passProps: { id, index }
    });
  }

  _navigateLogin() {
    this.props.navigator.showModal({
      screen: ScreenNames.SignIn.id,
      title: ScreenNames.SignIn.title.toUpperCase()
    });
  }
}

OpenChallenges.title = 'Open Challenges';
OpenChallenges.id = 'com.eSportsGlobalGamers.OpenChallenges';

const mapStateToOpenChallenges = state => {
  return {
    user: !!state.user.userData,
    ready: state.challenge.listReady,
    challenges: state.challenge.challenges,
    openChallengesList: state.challenge.openChallengesList,
    showMoreOpenChallenges: state.challenge.showMoreOpenChallenges,
    refreshing: state.challenge.refreshing
  };
};

const mapDispatchToOpenChallenges = dispatch => {
  return {
    fetchAllChallenges: () => dispatch(ChallengeActions.get()),
    fetchOpenChallenges: () => dispatch(ChallengeActions.getOpen()),
    refreshAllChallenges: () => dispatch(ChallengeActions.refresh()),
    loadMoreChallenges: (type, cb) => dispatch(ChallengeActions.loadMore(type, cb)),
    setActualChallenge: id => dispatch(ChallengeActions.setActual(id))
  };
};

export default connect(mapStateToOpenChallenges, mapDispatchToOpenChallenges)(OpenChallenges);