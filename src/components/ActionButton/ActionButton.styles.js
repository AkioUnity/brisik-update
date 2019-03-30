import { StyleSheet, PixelRatio, Platform } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  actionButton: {
    backgroundColor: Colors.durazno, 
    borderTopWidth: 2, 
    borderColor: Colors.artigas, 
    justifyContent: 'center', 
    height: Platform.OS === 'ios' ? 48 : PixelRatio.get() <= 2 ? 40 : 48,
    elevation: 3
  },
  actionButtonText: {
    color: Colors.colonia, 
    fontSize: 16, 
    fontFamily: Fonts.get('regular'), 
    textAlign: 'center',
    letterSpacing: 1,
    top: -1
  },
  actionButtonDark: {
    backgroundColor: Colors.paysandu,
    borderColor: Colors.cabo
  }
});

export default Styles;


