import { StyleSheet, Dimensions } from 'react-native';

import MakeAlphaColor from '../../utils/MakeAlphaColor';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.montevideo,
    borderTopWidth: 1,
    borderTopColor: Colors.puntaDelEste
  },
  itemContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Colors.puntaDelEste,
    borderBottomWidth: 1,
    paddingHorizontal: 10
  },
  userContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  userAvatar: {
    width: 30,
    height: 30,
    marginRight: 5
  },
  username: {
    color: Colors.colonia,
    fontSize: 14,
    letterSpacing: 0.5,
    backgroundColor: 'transparent'
  },
  button: {
    width: 80,
    height: 24,
    backgroundColor: Colors.artigas,
    borderTopWidth: 0,
    borderRadius: 20
  },
  buttonText: {
    color: Colors.colonia,
    fontSize: 11,
    letterSpacing: 1,
    backgroundColor: 'transparent'
  },
  sectionHeader: {
    height: 22,
    backgroundColor: Colors.talas,
    justifyContent: 'center',
    paddingLeft: 5
  },
  sectionTitle: {
    fontSize: 12,
    color: MakeAlphaColor(Colors.colonia, 50),
    letterSpacing: 1,
    backgroundColor: 'transparent'
  }
});

export default Styles;
