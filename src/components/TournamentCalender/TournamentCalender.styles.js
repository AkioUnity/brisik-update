import { StyleSheet, PixelRatio } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';


const Styles = StyleSheet.create({
  bracketContent: {
    flex: 1
  },
  bracketText: {
    fontSize: 25,
    fontFamily: Fonts.get('regular'),
    color: Colors.colonia
  },
  undefinedAvatar: {
    width: 80,
    height: 80
  },
  calenderAvatar: {
    width: 60,
    height: 60
  },
  bracketItem: {
    alignItems: 'center',
    flex: 1
  },
  calenderSubtitleContainer: {
    backgroundColor: Colors.tranqueras,
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 5
  },
  roundText: {
    fontSize: PixelRatio.get() > 2 ? 18 : 15,
    fontFamily: Fonts.get('bold'),
    color: Colors.colonia
  },
  vsText: {
    fontSize: 15,
    fontFamily: Fonts.get('medium'),
    color: Colors.colonia,
    marginHorizontal: 20
  },
  challengeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.tacuarembo,
    alignItems: 'center',
    paddingVertical: 20
  },
  calenderDateContainer: {
    backgroundColor: Colors.florida,
    alignItems: 'center',
    paddingVertical: 10
  },
  levelTextContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center'
  },
  levelText: {
    fontSize: 15,
    fontFamily: Fonts.get('medium'),
    color: Colors.minas
  },
  starImage: {
    width: 10,
    height: 10,
  }
});

export default Styles;