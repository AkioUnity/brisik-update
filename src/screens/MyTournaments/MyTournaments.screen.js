import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import * as TournamentActions from '../../actions/Tournament/Tournament.actions';
import TournamentsItem from '../../components/TournamentsItem/TournamentsItem';
import { isObjectEmpty } from '../../utils/Utils';
import Loader from '../../components/Loader/Loader';
import ActionButton from '../../components/ActionButton/ActionButton';
import { ScreenNames } from '../../screens';
import { emptyTournaments } from '../../utils/Images';

import Styles from './MyTournaments.styles';

class MyTournaments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false
    };

    this._onRefresh = this._onRefresh.bind(this);
    this._renderTournamentItem = this._renderTournamentItem.bind(this);
    this._keyExtractor = this._keyExtractor.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this._browseOpenTournaments = this._browseOpenTournaments.bind(this);
  }

  componentDidMount() {
    this.props.fetchMyTournaments();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ready && !nextProps.refreshing && nextProps.myTournamentsList) {
      let newState = Object.assign({}, this.state);
      newState.tournaments = nextProps.myTournamentsList;
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

    if (!nextProps.myTournamentsList && nextProps.refreshing) {
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
        {this._renderOpenTournaments()}
      </SafeAreaView>
    );
  }

  _renderOpenTournaments() {
    return (
      <View style={{ flex: 1, padding: 15 }}>
        <FlatList
          data={this.state.tournaments}
          renderItem={this._renderTournamentItem}
          keyExtractor={this._keyExtractor}
          initialNumToRender={4}
          onRefresh={this._onRefresh}
          refreshing={this.state.refreshing}
          style={Styles.list}
          onEndReached={() => this._loadMore('OPEN')}
          ListHeaderComponent={this._renderHeader}
        />
      </View>
    );
  }

  _renderHeader() {
    if (this.state.tournaments && this.state.tournaments.length === 0) {
      return (
        <View style={Styles.emptyContainer}>
          <Image source={emptyTournaments} />
          <Text style={Styles.emptyText}>
            {`You don't have any\ntournaments right now.`}
          </Text>
          <ActionButton
            title="browse tournaments"
            onPress={this._browseOpenTournaments}
            style={Styles.emptyButton}
          />
        </View>
      );
    } else {
      return null;
    }
  }

  _renderTournamentItem({ item, index }) {
    return (
      <TournamentsItem
        {...item}
        key={`${item._id}_${index}`}
        style={Styles.tournamentItem}
        index={index}
        unauthAction={this._navigateLogin}
        onPress={() => this._navigateTournament(item, index)}
        navigator={this.props.navigator}
      />
    );
  }

  _keyExtractor(item, i) {
    return item._id;
  }

  _loadMore(type, cb) {
    if (this.props.showMoreMyTournaments) {
      this.props.loadMoreTournaments(type, cb);
    }
  }

  _onRefresh() {
    this.setState({
      refreshing: true
    });

    this.props.refreshAllTournaments();
  }

  _navigateLogin() {
    this.props.navigator.showModal({
      screen: ScreenNames.SignIn.id,
      title: ScreenNames.SignIn.title.toUpperCase()
    });
  }

  _navigateTournament(tournament, index) {
    this.props.navigator.push({
      screen: ScreenNames.Tournament.id,
      title: ScreenNames.Tournament.title.toUpperCase(),
      animated: 'true',
      backButtonTitle: '',
      passProps: { index, tournament }
    });
  }

  _browseOpenTournaments() {
    if (typeof this.props.switchToTab === 'function') {
      this.props.switchToTab('my');
    }
  }
}

MyTournaments.title = 'My Tournaments';
MyTournaments.id = 'com.eSportsGlobalGamers.MyTournaments';

const mapStateToOpenTournaments = state => {
  return {
    user: !!state.user.userData,
    ready: state.tournament.listReady,
    myTournamentsList: state.tournament.myTournamentsList,
    showMoreMyTournaments: state.tournament.showMoreMyTournaments,
    refreshing: state.tournament.refreshing,
  };
};

const mapDispatchToOpenTournaments = dispatch => {
  return {
    fetchMyTournaments: () => dispatch(TournamentActions.getMy()),
    refreshAllTournaments: () => dispatch(TournamentActions.refresh()),
    loadMoreTournaments: (type, cb) => dispatch(TournamentActions.loadMore(type, cb)),
    setActualTournament: id => dispatch(TournamentActions.setActual(id))
  };
};

export default connect(mapStateToOpenTournaments, mapDispatchToOpenTournaments)(MyTournaments);