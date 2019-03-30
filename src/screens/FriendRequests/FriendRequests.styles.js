import { StyleSheet } from 'react-native';

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
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.puntaDelEste
  },
  itemPlayer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  itemAvatar: {
    width: 30,
    height: 30,
    marginRight: 5
  },
  itemName: {
    color: Colors.colonia,
    fontSize: 14,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.5,
    backgroundColor: 'transparent'
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnText: {
    color: Colors.colonia,
    fontSize: 11,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 1,
    backgroundColor: 'transparent',
    lineHeight: 24
  },
  declineBtn: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    marginRight: 5,
    elevation: 0
  },
  acceptBtn: {
    backgroundColor: Colors.artigas,
    borderTopWidth: 0,
    width: 80,
    height: 24,
    borderRadius: 20,
    elevation: 0
  }
});

export default Styles;