import React, { PureComponent } from 'react';
import {
  Animated,
  PanResponder,
  Dimensions,
  Text,
  View,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import StreamPlayer from '../StreamPlayer/StreamPlayer';
import Chat from '../Chat/Chat';

import Styles from './FeaturedStream.styles';

class FeaturedStream extends PureComponent {
  constructor(props) {
    super(props);

    const aspect16_9 = 0.5625;
    const dimensions = Dimensions.get('window');

    this.width = this.props.availWidth || dimensions.width;
    this.heigth = this.props.availHeight || dimensions.height;
    this.videoFullheight = this.width * aspect16_9;

    this.chatHeight = Dimensions.get('window').height - this.videoFullheight;

    this.state = {
      isOpen: props.startAsThumbnail ? false : true,
      isLoaded: false,
    };

    this.animationInitialValue = props.startAsThumbnail ? this.heigth : 0;
    this.animationLastHandledValue = this.animationInitialValue;

    this._animation = new Animated.Value(this.animationInitialValue);
    this._dismissAnimation = new Animated.Value(0);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderTerminationRequest: () => true,

      onPanResponderMove: (evt, gestureState) => {
        if (this._dismissAnimation._value < 0) {
          return this._dismissAnimation.setValue(gestureState.dx);
        }

        if (this.animationLastHandledValue > 0) {
          if (gestureState.dy >= 0) {
            return this._dismissAnimation.setValue(gestureState.dx);
          }

          if (gestureState.dy >= 0) return;

          const gesture = {
            ...gestureState,
            dy: this.heigth + gestureState.dy
          };
          return Animated.event([
            null,
            {
              dy: this._animation
            }
          ])(evt, gesture);
        }

        return Animated.event([
          null,
          {
            dy: this._animation
          }
        ])(evt, gestureState);
      },

      onPanResponderRelease: (e, { dy, vy, dx, vx }) => {
        if (this.animationLastHandledValue > 0 && Math.abs(dy) < 1 && Math.abs(dx) < 1) {
          return this.fireAnimation(0, 400);
        }

        const velocity = vy || 0;
        const duration = velocity > 0 ? Math.abs(Math.abs(dy) / velocity) || 400 : 400;

        if (dy > 0 && this.animationLastHandledValue === 0) {
          // moving down
          if (dy < this.heigth / 3) {
            const timeLeftToComplete = Math.abs(
              (this.heigth - Math.abs(dy)) / velocity
            );

            if (timeLeftToComplete < 600) {
              // dismiss if has enaugh velocity
              this.fireAnimation(this.heigth, duration, () => {
                this.setState({ isOpen: false });
              });
            } else {
              // go back if not enaugh velocity
              this.fireAnimation(0, duration, () => {
                this.setState({
                  isOpen: true
                });
              });
            }
          } else {
            // dismiss if has enaugh distance
            this.fireAnimation(this.heigth, duration);
          }
        } else if (this.animationLastHandledValue > 0) {
          if (this._dismissAnimation._value < 0) {
            if (dx < this.width * -0.15 || vx > 200) {
              const duration = vx > 0 ? Math.abs(dx) / vx || 400 : 400;
              this.dismissAnimation(this.width * -1, duration);
            } else {
              this.dismissAnimation(0, duration);
            }

            return;
          }

          // when going up
          dy = dy * -1;

          if (dy > 100) {
            // appear if has enaugh distance
            this.fireAnimation(0, duration);
          } else {
            const timeLeftToComplete = Math.abs(
              (this.heigth - Math.abs(dy)) / velocity
            );

            if (timeLeftToComplete < 900) {
              // appear if has enaugh velocity
              this.fireAnimation(0, duration, () => {
                this.setState({
                  isOpen: true
                });
              });
            } else {
              // go back if not enaugh velocity
              this.fireAnimation(this.heigth, duration, () => {
                this.setState({ isOpen: false });
              });
            }
          }
        }
      }
    });

    this.opacityInterpolate = this._animation.interpolate({
      inputRange: [0, this.heigth],
      outputRange: [1, 0]
    });

    this.translateYInterpolate = this._animation.interpolate({
      inputRange: [0, this.heigth],
      outputRange: [0, this.heigth - this.videoFullheight * 0.5 - 60],
      extrapolate: 'clamp'
    });

    this.scaleInterpolate = this._animation.interpolate({
      inputRange: [0, this.heigth],
      outputRange: [1, 0.5],
      extrapolate: 'clamp'
    });

    this.translateXInterpolate = this._animation.interpolate({
      inputRange: [0, this.heigth],
      outputRange: [0, -0.25 * this.width + 10],
      extrapolate: 'clamp'
    });

    this.scrollStyles = {
      opacity: this.opacityInterpolate,
      top: this._animation.interpolate({
        inputRange: [0, this.heigth],
        outputRange: [this.videoFullheight, this.heigth],
        extrapolate: 'clamp'
      }),
      height: this.chatHeight
    };

    this.videoStyles = {
      transform: [
        {
          translateY: this.translateYInterpolate
        },
        {
          translateX: this.translateXInterpolate
        },
        {
          scale: this.scaleInterpolate
        }
      ]
    };

    this.dismissableStyles = {
      transform: [
        {
          translateX: this._dismissAnimation.interpolate({
            inputRange: [this.width * -1, 0],
            outputRange: [this.width * -1, 0],
            extrapolate: 'clamp'
          })
        }
      ]
    };
  }

  onNavigationEvent = (event) => {
    const { type, id } = event;

    if (type === 'ScreenChangedEvent' && id === 'didDisappear') {
      if (!this.state.isClosed) {
        this._dismissAnimation.setValue(this.width * -1);

        if (this.state.isOpen) {
          this._animation.setValue(this.animationInitialValue);
        }

        this.setState({
          isClosed: true,
          isOpen: false
        });

        this.props.onMinimized();
      }
    }
  }

  fireAnimation = (toValue, duration, onEnd) => {
    this._animation.stopAnimation(() => {
      Animated.timing(this._animation, {
        toValue,
        duration
      }).start(() => {
        this.animationLastHandledValue = toValue;

        if (toValue === 0) {
          if (this.props.onFullScreen) {
            this.props.onFullScreen();
          }
        } else {
          if (this.props.onMinimized) {
            this.props.onMinimized();
          }
        }

        if (onEnd) {
          onEnd();
        }
      });
    });
  };

  dismissAnimation = (toValue, duration, onEnd) => {
    this._dismissAnimation.stopAnimation(() => {
      Animated.timing(this._dismissAnimation, {
        toValue,
        duration
      }).start(() => {
        if (toValue < 0) {
          this.onClose();
        }

        if (onEnd) {
          onEnd();
        }
      });
    });
  };

  render() {
    const { width, height } = this;
    const { isFloating, featuredStream } = this.props;
    const { isOpen, isLoaded, isClosed, chatBodyDimensions } = this.state;

    if (!featuredStream || isClosed) {
      return null;
    }

    const { src, title, desc } = featuredStream;

    return (
      <Animated.View
        style={[
          Styles.container,
          isFloating ? Styles.containerFloating : null,
          !isOpen ? this.dismissableStyles : null,
          { opacity: isLoaded ? 1 : 0, backgroundColor: '#fff' }
        ]}
      >
        <Animated.View
          style={[{ width, height, }, this.videoStyles]}
          {...this.panResponder.panHandlers}
        >
          <StreamPlayer source={src} onLoad={this.onLoad} />
        </Animated.View>
        <Animated.View
          style={[
            Styles.chat,
            this.scrollStyles,
          ]}
        >
          <View style={Styles.chatHeading}>
            <Text style={Styles.chatHeadingTitle}>{title}</Text>
            <Text style={Styles.chatHeadingDesc}>{desc}</Text>
          </View>
          <View style={Styles.chatBody} onLayout={this.onChatBodyLayout}>
            { chatBodyDimensions &&
              <Chat height={chatBodyDimensions.height} navigator={this.props.navigator} /> }
          </View>
        </Animated.View>
      </Animated.View>
    );
  }

  open = () => {
    if (this.state.isClosed) {
      this.setState({
        isClosed: false
      }, () => {
        this.dismissAnimation(0, 400, () => {
          this.fireAnimation(0, 400, () => {
            this.setState({
              isOpen: true,
              isClosed: false
            });
          });
        });
      });
    } else {
      this.fireAnimation(0, 400, () => {
        this.setState({
          isOpen: true
        });
      });
    }
  };

  onClose = () => {
    this.setState({
      isClosed: true
    });
  }

  onLoad = () => {
    this.setState({
      isLoaded: true,
    });
  }

  onChatBodyLayout = (event) => {
    if (this.state.chatBodyDimensions) return;

    let { width, height } = event.nativeEvent.layout;

    if (height === 0) return;

    const d = Dimensions.get('window');
    const isX = Platform.OS === 'ios' && (d.height > 800 || d.width > 800) ? true : false;

    if (isX) {
      height -= 40;
    }

    this.setState({ chatBodyDimensions: { width, height } });
  };
}

export default connect(({ common }) => ({
  featuredStream: common.featuredStream,
}), null, null, { withRef: true })(FeaturedStream);
