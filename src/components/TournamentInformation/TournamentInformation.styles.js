import { StyleSheet, PixelRatio, Dimensions } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: Colors.montevideo
  },
  touramentCoverImage: {
    width: Dimensions.get('window').width,
    justifyContent: 'flex-end'
  },
  tournamentDetails: {
    alignSelf: 'stretch'
  },
  tournamentDetailsItem: {
    alignItems: 'center'
  },
  tournamentDetailsItemNumber: {
    fontSize: 45,
    fontFamily: Fonts.get('regular'),
    color: Colors.colonia,
  },
  tournamentDetailsItemCoinImage: {
    marginTop: 10
  },
  tournamentDetailsItemTitle: {
    fontSize: PixelRatio.get() <= 2 ? 18 : 23, 
    fontFamily: Fonts.get('regular'),
    color: Colors.sanJose
  },
  tournamentDetailsItemCoin: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  prizeContainer: {
    marginBottom: 20
  },
  prizeText: {
    fontSize: 18,
    fontFamily: Fonts.get('regular'),
    color: Colors.colonia,
    textAlign: 'center',
    letterSpacing: 1,
    backgroundColor: 'transparent'
  },
  prizesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  prizeItemContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '50%',
    marginVertical: 3
  },
  prizeItemText: {
    fontSize: 15,
    fontFamily: Fonts.get('light'),
    color: Colors.colonia,
    letterSpacing: 0.83
  },
  prizeItemImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    minWidth: 80
  },
  prizeImage: {
    width: 40,
    height: 40
  },
  rules: {
    marginHorizontal: 30,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  rulesTitle: {
    fontSize: 28,
    fontFamily: Fonts.get('regular'),
    color: Colors.sanJose,
    marginBottom: 5
  },
  rulesText: {
    color: Colors.sanJose,
    fontSize: 16,
  },
  countdownContainer: {
    backgroundColor: Colors.tacuarembo,
    justifyContent: 'center',
    alignItems: 'center'
  },
  countdown: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  tournamentGeneral: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  coinShape: {
    width: 8,
    height: 8,
    marginRight: 5,
    backgroundColor: Colors.minas,
    borderRadius: 4
  },
  coinAmount: {
    color: Colors.minas,
    fontSize: 28,
    fontFamily: Fonts.get('light'),
    backgroundColor: 'transparent'
  },
  tournamentData: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tournamentPlatformImg: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  tournamentGameText: {
    color: Colors.colonia,
    fontSize: 20,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.99,
    marginBottom: 5,
    backgroundColor: 'transparent'
  },
  tournamentPlatformText: {
    color: Colors.colonia,
    fontSize: 14,
    fontFamily: Fonts.get('light'),
    letterSpacing: 0.7,
    backgroundColor: 'transparent'
  },
  tournamentName: {
    color: Colors.colonia,
    fontSize: 18,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 1,
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 3
  },
  tournamentDate: {
    color: Colors.paysandu,
    fontSize: 14,
    fontFamily: Fonts.get('light'),
    letterSpacing: 0.78,
    backgroundColor: 'transparent',
    textAlign: 'center'
  },
  participateSection: {
    backgroundColor: Colors.puntaDelEste,
    height: 60,
    marginHorizontal: 10,
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  participantsWrapper: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    flexDirection: 'row'
  },
  verticalDivider: {
    width: 1,
    height: '60%',
    backgroundColor: Colors.florida
  },
  entryWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  entryStatic: {
    color: Colors.colonia,
    fontSize: 10,
    fontFamily: Fonts.get('light'),
    letterSpacing: 0.5,
    backgroundColor: 'transparent',
    marginLeft: 10
  },
  coinShapeSmall: {
    width: 5,
    height: 5
  },
  coinAmountSmall: {
    fontSize: 15,
    letterSpacing: 0.83
  },
  actionableWrapper: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 10
  },
  actionButton: {
    height: 34
  },
  container: {
    flex: 1
  },
  rulesHeader: {
    backgroundColor: Colors.salto,
    height: 40,
    justifyContent: 'center'
  },
  rulesHeaderText: {
    color: Colors.colonia,
    backgroundColor: 'transparent',
    fontSize: 14,
    fontFamily: Fonts.get('light'),
    letterSpacing: 1,
    textAlign: 'center'
  },
  rulesBody: {
    padding: 20
  },
  rulesContent: {
    color: Colors.colonia,
    fontSize: 13,
    fontFamily: Fonts.get('regular'),
    backgroundColor: 'transparent',
    letterSpacing: 0.5
  },
  avatar: {
    width: 30,
    height: 30
  }
});

export default Styles;
