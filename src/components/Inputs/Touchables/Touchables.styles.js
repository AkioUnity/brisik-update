import { StyleSheet, Platform } from 'react-native';

import Colors from '../../../styles/Colors';
import Fonts from '../../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  itemTouchable: {
    borderWidth: 1,
    borderColor: Colors.paysandu,
    borderRadius: Platform.select({
      ios: 20,
      android: 40
    }),
    width: 90,
    height: 24,
    overflow: 'hidden',
    marginRight: 10
  },
  lastItemTouchable: {
    marginRight: 0
  },
  itemTouchableActive: {
    borderWidth: 0
  },
  itemWrapper: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  itemWrapperActive: {
    backgroundColor: Colors.artigas
  },
  itemLabel: {
    color: Colors.colonia,
    fontFamily: Fonts.get('regular'),
    fontSize: 11,
    letterSpacing: 1,
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
    textAlign: 'center'
  }
});

export default Styles;