import { StyleSheet, Dimensions } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  navBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  button: {
    width: 50,
    height: '100%',
    justifyContent: 'center'
  },
  searchContainer: {
    width: '80%'
  },
  buttonText: {
    color: Colors.colonia,
    fontSize: 13,
    letterSpacing: 0.87
  }
});

export default Styles;
