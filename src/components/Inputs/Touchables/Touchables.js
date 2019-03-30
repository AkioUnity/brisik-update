import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import Styles from './Touchables.styles';

const Touchables = ({ selected, values, onPress, type }) => (
  <View style={Styles.container}>
    {values.map(({ label, value }, i) => {
      const handleOnPress = () => _handleOnPress(value, onPress);
      const lastItem = i === (values.length - 1);
      const active = selected === value;

      return (
        <TouchableOpacity
          onPress={handleOnPress}
          key={`touchable_${value}`}
          style={[
            Styles.itemTouchable,
            lastItem ? Styles.lastItemTouchable : {},
            active ? Styles.itemTouchableActive : {}
          ]}
        >
          <View
            style={[Styles.itemWrapper, active ? Styles.itemWrapperActive : {}]}
          >
            <Text style={Styles.itemLabel}>
              {label.toUpperCase()}
            </Text>
          </View>
        </TouchableOpacity>
      );
    })}
  </View>
);

const _handleOnPress = (data, action) => {
  if (typeof action === 'function') {
    return action(data);
  }
};

export default Touchables;