import { StyleSheet, PixelRatio, Dimensions } from 'react-native';
import { GlobalStyles } from '../../styles/Globals';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const isLowResolution = PixelRatio.get() <= 2;

const Styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    minWidth: isLowResolution ? 150 : 170,
    height: 40,
    flexDirection: 'row',
    overflow: 'hidden'
  },
  optionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10
  },
  optionLabel: {
  	color: Colors.colonia,
  	fontSize: isLowResolution ? 10 : 12,
  	letterSpacing: 1.09,
    paddingHorizontal: 5,
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center'
  },
  firstOpt: {
  	borderBottomLeftRadius: 50,
  	borderTopLeftRadius: 50
  },
  lastOpt: {
  	borderBottomRightRadius: 50,
  	borderTopRightRadius: 50
  }
});

export default Styles;
