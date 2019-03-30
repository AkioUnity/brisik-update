import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import Styles from './MultiplePicker.styles';

const MultiplePicker = props => {
  const {
    obj,
    index,
    onPress,
    innerColor,
    borderColor,
    borderWidth,
    isSelected,
    firstOpt,
    lastOpt,
    defaultColor
  } = props;

  return (
    <View
      style={[
        Styles.wrapper,
        borderWidth && { borderWidth: borderWidth },
        { borderColor: borderColor && !isSelected ? borderColor : innerColor },
        firstOpt && Styles.firstOpt,
        lastOpt && Styles.lastOpt
      ]}
    >
      <TouchableOpacity
        style={[
          Styles.optionContainer,
          defaultColor && { backgroundColor: defaultColor },
          isSelected && innerColor && { backgroundColor: innerColor },
          !isSelected && firstOpt && { marginLeft: 17 },
          !isSelected && lastOpt && { marginRight: 17 }
        ]}
        onPress={() => onPress(obj, index)}
        activeOpacity={0.75}>
        <Text
          style={[
            Styles.optionLabel,
            !isSelected && firstOpt && { left: -17 },
            !isSelected && lastOpt && { right: -17 }
          ]}
        >
          {obj.label.toUpperCase()}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MultiplePicker;