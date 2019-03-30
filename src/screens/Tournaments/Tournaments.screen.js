import React, { Component } from 'react';
import { View } from 'react-native';

import { ModalNavStyle2, NavigationEventsHandler, TournamentsNavButtons } from '../../utils/Navigator';
import * as ChallengeActions from '../../actions/Challenge/Challenge.actions';
import MyTournaments from '../MyTournaments/MyTournaments.screen';
import OpenTournaments from '../OpenTournaments/OpenTournaments.screen';
import TabView from '../../components/TabView/TabView';

import Styles from './Tournaments.styles';
class Tournaments extends Component {
  static navigatorStyle = ModalNavStyle2;
  static navigatorButtons = TournamentsNavButtons;

  constructor(props) {
    super(props);

    this.tabs = [
      { key: 'my', title: 'My Tournaments', Screen: MyTournaments },
      { key: 'open', title: 'Open Tournaments', Screen: OpenTournaments }
    ];

    this.state = {
      tab: this.tabs[0]
    };

    const navigatorEventsHandler = (event) => NavigationEventsHandler({
      screen: this.constructor.id,
      navigator: props.navigator,
      event
    });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._renderTabs = this._renderTabs.bind(this);
    this._switchToTab = this._switchToTab.bind(this);
  }

  render() {
    const { Screen, key } = this.state.tab;

    return (
      <View style={Styles.container}>
        {this._renderTabs()}
        <View style={Styles.container}>
          <Screen navigator={this.props.navigator} switchToTab={this._switchToTab} tabKey={key} />
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

  _switchToTab(tabKey) {
    if (tabKey && typeof tabKey === 'string') {
      let tab = null;

      if (tabKey === 'my') {
        tab = this.tabs[1];
      } else if (tabKey === 'open') {
        tab = this.tabs[0];
      }

      this.setState({ tab: tab });
    }
  }
}

Tournaments.title = 'Tournaments';
Tournaments.id = 'com.eSportsGlobalGamers.Tournaments';

export default Tournaments;
