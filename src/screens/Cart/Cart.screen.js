import React, { Component } from 'react';
import { Text, View, FlatList, Image, Alert, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { ScreenNames } from '../../screens';
import CartItem from '../../components/CartItem/CartItem';
import { SingleNavStyle, NavigationEventsHandler } from '../../utils/Navigator';
import Styles from './Cart.styles';
import * as ProductActions from '../../actions/Product/Product.actions';
import * as CommonActions from '../../actions/Common/Common.actions';
import ActionButton from '../../components/ActionButton/ActionButton';
import * as Images from '../../utils/Images';
import TopAlert from '../../components/Alert/Alert';

class Cart extends Component {
  static navigatorStyle = {
    ...SingleNavStyle,
    drawUnderTabBar: true
  };
  static navigatorButtons = {
    leftButtons: [{
      icon: Images.backButton,
      id: '@nav/editConfirm',
      disableIconTint: true
    }],
    rightButtons: []
  };

  constructor(props) {
    super(props);

    const navigatorEventsHandler = (event) => NavigationEventsHandler({
      screen: this.constructor.id,
      navigator: props.navigator, event
    });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._subtotal = this._subtotal.bind(this);
    this._renderAddress = this._renderAddress.bind(this);
    this._purchase = this._purchase.bind(this);
    this._setAlertMessage = this._setAlertMessage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.success && nextProps.success !== this.props.success) {
      this.props.navigator.showLightBox({
        screen: ScreenNames.GeofenceRestriction.id,
        title: '',
        style: {
         backgroundBlur: 'dark',
         backgroundColor: 'rgba(50, 50, 50, 0.2)'
        },
        passProps: {
          title: 'Success!',
          message: 'Your purchase was correctly made, enjoy!',
          handleClose: () => {
            this.props.navigator.dismissLightBox();
            this.props.navigator.popToRoot();
          }
        }
      });
    }
  }

  render() {
    const { cart, userData, errorMessage } = this.props;

    if (this.props.loading) { return <Loader />; }

    const subtotal = this._subtotal();

    return (
      <View style={Styles.container}>
        <TopAlert show={errorMessage.show} message={errorMessage.message}
          onPress={() => this.props.setErrorMessage({ show: false, message: '' })}
          onHide={() => this.props.setErrorMessage({ show: false, message: '' })}/>
        <View style={[Styles.contentWrapper, { padding: 10, paddingBottom: 60 }]}>
          <View style={Styles.contentWrapper}>
            {this._renderShippingItem()}
          </View>
          <View style={Styles.totals}>
            <View style={Styles.totalsColumn}>
              <Text style={Styles.totalsText}>Item totals</Text>
              <Text style={Styles.totalsText}>Shipping & Handlings</Text>
              <View style={Styles.totalRowDivider} />
              <Text style={Styles.totalsText}>Order total</Text>
            </View>
            <View style={Styles.totalsColumnDivider} />
            <View style={Styles.totalsColumn}>
              <View style={Styles.price}>
                <View style={Styles.coinShape} />
                <Text style={Styles.priceAmount}>{subtotal}</Text>
              </View>
              <Text style={Styles.totalsText}>{'free'.toUpperCase()}</Text>
              <View style={Styles.totalRowDivider} />
              <View style={Styles.price}>
                <View style={Styles.coinShape} />
                <Text style={Styles.priceAmount}>{subtotal}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={Styles.actions}>{ this._renderAction(subtotal) }</View>
      </View>
    );
  }

  _renderShippingItem() {
    const { userData } = this.props;
    const hasShippingAddress = !!userData.shippingAddress;
    const shipping = hasShippingAddress ? { ...userData.shippingAddress } : {};
    const content = hasShippingAddress
      ? (
          <View>
            <Text style={[Styles.shippingStaticText, { marginLeft: 30, marginTop: 3 }]}>
              {`${shipping.address} ${shipping.postalCode} ${shipping.state}`}
            </Text>
          </View>
        )
      : null;

    return (
      <TouchableOpacity style={Styles.shippingContainer} onPress={() => this._navigateTo('ShippingInformation')}>
        <View style={Styles.shippingRowContainer}>
          <View style={Styles.shippingStatic}>
            <View style={[Styles.radioButton, hasShippingAddress ? Styles.radioButtonActive : {}]}>
              { hasShippingAddress ? <Image source={Images.cartTick} resizeMode="contain" /> : null }
            </View>
            <Text style={Styles.shippingStaticText}>Shipping</Text>
          </View>
          <Image source={Images.chevronRight} resizeMode="contain" />
        </View>
        { content }
      </TouchableOpacity>
    );
  }

  _purchase() {
    const { cart } = this.props;
    let form = [];
    cart.map((item) => {
      form.push({productId: item.product._id, quantity: item.quantity});
    });
    this.props.purchase(form);
  }

  _renderAddress() {
    const { userData } = this.props;
    const largAddressText = userData.shippingAddress.address.length > 30;
    const largeCityText = userData.shippingAddress.city.length > 30;

    return (
      <View style={Styles.addressContainer}>
        <View>
          <Text style={Styles.addressInfoText}>
            {largAddressText ? userData.shippingAddress.address.substring(0,30) + '...'
              : userData.shippingAddress.address }
          </Text>
          <Text style={Styles.addressInfoText}>
            {largeCityText ? userData.shippingAddress.city.substring(0,30)+'...'
              : userData.shippingAddress.city}
          </Text>
        </View>
        <ActionButton title={'Edit'.toUpperCase()} type="dark" style={Styles.editBtn}
          textStyle={Styles.textEditBtn} onPress={() => {
            this.props.navigator.push({
              screen: ScreenNames.ShippingInformation.id,
              title: ScreenNames.ShippingInformation.title,
              animated: true,
              backButtonTitle: '',
              passProps: {
                setAlertMessage: this._setAlertMessage,
              } 
            });
          }} />
      </View>
    );
  }

  _setAlertMessage() {
    this.props.setErrorMessage({ show: true, message: 'Changed shipping information successfully!' });
  }

  _subtotal() {
    const { cart } = this.props;
    let subtotal = 0;

    cart.map((item) => {
      subtotal += item.quantity*item.product.coinvalue;
    });
    return subtotal;
  }

  _renderAction(subtotal) {
    const { userData } = this.props;
    const enoughCoins = userData.coins >= subtotal;

    if (enoughCoins) {
      const onPress = userData.shippingAddress
        ? () => this._purchase() : () => this._navigateTo('ShippingInformation');
      const color = !userData.shippingAddress ? 'dark' : '';

      return (
        <ActionButton style={Styles.shippingButton} title="Submit order" onPress={onPress} type={color} />
      );
    }

    return <ActionButton style={Styles.shippingButton} title={'Purchase Coins'.toUpperCase()}
        onPress={() => this._navigateTo('BuyCoins')} type="dark" />;
  }

  _navigateTo(target) {
    let passProps = {};

    if (target === 'ShippingInformation') {
      passProps.setAlertMessage = this._setAlertMessage;
    } else if (target === 'BuyCoins') {
      passProps.stack = true;
    }

    setTimeout(() => {
      this.props.navigator.push({
        screen: ScreenNames[target].id,
        title: ScreenNames[target].title.toUpperCase(),
        backButtonTitle: '',
        animated: true,
        navigatorButtons: {
          leftButtons: [{
            icon: Images.backButton,
            id: '@nav/editConfirm',
            disableIconTint: true
          }],
          rightButtons: []
        },
        passProps
      });
    }, 100);
  }

  _backToShop() {
    this.props.resetSuccess();
    setTimeout(() => {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'fade'
      });
    }, 100);
  }
}

Cart.title = 'Checkout';
Cart.id = 'com.eSportsGlobalGamers.Cart';

const mapStateToProps = ({ product, user, common }) => {
  return {
    cart: product.cart,
    userData: user.userData,
    loading: product.loadingPurchasing,
    errorMessage: common.errorMessage,
    success: product.purchaseSuccess
  };
};

const mapDispatchToProps = dispatch => ({
  updateCart: (data) => dispatch(ProductActions.updateCart(data)),
  removeCart: (data) => dispatch(ProductActions.removeCart(data)),
  purchase: (data) => dispatch(ProductActions.purchaseProducts(data)),
  setErrorMessage: (data) => dispatch(CommonActions.setErrorMessage(data)),
  resetSuccess: () => dispatch(ProductActions.resetPurchaseSuccess())
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);