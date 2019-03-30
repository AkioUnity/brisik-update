import { StyleSheet, pixelRatio } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import MakeAlphaColor from '../../utils/MakeAlphaColor';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.montevideo,
    borderTopColor: Colors.puntaDelEste,
    borderTopWidth: 1
  },
  title: {
    alignSelf: 'stretch',
    textAlign: 'center',
    color: Colors.colonia,
    fontSize: 18,
    fontFamily: Fonts.get('regular'),
    backgroundColor: 'transparent',
    letterSpacing: 0.5,
    marginTop: 30
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  balanceText: {
    color: Colors.colonia,
    fontFamily: Fonts.get('regular'),
    fontSize: 100
  },
  coinShape: {
    width: 8,
    height: 8,
    marginRight: 5,
    borderRadius: 4,
    backgroundColor: Colors.minas
  },
  historyTitle: {
    color: Colors.fiat,
    fontSize: 32,
    fontFamily: Fonts.get('regular'),
    backgroundColor: 'transparent'
  },
  subTitle: {
    fontSize: 12,
    color: MakeAlphaColor(Colors.colonia, 50),
    letterSpacing: 1,
    backgroundColor: 'transparent'
  },
  optionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15
  },
  optionText: {
    color: Colors.colonia,
    fontSize: 16,
    fontFamily: Fonts.get('regular'),
    backgroundColor: 'transparent',
    textAlign: 'center'
  },
  purchaseContainer:{
    flex: 0.3,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  dateText: {
    color: Colors.colonia,
    fontSize: 16,
    fontFamily: Fonts.get('regular'),
    backgroundColor: 'transparent',
    textAlign: 'center'
  },
  dateContainer:{
    flex: 0.5,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  typeText: {
    color: Colors.colonia,
    fontSize: 16,
    fontFamily: Fonts.get('regular'),
    backgroundColor: 'transparent',
    textAlign: 'center'
  },
  typeContainer:{
    flex: 0.2,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70
  },
  emptyHistoryText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 25,
    color: Colors.mercedes
  },
  actions: {
    padding: pixelRatio > 2 ? 15 : 10,
    flex: 1,
    marginBottom: 50
  },
  dropImage: {
    width: 10,
    height: 5,
    marginLeft: 5
  },
  sectionHeader: {
    height: 22,
    backgroundColor: Colors.talas,
    justifyContent: 'center',
    paddingLeft: 5
  },
  loadmoreButton: {
    height: 34,
    width: 180,
    marginTop: 10,
    alignSelf: 'center'
  }
});

export default Styles;