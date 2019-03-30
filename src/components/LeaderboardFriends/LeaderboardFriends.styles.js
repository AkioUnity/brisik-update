import { StyleSheet } from 'react-native';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  title: {
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  rank: {
    flex: .06,
    fontFamily: Fonts.get('bold'),
    fontSize: 22,
    color: '#c9c9c9'
  },
  user: {
    flex: .35,
    fontFamily: Fonts.get('medium'),
    fontSize: 22,
    color: '#c9c9c9',
    textAlign: 'center'
  },
  wins: {
    flex: .1,
    fontFamily: Fonts.get('medium'),
    fontSize: 20,
    color: '#c9c9c9'
  },
  winsPercentage: {
    flex: .1,
    fontFamily: Fonts.get('medium'),
    fontSize: 20,
    color: '#c9c9c9'
  },
  earnings: {
    flex: .2,
    fontFamily: Fonts.get('medium'),
    fontSize: 20,
    textAlign: 'right',
    color: '#c9c9c9'
  },
  item: {
    backgroundColor: Colors.tranqueras
  }
});

export default Styles;