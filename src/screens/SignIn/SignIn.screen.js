import React from 'react';
import { View } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { ModalNavStyle, ModalNavButtons, NavigationEventsHandler } from '../../utils/Navigator';
import Register from '../Register/RegisterStepOne.screen';
import Login from '../Login/Login.screen';
import Styles from './SignIn.styles';

class SignIn extends React.Component {
  static navigatorStyle = ModalNavStyle;
  static navigatorButtons = ModalNavButtons;

  constructor(props) {
    super(props);

    this.tabs = [
      {
        Screen: Login,
        title: Login.title,
        id: Login.id
      },
      {
        Screen: Register,
        title: Register.title,
        id: Register.id
      }
    ];

    this.state = {
      tab: this.props.tab || this.tabs[0].id
    };

    const navigatorEventsHandler = (event) => NavigationEventsHandler({
      screen: this.constructor.id,
      navigator: props.navigator, event
    });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._renderTabs = this._renderTabs.bind(this);
    this._navigate = this._navigate.bind(this);
  }

  render() {
    return (
      <TabNavigator tabBarStyle={Styles.tabBar} sceneStyle={Styles.scene}>
        { this._renderTabs() }
      </TabNavigator>
    );
  }

  _renderTabs() {
    return this.tabs.map(({ id, title, Screen }, i) => {
      return (
        <TabNavigator.Item selected={this.state.tab === id} title={title.toUpperCase()}
          onPress={() => this.setState({ tab: id })} key={i} tabStyle={Styles.tab}
          titleStyle={Styles.tabText} selectedTitleStyle={Styles.tabTextActive}>
          <View style={Styles.sceneContent}>
            <Screen navigator={this.props.navigator} reset={this.props.reset} />
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

SignIn.title = 'Sign in';
SignIn.id = 'com.eSportsGlobalGamers.SignIn';

export default SignIn;