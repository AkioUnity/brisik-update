import { StyleSheet } from 'react-native';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: Colors.puntaDelEste
  },
  dayText: {
    flex: 0.5,
    fontFamily: Fonts.get('regular'),
    fontSize: 15,
    color: Colors.colonia,
    backgroundColor: 'transparent',
    letterSpacing: 0.54
  },
  coinText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 24,
    backgroundColor: 'transparent',
    color: Colors.minas
  },
  coinShape: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.minas,
    marginRight: 5
  },
  purchasImageContainer: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  lostContainer: {
    flex: 0.16,
    flexDirection: 'row'
  },
  wonContainer: {
    flex: 0.10,
    flexDirection: 'row'
  },
  leftIndicator: {
    width: 4,
    height: '100%',
    position: 'relative',
    left: -10
  },
  leftIndicatorGreen: {
    backgroundColor: Colors.lasVegas
  },
  leftIndicatorRed: {
    backgroundColor: Colors.durazno
  },
  leftIndicatorYellow: {
    backgroundColor: Colors.minas
  },
  coinTextGreen: {
    color: Colors.lasVegas
  },
  coinTextRed: {
    color: Colors.durazno
  }
});

export default Styles;