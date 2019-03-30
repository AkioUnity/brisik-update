import React from 'react';
import { View, Animated, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import { NavigationEventsHandler, ModalNavStyle2 } from '../../utils/Navigator';
import RegisterStepOne from './RegisterStepOne.screen';
import RegisterStepTwo from './RegisterStepTwo.screen';
import { userShape, logoDark, lockShape, mailShape } from '../../utils/Images';

import Styles from './Register.styles';

class Register extends React.Component {
  static navigatorStyle = ModalNavStyle2;

  constructor(props) {
    super(props);

    this.tabs = [
      { key: 0, Screen: RegisterStepOne, passProps: {} },
      { key: 1, Screen: RegisterStepTwo, passProps: {} }
    ];

    this.fade = new Animated.Value(0);

    this.state = {
      tab: this.tabs[0]
    };

    const navigatorEventsHandler = (event) => NavigationEventsHandler({
      screen: this.constructor.id,
      navigator: props.navigator, event
    });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._switchStep = this._switchStep.bind(this);
  }

  componentDidMount() {
    Animated.timing(
      this.fade,
      {
        toValue: 1,
        duration: 700
      }
    ).start();
  }

  componentWillUpdate(_, { tab }) {
    if (tab.key !== this.state.tab.key) {
      this.fade = new Animated.Value(0);

      Animated.timing(
        this.fade,
        {
          toValue: 1,
          duration: 700
        }
      ).start();
    }
  }

  render() {
    const { Screen, passProps } = this.state.tab;

    return (
      <View style={Styles.container}>
        { this._renderBullets() }
        <View style={{ zIndex: 1, position: 'absolute', top: 65, left: 60, right: 60 }}>
          <KeyboardAwareScrollView>
            <Screen navigator={this.props.navigator} switchStep={this._switchStep} { ...passProps } />
          </KeyboardAwareScrollView>
        </View>
        <Image source={logoDark} style={Styles.logo} />
      </View>
    );
  }

  _renderBullets() {
    const { key } = this.state.tab;
    const content = key === 0
      ? (
          <View style={Styles.stepContainer}>
            <Animated.View style={[Styles.step, { opacity: this.fade }]}>
              <View style={Styles.stepActive} />
            </Animated.View>
            <View style={Styles.step} />
          </View>
        )
      : (
          <View style={Styles.stepContainer}>
            <View style={Styles.step} />
            <Animated.View style={[Styles.step, { opacity: this.fade }]}>
              <View style={Styles.stepActive} />
            </Animated.View>
          </View>
        );

    return content;
  }

  _switchStep({ key, props }) {
    const nextTab = this.tabs[key];
    if (props) {
      nextTab.passProps = props;
    }

    this.setState({ tab: nextTab });
  }
}

Register.title = 'Register';
Register.id = 'com.eSportsGlobalGamers.Register';

export default Register;