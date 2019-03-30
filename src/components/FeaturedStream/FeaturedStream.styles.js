import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  chat: {
    flex: 1,
    backgroundColor: Colors.colonia,
    position: 'absolute',
    width: Dimensions.get('window').width
  },
  containerFloating: {
    position: 'absolute',
    height: 0,
    backgroundColor: Colors.colonia
  },
  chatHeading: {
    backgroundColor: Colors.montevideo,
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomColor: Colors.florida,
    borderBottomWidth: 1,
    paddingHorizontal: 16
  },
  chatHeadingTitle: {
    backgroundColor: Colors.montevideo,
    fontFamily: Fonts.get('regular'),
    fontSize: 18,
    color: '#fff',
    marginBottom: 4
  },
  chatHeadingDesc: {
    backgroundColor: Colors.montevideo,
    fontFamily: Fonts.get('light'),
    fontSize: 10,
    color: Colors.colonia
  },
  chatBody: {
    flex: 1,
  }
});

export default Styles;
