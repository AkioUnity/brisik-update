import { StyleSheet } from 'react-native';
import { GlobalStyles } from '../../styles/Globals';
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';

const Styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: Colors.puntaDelEste,
    justifyContent: 'flex-start',
    overflow: 'hidden',
    minHeight: 150,
    padding: 10,
    marginBottom: 15
  },
  title: {
    color: Colors.colonia,
    fontSize: 14,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.78
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.florida
  },
  body: {
    paddingVertical: 10
  },
  button: {
    alignSelf: 'stretch',
    height: 34,
    paddingHorizontal: 15
  },
  tournamentDataWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  tournamentName: {
    color: Colors.colonia,
    fontSize: 18,
    letterSpacing: 0.75,
    fontFamily: Fonts.get('regular')
  },
  tournamentPlatform: {
    color: Colors.colonia,
    fontFamily: Fonts.get('light'),
    fontSize: 10,
    letterSpacing: 0.5
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  coinShape: {
    width: 8,
    height: 8,
    marginRight: 5,
    backgroundColor: Colors.minas,
    borderRadius: 4
  },
  coinAmount: {
    color: Colors.minas,
    fontSize: 24,
    fontFamily: Fonts.get('light')
  },
  platformLogo: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  details: {
    color: Colors.colonia,
    fontSize: 12,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.67,
    marginTop: 3
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  footerTextWrapper: {
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.florida,
    paddingTop: 8
  },
  footerText: {
    color: Colors.artigas,
    fontSize: 12,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.3
  }
});

export default Styles;