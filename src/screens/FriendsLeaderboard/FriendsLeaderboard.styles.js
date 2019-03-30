import { StyleSheet } from 'react-native';
import { pixelRatio } from '../../styles/Globals';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.talas
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 22,
    backgroundColor: Colors.talas
  },
  rank: {
    flex: .1
  },
  user: {
    flex: .35
  },
  wins: {
    flex: .12,
    textAlign: 'center'
  },
  winsPercentage: {
    flex: .12,
    textAlign: 'center'
  },
  earnings: {
    flex: .2,
    textAlign: 'right'
  },
  loadmoreButton: {
    margin: 15,
    height: 34,
    width: 220,
    alignSelf: 'center'
  },
  titleText: {
    fontSize: 10,
    color: Colors.colonia,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.42,
    backgroundColor: 'transparent'
  },
  myPosition: {
    backgroundColor: Colors.puntaDelEste
  }
});

export default Styles;