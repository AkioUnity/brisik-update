import React from 'react';
import { Text, View } from 'react-native';

import Styles from './CoinAmount.styles';

const CoinAmount = ({ amount, size }) => {
  return (
    <View style={Styles.container}>
      <View />
      <Text style={Styles.coinAmount}>
        {amount > 0 ? `$${amount}` : 'free'.toUpperCase()}
      </Text>
    </View>
  );
};

export default CoinAmount;