import React from 'react';
import PropTypes from 'prop-types';
import { Text, Image, TouchableOpacity } from 'react-native';
import * as Images from '../../../utils/Images';
import Styles from '../Inputs.styles';

const Select = props => {
  const { min, max, interval, placeholder } = props;
  let value = props.value;
  let valueLabel = props.label || props.value;
  let values = [];

  if (props.type === 'number') {
    for (let i = min; i <= max; i += interval) {
      values.push(i);
    }
  } else if (props.type === 'options') {
    values = values.concat(props.options);
    let item = values.find(item => item.value === value);
    valueLabel = item && item.label;
  }
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={Styles.inputContiner}
      onPress={() =>
        props.onPress({
          type: props.type,
          value,
          values
        })}
    >
      <Text
        style={[
          Styles.input,
          props.background && Styles.withBackground,
          !valueLabel && placeholder && Styles.placeholder
        ]}
      >
        {valueLabel || placeholder}
      </Text>
      <Image style={Styles.inputChevron} source={Images.chevronRight} />
    </TouchableOpacity>
  );
};

Select.propTypes = {
  type: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  interval: PropTypes.number
};

export default Select;
