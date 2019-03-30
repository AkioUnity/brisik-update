import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  TouchableHighlight,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import {connect} from 'react-redux';
import * as Images from '../../utils/Images';
import {ModalNavStyle2, NavigationEventsHandler} from '../../utils/Navigator';
// import BuyCoinsItem from '../../components/BuyCoinsItem/BuyCoinsItem';
import * as ProductActions from '../../actions/Product/Product.actions';
// import Loader from '../../components/Loader/Loader';
// import {ScreenNames} from '../';
import Styles from './WithdrawFunds.styles';
import {ScreenNames} from '../../screens';

const defaultBoxes = [{
  value: 1,
  text: '25',
  type: 'small'
}, {
  value: 2,
  text: '100',
  type: 'small'
}, {
  value: 3,
  text: '250',
  type: 'small'
}, {
  value: 4,
  text: '1000',
  type: 'small'
}, {
  value: 5,
  text: '0',
  type: 'large'
}
];

function validateEmail(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class WithdrawFunds extends Component {
  static navigatorStyle = ModalNavStyle2;

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      email: ''
    };
    const navigatorEventsHandler = (event) => NavigationEventsHandler({
      screen: this.constructor.id,
      navigator: props.navigator, event
    });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);
    this._navigate = this._navigate.bind(this);
    this._areValuesValid = this._areValuesValid.bind(this);
    // this.props.retrievecardinfo();
 
  }

  // componentDidMount() {
  //   this.props.getCoins();
  // }

  _navigate(title, target) {
    if (target && typeof target === 'string') {
      this.props.navigator.push({
        screen: 'com.eSportsGlobalGamers.' + target,
        title: title.toUpperCase(),
        backButtonTitle: '',
        navigatorButtons: {
          leftButtons: [{
            icon: Images.backButton,
            id: '@nav/editConfirm',
            disableIconTint: true
          }],
          rightButtons: []
        },
        animated: true
      });
    }
  }

  _areValuesValid() {
    let isValid = true;
    if (this.state.value <= 0) {
      isValid = false;
    }
    try{
      let num = parseFloat(this.state.value);
      if(isNaN(num)){
        isValid = false;
      }
    }catch(e){
      isValid = false;
    }
    if (this.state.email.length <= 0) {
      isValid = false;
    }
    if (!validateEmail(this.state.email)) {
      isValid = false;
    }

    return isValid;
  }

  _withdrawFundsAction() {

    if (this.state.value <= 0) {
      this.props.navigator.showLightBox({
        screen: ScreenNames.GeofenceRestriction.id,
        title: '',
        style: {
          backgroundBlur: 'dark',
          backgroundColor: 'rgba(50, 50, 50, 0.2)'
        },
        passProps: {
          title: 'Warning',
          message: 'Amount must be greater than zero.',
          handleClose: () => this.props.navigator.dismissLightBox()
        }
      });
      return;
    }
    try{
      let num = parseFloat(this.state.value);
      if(isNaN(num)){
        if (this.state.value <= 0) {
          this.props.navigator.showLightBox({
            screen: ScreenNames.GeofenceRestriction.id,
            title: '',
            style: {
              backgroundBlur: 'dark',
              backgroundColor: 'rgba(50, 50, 50, 0.2)'
            },
            passProps: {
              title: 'Warning',
              message: 'Amount must be a number.',
              handleClose: () => this.props.navigator.dismissLightBox()
            }
          });
          return;
        }
      }
    }catch(e){
      if (this.state.value <= 0) {
        this.props.navigator.showLightBox({
          screen: ScreenNames.GeofenceRestriction.id,
          title: '',
          style: {
            backgroundBlur: 'dark',
            backgroundColor: 'rgba(50, 50, 50, 0.2)'
          },
          passProps: {
            title: 'Warning',
            message: 'Amount must be a number.',
            handleClose: () => this.props.navigator.dismissLightBox()
          }
        });
        return;
      }
    }
    if (this.state.email.length <= 0) {
      this.props.navigator.showLightBox({
        screen: ScreenNames.GeofenceRestriction.id,
        title: '',
        style: {
          backgroundBlur: 'dark',
          backgroundColor: 'rgba(50, 50, 50, 0.2)'
        },
        passProps: {
          title: 'Warning',
          message: 'Please enter your PayPal email.',
          handleClose: () => this.props.navigator.dismissLightBox()
        }
      });
      return;
    }
    if (!validateEmail(this.state.email)) {
      this.props.navigator.showLightBox({
        screen: ScreenNames.GeofenceRestriction.id,
        title: '',
        style: {
          backgroundBlur: 'dark',
          backgroundColor: 'rgba(50, 50, 50, 0.2)'
        },
        passProps: {
          title: 'Warning',
          message: 'Please enter a valid PayPal email.',
          handleClose: () => this.props.navigator.dismissLightBox()
        }
      });
      return;
    }
    if(parseFloat(this.state.value) > parseFloat(this.props.userData.cash)){
      this.props.navigator.showLightBox({
        screen: ScreenNames.GeofenceRestriction.id,
        title: '',
        style: {
          backgroundBlur: 'dark',
          backgroundColor: 'rgba(50, 50, 50, 0.2)'
        },
        passProps: {
          title: 'Warning',
          message: 'Insufficient Balance.',
          handleClose: () => this.props.navigator.dismissLightBox()
        }
      });
      return;
    }
    if(this.state.value && this.state.email){
      this.props.withdraw({
        amount: this.state.value,
        email: this.state.email
      }, () => {
        this.props.navigator.popToRoot({ animated: true });
        this.props.navigator.showLightBox({
          screen: ScreenNames.GeofenceRestriction.id,
          title: '',
          style: {
            backgroundBlur: 'dark',
            backgroundColor: 'rgba(50, 50, 50, 0.2)',
          },
          passProps: {
            title: 'Success',
            message: 'Withdraw Initiated',
            handleClose: () => this.props.navigator.dismissLightBox(),
          },
        });
      });
    }
    // if(this.state.id === 5){
    //   if(!this.state.value){
    //     this.props.navigator.showLightBox({
    //       screen: ScreenNames.GeofenceRestriction.id,
    //       title: '',
    //       style: {
    //         backgroundBlur: 'dark',
    //         backgroundColor: 'rgba(50, 50, 50, 0.2)'
    //       },
    //       passProps: {
    //         title: 'Warning',
    //         message: 'Please enter or select an amount',
    //         handleClose: () => this.props.navigator.dismissLightBox()
    //       }
    //     });
    //     return;
    //   }
    // }
    //
    // if(!this.props.userData.hasCustomerId){
    //   this.props.navigator.showLightBox({
    //     screen: ScreenNames.GeofenceRestriction.id,
    //     title: '',
    //     style: {
    //       backgroundBlur: 'dark',
    //       backgroundColor: 'rgba(50, 50, 50, 0.2)'
    //     },
    //     passProps: {
    //       title: 'Warning',
    //       message: 'Please add a card to continue.',
    //       handleClose: () => this.props.navigator.dismissLightBox()
    //     }
    //   });
    //   return;
    // }
    // if(!this.state.cardSelected){
    //   this.props.navigator.showLightBox({
    //     screen: ScreenNames.GeofenceRestriction.id,
    //     title: '',
    //     style: {
    //       backgroundBlur: 'dark',
    //       backgroundColor: 'rgba(50, 50, 50, 0.2)'
    //     },
    //     passProps: {
    //       title: 'Warning',
    //       message: 'Please select a card to continue.',
    //       handleClose: () => this.props.navigator.dismissLightBox()
    //     }
    //   });
    //   return;
    // }
    // if(this.state.value){
    //   this.props.withdraw({
    //     amount: this.state.value
    //   });
    // }


  }


  render() {
    // WIP: when the APIs are live.
    // if (this.props.loading || !this.props.coins) {
    //   return <Loader/>;
    // }
    let balance = 0;
    if(this.props.userData){
      balance = this.props.userData.cash;
      try{
        balance = parseFloat(balance).toFixed(2);
      }catch(e){
        balance = 0.00;
      }  
    }
    
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        
          <View style={Styles.container}>
          <View style={{height: 50, marginTop: 20}}>
            <Text style={Styles.amountToAddText}>{'Amount to Withdraw'}</Text>
          </View>
          <TextInput style={Styles.invisibleTextInput}
                     placeholder='0'
                     defaultValue='0'
                     keyboardType="number-pad"
                     onChangeText={(val) => {
                       if(!isNaN(parseFloat(val))){
                         this.setState({value: parseFloat(val).toFixed(2)});
                       }else{
                         this.setState({value: 0.00});
                       }
                     }}
                     underlineColorAndroid="transparent"/>
          <View style={{height: 50, marginTop: 10}}>
            <Text style={Styles.infoText}>{`Your Brisik balance is $${balance}`}</Text>
          </View>

          <KeyboardAvoidingView keyboardVerticalOffset={100} enabled behavior="position" contentContainerStyle={{
            marginTop: 130
          }}>
            <View style={{height: 50, marginTop: 50}}>
              <Text style={Styles.amountToAddText}>{'PayPal email address'}</Text>
            </View>
            <TextInput style={Styles.emailTextInput}
                       placeholder='Enter Email'
                       onChangeText={(email) => {
                         this.setState({email: email});
                       }}
                       underlineColorAndroid="transparent"/>
            <View style={{height: 50, marginTop: 10}}>
              <Text style={Styles.infoText}>{'Must match a PayPal account.'}</Text>
            </View>
          </KeyboardAvoidingView>
          <TouchableOpacity style={(this._areValuesValid() ? Styles.buttonViewActive : Styles.buttonView)}
                            onPress={() => this._withdrawFundsAction()}>
            <View>
              <Text style={Styles.addFundButtonText}>
                REQUEST WITHDRAWAL | ${this.state.value}
              </Text>
            </View>
          </TouchableOpacity>
          </View>
      </TouchableWithoutFeedback>
    );
  }
}

WithdrawFunds.title = 'Withdraw Funds';
WithdrawFunds.id = 'com.eSportsGlobalGamers.WithdrawFunds';

const mapStateToProps = ({product, user}) => {
  return {
    coins: product.coins,
    loading: product.loading,
    userData: user.userData
  };
};

const mapDispatchToProps = {
  withdraw: ProductActions.createWithdraw,
};


export default connect(mapStateToProps, mapDispatchToProps)(WithdrawFunds);
