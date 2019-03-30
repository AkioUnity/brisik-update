import { StyleSheet } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  inputContiner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    height: 35,
    backgroundColor: Colors.montevideo,
    color: Colors.sanJose,
    padding: 5,
    marginHorizontal: 10,
    textAlign: 'center',
    fontFamily: Fonts.get('regular'),
    fontSize: 14,
    lineHeight: 27,
    textAlign: 'right',
    letterSpacing: 0.5
  },
  inputChevron: {
    position: 'absolute',
    right: 0,
    width: 10,
    height: 10,
    top: '50%',
    marginTop: -4
  },
  withBackground: {
    backgroundColor: Colors.soriano,
    marginHorizontal: 0,
    height: 40,
    lineHeight: 30
  },
  placeholder: {
    color: Colors.paysandu,
    fontSize: 14,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.5
  }
});

export default Styles;
