import React, { Component } from 'react';
import { Text, View, ScrollView, Image, Alert, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as ProductActions from '../../actions/Product/Product.actions';
import * as CommonActions from '../../actions/Common/Common.actions';
import * as UserActions from '../../actions/User/User.actions';
import { SingleNavStyle, NavigationEventsHandler } from '../../utils/Navigator';
import Styles from './Checkout.styles';
import ActionButton from '../../components/ActionButton/ActionButton';
import Loader from '../../components/Loader/Loader';
import { ScreenNames } from '../';
import * as Images from '../../utils/Images';
import TopAlert from '../../components/Alert/Alert';

class Checkout extends Component {
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

    this.state = {
      creditCards: [],
      card: {}
    };

    const navigatorEventsHandler = event =>
      NavigationEventsHandler({
        screen: this.constructor.id,
        navigator: props.navigator,
        event
      });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._cardsList = this._cardsList.bind(this);
  }

  componentWillMount() {
    if (this.props.user.hasCustomerId) {
      this.props.getCard();
    }
  }

  componentWillUnmount() {
    this.props.clearProduct();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.purchasedCoin && nextProps.loadingCoin) {
      if (!this.props.stack) {
        this.props.navigator.popToRoot({ animated: false });
        Alert.alert('Successfully purchased coins!');
      } else {
        if (Platform.OS === 'ios') {
          this.props.navigator.dismissModal({ animated: false }).then(() => {
            Alert.alert('Success', 'Successfully purchased coins!');
          });
        } else {
          this.props.navigator.dismissModal({ animated: false });
          Alert.alert('Success', 'Successfully purchased coins!');
        }
      }
    }
  }

  render() {
    const { cardInfo, loadingCoin, loadingCard, errorMessage } = this.props;

    if (loadingCoin || loadingCard) {
      return <Loader />;
    }

    return (
      <View style={Styles.container}>
        <TopAlert
          show={errorMessage.show}
          message={errorMessage.message}
          onPress={() => this.props.setErrorMessage({ show: false, message: '' })}
          onHide={() => this.props.setErrorMessage({ show: false, message: '' })}
        />
        <View style={Styles.sectionHeader}>
          <Text style={Styles.sectionTitle}>{ 'credit cards'.toUpperCase() }</Text>
        </View>
        <ScrollView style={Styles.scrollView}>
          <View style={Styles.listing}>
            {this._cardsList()}
          </View>
        </ScrollView>
        <ActionButton
          title="done"
          type={!cardInfo ? 'dark' : ''}
          onPress={() => this.props.navigator.pop({ animated: true })}
        />
      </View>
    );
  }

  _cardsList() {
    const { cardInfo } = this.props;

    return (
      <View style={Styles.cardContainer}>
        <TouchableOpacity
          style={[Styles.item, { height: 50 }]}
          onPress={() => {
            this.props.navigator.push({
              screen: ScreenNames.AddCard.id,
              title: ScreenNames.AddCard.title.toUpperCase(),
              animated: true,
              backButtonTitle: '',
              navigatorButtons: {
                leftButtons: [{
                  icon: Images.backButton,
                  id: '@nav/editConfirm',
                  disableIconTint: true
                }],
                rightButtons: []
              }
            });
          }}
        >
          <View style={[Styles.itemData, Styles.itemDataIcons]}>
            <Image source={Images.addFriend} resizeMode="contain" style={Styles.icon} />
            <Text style={Styles.itemCardDescription}>Add a New Card</Text>
          </View>
          <Image source={Images.chevronRight} resizeMode="contain" />
        </TouchableOpacity>
        { cardInfo &&
          <View style={Styles.item}>
            <View style={Styles.itemData}>
              <Text style={Styles.itemCardName}>{ cardInfo.fullName }</Text>
              <Text style={Styles.itemCardDescription}>{ `${cardInfo.cardType} **** ${cardInfo.last4}` }</Text>
            </View>
            <View style={Styles.tickContainer}>
              <Image source={Images.cartTick} resizeMode="contain" />
            </View>
          </View>
        }
      </View>
    );
  }
}

Checkout.title = 'Payment';
Checkout.id = 'com.eSportsGlobalGamers.Checkout';

const mapStateToProps = ({ user, product, common }) => {
  return {
    user: user.userData,
    cardInfo: user.cardInfo,
    loadingCoin: product.loadingCoin,
    loadingCard: user.loadingCard,
    purchasedCoin: product.purchasedCoin,
    errorMessage: common.errorMessage
  };
};

const mapDispatchToProps = dispatch => ({
  getCard: () => dispatch(UserActions.getCard()),
  payWithCard: data => dispatch(ProductActions.payWithCard(data)),
  setErrorMessage: data => dispatch(CommonActions.setErrorMessage(data)),
  clearProduct: () => dispatch(ProductActions.clearProduct())
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
