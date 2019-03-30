import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import SearchBar from '../../components/SearchBar/SearchBar';
import ActionButton from '../../components/ActionButton/ActionButton';
import Loader from '../../components/Loader/Loader';
import { user as userActions } from '../../actions/index';
import Avatar from '../../components/Avatar/Avatar';
import Styles from './SearchUsers.styles';
import { SingleNavStyle, NavigationEventsHandler, SearchNavButtons } from '../../utils/Navigator';
import { ScreenNames } from '../';
import ProfileFriendListing from '../../components/ProfileFriendListing/ProfileFriendListing';
import { menuShape, backButton } from '../../utils/Images';

class SearchUsers extends Component {
  static navigatorStyle = SingleNavStyle;
  static navigatorButtons = SearchNavButtons;

  constructor(props) {
    super(props);

    this.state = {
      textValue: '',
      startSearch: false
    };

    const navigatorEventsHandler = event => {
      if (event.id === '@nav/searchConfirm') {
        this._onSearch();
      } else {
        NavigationEventsHandler({
          screen: this.constructor.id,
          navigator: props.navigator,
          event
        })
      }
    };
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._onSearch = this._onSearch.bind(this);
    this._renderRow = this._renderRow.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onItemPress = this._onItemPress.bind(this);
    this._onActionPress = this._onActionPress.bind(this);
    this._listView = this._listView.bind(this);
    this._challengeFriend = this._challengeFriend.bind(this);
    this._navigateProfile = this._navigateProfile.bind(this);
  }

  componentDidMount() {
    if (this.props.searchForChat) {
      this.props.navigator.setButtons({
        leftButtons: [],
        rightButtons: [],
        animated: true
      });
    }
  }

  componentWillReceiveProps({ searchError }) {
    if (searchError && searchError !== this.props.searchError) {
      this.props.navigator.showLightBox({
        screen: ScreenNames.GeofenceRestriction.id,
        title: '',
        style: {
         backgroundBlur: 'dark',
         backgroundColor: 'rgba(50, 50, 50, 0.2)'
        },
        passProps: {
          title: 'Error!',
          message: 'Username not found.',
          handleClose: () => {
            this.props.unsetError();
            this.props.navigator.dismissLightBox();
          }
        }
      });
    }
  }

  render() {
    const { loading, user, challenging, searchForChat } = this.props;

    return (
      <View style={Styles.contentContainer}>
        <View style={Styles.searchContainer}>
          <View style={Styles.searchBar}>
            <SearchBar
              placeholder="Search by Username"
              onChange={this._onChange}
              autoFocus={false}
              onSubmitEditing={this._onSearch}
              showClearBtn={this.state.textValue.length > 0}
              defaultValue={this.state.textValue}
            />
          </View>
        </View>
        {!searchForChat
          ?
            <View style={Styles.listContainer}>
              {this.state.textValue === '' && challenging
                ? <ScrollView style={Styles.container}>
                    <Text style={Styles.friendListText}>{'my friends'.toUpperCase()}</Text>
                    <ProfileFriendListing
                      data={user.friends}
                      onPress={this._challengeFriend}
                      emptyMessage="You don't have any friends, add one!"
                      button="Select"
                      navigate={this._navigateProfile}
                    />
                  </ScrollView>
                : loading ? <Loader /> : this._listView()}
            </View>
          : this._renderListForNewChat() }
      </View>
    );
  }

  _onChange(data) {
    if (typeof data === 'string' && /^\w{1,15}$/.test(data)) {
      this.setState({ textValue: data });
    }
  }

  _listView() {
    const { startSearch } = this.state;
    const userList = this.props.userList || [];
    const dataSource = this.props.filter(userList);

    if (dataSource && dataSource.length !== 0) {
      return <FlatList data={dataSource} renderItem={this._renderRow} keyExtractor={this._keyExtractor} />;
    } else if (startSearch) {
      return <Text style={Styles.searchResultText}>No Users Found</Text>;
    } else {
      return null;
    }
  }

  _keyExtractor({ _id }) {
    return _id;
  }

  _onSearch() {
    this.setState({ startSearch: true });
    this.props.searchUsers(this.state.textValue);
  }

  _challengeFriend(data) {
    this.props.setOpponent(data);
    this.props.navigator.pop({ animated: true });
  }

  _navigateProfile(data) {
    this.props.navigator.push({
      screen: ScreenNames.Profile.id,
      animated: 'true',
      title: data.mediaId.toUpperCase(),
      backButtonTitle: '',
      navigatorButtons: {
        leftButtons: [{
          icon: backButton,
          disableIconTint: true,
          id: '@nav/editConfirm'
        }],
        rightButtons: [{
          icon: menuShape,
          id: '@nav/menu',
          disableIconTint: true
        }]
      },
      passProps: {
        id: data._id,
        public: this.props.user._id !== data._id,
        challenging: this.props.challenging
      }
    });
  }

  _renderRow({ item }) {
    const avatar = item.profileImage ? { uri: item.profileImage } : null;
    const extra = item.action
      ? <ActionButton
          title={item.legend}
          onPress={() => this._onActionPress(item)}
          style={Styles.button}
          textStyle={Styles.selectText}
        />
      : <Text style={Styles.pendingText}>
          {' '}{item.legend}{' '}
        </Text>;

    return (
      <TouchableOpacity style={Styles.listItem} onPress={() => this._onItemPress(item)}>
        <Avatar style={Styles.avatar} resizeMode="cover" source={avatar} />
        <Text style={Styles.name}>
          {item.mediaId}
        </Text>
        {extra}
      </TouchableOpacity>
    );
  }

  _onActionPress(data) {
    data.action();
    this.props.navigator.pop({ animated: true });
  }

  _onItemPress(data) {
    if (this.props.profile) {
      this.props.navigateProfile(data);
    } else {
      this._onActionPress(data);
    }
  }

  _renderListForNewChat() {
    return <View/>;
  }
}

SearchUsers.title = 'Search for player';
SearchUsers.id = 'com.eSportsGlobalGamers.searchUsers';

const mapStateToProps = ({ user }) => ({
  userList: user.userList,
  loading: user.loading,
  user: user.userData,
  error: user.searchError
});

const mapDispatchToProps = dispatch => ({
  searchUsers: data => dispatch(userActions.searchUsers(data)),
  unsetError: () => dispatch(userActions.unsetSearchError())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsers);