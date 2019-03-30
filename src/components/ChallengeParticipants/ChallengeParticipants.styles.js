import { StyleSheet, Platform } from 'react-native';
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';

const Styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    height: 50,
    width: 50,
    flex: 1
  },
  challengeTextContainer: {

  },
  challengeText: {
    textAlign: 'left',
    color: 'white',
    fontFamily: Fonts.get('regular'),
  },
  challengeContainer: {
    width: 120,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
    position: 'absolute',
    top: 15,
    flexDirection: 'row',
    paddingHorizontal: 10,
    zIndex: 99999,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  videoAttached: {
    height: 20,
    width: 20
  },
  avatarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '100%'
  },
  vs: {
    top: '15.5%',
    color: Colors.paysandu,
    fontSize: 24,
    fontFamily: Fonts.get('light'),
    backgroundColor: 'transparent',
    letterSpacing: 0.8
  },
  columnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'relative'
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  lineGuest: {
    justifyContent: 'flex-end'
  },
  lineMediaId: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  lineMediaIdGuest: {
    alignItems: 'flex-end',
    alignSelf: 'stretch'
  },
  lineGamertag: {
    color: Colors.colonia,
    fontFamily: Fonts.get('regular'),
    fontSize: 12,
    letterSpacing: 0.67,
    marginBottom: 5
  },
  lineLabel: {
    fontFamily: Fonts.get('regular'),
    fontSize: 12,
    letterSpacing: 0.5,
    color: Colors.mercedes,
    marginRight: 5,
    lineHeight: 16
  },
  lineOnlyLabel: {
    opacity: 1
  },
  lineText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 12,
    letterSpacing: 0.5,
    color: Colors.paysandu,
    lineHeight: 16
  },
  lineUserName: {
    fontFamily: Fonts.get('regular'),
    fontSize: 18,
    color: Colors.colonia,
    letterSpacing: 0.89
  },
  hidden: {
    color: 'transparent'
  },
  cup: {
    alignSelf: 'center',
  },
  disputeCup: {
    alignSelf: 'center',
    width: 50,
    height: 50
  },
  cupContainer: {
    justifyContent: 'center',
    flex: 1,
    marginVertical: 5
  },
  anyAccept: {
    fontFamily: Fonts.get('regular'),
    fontSize: 12,
    color: Colors.paysandu,
    textAlign: 'right',
    letterSpacing: 0.67,
    lineHeight: 16,
    paddingTop: 25
  },
  score: {
    color: Colors.colonia,
    textAlign: 'center',
    fontSize: 22,
    fontFamily: Fonts.get('regular')
  },
  scoreValue: {
    fontFamily: Fonts.get('bold')
  },
  scoreContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  userInfo: {
    paddingTop: 10
  },
  lineElo: {
    color: Colors.melo,
    fontFamily: Fonts.get('regular')
  },
  lineUserNameGuest: {
    textAlign: 'right'
  },
  lineLabelGuest: {
    marginRight: 0,
    marginLeft: 5
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  locationWrapperGuest: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  locationText: {
    color: Colors.paysandu,
    fontSize: 13,
    fontFamily: Fonts.get('regular'),
    backgroundColor: 'transparent',
    letterSpacing: 0.72
  },
  locationIcon: {
    marginRight: 5
  },
  challengeWinner: {
    color: Colors.lasVegas
  },
  challengeWinSelector: {
    position: 'absolute',
    right: 15,
    top: 20
  },
  challengeWinSelectorGuest: {
    left: 15,
    transform: [{ scale: -1 }]
  }
});

export default Styles;