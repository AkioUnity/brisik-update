import React from 'react';
import { View, Text, Image } from 'react-native';
import Moment from 'moment';
import Styles from './PurchaseItem.styles';

const PurchaseItem = ({ createdDate, amount, category, style }) => {
  const startDate = Moment(createdDate);
  const date = startDate.format('MMM D YYYY  |  h:mmA');
  const isPurchase = category.toLowerCase() === 'purchase';

  return (
    <View style={[Styles.container, style]}>
      <View
        style={[
          Styles.leftIndicator,
          amount >= 0 ? Styles.leftIndicatorGreen : Styles.leftIndicatorRed,
          isPurchase ? Styles.leftIndicatorYellow : {}
        ]}
      />
      <Text style={Styles.dayText}>{date.toUpperCase()}</Text>
      {isPurchase
        ?
          (
             <View style={Styles.purchasImageContainer}>
              <Text
                style={[
                  Styles.coinText,
                  amount >= 0 ? Styles.coinTextGreen : Styles.coinTextRed
                ]}>
                {`${amount >= 0 ? '+' : '-'}$${amount >= 0 ? amount : amount * -1}`}
              </Text>
            </View>
          )
        :
          (
            <View style={Styles.purchasImageContainer}>
              <Text
                style={[
                  Styles.coinText,
                  amount >= 0 ? Styles.coinTextGreen : Styles.coinTextRed
                ]}>
                {`${amount >= 0 ? '+' : '-'}$${amount >= 0 ? amount : amount * -1}`}
              </Text>
            </View>
          )
      }
    </View>
  );
};

export default PurchaseItem;