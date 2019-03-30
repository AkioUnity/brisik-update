import { StyleSheet } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  navBarTitle: {
    color: Colors.colonia,
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontFamily: Fonts.get('regular'),
    fontSize: 18
  }
});

export default Styles;