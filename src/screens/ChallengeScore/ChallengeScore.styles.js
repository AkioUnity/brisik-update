import { StyleSheet, Platform, Dimensions } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.montevideo
  },
  title: {
    alignSelf: 'stretch',
    textAlign: 'center',
    color: Colors.colonia,
    fontSize: 18,
    fontFamily: Fonts.get('regular'),
    marginBottom: 15,
    backgroundColor: 'transparent',
    letterSpacing: 0.5
  },
  scoreContainer: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  warning: {
    fontFamily: Fonts.get('regular'),
    fontSize: 12,
    lineHeight: 16,
    color: Colors.paysandu,
    textAlign: 'center',
    backgroundColor: 'transparent',
    margin: 15
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: 200,
    alignSelf: 'center',
    marginLeft: 15,
    alignItems: 'flex-end',
    marginTop: 20,
    marginBottom: 5
  },
  button: {
    flex: 1,
    marginRight: 15,
    height: 34
  },
  userColumn: {
    flex: 1,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.puntaDelEste,
    borderWidth: 2,
    borderColor: Colors.puntaDelEste,
    paddingTop: 5
  },
  username: {
    color: Colors.colonia,
    fontSize: 18,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.89,
    lineHeight: 18,
    marginBottom: 3
  },
  avatar: {
    width: 50,
    height: 50,
    flex: 0,
    marginBottom: 10,
    borderRadius: Platform.select({
      ios: 25,
      android: 50
    })
  },
  valueContainer: {
    marginVertical: 20
  },
  value: {
    color: Colors.sanJose,
    fontSize: 22,
    fontFamily: Fonts.get('bold'),
    marginTop: 10
  },
  valueLabel: {
    marginRight: 10,
    fontFamily: Fonts.get('regular')
  },
  textInput: {
    alignSelf: 'stretch',
    textAlign: 'center',
    color: Colors.sanJose,
    fontSize: 22,
    fontFamily: Fonts.get('regular'),
    backgroundColor: Colors.montevideo,
    height: Platform.OS === 'ios' ? 30 : 45,
    marginVertical: 10,
    padding: 0
  },
  input: {
    marginVertical: 15
  },
  cover: {
    alignSelf: 'stretch'
  },
  coverImage: {
    width: Dimensions.get('window').width,
    justifyContent: 'flex-end'
  },
  challengeDataHeader: {
    position:'absolute',
    left: 20,
    right: 20,
    top: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  challengeInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  platformLogo: {
    width: 40
  },
  challengeInfo: {
    marginLeft: 10
  },
  gameTitle: {
    color: Colors.colonia,
    fontSize: 20,
    letterSpacing: 0.99,
    marginBottom: 2.5,
    backgroundColor: 'transparent',
    fontFamily: Fonts.get('regular')
  },
  platformName: {
    color: Colors.colonia,
    fontSize: 14,
    letterSpacing: 0.7,
    backgroundColor: 'transparent',
    fontFamily: Fonts.get('regular')
  },
  coins: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  coinText: {
    fontSize: 28,
    fontFamily: Fonts.get('light'),
    color: Colors.minas,
    backgroundColor: 'transparent'
  },
  coinShape: {
    width: 8,
    height: 8,
    backgroundColor: Colors.minas,
    borderRadius: 50,
    marginRight: 5
  },
  verticalDivider: {
    width: 15
  },
  gamertag: {
    fontFamily: Fonts.get('light'),
    fontSize: 12,
    color: Colors.paysandu,
    letterSpacing: 0.67
  },
  userColumnSelected: {
    borderColor: Colors.lasVegas
  },
  usernameWinner: {
    color: Colors.lasVegas
  },
  gamertagWinner: {
    color: Colors.lasVegas
  }
});

export default Styles;