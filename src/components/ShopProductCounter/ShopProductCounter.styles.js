import { StyleSheet, Platform } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonIcon: {
    fontSize: 30,
    fontWeight: '600',
    backgroundColor: 'transparent',
    width: 40,
    height: 40,
    textAlign: 'center',
    marginBottom: Platform.select({
      ios: 0,
      android: 5
    })
  },
  number: {
    color: Colors.colonia,
    fontFamily: Fonts.get('regular'),
    textAlign: 'center',
    fontSize: 17,
    marginHorizontal: 15,
    backgroundColor: 'transparent',
    lineHeight: 25
  }
});

export default Styles;