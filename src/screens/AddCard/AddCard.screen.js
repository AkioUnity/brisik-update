import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, Keyboard, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { connect } from 'react-redux';
import * as Images from '../../utils/Images';
import * as ProductActions from '../../actions/Product/Product.actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { ModalNavStyle2, NavigationEventsHandler } from '../../utils/Navigator';
import Styles from './AddCard.styles';
import ActionButton from '../../components/ActionButton/ActionButton';
import Loader from '../../components/Loader/Loader';
import { PickerModal } from '../../components/Modals/Modals';
import Colors from '../../styles/Colors';
import { ScreenNames } from '../../screens';

class AddCardScreen extends Component {
  static navigatorStyle = ModalNavStyle2;

  constructor(props) {
    super(props);

    let isEdit = false;
    let cardDetails = {
      cardType: "Visa",
      exp_month: 12,
      exp_year: 2020,
      name: "",
      last4: ""
    };
    if(this.props.cardInfo){
      if(this.props.cardInfo.last4){
        isEdit = true;
        cardDetails = this.props.cardInfo;
      }
    }

    this.state = {
      isEdit: isEdit,
      creditCards: [],
      card: {
        name: cardDetails.fullName,
        cardType: cardDetails.cardType,
        number_def: `**** **** **** ${cardDetails.last4}`,
        exp: `${cardDetails.exp_month}/${cardDetails.exp_year}`,
        billingDetails: {}
      }
    };
  
    this.inputs = {};

    const navigatorEventsHandler = event =>
      NavigationEventsHandler({
        screen: this.constructor.id,
        navigator: props.navigator,
        event
      });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._onChangeInput = this._onChangeInput.bind(this);
    this._addNewCard = this._addNewCard.bind(this);

  }

  componentWillUpdate(nextProps) {
    if (nextProps.cardReceived && nextProps.cardReceived !== this.props.cardReceived) {
      this.props.navigator.pop({ animated: true });
    }
  }

  componentWillUnmount() {
    this.props.unsetCard();
  }

  render() {
    const { loadingCard, cardInfo } = this.props;
    const { isVisa, isMaster, card } = this.state;
    const formFilled = card.name && card.number && card.exp && card.cvc;

    if (loadingCard) {
      return <Loader />;
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={Styles.container}>
          <KeyboardAwareScrollView
            getTextInputRefs={() => Object.values(this.inputs)}
            keyboardShouldPersistTaps='always' >
            <View style={Styles.form}>
              <View style={Styles.formGroup}>
                <Text style={Styles.infoHead}>CARD INFO</Text>
                <TextInput
                  ref={input => (this.inputs.name = input)}
                  onChangeText={(val) => { this._onChangeInput('name', val); }}
                  onSubmitEditing={() => this.inputs.number.focus()}
                  style={Styles.input}
                  value={this.state.card.name}
                  placeholderTextColor={Colors.paysandu}
                  autoCapitalize="words"
                  placeholder="Name on Card"
                  selectionColor={Colors.durazno}
                  underlineColorAndroid={'transparent'}
                  returnKeyType="next"

                  keyboardAppearance="dark"/>
                <TextInput
                  ref={input => (this.inputs.number = input)}
                  onChangeText={(val) => { this._onChangeInput('number', val); }}
                  onSubmitEditing={() => this.inputs.exp.focus()}
                  style={Styles.input}
                  value={this.state.card.number}
                  placeholderTextColor={Colors.paysandu}
                  placeholder={(this.state.isEdit ? this.state.card.number_def : "Credit Card Number")}
                  keyboardType="numeric"
                  maxLength={19}
                  selectionColor={Colors.durazno}
                  underlineColorAndroid={'transparent'}
                  returnKeyType="next"
                  keyboardAppearance="dark" />
              </View>
              <View style={Styles.formGroupH}>
                <View style={[Styles.formGroupHIn, Styles.formGroupHInLeft]}>
                  <TextInput
                    ref={input => (this.inputs.exp = input)}
                    onChangeText={(val) => { this._setExpDate(val); }}
                    style={Styles.input}
                    value={this.state.card.exp}
                    placeholderTextColor={Colors.paysandu}
                    placeholder="Exp (mm/yyyy)"
                    keyboardType="numeric"
                    maxLength={7}
                    selectionColor={Colors.durazno}
                    underlineColorAndroid={'transparent'}
                    keyboardAppearance="dark" />
                </View>
                <View style={Styles.formGroupHIn}>
                  <TextInput
                    ref={input => (this.inputs.cvc = input)}
                    onChangeText={(val) => { this._onChangeInput('cvc', val); }}
                    style={Styles.input}
                    value={this.state.card.cvc}
                    placeholderTextColor={Colors.paysandu}
                    placeholder={(this.state.isEdit ? "****" : "CVC")}
                    keyboardType="numeric"
                    maxLength={4}
                    onSubmitEditing={this._addNewCard}
                    selectionColor={Colors.durazno}
                    underlineColorAndroid={'transparent'}
                    keyboardAppearance="dark" />
                </View>
              </View>
            </View>

            <View style={Styles.form}>
              <View style={Styles.formGroup}>
                <Text style={Styles.infoHead}>BILLING ADDRESS</Text>

              </View>
              <View style={Styles.formGroupH}>
                <View style={[Styles.formGroupHIn, Styles.formGroupHInLeft]}>
                  <TextInput
                    ref={input => (this.inputs.exp = input)}
                    onChangeText={(val) => { this._setBillingDetails(val,'firstName'); }}
                    style={Styles.input}
                    value={this.state.card.billingDetails.firstName}
                    placeholderTextColor={Colors.paysandu}
                    placeholder="First Name"
                    selectionColor={Colors.durazno}
                    underlineColorAndroid={'transparent'}
                    keyboardAppearance="dark" />
                </View>
                <View style={Styles.formGroupHIn}>
                  <TextInput
                    ref={input => (this.inputs.exp = input)}
                    onChangeText={(val) => { this._setBillingDetails(val,'lastName'); }}
                    style={Styles.input}
                    value={this.state.card.billingDetails.lastName}
                    placeholderTextColor={Colors.paysandu}
                    placeholder="Last Name"
                    selectionColor={Colors.durazno}
                    underlineColorAndroid={'transparent'}
                    keyboardAppearance="dark" />
                </View>
              </View>
              <TextInput
                ref={input => (this.inputs.exp = input)}
                onChangeText={(val) => { this._setBillingDetails(val,'streetAddress'); }}
                style={Styles.input}
                value={this.state.card.billingDetails.streetAddress}
                placeholderTextColor={Colors.paysandu}
                placeholder="Street Address"
                selectionColor={Colors.durazno}
                underlineColorAndroid={'transparent'}
                keyboardAppearance="dark" />
                <View style={Styles.formGroupH}>
                  <View style={[Styles.formGroupHIn, Styles.formGroupHInLeft]}>
                    <TextInput
                      ref={input => (this.inputs.exp = input)}
                      onChangeText={(val) => { this._setBillingDetails(val,'zip'); }}
                      style={Styles.input}
                      value={this.state.card.billingDetails.zip}
                      placeholderTextColor={Colors.paysandu}
                      placeholder="Zip"
                      keyboardType="numeric"
                      selectionColor={Colors.durazno}
                      underlineColorAndroid={'transparent'}
                      keyboardAppearance="dark" />
                  </View>
                  <View style={Styles.formGroupHIn}>
                    <TextInput
                      ref={input => (this.inputs.exp = input)}
                      onChangeText={(val) => { this._setBillingDetails(val,'state'); }}
                      style={Styles.input}
                      value={this.state.card.billingDetails.state}
                      placeholderTextColor={Colors.paysandu}
                      placeholder="State"
                      selectionColor={Colors.durazno}
                      underlineColorAndroid={'transparent'}
                      keyboardAppearance="dark" />
                  </View>
                </View>
            </View>

          </KeyboardAwareScrollView>
          <TouchableOpacity
            title="done"
            type={!formFilled ? 'dark' : ''} style={Styles.buttonAddCard}
            loading={loadingCard}
            onPress={() => { this._addNewCard(); }}
          >
            <Text style={Styles.addCardBUttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _onChangeInput(type, _data) {
    let data = _data;

    if (type === 'number') {
      data = this._numberFormater(_data);
    }
    this.setState((state) => ({ card: { ...state.card, [type]: data } }));
  }

  _numberFormater(number) {
    const length = number ? number.length : 0;
    const stateLength = this.state.card.number ? this.state.card.number.length : 0;
    let { isMaster, isVisa } = this.state;
    isVisa = number.substring(0,1) === '4';
    isMaster = number.substring(0,1) === '5';
    if (length === 4 || length === 9 || length === 14) {
      this.setState({ isVisa, isMaster });
      if (length > stateLength) {
        return `${number} `;
      }

      return number.slice(0, -1);
    } else if (length === 0) {
      this.setState({ isVisa, isMaster });
    }
    return number;
  }

  _addNewCard() {
    const { card } = this.state;
    const { user } = this.props;
    const currentYear = new Date().getFullYear();
    if(!this.state.isEdit){
      if (!card || !card.name || !card.number || !card.exp || !card.cvc) {
        this.props.navigator.showLightBox({
          screen: ScreenNames.GeofenceRestriction.id,
          title: '',
          style: {
            backgroundBlur: 'dark',
            backgroundColor: 'rgba(50, 50, 50, 0.2)'
          },
          passProps: {
            title: 'Warning',
            message: 'Please fill all the fields',
            handleClose: () => this.props.navigator.dismissLightBox()
          }
        });
        return;
      } else if (Number(card.exp.split('/')[0]) > 12 || Number(card.exp.split('/')[0]) < 1) {
        this.props.navigator.showLightBox({
          screen: ScreenNames.GeofenceRestriction.id,
          title: '',
          style: {
            backgroundBlur: 'dark',
            backgroundColor: 'rgba(50, 50, 50, 0.2)'
          },
          passProps: {
            title: 'Warning',
            message: 'The expiration date has to be mm/yyyy.',
            handleClose: () => this.props.navigator.dismissLightBox()
          }
        });
        return;
      } else if (Number(card.exp.split('/')[1]) < currentYear) {
        this.props.navigator.showLightBox({
          screen: ScreenNames.GeofenceRestriction.id,
          title: '',
          style: {
            backgroundBlur: 'dark',
            backgroundColor: 'rgba(50, 50, 50, 0.2)'
          },
          passProps: {
            title: 'Warning',
            message: 'The expiration date has to be in the future',
            handleClose: () => this.props.navigator.dismissLightBox()
          }
        });
        return;
      }
    }else{

    }

    const _card = {
      name: card.name || null,
      number: card.number || null,
      cvc: card.cvc || null,
      year: card.exp.split('/')[1],
      month: card.exp.split('/')[0]
    };
    if(!this.state.isEdit){
      this.props.createStripeCustomer({
        id: user._id,
        onUpdate: user.hasCustomerId,
        card: _card
      });  
    }else{
      this.props.updateCardInfo({
        id: user._id,
        onUpdate: user.hasCustomerId,
        card: _card
      });  
    }
    
  }

  _setExpDate(_value) {
    let value = _value;
    if(value.length === 2){
      value = value + '/';
    }
    if(value.length > 2 && value.indexOf('/') < 0){
      let valueMap = value.split('');
      value = '';
      for(let i in valueMap){
        value += valueMap[i];
        if(parseInt(i) === 1){
          value += '/';
        }
      }
    }
    if(value.length > 2 && value.indexOf('/') !== 2){
      let valueMap = value.split('');
      value = '';
      for(let i in valueMap){
        if(valueMap[i] === '/'){
          continue;
        }
        value += valueMap[i];
        if(parseInt(i) === 1){
          value += '/';
        }
      }
    }

    this.setState({
      card: {
        ...this.state.card,
        exp: value
      }
    });
  }

  _setBillingDetails(_value, _type) {
    let billingDetails = this.state.card.billingDetails;

    billingDetails[_type] = _value;

    this.setState({
      card: {
        ...this.state.card,
        billingDetails: billingDetails
      }
    });
  }
}

AddCardScreen.title = 'Add Card';
AddCardScreen.id = 'com.eSportsGlobalGamers.AddCardScreen';

const mapStateToProps = ({ user, product }) => {
  return {
    user: user.userData,
    loadingCard: product.loadingCard,
    cardInfo: user.cardInfo,
    cardReceived: product.cardReceived
  };
};

const mapDispatchToProps = (dispatch) => ({
  createStripeCustomer: (data) => dispatch(ProductActions.createStripeCustomer(data)),
  updateCardInfo: (data) => dispatch(ProductActions.updateCardInfo(data)),
  unsetCard: () => dispatch(ProductActions.unsetCard()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCardScreen);
