import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import TabNavigator from 'react-native-tab-navigator';
import { PrincipalNavStyle, NavigationEventsHandler } from '../../utils/Navigator';
import Challenges from '../Challenges/Challenges.screen';
import Tournaments from '../Tournaments/Tournaments.screen';
import Leaderboard from '../Leaderboard/Leaderboard.screen';
import Shop from '../Shop/Shop.screen';
import Styles from './Dashboard.styles';

class Dashboard extends Component {
  static navigatorStyle = PrincipalNavStyle;

  constructor(props) {
    super(props);

    this.tabs = [
      {
        Screen: Challenges,
        title: Challenges.title,
        id: Challenges.id
      },
      {
        Screen: Tournaments,
        title: Tournaments.title,
        id: Tournaments.id
      },
      {
        Screen: Leaderboard,
        title: Leaderboard.title,
        id: Leaderboard.id
      },
      {
        Screen: Shop,
        title: Shop.title,
        id: Shop.id
      }
    ];

    this.state = {
      tab: this.tabs[0].id
    };

    const navigatorEventsHandler = (event) => NavigationEventsHandler({
      screen: this.constructor.id,
      navigator: props.navigator,
      event
    });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._renderTabs = this._renderTabs.bind(this);
    this._navigate = this._navigate.bind(this);
  }

  render() {
    return (
      <View style={Styles.container}>
        <TabNavigator tabBarStyle={Styles.tabBar} sceneStyle={Styles.scene} tabBarShadowStyle={Styles.tabShadow}>
          {this._renderTabs()}
        </TabNavigator>
      </View>
    );
  }

  _renderTabs() {
    return this.tabs.map(({ id, title, Screen }, i) => {
      return (
        <TabNavigator.Item
          selected={this.state.tab === id}
          title={title.toUpperCase()}
          onPress={() => this.setState({ tab: id })}
          key={i}
          tabStyle={Styles.tab}
          titleStyle={Styles.tabText}
          selectedTitleStyle={Styles.tabTextActive}
        >
          <View style={Styles.sceneContent}>
            <Screen navigator={this.props.navigator} />
            { id !== Shop.id && <View style={Styles.topShadow} /> }
          </View>
        </TabNavigator.Item>
      );
    });
  }

  _navigate(screen) {
    this.props.navigator.push({
      screen,
      animated: true,
      backButtonTitle: ''
    });
  }
}

Dashboard.title = '';
Dashboard.id = 'com.eSportsGlobalGamers.Dashboard';

export default connect()(Dashboard);
