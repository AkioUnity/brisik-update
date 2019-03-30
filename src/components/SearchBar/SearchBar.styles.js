import { StyleSheet, Platform } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  searchBarInputContainer: {
    height: 30,
    marginHorizontal: 10,
    paddingLeft: '10%',
    borderRadius: 8,
    backgroundColor: Colors.puntaDelEste,
    width: '100%'
  },
  searchBarIcon: {
    position: 'absolute',
    left: 10,
    top: 7
  },
  searchBarTextInput: {
    height: Platform.select({
      ios: 30,
      android: 30
    }),
    color: Colors.colonia,
    fontSize: Platform.select({
      ios: 14,
      android: 16
    }),
    padding: 0,
    marginRight: 20
  },
  clearSearchBtn: {
    position: 'absolute',
    right: 10,
    top: 8
  },
  clearSearch: {
    fontSize: 10,
    letterSpacing: 0.38,
    fontFamily: Fonts.get('regular'),
    color: Colors.colonia
  },
  scrollView: {
    flex: 1,
    alignSelf: 'stretch'
  }
});

export default Styles;
