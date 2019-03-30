import { StyleSheet, Dimensions } from 'react-native';
import { GlobalStyles } from '../../styles/Globals';
import Colors from '../../styles/Colors';
import MakeAlphaColor from '../../utils/MakeAlphaColor';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.montevideo
  },
  scrollView:{
    alignSelf: 'stretch',
    flex: 1,
  },
  nameText: {
    fontSize: 22,
    fontFamily: Fonts.get('regular'),
    color: 'white',
    marginLeft: 8
  },
  userDetailContainer: {
    position: 'absolute',
    top: 75,
    left: '15%',
    zIndex: 9999, 
    flexDirection: 'row',
    alignItems: 'center' 
  },
  profileImage: {
    height: 30,
    width: 30,
    borderRadius: 15
  },
  bottomContainer: {
    marginTop: 10,
    marginBottom: 35
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5
  },
  timer: {
    margin: GlobalStyles.generalMargin
  },
  cover: {
    alignSelf: 'stretch'
  },
  coverImage: {
    width: Dimensions.get('window').width,
    justifyContent: 'flex-end'
  },
  challengeInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  participants: {},
  infoBar: {
    backgroundColor: Colors.sanJose,
    flex: 1,
    marginTop: -20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 5
  },
  coins: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  betText: {
    fontSize: 22,
    fontFamily: Fonts.get('regular')
  },
  coinText: {
    fontSize: 28,
    fontFamily: Fonts.get('light'),
    color: Colors.minas,
    backgroundColor: 'transparent'
  },
  cancelContainer: {
    alignSelf: 'stretch',
    padding: GlobalStyles.generalMargin,
    marginBottom: 35
  },
  cancelText: {
    color: Colors.tranqueras,
    fontSize: 20,
    fontFamily: Fonts.get('regular'),
    textAlign: 'center'
  },
  gameLogo: {
    height: 20,
    width: 71
  },
  platformLogo: {
    width: 40
  },
  awaitingText: {
    fontSize: 14,
    fontFamily: Fonts.get('regular'),
    color: Colors.colonia,
    textAlign: 'center',
    letterSpacing: 0.78,
    backgroundColor: 'transparent'
  },
  pendingText: {
    fontSize: 22,
    fontFamily: Fonts.get('regular'),
    color: Colors.minas,
    textAlign: 'center',
    marginBottom: 10
  },
  completedText: {
    fontSize: 22,
    fontFamily: Fonts.get('regular'),
    color: Colors.lavalleja,
    textAlign: 'center',
    margin: GlobalStyles.generalMargin
  },
  disputeText: {
    color: Colors.paysandu,
    fontSize: 13,
    fontFamily: Fonts.get('regular'),
    textAlign: 'center',
    letterSpacing: 0.5
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
  challengeInfo: {
    marginLeft: 10
  },
  coinShape: {
    width: 8,
    height: 8,
    backgroundColor: Colors.minas,
    borderRadius: 50,
    marginRight: 5
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
  postChallengeBtn: {
    height: 34,
    maxWidth: 200,
    left: '50%',
    marginLeft: -100
  },
  statusText: {
    color: Colors.guichon,
    fontSize: 14,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.93,
    textAlign: 'center',
    lineHeight: 17,
    marginBottom: 5,
    backgroundColor: 'transparent'
  },
  statusContainer: {
    marginTop: 10,
    marginBottom: 30
  },
  tournamentDataWrapper: {
    height: 22,
    backgroundColor: Colors.florida,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  tournamentDataName: {
    color: Colors.colonia,
    backgroundColor: 'transparent',
    fontFamily: Fonts.get('regular'),
    flex: 1,
    fontSize: 12,
    letterSpacing: 0.5
  },
  tournamentDataStage: {
    color: Colors.colonia,
    backgroundColor: 'transparent',
    letterSpacing: 1,
    opacity: 0.5,
    fontFamily: Fonts.get('light'),
    fontSize: 12
  }
});

export default Styles;
