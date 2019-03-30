import React from 'react';
import { View, Text, Image } from 'react-native';
import Styles from './ShopProduct.styles';
import * as Images from '../../utils/Images';

const ShopProduct = (props) => {
  const largeName = props.name.length > 18;

  return (
    <View style={Styles.container}>
      <Image
        style={Styles.image}
        resizeMode="contain"
        source={typeof props.productImageUrl === 'string' 
          ? {uri: props.productImageUrl.replace(/^http:/, 'https:')}
          : {uri: props.productImageUrl[0].replace(/^http:/, 'https:')} }
      />
      <Text style={Styles.text}>{largeName ? props.name.substring(0, 18) + '...' : props.name}</Text>
      <View style={Styles.amountContainer}>
        <View style={Styles.coinShape} />
        <Text style={Styles.priceText}>{props.coinvalue}</Text>
      </View>
    </View>
  );
};

export default ShopProduct;