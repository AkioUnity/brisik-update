import React from 'react';
import { TouchableOpacity, Text, Animated } from 'react-native';

import styles from './Alert.styles';

class Alert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      heightAnimation: new Animated.Value(0)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.timer && nextProps.show && !this.props.show) {
      Animated.timing(this.state.heightAnimation, {
        toValue: 40
      }).start();

      this.timer = setTimeout(() => {
        Animated.timing(this.state.heightAnimation, {
          toValue: 0
        }).start();

        clearTimeout(this.timer);
        this.timer = null;

        if (this.props.onHide) {
          this.props.onHide();
        }
      }, 2000);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  render() {
    const { message, onPress, type } = this.props;
    const _styles = [type === 'error' ? styles.errorContainer : styles.container,
      { height: this.state.heightAnimation }];

    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <Animated.View style={_styles}>
          <Text style={styles.message}>{message}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

export default Alert;
