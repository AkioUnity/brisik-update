import { StyleSheet } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topShadow: {
    shadowColor: Colors.maldonado,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    elevation: 3,
    height: 10,
    position: 'absolute',
    top: -10,
    right: 0,
    left: 0
  },
  title: {
    alignSelf: 'stretch',
    textAlign: 'center',
    color: Colors.sanJose,
    fontSize: 22,
    fontFamily: Fonts.get('regular'),
    margin: 15,
    backgroundColor: 'transparent'
  },
  scoreContainer: {
    backgroundColor: Colors.tacuarembo,
    padding: 15
  },
  warning: {
    margin: 15,
    color: Colors.sanJose
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginLeft: 15,
    alignItems: 'flex-end',
    marginVertical: 15
  },
  warningWord: {
    color: Colors.tranqueras,
  },
  code: {
    paddingVertical: 30
  },
  codeText: {
    color: Colors.colonia,
    textAlign: 'center'
  },
  button: {
    flex: 1,
    marginRight: 15
  }
});

export default Styles;