import { StyleSheet, Platform } from 'react-native';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

export default StyleSheet.create({
  container: {
    height: 214,
    alignSelf: 'stretch'
  },
  image: {
    alignSelf: 'stretch',
    overflow: 'hidden',
    resizeMode: 'contain',
    backgroundColor: Colors.colonia,
    height: 170
  },
  text: {
    fontFamily: Fonts.get('regular'),
    fontSize: 14,
    color: Colors.sanJose,
    marginBottom: 3,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  priceText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 14,
    color: Colors.sanJose,
    textAlign: 'center',
    backgroundColor: 'transparent'
  }
});
