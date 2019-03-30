import { StyleSheet } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.montevideo,
    borderTopColor: Colors.puntaDelEste,
    borderTopWidth: 1
  },
  balanceContainer: {
    borderWidth: 1,
    borderColor: Colors.puntaDelEste,
    padding: 15,
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
    height: 50,

  },
  amountToAddText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 17,
    color: '#FFFFFF',
    textAlign: 'center',
    height: 35,
    alignItems: 'center'
  },
  balanceText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 17,
    color: Colors.sanJose,
    textAlign: 'center',
    height: 35,
    alignItems: 'center'
  },

  buttonContainer: {
    borderColor: Colors.montevideo,
    backgroundColor: Colors.puntaDelEste,
    borderWidth: 1,
    height: 75,
    alignItems: 'center',
    width: '50%',
  },
  buttonContainerSelected: {
    borderColor: 'green',
  },
  buttonText: {
    marginTop: 10,
    padding: 10,
    height: 75,
    textAlign: 'center',
    width: '100%',
    fontFamily: Fonts.get('regular'),
    fontSize: 24,
    color: '#FFFFFF'
  },
  buttonTextAlt: {
    borderColor: '#e71636',
  },
  buttonView: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.puntaDelEste,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  buttonViewActive: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.treintaYTres,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  otherAmountContainer: {
    borderWidth: 1,
    backgroundColor: Colors.puntaDelEste,
    borderColor: Colors.montevideo,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    height: 75,
  },
  otherAmountContainerSelected: {
    borderWidth: 1,
    backgroundColor: Colors.puntaDelEste,
    borderColor: 'green',
    padding: 15,
    width: '100%',
    alignItems: 'center',
    height: 75,
  },
  invisibleTextInput: {
    fontFamily: Fonts.get('regular'),
    fontSize: 35,
    color: Colors.fiat,
    textAlign: 'center',
    height: 35,
    alignItems: 'center'
  },
  emailTextInput: {
    fontFamily: Fonts.get('regular'),
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    height: 45.5,
    marginTop: 0,
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    backgroundColor: Colors.puntaDelEste,
  },
  searchSection: {
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: Colors.puntaDelEste,
    color: '#FFFFFF',

  },
  searchIcon: {
    padding: 10,
  },
  infoText:{
    fontFamily: Fonts.get('regular'),
    fontSize: 14,
    color: Colors.pando,
    textAlign: 'center',
    height: 30,
    alignItems: 'center'
  },
  addFundButtonText:{
    textAlign: 'center',
    width: '100%',
    fontFamily: Fonts.get('regular'),
    fontSize: 16,
    color: '#FFFFFF'
  },
  input: {
    textAlign: 'center',
    paddingTop: 6,
    backgroundColor: Colors.puntaDelEste,
    color: '#FFFFFF',
    height: 50
  },
  marginTopContainer:{
    marginTop: 20,
  },
  cardOuterContainer:{
    marginTop: 1,
  },
  cardContainer: {
    borderColor: Colors.montevideo,
    backgroundColor: Colors.puntaDelEste,
    borderWidth: 1,
    height: 55,

    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    width: '98%',
  },
  cardInnerContainer:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  blankImagePlaceholder:{
    width: 20,
    height: 20
  },
  addImage: {
    flex: 0,
  },
  addText:{
    marginLeft: 10,
    color: '#FFFFFF'
  },
  editCardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    height: 55,
    marginRight: 10,

  },
  editCardTouchable:{
    justifyContent: 'center',
    alignSelf: 'flex-end',
    width: 50,
    height: 55
  },
  editCardText: {
    color: '#FFFFFF',
    textAlign: 'right',
    alignSelf: 'flex-end'
  }
});

export default Styles;
