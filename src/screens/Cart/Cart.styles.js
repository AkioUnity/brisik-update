import { StyleSheet, PixelRatio } from 'react-native';
import { GlobalStyles } from '../../styles/Globals';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.montevideo,
    borderTopWidth: 1,
    borderTopColor: Colors.puntaDelEste
  },
  scrollView: {
    flex: 1,
    marginVertical: 5
  },
  totals: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
    position: 'relative',
    top: 50
  },
  subtotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  subtotalTitle: {
    fontFamily: Fonts.get('regular'),
    fontSize: 18,
    color: Colors.sanJose
  },
  subtotalValue: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  subtotalNumber: {
    fontFamily: Fonts.get('regular'),
    fontSize: 28,
    color: Colors.sanJose
  },
  subtotalCoin: {
    marginTop: 6
  },
  shipping: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  shippingTitle: {
    fontFamily: Fonts.get('regular'),
    fontSize: 18,
    color: Colors.sanJose
  },
  shippingValue: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  shippingNumber: {
    fontFamily: Fonts.get('regular'),
    fontSize: 28,
    color: Colors.sanJose
  },
  shippingCoin: {
    marginTop: 6
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  actionsTotal: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionsTotalTitle: {
    fontFamily: Fonts.get('regular'),
    fontSize: 20,
    color: Colors.sanJose
  },
  actionsTotalValue: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15
  },
  actionsNumber: {
    fontFamily: Fonts.get('regular'),
    fontSize: 28,
    color: Colors.sanJose
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  addressInfoText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 16,
    color: Colors.mercedes
  },
  addressInfoTitle: {
    fontFamily: Fonts.get('bold'),
    fontSize: 16,
    color: Colors.colonia
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: GlobalStyles.generalMargin,
    flex: 1
  },
  emptyCartText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 21,
    color: Colors.mercedes,
    marginBottom: 10,
    textAlign: 'center'
  },
  emptyButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noCoinText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 18,
    color: Colors.artigas,
    marginTop: GlobalStyles.generalMargin
  },
  shippingButtonText: {
    fontSize: PixelRatio.get() <= 2 ? 19 : 22
  },
  buyButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  buyCoinsButton: {
    alignSelf: 'stretch',
    margin: GlobalStyles.generalMargin
  },
  shippingButton: {
    alignSelf: 'stretch'
  },
  buyCoinsButtonText: {
    fontSize: 18
  },
  editBtn: {
    paddingHorizontal: 15,
    paddingVertical: 0,
    height: 'auto'
  },
  textEditBtn: {
    fontSize: 21,
    fontFamily: Fonts.get('medium')
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  coinShape: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.minas,
    marginRight: 5
  },
  priceAmount: {
    color: Colors.minas,
    fontSize: 14,
    fontFamily: Fonts.get('regular'),
    textAlign: 'right',
    letterSpacing: 0.5,
    lineHeight: 20,
    backgroundColor: 'transparent'
  },
  totalRowDivider: {
    height: 30
  },
  totalsText: {
    color: Colors.colonia,
    fontSize: 14,
    fontFamily: Fonts.get('regular'),
    textAlign: 'right',
    letterSpacing: 0.5,
    lineHeight: 20,
    backgroundColor: 'transparent'
  },
  totalsColumnDivider: {
    width: 50
  },
  contentWrapper: {
    flex: 1
  },
  shippingContainer: {
    height: 60,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.puntaDelEste
  },
  shippingRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  shippingStatic: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  shippingStaticText: {
    color: Colors.colonia,
    fontFamily: Fonts.get('regular'),
    fontSize: 14,
    letterSpacing: 0.5,
    lineHeight: 18,
    marginLeft: 10
  },
  radioButton: {
    borderWidth: 1,
    borderColor: Colors.colonia,
    borderRadius: 10,
    width: 20,
    height: 20,
    backgroundColor: 'transparent'
  },
  radioButtonActive: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.colonia
  }
});

export default Styles;
