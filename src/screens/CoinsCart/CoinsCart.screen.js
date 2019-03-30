import React, { Component } from 'react';
import { Text, View, FlatList, Image, Alert, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { ScreenNames } from '../../screens';
import CartItem from '../../components/CartItem/CartItem';
import { SingleNavStyle, NavigationEventsHandler } from '../../utils/Navigator';
import Styles from './CoinsCart.styles';
import * as ProductActions from '../../actions/Product/Product.actions';
import * as CommonActions from '../../actions/Common/Common.actions';
import ActionButton from '../../components/ActionButton/ActionButton';
import * as Images from '../../utils/Images';
import TopAlert from '../../components/Alert/Alert';

class CoinsCart extends Component {
  static navigatorStyle = SingleNavStyle;
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

    const navigatorEventsHandler = event =>
      NavigationEventsHandler({
        screen: this.constructor.id,
        navigator: props.navigator,
        event
      });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._setAlertMessage = this._setAlertMessage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.success && nextProps.success !== this.props.success) {
      return this.props.navigator.showLightBox({
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
    const { cart, userData, errorMessage, coinPack } = this.props;

    if (this.props.loading) { return <Loader />; }

    return (
      <View style={Styles.container}>
        <TopAlert show={errorMessage.show} message={errorMessage.message}
          onPress={() => this.props.setErrorMessage({ show: false, message: '' })}
          onHide={() => this.props.setErrorMessage({ show: false, message: '' })}/>
        <View style={[Styles.contentWrapper, { padding: 10 }]}>
          <View style={Styles.contentWrapper}>
            {this._renderBillingItem()}
            <View style={{ height: 10 }} />
            {this._renderPaymentItem()}
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
              <Text style={Styles.priceAmount}>{ `$${coinPack.price}`}</Text>
              <Text style={Styles.totalsText}>{'free'.toUpperCase()}</Text>
              <View style={Styles.totalRowDivider} />
              <Text style={Styles.priceAmount}>{`$${coinPack.price}`}</Text>
            </View>
          </View>
        </View>
        <View style={Styles.actions}>{ this._renderAction() }</View>
      </View>
    );
  }

  _renderBillingItem() {
    const { userData } = this.props;
    const hasShippingAddress = !!userData.shippingAddress;
    const shipping = hasShippingAddress ? { ...userData.shippingAddress } : {};
    const content = hasShippingAddress
      ? (
          <View>
            <Text style={[Styles.shippingStaticText, { marginLeft: 30, marginTop: 3 }]}>
              {`${shipping.postalCode} ${shipping.address} ${shipping.state}`}
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
            <Text style={Styles.shippingStaticText}>Billing</Text>
          </View>
          <Image source={Images.chevronRight} resizeMode="contain" />
        </View>
        { content }
      </TouchableOpacity>
    );
  }

  _renderPaymentItem() {
    const { userData, cardInfo } = this.props;
    const hasCardAssociated = !!userData.hasCustomerId && cardInfo;
    const cardData = hasCardAssociated ? { ...cardInfo } : {};
    const content = hasCardAssociated
      ? (
          <View>
            <Text style={[Styles.shippingStaticText, { marginLeft: 30, marginTop: 3 }]}>
              {`${cardData.cardType} **** ${cardData.last4}`}
            </Text>
          </View>
        )
      : null;

    return (
      <TouchableOpacity style={Styles.shippingContainer} onPress={() => this._navigateTo('Checkout')}>
        <View style={Styles.shippingRowContainer}>
          <View style={Styles.shippingStatic}>
            <View style={[Styles.radioButton, hasCardAssociated ? Styles.radioButtonActive : {}]}>
              { hasCardAssociated ? <Image source={Images.cartTick} resizeMode="contain" /> : null }
            </View>
            <Text style={Styles.shippingStaticText}>Payment</Text>
          </View>
          <Image source={Images.chevronRight} resizeMode="contain" />
        </View>
        { content }
      </TouchableOpacity>
    );
  }

  _setAlertMessage() {
    this.props.setErrorMessage({ show: true, message: 'Changed shipping information successfully!' });
  }

  _renderAction() {
    const { userData, cardInfo } = this.props;
    const formFilled = userData.hasCustomerId && cardInfo;
    const onPress = formFilled
      ? () => {
          this.props.navigator.showLightBox({
            screen: ScreenNames.GeofenceRestriction.id,
            title: '',
            style: {
             backgroundBlur: 'dark',
             backgroundColor: 'rgba(50, 50, 50, 0.2)'
            },
            passProps: {
              buttonSet: 'inline',
              title: 'Pay with card',
              message: 'Are your sure you want to confirm the purchase?',
              buttons: [
                {
                  label: 'Cancel',
                  onPress: () => this.props.navigator.dismissLightBox(), type: 'dark'
                },
                {
                  label: 'Confirm',
                  onPress: () => {
                    this.props.payWithCard({ productId: this.props.coinPack._id });
                    this.props.navigator.dismissLightBox();
                  }
                }
              ]
            }
          });
        }
      : () => {};
    const color = !formFilled ? 'dark' : '';

    return (
      <ActionButton style={Styles.shippingButton} title="Submit order" onPress={onPress} type={color} />
    );
  }

  _navigateTo(target) {
    let passProps = {};

    if (target === 'ShippingInformation') {
      passProps.setAlertMessage = this._setAlertMessage;
    } else if (target === 'Checkout') {
      passProps.stack = true;
      passProps.productId = this.props.coinPack._id;
    }

    setTimeout(() => {
      this.props.navigator.push({
        screen: ScreenNames[target].id,
        title: target === 'ShippingInformation'
          ? 'billing'.toUpperCase() : ScreenNames[target].title.toUpperCase(),
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

CoinsCart.title = 'Checkout';
CoinsCart.id = 'com.eSportsGlobalGamers.CoinsCart';

const mapStateToProps = ({ product, user, common }) => {
  return {
    cart: product.cart,
    userData: user.userData,
    loading: product.loadingCoin,
    errorMessage: common.errorMessage,
    success: product.purchasedCoin,
    cardInfo: user.cardInfo
  };
};

const mapDispatchToProps = dispatch => ({
  purchase: (data) => dispatch(ProductActions.purchaseProducts(data)),
  setErrorMessage: (data) => dispatch(CommonActions.setErrorMessage(data)),
  resetSuccess: () => dispatch(ProductActions.resetPurchaseSuccess()),
  payWithCard: data => dispatch(ProductActions.payWithCard(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinsCart);