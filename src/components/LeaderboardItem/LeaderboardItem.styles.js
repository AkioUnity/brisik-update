import { StyleSheet } from 'react-native';
import { GlobalStyles, pixelRatio } from '../../styles/Globals';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    height: 45,
    backgroundColor: Colors.talas,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.puntaDelEste
  },
  rank: {
    flex: .13,
    fontFamily: Fonts.get('regular'),
    fontSize: pixelRatio > 2 ? 20 : 18,
    color: Colors.artigas,
    letterSpacing: 0.71,
    textAlign: 'center'
  },
  userContainer: {
    flex: .35,
    flexDirection: 'row',
    alignItems: 'center'
  },
  user: {
    fontFamily: Fonts.get('regular'),
    fontSize: 13,
    color: Colors.colonia,
    letterSpacing: 0.46,
    marginLeft: 5
  },
  avatar: {
    height: 20,
    width: 20
  },
  wins: {
    flex: .12,
    fontFamily: Fonts.get('regular'),
    fontSize: 13,
    color: Colors.colonia,
    letterSpacing: 0.46,
    textAlign: 'center'
  },
  winsPercentage: {
    flex: .12,
    fontFamily: Fonts.get('regular'),
    fontSize: 13,
    color: Colors.colonia,
    letterSpacing: 0.46,
    textAlign: 'center'
  },
  earnings: {
    flex: .2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 10
  },
  earningsText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 13,
    color: Colors.fiat
  },
  coinShape: {
    width: 5,
    height: 5,
    backgroundColor: Colors.fiat,
    borderRadius: 2.5,
    marginRight: 5
  },
  myRank: {
    color: Colors.lasVegas
  },
  myUser: {
    color: Colors.lasVegas
  },
  activeContainer: {
    backgroundColor: Colors.puntaDelEste
  }
});

export default Styles;