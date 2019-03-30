import { StyleSheet } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.montevideo,
    borderTopWidth: 1,
    borderTopColor: Colors.puntaDelEste,
    padding: 15
  },
  titleText: {
    fontFamily: Fonts.get('regular'),
    color: Colors.colonia,
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 10,
    backgroundColor: 'transparent'
  },
  bodyText: {
    fontFamily: Fonts.get('regular'),
    color: Colors.paysandu,
    fontSize: 14,
    lineHeight: 20,
    backgroundColor: 'transparent'
  }
});

export default Styles;