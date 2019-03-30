import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import TournamentInformation from '../../components/TournamentInformation/TournamentInformation';
import TournamentBracket from '../../components/TournamentBracket/TournamentBracket';
import * as TournamentActions from '../../actions/Tournament/Tournament.actions';
import { ScreenNames } from '../';
import { SingleNavStyle, NavigationEventsHandler } from '../../utils/Navigator';
import TabView from '../../components/TabView/TabView';
import Loader from '../../components/Loader/Loader';
import { backButton } from '../../utils/Images';

import Styles from './TournamentDetail.styles';

class Tournament extends Component {
  static navigatorStyle = SingleNavStyle;
  static navigatorButtons = {
    leftButtons: [
      {
        icon: backButton,
        id: '@nav/editConfirm',
        disableIconTint: true,
      },
    ],
    rightButtons: [],
  };

  constructor(props) {
    super(props);

    this.tabs = [
      { key: 'my', title: 'info', Screen: TournamentInformation },
      { key: 'open', title: 'bracket', Screen: TournamentBracket },
    ];

    this.state = {
      tab: this.tabs[0],
      loading: false,
    };

    const options =
      (props.tournament &&
        props.tournament._id && {
          screen: 'private-chat',
          title: props.tournament.title.toUpperCase(),
          chatId: props.tournament._id,
        }) ||
      {};

    const navigatorEventsHandler = event =>
      NavigationEventsHandler({
        screen: this.constructor.id,
        props: options,
        navigator: props.navigator,
        event,
      });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._onJoin = this._onJoin.bind(this);
    this._leaveTournament = this._leaveTournament.bind(this);
    this._joinAction = this._joinAction.bind(this);
  }

  componentDidMount() {
    if (!this.props.tournament && this.props.id) {
      this.props.getOne(this.props.id);
    }
  }

  componentWillReceiveProps({ loading }) {
    if (this.state.loading !== loading) {
      this.setState({ loading });
    }
  }

  componentWillUpdate(nextProps) {
    const { user, tournament } = this.props;
    if (user && tournament) {
      const isParticipant = tournament.participants.find(
        item => item.mediaId === user.mediaId,
      );
      if (
        !isParticipant &&
        nextProps.tournament.participants.find(
          item => item.mediaId === user.mediaId,
        )
      ) {
        this._handlePopup({
          title: 'Success',
          message: 'Successfully joined the tournament.\nGood luck!',
          handleClose: () => this.props.navigator.dismissLightBox(),
        });
      }
    }
  }

  render() {
    const { tournament } = this.props;
    const { Screen, key } = this.state.tab;

    if (this.state.loading || !tournament) {
      return <Loader />;
    }

    return (
      <View style={Styles.container}>
        {this._renderTabs()}
        <Screen
          tournament={tournament}
          navigator={this.props.navigator}
          user={this.props.user}
          leaveTournament={this._leaveTournament}
          joinAction={this._joinAction}
        />
      </View>
    );
  }

  _renderTabs() {
    const onPress = (tab, i) => {
      this.setState({ tab: tab });
    };

    return (
      <TabView
        tabs={this.tabs}
        onPress={onPress}
        selected={this.state.tab.key}
      />
    );
  }

  _leaveTournament(data) {
    this.props.leaveTournament(data);
    this.props.navigator.pop();
  }

  _joinAction(id) {
    const { tournament, user } = this.props;
    if (user && tournament.entryFee > user.coins) {
      this._handlePopup({
        title: 'Not enough coins!',
        message: 'Would you like to purchase more coins?',
        buttonSet: 'inline',
        buttons: [
          {
            label: 'No',
            type: 'dark',
            onPress: () => this.props.navigator.dismissLightBox(),
          },
          {
            label: 'Yes',
            onPress: () => {
              this.props.navigator.dismissLightBox();
              this.props.navigator.push({
                screen: ScreenNames.AddFunds.id,
                title: ScreenNames.AddFunds.title,
                animated: true,
                backButtonTitle: '',
                passProps: { stack: true },
              });
            },
          },
        ],
      });
    } else {
      this._onJoin(id);
    }
  }

  _onJoin(id) {
    this.props.join(id, (message, status) => {
      if (status === 'error') {
        return this.props.navigator.showLightBox({
          screen: ScreenNames.GeofenceRestriction.id,
          title: '',
          style: {
            backgroundBlur: 'dark',
            backgroundColor: 'rgba(50, 50, 50, 0.2)',
          },
          passProps: {
            title: 'Error!',
            message: message,
            handleClose: () => this.props.navigator.dismissLightBox(),
          },
        });
      }
    });
    this.props.navigator.pop();
  }

  _handlePopup(props) {
    this.props.navigator.showLightBox({
      screen: ScreenNames.GeofenceRestriction.id,
      title: '',
      style: {
        backgroundBlur: 'dark',
        backgroundColor: 'rgba(50, 50, 50, 0.2)',
      },
      passProps: { ...props },
    });
  }
}

Tournament.title = 'Tournament details';
Tournament.id = 'com.eSportsGlobalGamers.Tournament';

const mapStateToProps = ({ tournament, user }, props) => {
  if (!tournament.tournaments) {
    return { loading: true };
  }

  const _tournament = props.id
    ? tournament.tournaments[props.id]
    : props.tournament;

  return {
    loading: tournament.detailLoading,
    user: user.userData,
    tournament: _tournament,
  };
};

const mapDispatchToProps = dispatch => ({
  join: (id, cb) => dispatch(TournamentActions.join(id, cb)),
  leaveTournament: id => dispatch(TournamentActions.leave(id)),
  getOne: id => dispatch(TournamentActions.getOne(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tournament);
