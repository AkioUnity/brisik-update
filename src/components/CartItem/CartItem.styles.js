import { StyleSheet } from 'react-native';
import { GlobalStyles } from '../../styles/Globals';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginVertical: 5,
    backgroundColor: 'rgba(0, 0, 0, .2)',
  },
  information: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 90,
    paddingHorizontal: GlobalStyles.generalMargin,
    paddingVertical: 5
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: GlobalStyles.generalMargin,
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, .1)'
  },
  priceLabel: {
    fontFamily: Fonts.get('regular'),
    fontSize: 16,
    color: Colors.sanJose,
  },
  priceValue: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    height: 80,
    width: 80
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10
  },
  infoTitle: {
    fontFamily: Fonts.get('regular'),
    fontSize: 18,
    color: Colors.sanJose,
    marginRight: 10
  },
  infoDescription: {
    fontFamily: Fonts.get('regular'),
    fontSize: 18,
    color: Colors.sanJose
  },
  priceNumber: {
    fontFamily: Fonts.get('bold'),
    fontSize: 20,
    color: Colors.sanJose
  },
  priceCoin: {
    marginTop: 5,
    marginLeft: 5
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  counterNumber: {
    fontFamily: Fonts.get('regular'),
    fontSize: 28,
    color: Colors.sanJose
  },
  buttons: {
    width: 40,
    marginLeft: 10
  },
  button: {
    flex: 1,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonPlus: {
    backgroundColor: Colors.talas
  },
  buttonMinus: {
    backgroundColor: Colors.mercedes
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 20
  }
});

export default Styles;
