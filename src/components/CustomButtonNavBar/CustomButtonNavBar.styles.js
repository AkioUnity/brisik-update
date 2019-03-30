import { StyleSheet } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  btnText: {
    color: Colors.colonia,
    fontSize: 13,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.87,
    lineHeight: 20
  }
});

export default Styles;