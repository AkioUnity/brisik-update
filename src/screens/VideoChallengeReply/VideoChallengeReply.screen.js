import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import * as Images from '../../utils/Images';
import { capitalize } from '../../utils/Utils';
import ActionButton from '../../components/ActionButton/ActionButton';
import Colors from '../../styles/Colors';

import Styles from './VideoChallengeReply.style';

class VideoChallengeReply extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: ''
    };
  }

  render() {
    const { buttonSet, title, message, customContent } = this.props;

    return (
      <View style={Styles.container}>
        <View style = {{
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%'
        }}>
            <TouchableOpacity onPress={() => this._handleAction('reply')} style = {{flexDirection: 'column', margin: 20}}>
                <Image 
                    source={Images.videoReply}
                    style={{ height: 90, width: 90, backgroundColor: '#00000000' }}
                />
                <Text style = {Styles.buttonText}>REPLY</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._handleAction('close')} style = {{flexDirection: 'column', margin: 20}}>
                <Image 
                    source={Images.buttonVideoClose}
                    style={{ height: 90, width: 90, backgroundColor: '#00000000' }}
                />
                <Text style = {Styles.buttonText}>CLOSE</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }



  _handleAction(actionName, action = null) {
    const { handleClose } = this.props;

    switch(actionName) {
      case 'close':
        if (typeof handleClose === 'function') {
          return this.props.handleClose();
        }
        break;
      case 'reply':
        if (typeof handleClose === 'function') {
            return this.props.handleChallengeReply();
        }
        break;
      default:
        this.props.handleClose();
        break;
    }
  }

  _handleInputChange = char => {
    this.setState({ inputValue: char });
  }

  
  
}

VideoChallengeReply.id = 'com.eSportsGlobalGamers.VideoChallengeReply';
VideoChallengeReply.title = 'VideoChallengeReply';

VideoChallengeReply.propTypes = {
  handleClose: PropTypes.func,
  buttonSet: PropTypes.string,
};

export default VideoChallengeReply;
