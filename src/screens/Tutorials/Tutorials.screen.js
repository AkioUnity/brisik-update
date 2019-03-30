import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { connect } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { SingleNavStyle, NavigationEventsHandler } from '../../utils/Navigator';
import { playShape } from '../../utils/Images';
import Styles from './Tutorials.styles';

class Tutorials extends Component {
  static navigatorStyle = SingleNavStyle;

  constructor(props) {
    super(props);

    this.state = {
      current: this.props.tutorials ? this.props.tutorials[0] : null
    };

    const navigatorEventsHandler = (event) => NavigationEventsHandler({
      screen: this.constructor.id,
      navigator: props.navigator, event
    });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._renderItem = this._renderItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tutorials && !this.state.current) {
      this.setState({
        current: nextProps.tutorials[0]
      });
    }
  }

  render() {
    const { tutorials } = this.props;

    if (!tutorials || !this.state.current) {
      return <Loader />;
    }

    const { title, video, description, _id } = this.state.current;

    return (
      <View style={Styles.container}>
        <FlatList data={tutorials} renderItem={this._renderItem} keyExtractor={this._keyExtractor} />
      </View>
    );
  }

  _renderItem({ item, index }) {
    const { thumbnail, duration, title } = item;
    const selected = this.state.current._id === item._id;
    const longTitle = title.length > 35;

    return (
      <TouchableOpacity onPress={() => this._openTutorial(item.video)}
        style={Styles.item}>
        <View style={Styles.itemImageContainer}>
          <Image style={Styles.itemImage} source={{ uri: thumbnail.replace(/^http:/, 'https:') }} />
          <View style={Styles.containerItemDuration}>
            <View style={Styles.containerItemDurationBorder}>
              <Image source={playShape} resizeMode="contain" />
              <Text style={Styles.itemStatic}>{'play video'.toUpperCase()}</Text>
              <View style={Styles.durationContainer}>
                <Text style={Styles.itemDuration}>{duration}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={Styles.itemTitleContainer}>
          <Text numberOfLines={1} style={Styles.itemTitle}>
            {longTitle ? title.substring(0, 35) + '...' : title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  _keyExtractor({ _id }) {
    return _id;
  }

  _openTutorial(url) {
    Linking.openURL(url).catch(e => console.warn(JSON.stringify(e)));
  }
}

Tutorials.id = 'com.eSportsGlobalGamers.Tutorials';
Tutorials.title = 'Tutorials';

const mapStateToProps = ({ user, chat, notification, common }) => ({
  navigatorParams: {
    hasUser: !!user.userData,
    hasNotification: !!notification.hasNotification,
    hasChatNotification: !!chat.hasNotification
  },
  tutorials: common.tutorials
});

export default connect(mapStateToProps)(Tutorials);
