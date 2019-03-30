import { StyleSheet } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  notificationTextContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    fontSize: 15,
    color: Colors.colonia,
    letterSpacing: 0.54,
    backgroundColor: 'transparent',
    fontFamily: Fonts.get('regular')
  },
  amount: {
    color: Colors.minas
  },
  textBold: {
    fontFamily: Fonts.get('medium')
  }
});

export default Styles;
