import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';

import Loader from '../Loader/Loader';

import Styles from './ActionButton.styles';

class ActionButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };

    this._onPress = this._onPress.bind(this);
  }

  render() {
    const dynamicStyle = this.props.type === 'dark' ? Styles.actionButtonDark : {};
    let buttonContent;
    if (this.props.loading || (this.state.loading && this.props.async)) {
      buttonContent = <Loader size={this.props.loadingSize} />;
    } else if (typeof this.props.title === 'string') {
      buttonContent = (
        <Text style={[Styles.actionButtonText, this.props.textStyle]}>
          {this.props.title.toUpperCase()}
        </Text>
      );
    } else {
      buttonContent = this.props.title;
    }

    return (
      <TouchableOpacity onPress={this._onPress} style={[Styles.actionButton, dynamicStyle, this.props.style]}>
        {buttonContent}
      </TouchableOpacity>
    );
  }

  _onPress() {
    if (this.state.loading) {
      return;
    }

    if (this.props.async) {
      this.setState({
        loading: true
      });

      if (typeof this.props.onPress === 'function') {
        this.props.onPress(() => {
          this.setState({
            loading: false
          });
        });
      }
    } else {
      if (typeof this.props.onPress === 'function') {
        this.props.onPress();
      }
    }
  }
}

ActionButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  type: PropTypes.string,
  loading: PropTypes.bool,
  style: PropTypes.any,
  async: PropTypes.bool
};

ActionButton.defaultProps = {
  style: {}
};

export default ActionButton;
