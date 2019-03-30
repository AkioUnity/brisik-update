import { StyleSheet, Platform } from 'react-native';

import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';

const Styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  },
  timer: {
    flex: 1,
    color: Colors.sanJose,
    fontSize: 40,
    fontFamily: Fonts.get('regular'),
    lineHeight: 38,
    backgroundColor: 'transparent',
    marginBottom: 10
  },
  timerImage: {
    marginLeft: 8,
    marginRight: 5
  },
  atRight: {
    marginHorizontal: 0
  },
  remainingText: {
    flex: 1,
    color: Colors.colonia,
    fontSize: 24,
    fontFamily: Fonts.get('regular'),
    textAlign: 'center'
  },
  button: {
    width: 140,
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.cerroLargo,
    borderRadius: Platform.select({
      ios: 50,
      android: 100
    })
  },
  btnLabel: {
    color: Colors.colonia,
    fontSize: 11,
    letterSpacing: 1
  }
});

export default Styles;