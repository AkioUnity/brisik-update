import React, { Component } from 'react';
import { View } from 'react-native';

import TabView from '../../components/TabView/TabView';
import WorldLeaderboard from '../WorldLeaderboard/WorldLeaderboard.screen';
import FriendsLeaderboard from '../FriendsLeaderboard/FriendsLeaderboard.screen';
import * as Images from '../../utils/Images';
import { NavigationEventsHandler, ModalNavStyle2 } from '../../utils/Navigator';

import Styles from './Leaderboard.styles';

class Leaderboard extends Component {
  static navigatorStyle = {
    ...ModalNavStyle2,
    drawUnderTabBar: true
  };
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

    this.tabs = [
      { key: 'world', title: 'World', Screen: WorldLeaderboard },
      { key: 'friends', title: 'Friends', Screen: FriendsLeaderboard }
    ];

    this.state = {
      tab: this.tabs[0]
    };

    const navigatorEventsHandler = event =>
      NavigationEventsHandler({
        screen: this.constructor.id,
        navigator: props.navigator,
        event
      });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);
  }

  render() {
    const { Screen } = this.state.tab;

    return (
      <View style={Styles.container}>
        {this._renderTabs()}
        <View style={Styles.container}>
          <Screen navigator={this.props.navigator} />
        </View>
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
        selected={this.state.tab.key} />
    );
  }
}

Leaderboard.title = 'Leaderboard';
Leaderboard.id = 'com.eSportsGlobalGamers.Leaderboard';

export default Leaderboard;
