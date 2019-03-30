import { StyleSheet, Dimensions, Platform } from 'react-native';

import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.montevideo
  },
  cover: {
    alignSelf: 'stretch'
  },
  coverImage: {
    width: Dimensions.get('window').width,
    justifyContent: 'flex-end'
  },
  headerContainer: {
    position:'absolute',
    left: 20,
    right: 20,
    top: 20,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  avatarImage: {
    width: 45,
    height: 45,
    marginRight: 10,
    borderRadius: Platform.select({
      ios: 22.5,
      android: 45
    })
  },
  playerName: {
    color: Colors.colonia,
    fontSize: 20,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.99,
    backgroundColor: 'transparent',
    marginBottom: 2.5
  },
  playerGamertag: {
    color: Colors.colonia,
    fontSize: 14,
    fontFamily: Fonts.get('light'),
    letterSpacing: 0.7,
    backgroundColor: 'transparent'
  },
  contentContainer: {
    flex: 1
  },
  btnContainer: {
    marginTop: 20
  },
  button: {
    width: 200,
    height: 34,
    alignSelf: 'center'
  },
  rateContainer: {
    marginVertical: 20,
    alignSelf: 'stretch'
  },
  rateTitle: {
    color: Colors.paysandu,
    fontSize: 14,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.78,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  rateSubtitle: {
    color: Colors.colonia,
    fontSize: 18,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 1,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  rateImages: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 15
  },
  rateImage: {
    marginHorizontal: 10
  },
  divider: {
    width: 5
  }
});

export default Styles;