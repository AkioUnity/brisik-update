import { StyleSheet, Dimensions } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import MakeAlphaColor from '../../utils/MakeAlphaColor';

const Styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.paysandu
  },
  item: {
    alignSelf: 'stretch',
    marginLeft: 20,
    paddingRight: 5,
    height: 36,
    borderBottomWidth: 1,
    borderBottomColor: Colors.pando
  },
  itemText: {
    fontFamily: Fonts.get('regular'),
    color: Colors.talas,
    fontSize: 15,
    letterSpacing: 0.5,
    lineHeight: 36
  },
  overlay: {
    backgroundColor: MakeAlphaColor(Colors.talas, 80),
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 140
  },
  categoryWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemTextBold: {
    fontFamily: Fonts.get('bold')
  }
});

export default Styles;
