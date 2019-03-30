import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import * as Images from '../../utils/Images';
import Styles from './CartItem.styles';

class CartItem extends Component {
  constructor(props) {
    super(props);

    this._removeItem = this._removeItem.bind(this);
  }

  render() {
    const { product, addQuantity, reduceQuantity, quantity } = this.props;
    return (
      <View style={Styles.container}>
        <View style={Styles.information}>
          <Image style={Styles.image}
            source={typeof product.productImageUrl === 'string'
              ? {uri: product.productImageUrl.replace(/^http:/, 'https:')}
              : {uri: product.productImageUrl[0].replace(/^http:/, 'https:')}} />
          <View style={Styles.info}>
            <Text style={Styles.infoTitle}>{product.name}</Text>
          </View>
          <View style={Styles.counter}>
            <Text style={Styles.counterNumber}>
              { quantity }
            </Text>
            <View style={Styles.buttons}>
              <TouchableOpacity style={[Styles.button, Styles.buttonPlus]} onPress={addQuantity}>
                <Text style={Styles.buttonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[Styles.button, Styles.buttonMinus]}
                onPress={ quantity === 1 ? this._removeItem : reduceQuantity }>
                <Text style={Styles.buttonText}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={Styles.price}>
          <Text style={Styles.priceLabel}>Unit Price:</Text>
          <View style={Styles.priceValue}>
            <Text style={Styles.priceNumber}>{product.coinvalue}</Text>
            <Image source={Images.mCoin} style={Styles.priceCoin} />
          </View>
        </View>
      </View>
    );
  }

  _removeItem() {
    const { product, removeItem } = this.props;
    Alert.alert(
      `Are you sure to remove ${product.name} form Cart?`,'',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Decline', style: 'destructive', onPress: () => removeItem() }
      ],
      { cancelable: true }
    );
  }
}

export default CartItem;
