import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { ScreenNames } from '../../screens';
import * as userActions from '../../actions/User/User.actions';
import { menuShape, backButton } from '../../utils/Images';
import ActionButton from '../../components/ActionButton/ActionButton';
import Loader from '../../components/Loader/Loader';
import Avatar from '../../components/Avatar/Avatar';
import { ModalNavStyle2 } from '../../utils/Navigator';

import Styles from './AddFriends.styles';

class AddFriends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recent: true
    };

    this._searchUsers = this._searchUsers.bind(this);
    this._renderItem = this._renderItem.bind(this);
  }

  componentDidMount() {
    this.props.navigator.setStyle({
      ...ModalNavStyle2,
      navBarCustomView: 'com.eSportsGlobalGamers.SearchNavbar',
      navBarComponentAlignment: 'fill',
      navBarCustomViewInitialProps: {
        navigator: this.props.navigator,
        handleSearch: value => this._searchUsers(value)
      }
    });
  }

  componentWillReceiveProps({ error }) {
    if (error && error !== this.props.error) {
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
    const { loadingUsers, searchResult } = this.props;

    if (loadingUsers) {
      return <View style={Styles.container}><Loader /></View>;
    }

    return (
      <View style={Styles.container}>
        {searchResult && this.state.recent &&
          <View style={Styles.sectionHeader}>
            <Text style={Styles.sectionTitle}>{ 'recent'.toUpperCase() }</Text>
          </View>
        }
        {searchResult ? this._renderResultList(searchResult) : null}
      </View>
    );
  }

  _renderResultList(users) {
    return (
      <FlatList
        data={users}
        keyExtractor={item => this.item = item._id}
        renderItem={this._renderItem}
      />
    );
  }

  _renderItem({ item }) {
    const { userFriends } = this.props;
    const isAlreadyFriend = userFriends.map(friend => friend._id).indexOf(item._id) > -1;
    const onPress = () => this._navigateToProfile(item._id);

    return (
      <View key={`searchResult_${item._id}`} style={Styles.itemContainer}>
        <TouchableOpacity style={Styles.userContainer} onPress={onPress}>
          <Avatar source={{ uri: item.profileImage }} style={Styles.userAvatar} />
          <Text style={Styles.username}>{ item.mediaId }</Text>
        </TouchableOpacity>
        {!isAlreadyFriend &&
          <ActionButton title="Add" onPress={() => this._addFriend(item._id)}
            style={Styles.button} textStyle={Styles.buttonText} />}
      </View>
    );
  }

  _searchUsers(value) {
    this.setState({ recent: false });
    this.props.searchUsers(value);
  }

  _addFriend(userId) {
    this.props.sendFriendRequest(userId);
    setTimeout(() => {
      this.props.navigator.showLightBox({
        screen: ScreenNames.GeofenceRestriction.id,
        title: '',
        style: {
         backgroundBlur: 'dark',
         backgroundColor: 'rgba(50, 50, 50, 0.2)'
        },
        passProps: {
          title: 'Success',
          message: 'Friend request sent successfully!',
          handleClose: () => this.props.navigator.dismissLightBox()
        }
      });
    }, 100);
  }

  _navigateToProfile(id) {
    this.props.navigator.push({
      screen: ScreenNames.Profile.id,
      title: ScreenNames.Profile.title.toUpperCase(),
      animated: true,
      passProps: { id, public: true },
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
      }
    });
  }
}

AddFriends.title = 'Add friends';
AddFriends.id = 'com.eSportsGlobalGamers.AddFriends';

const mapStateToFriends = state => {
  return {
    loadingUsers: state.user.loading,
    searchResult: state.user.userList,
    userFriends: state.user.userData.friends,
    error: state.user.searchError
  };
};

const mapDispatchToFriends = dispatch => {
  return {
    searchUsers: data => dispatch(userActions.searchUsers(data)),
    sendFriendRequest: friendId => dispatch(userActions.sendFriendRequest(friendId)),
    unsetError: () => dispatch(userActions.unsetSearchError())
  };
};

export default connect(mapStateToFriends, mapDispatchToFriends)(AddFriends);