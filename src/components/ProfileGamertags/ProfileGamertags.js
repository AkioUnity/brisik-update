import React, { Component } from 'react';
import { AlertIOS, View, Platform} from 'react-native';
import { connect } from 'react-redux';
import * as UserActions from '../../actions/User/User.actions';
import ProfileGamertagsItem from '../ProfileGamertagsItem/ProfileGamertagsItem';
import { ScreenNames } from '../../screens';
import { capitalize } from '../../utils/Utils';

import * as Images from '../../utils/Images';

import Styles from './ProfileGamertags.styles';

const providers = [
  {
    logoUrl: Images.twitchGamertag,
    name: 'Twitch',
    key: 'twitchgamertag'
  },
  {
    logoUrl: Images.psIcon,
    name: 'PS4',
    key: 'ps4gamertag'
  },
  {
    logoUrl: Images.xboxIcon,
    name: 'XBOX',
    key: 'xboxgamertag'
  }
];

class ProfileGamertags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      xboxgamertag: this.props.xboxgamertag,
      ps4gamertag: this.props.ps4gamertag,
      twitchgamertag: this.props.twitchgamertag,
      largeText: false,
      loading: {}
    };

    this._renderList = this._renderList.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._showPrompt = this._showPrompt.bind(this);
    this._onPrompt = this._onPrompt.bind(this);
    this._firePrompt = this._firePrompt.bind(this);
  }

  componentWillReceiveProps({ xboxgamertag, ps4gamertag, twitchgamertag }) {
    const newState = { ...this.state };

    if (xboxgamertag !== this.state.xboxgamertag) {
      newState.xboxgamertag = xboxgamertag;
      newState.loading.xboxgamertag = false;
    }

    if (ps4gamertag !== this.state.ps4gamertag) {
      newState.ps4gamertag = ps4gamertag;
      newState.loading.ps4gamertag = false;
    }

    if (twitchgamertag !== this.state.twitchgamertag) {
      newState.twitchgamertag = twitchgamertag;
      newState.loading.twitchgamertag = false;
    }

    this.setState(newState);
  }

  render() {
    return <View style={Styles.container}>{ providers.map(this._renderList) }</View>;
  }

  _renderList({ logoUrl, key, name }) {
    return (
      <ProfileGamertagsItem
        platformLogo={logoUrl}
        platformName={name}
        value={this.state[key]}
        loading={this.state.loading[key]}
        onPress={this.props.edit ? () => this._showPrompt(key, name) : null}
        key={key}
        showButton={!this.props.public}
      />
    );
  }

  _showPrompt(key, name) {
    const title = `Enter ${capitalize(name)} ID`;
    const description = 'Gamertag should be less than 15 characters';
    const addonType = name;
    const buttons = [
      {
        label: 'Cancel',
        type: 'dark',
        onPress: () => this.props.navigator.dismissLightBox()
      },
      { label: 'Save' }
    ];

    this._firePrompt(title, description, buttons, addonType, key);
  }

  _firePrompt(title, description, buttons, addonType, key) {
    this.props.navigator.showLightBox({
      screen: ScreenNames.GeofenceRestriction.id,
      title: '',
      style: {
       backgroundBlur: 'dark',
       backgroundColor: 'rgba(50, 50, 50, 0.2)'
      },
      passProps: {
        title: title,
        buttonSet: 'gamertag',
        buttons: buttons,
        inputAddon: addonType,
        handleClose: () => this.props.navigator.dismissLightBox(),
        handleSubmit: value => this._onPrompt(key, value)
      }
    });
  }

  _onPrompt(key, value) {
    if (value.length > 15) {
      this.setState({ largeText: true });
      return;
    }
    this._onSubmit(key, value);
  }

  _onSubmit(key, value) {
    const data = { [key]: value };

    this.setState({
      loading: { ...this.state.loading, [key]: true },
      [key]: null
    });
    this.props.update(data);
    this.props.navigator.dismissLightBox();
  }
}

const mapStateToProps = (state) => ({
  error: state.user.gamertagsError
});

const mapDispatchToProps = (dispatch) => ({
  update: (data) => dispatch(UserActions.updateProfile(data, 'gamertags'))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileGamertags);
