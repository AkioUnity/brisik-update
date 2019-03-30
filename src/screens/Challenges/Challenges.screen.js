import React, { Component } from 'react';
import { View, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';

import { ModalNavStyle2, NavigationEventsHandler } from '../../utils/Navigator';
import MyChallenges from '../MyChallenges/MyChallenges.screen';
import OpenChallenges from '../OpenChallenges/OpenChallenges.screen';
import TabView from '../../components/TabView/TabView';
import FeaturedStream from '../../components/FeaturedStream/FeaturedStream';
import { fetchFeaturedStream } from '../../actions/Common/Common.actions';

import Styles from './Challenges.styles';
class Challenges extends Component {
  static navigatorStyle = ModalNavStyle2;

  constructor(props) {
    super(props);

    this.tabs = [
      { key: 'my', title: 'My Challenges', Screen: MyChallenges },
      { key: 'open', title: 'Open Challenges', Screen: OpenChallenges }
    ];

    this.state = {
      tab: this.tabs[0],
    };

    const navigatorEventsHandler = (event) => {
      if (this.featuredStream) {
        this.featuredStream.wrappedInstance.onNavigationEvent(event);
      }

      if (event.id === '@nav/featuredStream') {
        return this.featuredStream.wrappedInstance.open();
      }

      if (event.id === 'didAppear') {
        this.props.fetchFeaturedStream();
      }

      return NavigationEventsHandler({
        screen: this.constructor.id,
        navigator: props.navigator,
        event
      });
    };

    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._renderTabs = this._renderTabs.bind(this);
  }

  render() {
    const { Screen } = this.state.tab;

    return (
      <View style={Styles.container} onLayout={this.onLayout}>
        {this._renderTabs()}
        <View style={Styles.container}>
          <Screen navigator={this.props.navigator} />
        </View>
        { this.state.availDimensions && Platform.OS === 'ios' && !__DEV__  && <FeaturedStream
          isFloating
          startAsThumbnail
          availHeight={this.state.availDimensions ? this.state.availDimensions.height : null}
          availWidth={this.state.availDimensions ? this.state.availDimensions.width : null}
          onFullScreen={this.onFeaturedFullScreen}
          onMinimized={this.onFeaturedMinimized}
          navigator={this.props.navigator}
          ref={(ref) => this.featuredStream = ref}
        /> }
      </View>
    );
  }

  onFeaturedFullScreen = () => {
    this.props.navigator.setStyle({
      statusBarHidden: true
    });

    this.props.navigator.toggleNavBar({
      to: 'hidden',
      animated: true
    });

    this.props.navigator.toggleTabs({
      to: 'hidden',
      animated: true
    });
  }

  onFeaturedMinimized = () => {
    this.props.navigator.setStyle({
      statusBarHidden: false
    });

    this.props.navigator.toggleNavBar({
      to: 'shown',
      animated: false
    });

    this.props.navigator.toggleTabs({
      to: 'shown',
      animated: true
    });
  }

  _renderTabs() {
    const onPress = (tab) => {
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

  onLayout = (event) => {
    if (this.state.availDimensions) return;

    let { width, height } = event.nativeEvent.layout;

    if (height === 0) return;

    const d = Dimensions.get('window');
    const isX = Platform.OS === 'ios' && (d.height > 800 || d.width > 800) ? true : false;

    if (isX) {
      height -= 40;
    }

    this.setState({ availDimensions: { width, height } });
  };
}

Challenges.title = 'Home';
Challenges.id = 'com.eSportsGlobalGamers.Challenges';

export default connect(null, {fetchFeaturedStream})(Challenges);
