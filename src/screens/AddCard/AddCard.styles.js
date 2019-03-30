import { StyleSheet, PixelRatio } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import MakeAlphaColor from '../../utils/MakeAlphaColor';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.montevideo,
    borderTopColor: Colors.puntaDelEste,
    borderTopWidth: 1
  },
  scrollView: {
    flex: 1
  },
  form: {
    padding: 20
  },
  formGroup: {
    alignSelf: 'stretch'
  },
  label: {
    fontFamily: Fonts.get('regular'),
    fontSize: 18,
    color: Colors.sanJose
  },
  expirationLabel: {
    fontFamily: Fonts.get('regular'),
    fontSize: 18,
    color: Colors.sanJose,
    marginBottom: 5
  },
  labelNumber: {
    fontFamily: Fonts.get('regular'),
    fontSize: 18,
    color: Colors.sanJose,
    marginTop: 10
  },
  input: {
    backgroundColor: Colors.florida,
    alignSelf: 'stretch',
    height: 40,
    padding: 5,
    fontSize: 14,
    color: Colors.colonia,
    marginBottom: 10,
    letterSpacing: 0.5,
    paddingLeft: 10
  },
  select: {
    backgroundColor: Colors.florida,
    alignSelf: 'stretch',
    height: 40,
    padding: 5,
    width: PixelRatio.get() <= 2 ? 75 : 80,
    flexDirection: 'row',
    alignItems: 'center'
  },
  selectValue: {
    fontSize: 14,
    color: Colors.sanJose,
    flex: 1
  },
  action: {
    margin: 15
  },
  cardAcceptedCards: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5
  },
  selectedCard: {
    opacity: 0.5
  },
  note: {
    fontFamily: Fonts.get('regular'),
    fontSize: 18,
    color: MakeAlphaColor(Colors.colonia, 6),
    textAlign: 'center'
  },
  cardAcceptedCard: {
    marginHorizontal: 3
  },
  cardsAccepted: {
    marginBottom: 0
  },
  formTitle: {
    fontFamily: Fonts.get('regular'),
    fontSize: 18,
    color: Colors.sanJose,
    textAlign: 'center'
  },
  formGroupH: {
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  formGroupHIn: {
    flex: 1,
    alignSelf: 'stretch'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  formGroupHInLeft: {
    marginRight: 10,
    flex: 1
  },
  placeholder: {
    color: Colors.paysandu
  },
  payButton: {
    padding: 15
  },
  imageContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  image: {
    marginHorizontal: 10
  },
  cardNameText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 16,
    textAlign: 'center',
    color: Colors.colonia
  },
  cardText: {
    fontFamily: Fonts.get('bold'),
    fontSize: 16,
    textAlign: 'center',
    color: Colors.colonia
  },
  cardsList: {
    alignItems: 'center',
    marginVertical: 20
  },
  infoHead:{
    color: "#FFFFFF",
    marginBottom: 3
  },
  buttonAddCard:{
    width: '100%',
    height: 52,
    backgroundColor: Colors.puntaDelEste,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  addCardBUttonText:{
    textAlign: 'center',
    width: '100%',
    fontFamily: Fonts.get('regular'),
    fontSize: 16,
    color: '#FFFFFF'
  }
});

export default Styles;
