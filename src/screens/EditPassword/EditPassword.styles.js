import { StyleSheet, Platform, PixelRatio } from 'react-native';

import MakeAlphaColor from '../../utils/MakeAlphaColor';
import Colors from '../../styles/Colors';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.montevideo,
    borderTopWidth: 1,
    borderTopColor: Colors.puntaDelEste
  },
  formContainer: {
    paddingTop: 20
  },
  formRow: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.puntaDelEste
  },
  formInput: {
    flex: 1,
    textAlign: 'right',
    color: Colors.colonia,
    fontSize: 14,
    letterSpacing: 0.5,
    backgroundColor: 'transparent'
  },
  static: {
    flex: 0.7,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  icon: {
    marginRight: 10,
    bottom: 2
  },
  staticText: {
    color: Colors.colonia,
    fontSize: 14,
    letterSpacing: 0.5,
    backgroundColor: 'transparent'
  }
});

export default Styles;
