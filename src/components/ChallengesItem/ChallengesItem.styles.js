import { StyleSheet } from 'react-native';
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';

const Styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: Colors.tacuarembo,
    justifyContent: 'flex-start',
    overflow: 'hidden'
  },
  wrapper: {
    margin: 15,
    marginBottom: 0,
    backgroundColor: Colors.puntaDelEste
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    marginBottom: 0,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.florida
  },
  videoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 10,
    marginBottom: 0,
    paddingBottom: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.florida
  },
  title: {
    color: Colors.sanJose,
    fontSize: 24,
    fontFamily: Fonts.get('regular')
  },
  coins: {},
  body: {
    alignItems: 'center',
    marginVertical: 10,
    alignSelf: 'stretch'
  },
  date: {
    color: Colors.sanJose,
    fontSize: 16,
    fontFamily: Fonts.get('regular')
  },
  button: {
    alignSelf: 'stretch',
    flex: 1,
    height: 34
  },
  participants: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10
  },
  participant: {
    width: '40%'
  },
  guestParticipant: {
    textAlign: 'right'
  },
  isWinnerAvatar: {
    width: 45,
    height: 45,
    flex: 0,
    borderColor: Colors.pasoDeLosToros,
    borderWidth: 2,
    borderRadius: 50
  },
  participantName: {
    color: Colors.colonia,
    fontSize: 14,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.78,
    marginBottom: 5
  },
  tbdText: {
    color: Colors.sanJose,
    fontSize: 20,
    fontFamily: Fonts.get('regular')
  },
  participantsNameSmall: {
    fontSize: 16
  },
  versus: {
    color: Colors.paysandu,
    fontSize: 24,
    fontFamily: Fonts.get('light'),
    flex: 1,
    alignItems: 'center',
    textAlign: 'center'
  },
  challengeInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  platformLogo: {
    marginRight: 10,
    width: 30,
    height: 30
  },
  matchDetails: {},
  gameTitle: {
    color: Colors.colonia,
    fontSize: 18,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.75
  },
  platformName: {
    color: Colors.colonia,
    fontSize: 10,
    fontFamily: Fonts.get('light'),
    letterSpacing: 0.56
  },
  elo: {
    color: Colors.melo,
    fontSize: 12,
    letterSpacing: 0.67,
    fontFamily: Fonts.get('regular')
  },
  guestElo: {
    textAlign: 'right'
  },
  winner: {
    color: Colors.lasVegas
  },
  gamertag: {
    fontSize: 12,
    fontFamily: Fonts.get('regular'),
    color: Colors.colonia,
    letterSpacing: 0.67
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10
  },
  buttonDivider: {
    width: 20
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
