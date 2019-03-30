import { StyleSheet, Platform, Dimensions } from 'react-native';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

export default StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    width: (Dimensions.get('window').width - 30) / 2
  },
  image: {
    height: 170,
    alignSelf: 'stretch',
    overflow: 'hidden',
    marginBottom: 5
  },
  text: {
    fontFamily: Fonts.get('regular'),
    fontSize: 14,
    color: Colors.colonia,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  priceText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 14,
    color: Colors.minas,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3
  },
  coinShape: {
    backgroundColor: Colors.minas,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginRight: 5
  }
});
