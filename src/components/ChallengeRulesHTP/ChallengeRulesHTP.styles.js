import { StyleSheet } from 'react-native';
import { GlobalStyles } from '../../styles/Globals';
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';

const Styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch'
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.durazno
  },
  tabText: {
    fontSize: 14,
    letterSpacing: 1,
    color: Colors.colonia,
    fontFamily: Fonts.get('regular'),
    backgroundColor: 'transparent'
  },
  text: {
    margin: 20,
    fontSize: 13,
    fontFamily: Fonts.get('regular'),
    color: Colors.colonia,
    letterSpacing: 0.5,
    lineHeight: 16
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: Colors.salto,
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tab: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent'
  }
});

export default Styles;
