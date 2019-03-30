import { StyleSheet } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const styles = StyleSheet.create({
  message: {
    fontFamily: Fonts.get('medium'),
    fontSize: 16,
    color: Colors.colonia,
    width: '80%',
    textAlign: 'center',
    backgroundColor: Colors.transparent
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.salto
  },
  errorContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.tranqueras
  }
});

export default styles;
