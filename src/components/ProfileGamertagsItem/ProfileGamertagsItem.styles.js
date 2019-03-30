import { StyleSheet, Platform } from 'react-native';
import { GlobalStyles } from '../../styles/Globals';
import MakeAlphaColor from '../../utils/MakeAlphaColor';
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';

const Styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: Colors.montevideo,
    justifyContent: 'flex-start',
    overflow: 'hidden',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    height: 50,
    minHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: Colors.puntaDelEste,
    paddingHorizontal: 15
  },
  button: {
    marginHorizontal: GlobalStyles.generalMargin,
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  value: {
    flex: 1,
    fontFamily: Fonts.get('regular'),
    fontSize: 14,
    color: Colors.colonia,
    letterSpacing: 0.67,
    backgroundColor: 'transparent',
    textAlign: 'right'
  },
  buttonText: {
    fontFamily: Fonts.get('medium'),
    fontSize: 30,
    backgroundColor: 'transparent'
  },
  loading: {
    flex: 1,
    alignItems: 'flex-start'
  },
  platformLogo: {
    width: 30,
    height: 30,
    marginRight: 15
  },
  platformName: {
    color: Colors.colonia,
    fontSize: 14,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.5,
    backgroundColor: 'transparent'
  }
});

export default Styles;
