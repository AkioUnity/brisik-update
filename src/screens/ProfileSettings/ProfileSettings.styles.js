import { StyleSheet, Platform } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import MakeAlphaColor from '../../utils/MakeAlphaColor';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.montevideo,
    borderTopWidth: 1,
    borderTopColor: Colors.puntaDelEste
  },
  listsWrapper: {
    flex: 1
  },
  listContainer: {
    marginBottom: 20
  },
  sectionHeader: {
    height: 22,
    backgroundColor: Colors.talas,
    justifyContent: 'center',
    paddingLeft: 5
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: Fonts.get('regular'),
    color: MakeAlphaColor(Colors.colonia, 50),
    backgroundColor: 'transparent',
    letterSpacing: 1
  },
  listItem: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.puntaDelEste
  },
  listItemText: {
    flex: 1,
    color: Colors.colonia,
    fontSize: 14,
    fontFamily: Fonts.get('regular'),
    backgroundColor: 'transparent',
    letterSpacing: 0.5
  },
  button: {
    alignSelf: 'center',
    height: 34,
    width: 150,
    marginBottom: 30
  },
  listItemWithDecor: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  coinShape: {
    width: 8,
    height: 8,
    borderRadius: Platform.OS === 'ios' ? 4 : 8,
    backgroundColor: Colors.minas,
    marginLeft: 5
  }
});

export default Styles;