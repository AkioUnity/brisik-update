import { StyleSheet, PixelRatio } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import MakeAlphaColor from '../../utils/MakeAlphaColor';

const Styles = StyleSheet.create({
  bracketContent: {
    flex: 1,
    backgroundColor: Colors.montevideo
  },
  vsText: {
    fontSize: 24,
    fontFamily: Fonts.get('light'),
    color: Colors.paysandu,
    backgroundColor: 'transparent',
    letterSpacing: 0.8
  },
  headerContainer: {
    backgroundColor: Colors.talas,
    height: 22,
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginBottom: 15
  },
  headerText: {
    color: MakeAlphaColor(Colors.colonia, 50),
    fontSize: 12,
    fontFamily: Fonts.get('regular'),
    backgroundColor: 'transparent',
    letterSpacing: 1
  },
  contentWrapper: {
    paddingHorizontal: 15
  },
  matchContainer: {
    backgroundColor: Colors.puntaDelEste,
    height: 110,
    marginBottom: 15,
    padding: 10,
    overflow: 'hidden'
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.florida
  },
  matchDate: {
    color: Colors.colonia,
    fontSize: 15,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.83,
    backgroundColor: 'transparent'
  },
  matchNumber: {
    color: Colors.artigas,
    fontSize: 12,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.67,
    backgroundColor: 'transparent'
  },
  matchBody: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10
  },
  vsContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -16,
    marginTop: -4
  },
  playerStatic: {
    color: Colors.colonia,
    fontSize: 14,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.78,
    backgroundColor: 'transparent'
  },
  playerStaticRight: {
    textAlign: 'right'
  },
  playerEloStatic: {
    color: Colors.artigas,
    fontSize: 12,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.67,
    backgroundColor: 'transparent'
  },
  playerGametagStatic: {
    color: Colors.colonia,
    fontSize: 12,
    fontFamily: Fonts.get('light'),
    letterSpacing: 0.67,
    backgroundColor: 'transparent',
    marginTop: 2,
    marginBottom: 5
  },
  winner: {
    color: Colors.lasVegas
  },
  winnerPointer: {
    position: 'relative',
    left: -30
  },
  winnerPointerRight: {
    position: 'relative',
    right: -30,
    transform: [{ scaleX: -1 }]
  },
  matchHost: {
    flex: 1
  },
  matchGuest: {
    flex: 1
  }
});

export default Styles;