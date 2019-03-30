import { StyleSheet, Platform, Dimensions } from 'react-native';
import { GlobalStyles } from '../../styles/Globals';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import MakeAlphaColor from '../../utils/MakeAlphaColor';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.montevideo,
    borderTopColor: Colors.puntaDelEste,
    borderTopWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 7.5
  },
  item: {
    width: Dimensions.get('window').width,
    marginVertical: 7.5,
    overflow: 'hidden'
  },
  itemImageContainer: {
    overflow: 'hidden'
  },
  itemImage: {
    height: 194,
    width: Dimensions.get('window').width
  },
  itemDuration: {
    color: Colors.colonia,
    fontSize: 10,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.8,
    backgroundColor: 'transparent'
  },
  itemTitle: {
    color: Colors.colonia,
    fontFamily: Fonts.get('regular'),
    fontSize: 14,
    letterSpacing: 0.5,
    backgroundColor: 'transparent'
  },
  containerItemDuration: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    width: 140,
    height: 28,
    borderRadius: 20,
    backgroundColor: MakeAlphaColor(Colors.montevideo, 90),
    overflow: 'hidden'
  },
  itemTitleContainer: {
    height: 40,
    backgroundColor: Colors.puntaDelEste,
    justifyContent: 'center',
    paddingLeft: 10
  },
  containerItemDurationBorder: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: MakeAlphaColor(Colors.colonia, 60),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  itemStatic: {
    color: Colors.colonia,
    fontSize: 10,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 1,
    backgroundColor: 'transparent'
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: Colors.cerroLargo,
    paddingLeft: 5
  },
});

export default Styles;