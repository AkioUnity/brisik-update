import { StyleSheet } from 'react-native';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.sanJose,
    height: 40,
    shadowColor: Colors.maldonado,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    elevation: 3
  },
  tabText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 20,
    color: Colors.montevideo,
    textAlign: 'center'
  },
  tabActiveText: {
    color: Colors.rivera
  },
  tab: {
    flex: 1
  }
});
