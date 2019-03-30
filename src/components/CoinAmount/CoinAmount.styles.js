import { StyleSheet } from 'react-native';
import { GlobalStyles, pixelRatio } from '../../styles/Globals';
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  coin: {
    backgroundColor: Colors.fiat,
    width: 8,
    height: 8,
    borderRadius: 50,
    marginRight: 7
  },
  coinAmount: {
    color: Colors.fiat,
    fontSize: 24,
    fontFamily: Fonts.get('light')
  }
});

export default Styles;
