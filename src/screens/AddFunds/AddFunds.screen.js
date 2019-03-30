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
  TouchableWithoutFeedback
} from 'react-native';
import {connect} from 'react-redux';
import * as Images from '../../utils/Images';
import {ModalNavStyle2, NavigationEventsHandler} from '../../utils/Navigator';
// import BuyCoinsItem from '../../components/BuyCoinsItem/BuyCoinsItem';
import * as ProductActions from '../../actions/Product/Product.actions';
import Loader from '../../components/Loader/Loader';
// import {ScreenNames} from '../';
import Styles from './AddFunds.styles';
import { ScreenNames } from '../../screens';

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

class AddFunds extends Component {
  static navigatorStyle = ModalNavStyle2;

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      text_value: '',
      cardSelected: false
    };
    const navigatorEventsHandler = (event) => NavigationEventsHandler({
      screen: this.constructor.id,
      navigator: props.navigator, event
    });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);
    this._navigate = this._navigate.bind(this);
  
    if(this.props.userData.hasCustomerId){
      this.props.retrievecardinfo();  
    }
  }

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

  _renderLargeBox(boxIndex, key) {
    let {value, text} = defaultBoxes[boxIndex];
    // WIP: option to have fixed large boxes
    return (
      <View key={key}
            style={[Styles.otherAmountContainer, this.state.id === value && Styles.otherAmountContainerSelected]}>
        <TouchableOpacity onPress={() => this.setState({id: value, value: this.state.text_value || ''})}>
          <Text style={Styles.otherAmountText}>{'OTHER AMOUNT'}</Text>
          <TextInput style={Styles.otherAmountTextInput}
                     placeholder="$0"
                     keyboardType="number-pad"
                     onChangeText={(val) => {
                       this.setState({id: value, value: val, text_value: val});
                     }}
                     underlineColorAndroid="transparent"/>
        </TouchableOpacity>
      </View>
    );
  }

  _renderSmallBox(boxIndex, key) {
    let {value, text} = defaultBoxes[boxIndex];
    return (
      <TouchableOpacity key={key}
                        style={[Styles.buttonContainer, this.state.id === value && Styles.buttonContainerSelected]}
                        onPress={() => this.setState({id: value, value: text})}>
        <View>
          <Text style={Styles.buttonText}>
            {`$${text}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  _renderBoxes(key, type, boxIndex) {

    switch (type) {
      case 'small':
        return this._renderSmallBox(boxIndex, key);
      case 'large':
        return this._renderLargeBox(boxIndex, key);
    }
  }

  _addFundsAction(){

    if(this.state.id <= 0){
      this.props.navigator.showLightBox({
        screen: ScreenNames.GeofenceRestriction.id,
        title: '',
        style: {
          backgroundBlur: 'dark',
          backgroundColor: 'rgba(50, 50, 50, 0.2)'
        },
        passProps: {
          title: 'Warning',
          message: 'Please enter or select an amount',
          handleClose: () => this.props.navigator.dismissLightBox()
        }
      });
      return;
    }
    if(this.state.id === 5){
      if(!this.state.value){
        this.props.navigator.showLightBox({
          screen: ScreenNames.GeofenceRestriction.id,
          title: '',
          style: {
            backgroundBlur: 'dark',
            backgroundColor: 'rgba(50, 50, 50, 0.2)'
          },
          passProps: {
            title: 'Warning',
            message: 'Please enter or select an amount',
            handleClose: () => this.props.navigator.dismissLightBox()
          }
        });
        return;
      }
    }

    if(!this.props.userData.hasCustomerId){
      this.props.navigator.showLightBox({
        screen: ScreenNames.GeofenceRestriction.id,
        title: '',
        style: {
          backgroundBlur: 'dark',
          backgroundColor: 'rgba(50, 50, 50, 0.2)'
        },
        passProps: {
          title: 'Warning',
          message: 'Please add a card to continue.',
          handleClose: () => this.props.navigator.dismissLightBox()
        }
      });
      return;
    }
    if(!this.state.cardSelected){
      this.props.navigator.showLightBox({
        screen: ScreenNames.GeofenceRestriction.id,
        title: '',
        style: {
          backgroundBlur: 'dark',
          backgroundColor: 'rgba(50, 50, 50, 0.2)'
        },
        passProps: {
          title: 'Warning',
          message: 'Please select a card to continue.',
          handleClose: () => this.props.navigator.dismissLightBox()
        }
      });
      return;
    }
    if(this.state.value) {
      this.props.deposit({
        amount: this.state.value
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
            message: 'Deposit Initiated',
            handleClose: () => this.props.navigator.dismissLightBox(),
          },
        });
      });
    }

  }

  _renderPaymentMethod() {
    let addCardTitle = 'Add Card';
    let addCardId = 'AddCardScreen';

    let addCardView = (
      <View key={'new_card_one'} style={Styles.cardOuterContainer}>
        <TouchableOpacity onPress={() => this._navigate(addCardTitle, addCardId)} style={Styles.cardContainer}>
          <View style={Styles.cardInnerContainer}>
            <Image style={Styles.addImage} source={Images.addCard}/>
            <Text style={Styles.addText}>Add new card</Text>
          </View>
        </TouchableOpacity>
      </View>
    );

    let staticProps = {
      cardType: '',
      last4: '',
      isValid: true
    };

    let {cardType, last4} = this.props.cardInfo || staticProps;
    let selected = (<View style={Styles.blankImagePlaceholder} />);
    if(this.state.cardSelected){
      selected = (<Image style={Styles.addImage} source={Images.tickImage}/>);
    }
    let defaultCard = (
      <View key={'def_card_one'} style={Styles.cardOuterContainer}>
        <View style={Styles.cardContainer}>
          <TouchableOpacity style={Styles.cardInnerContainer} onPress={() => this.setState({cardSelected: (!this.state.cardSelected)})}>
              {selected}
              <Text style={Styles.addText}>{`${cardType.toUpperCase()} **** ${last4}`}</Text>
              <View style={Styles.editCardContainer}>
                <TouchableOpacity onPress={() => this._navigate(addCardTitle, addCardId)} style={Styles.editCardTouchable}>
                  <Text style={Styles.editCardText}>Edit</Text>
                </TouchableOpacity>
              </View>
          </TouchableOpacity>
        </View>
      </View>
    );

    let view = [];

    if (this.props.userData.hasCustomerId) {
      view.push(defaultCard);
    } else {
      view.push(addCardView);
    }

    return (
      <View style={Styles.marginTopContainer}>
        <Text style={Styles.addFundButtonText}>Payment Methods</Text>
        {view}
      </View>
    );
  }

  render() {
    if (this.props.loading || this.props.loadingCard) {
      return <Loader/>;
    }

    let balance = 0.00;
    if(this.props.userData){
      balance = this.props.userData.cash;
      try{
        balance = parseFloat(balance).toFixed(2);
      }catch(e){
        balance = 0.00;
      }
    }

    let viewBoxes = [];
    for (let i in defaultBoxes) {
      viewBoxes.push(this._renderBoxes('box_' + i, defaultBoxes[i].type, i));
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={Styles.container}>
          <View style={Styles.balanceContainer}>
            <Text style={Styles.amountToAddContainer}>{`Your Brisik balance is $${balance}`}</Text>
          </View>

          <View style={{height: 50, marginTop: 10}}>
            <Text style={Styles.amountToAddContainer}>{'Amount to Add:'}</Text>
          </View>

          <View style={{flexDirection: 'row', flexWrap: 'wrap', width: '100%', backgroundColor: '#FF9800'}}>
            {viewBoxes}
          </View>
          {this._renderPaymentMethod()}
          <TouchableOpacity  style={Styles.bottomView} onPress={() => this._addFundsAction()}>
            <View>
                <Text style={Styles.addFundButtonText}>
                  ADD FUNDS
                </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

AddFunds.title = 'Add Funds';
AddFunds.id = 'com.eSportsGlobalGamers.AddFunds';

const mapStateToProps = ({product, user}) => {
  return {
    coins: product.coins,
    loading: product.loading,
    userData: user.userData,
    cardInfo: user.cardInfo,
    loadingCard: product.loadingCard
  };
};

const mapDispatchToProps = {
  retrievecardinfo: ProductActions.retrievecardinfo,
  deposit: ProductActions.createDeposit
};


export default connect(mapStateToProps, mapDispatchToProps)(AddFunds);
 