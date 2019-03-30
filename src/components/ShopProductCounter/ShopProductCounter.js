import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';

import * as Images from '../../utils/Images';
import Styles from './ShopProductCounter.styles';

class ShopProductCounter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1
    };

    this._plusOne = this._plusOne.bind(this);
    this._minusOne = this._minusOne.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.quantity !== this.state.quantity;
  }

  componentWillUpdate(nextProps, nextState) {
    this.props.handleQuantity(nextState.quantity);
  }

  render() {
    return (
      <View style={Styles.container}>
        <View style={this.state.quantity === 1 ? Styles.disabled : {}}>
          <TouchableOpacity style={Styles.button} onPress={this._minusOne}>
            <Image source={Images.cartMinus} resizeMode="contain" />
          </TouchableOpacity>
        </View>
        <Text style={Styles.number}>{this.state.quantity}</Text>
        <TouchableOpacity style={Styles.button} onPress={this._plusOne}>
          <Image source={Images.cartAdd} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    );
  }

  _plusOne() {
    this.setState(({quantity}) => ({
      quantity: quantity + 1
    }));
  }

  _minusOne() {
    if (this.state.quantity === 1) { return; }

    this.setState(({quantity}) => ({
      quantity: quantity - 1
    }));
  }
}

export default ShopProductCounter;