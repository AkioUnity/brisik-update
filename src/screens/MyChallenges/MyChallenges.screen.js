import React, { Component } from 'react';
import { View, Text, SectionList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import * as ChallengeActions from '../../actions/Challenge/Challenge.actions';
import ChallengesItem from '../../components/ChallengesItem/ChallengesItem';
import Loader from '../../components/Loader/Loader';
import { ScreenNames } from '../../screens';
import PostChallengeButton from '../../components/PostChallengeButton/PostChallengeButton';
import * as Images from '../../utils/Images';

import Styles from './MyChallenges.styles';

class MyChallenges extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false
    };

    this._renderSectionHeader = this._renderSectionHeader.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    this._renderChallengeItem = this._renderChallengeItem.bind(this);
    this._keyExtractor = this._keyExtractor.bind(this);
    this._navigateToPostChallenge = this._navigateToPostChallenge.bind(this);
    this._renderSectionFooter = this._renderSectionFooter.bind(this);
  }

  componentDidMount() {
    this.setState({ refreshing: true });
    this.props.fetchMyChallenges();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ready && !nextProps.refreshing && nextProps.myChallengesList) {
      let newState = Object.assign({}, this.state);
      newState.challenges = nextProps.myChallengesList.length > 0 ? this._prepareLists(nextProps) : [];
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

    if (!nextProps.myChallengesList && nextProps.refreshing) {
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
        {this._renderMyChallenges()}
      </SafeAreaView>
    );
  }

  _renderMyChallenges() {
    const emptyChallenges = [{ data: [], key: 0}, { data: [], key: 1 }];

    const content = this.state.challenges && this.state.challenges.length > 0
      ?
        (
          <SectionList
            sections={this.state.challenges || emptyChallenges}
            renderItem={this._renderChallengeItem}
            renderSectionHeader={this._renderSectionHeader}
            ListFooterComponent={this._renderSectionFooter}
            keyExtractor={this._keyExtractor}
            initialNumToRender={4}
            onRefresh={this._onRefresh}
            refreshing={this.state.refreshing}
            style={Styles.list}
            onEndReached={() => this._loadMore('MY')}
            SectionSeparatorComponent={this._renderSectionFooter}
          />
        )
      :
        (
          <View style={Styles.emptyContainer}>
            <Image source={Images.emptyChallenges} />
            <Text style={Styles.emptyText}>
              {`You don't have any\nchallenges right now.`}
            </Text>
          </View>
        );

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {content}
          <PostChallengeButton style={Styles.postButton} onPress={this._navigateToPostChallenge} />
        </View>
      </View>
    );
  }

  _renderSectionHeader({ section }) {
    if (section && section.data.length > 0) {
      return (
        <View style={Styles.challengeBox}>
          <Text style={Styles.categoryTitle}>
            {section && section.title && section.title.toUpperCase()}
          </Text>
        </View>
      );
    }
  }

  _renderSectionFooter() {
    return <View style={Styles.listFooter} />;
  }

  _renderChallengeItem({ item, index }) {
    return (
      <ChallengesItem
        {...item}
        key={item}
        style={Styles.challengeItem}
        index={index}
        onPress={() => this._navigateChallenge(item._id, index)}
        unauthAction={this._navigateLogin}
        navigator={this.props.navigator}
      />
    );
  }

  _keyExtractor(item, i) {
    return item._id;
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
        backButtonTitle: '',
        passProps: {
          defaultType: 'my'
        }
      });
    } else {
      this.props.navigator.showModal({
        screen: ScreenNames.SignIn.id,
        title: ScreenNames.SignIn.title.toUpperCase()
      });
    }
  }

  _prepareLists(props = this.props) {
    const list = [];

    if (!props.ready) {
      return list;
    }

    if (props.myChallengesList && props.myChallengesList.length > 0 && props.user) {
      const openChallenges = [];
      const myChallenges = [];

      props.myChallengesList.map(challenge => {
        if (challenge.state === 0) {
          openChallenges.push(challenge);
        } else if (challenge.state === 4 || challenge.state === 5) {
          myChallenges.push(challenge);
        }
      });
      const openChallenge = { data: [...openChallenges], key: 0, title: 'Pending' };
      const myChallenge = { data: [...myChallenges], key: 1, title: 'Active' };
      list.push(openChallenge, myChallenge);
    } else {
      list.push({ key: 0, title: 'Active', data: [] });
    }

    return list;
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
          icon: Images.backButton,
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

MyChallenges.title = 'My Challenges';
MyChallenges.id = 'com.eSportsGlobalGamers.MyChallenges';

const mapStateToMyChallenges = state => {
  return {
    user: !!state.user.userData,
    ready: state.challenge.listReady,
    myChallengesList: state.challenge.myChallengesList,
    challenges: state.challenge.challenges,
    openChallengesList: state.challenge.openChallengesList,
    showMoreMyChallenges: state.challenge.showMoreMyChallenges,
    showMoreOpenChallenges: state.challenge.showMoreOpenChallenges,
    refreshing: state.challenge.refreshing
  };
};

const mapDispatchToMyChallenges = dispatch => {
  return {
    fetchAllChallenges: () => dispatch(ChallengeActions.get()),
    fetchMyChallenges: () => dispatch(ChallengeActions.getMy()),
    refreshAllChallenges: () => dispatch(ChallengeActions.refresh()),
    loadMoreChallenges: (type, cb) => dispatch(ChallengeActions.loadMore(type, cb)),
    setActualChallenge: id => dispatch(ChallengeActions.setActual(id))
  };
};

export default connect(mapStateToMyChallenges, mapDispatchToMyChallenges)(MyChallenges);