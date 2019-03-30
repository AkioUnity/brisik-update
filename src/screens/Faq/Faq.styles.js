import { StyleSheet } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.montevideo,
    borderTopColor: Colors.puntaDelEste,
    borderTopWidth: 1,
    padding: 15
  },
  questionTitle: {
    fontSize: 16,
    fontFamily: Fonts.get('regular'),
    color: Colors.colonia,
    lineHeight: 20,
    backgroundColor: 'transparent',
    marginBottom: 5
  },
  questionText: {
    fontSize: 14,
    fontFamily: Fonts.get('regular'),
    color: Colors.paysandu,
    lineHeight: 20,
    backgroundColor: 'transparent'
  }
});

export default Styles;