import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Moment from 'moment';
import { timer, timerRed } from '../../utils/Images';
import ActionButton from '../ActionButton/ActionButton';
import Styles from './ChallengeExtendTime.styles';
import Colors from '../../styles/Colors';

class ChallengeExtendTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ended: false,
      icon: timer,
      color: Colors.artigas
    };

    this._everySecond = this._everySecond.bind(this);
    this._countDown = this._countDown.bind(this);
    this._renderTimer = this._renderTimer.bind(this);
    this._onEnd = this._onEnd.bind(this);
  }

  componentDidMount() {
    this.everySecond = setInterval(this._everySecond, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.everySecond);
  }

  render() {
    const { remainingTime } = this.props;
    return (
      <View style={[Styles.container, this.props.style]}>
        {remainingTime && <Text style={Styles.remainingText}>
            {'Starts in'.toUpperCase()}
        </Text> }
        {this._renderTimer(remainingTime)}
        {this.props.showBtn &&
          <TouchableOpacity onPress={this.props.onPress} style={Styles.button}>
            <Image source={this.state.icon} style={[Styles.timerImage, !this.props.showBtn ? Styles.atRight : null]} />
            <Text style={Styles.btnLabel}>{'extend 30 mins'.toUpperCase()}</Text>
          </TouchableOpacity>}
      </View>
    );
  }

  _renderTimer(remainingTime) {
    return (
      <Text style={[remainingTime ? Styles.remainingText : Styles.timer, {color: this.state.color }]}>
        {this._countDown()}
      </Text>
    );
  }

  _countDown() {
    const time = new Date(this.props.time).getTime();
    const now = new Date().getTime();
    const diff = time - now;
    const duration = Moment.duration(diff);
    const tenMinutes = 10000 * 60;

    if (!this.state.ended && diff < 0) {
      clearInterval(this.everySecond);
      this.setState({ ended: true });

      if (this._onEnd) {
        this._onEnd();
      }

      return '00:00:00';
    } else if (diff <= tenMinutes && this.props.endingColor && this.props.endingColor !== this.state.color) {
      this.setState({
        color: this.props.endingColor,
        icon: timerRed
      });
    }

    return this._countDownString(duration);
  }

  _countDownString(time) {
    if (time.years() > 0 || time.months() > 0 || time.days() > 0) {
      return time.humanize(true);
    }

    const countdown = {
      hours: time.hours().toString(),
      minutes: time.minutes().toString(),
      seconds: time.seconds().toString()
    };

    const hours = countdown.hours.length < 2 ? 0 + countdown.hours : countdown.hours;
    const minutes = countdown.minutes.length < 2 ? 0 + countdown.minutes : countdown.minutes;
    const seconds = countdown.seconds.length < 2 ? 0 + countdown.seconds : countdown.seconds;

    return `${hours}:${minutes}:${seconds}`;
  }

  _everySecond() {
    this.forceUpdate();
  }

  _onEnd() {
    clearInterval(this.everySecond);
    if (typeof this.props.onEnd === 'function') {
      this.props.onEnd();
    }
  }
}

export default ChallengeExtendTime;
