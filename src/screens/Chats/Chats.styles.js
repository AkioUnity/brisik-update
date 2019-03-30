import { StyleSheet, Dimensions } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import MakeAlphaColor from '../../utils/MakeAlphaColor';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.montevideo,
    borderTopColor: Colors.puntaDelEste,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.puntaDelEste
  },
  listFooter: {
  	height: 47,
  	width: '100%'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  emptyText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 16,
    color: MakeAlphaColor(Colors.colonia, 60),
    textAlign: 'center'
  },
  button: {
    height: 40,
    width: 180,
    marginTop: 15
  }
});

export default Styles;