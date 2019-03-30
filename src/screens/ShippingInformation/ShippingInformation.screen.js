import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { connect } from 'react-redux';
import Colors from '../../styles/Colors';
import ActionButton from '../../components/ActionButton/ActionButton';
import Loader from '../../components/Loader/Loader';
import Styles from './ShippingInformation.styles';
import * as UserActions from '../../actions/User/User.actions';
import { ModalNavStyle } from '../../utils/Navigator';
import { PickerModal } from '../../components/Modals/Modals';
import { statesUSA } from '../../utils/Utils';
import { backButton } from '../../utils/Images';
import { NavigationEventsHandler } from '../../utils/Navigator';
import { ScreenNames } from '../../screens';

class ShippingInformation extends Component {
  static navigatorStyle = ModalNavStyle;
  static navigatorButtons = {
    leftButtons: [{
      icon: backButton,
      id: '@nav/editConfirm',
      disableIconTint: true
    }],
    rightButtons: []
  };

  constructor(props) {
    super(props);

    this.state = {
      form: {
        firstName: {
          key: 'firstName',
          value: ''
        },
        lastName: {
          key: 'lastName',
          value: ''
        },
        address: {
          key: 'address',
          value: ''
        },
        state: {
          key: 'state',
          value: ''
        },
        postalCode: {
          key: 'postalCode',
          value: ''
        },
        phoneNumber: {
          key: 'phoneNumber',
          value: ''
        }
      }
    };

    this.dataSource = {
      state: statesUSA.map(item => {
        return {
          label: item.name,
          value: item.name
        };
      })
    };

    this.inputs = {};

    const navigatorEventsHandler = (event) => NavigationEventsHandler({
      screen: this.constructor.id,
      navigator: props.navigator, event
    });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._updateValue = this._updateValue.bind(this);
    this._submit = this._submit.bind(this);
    this._renderPicker = this._renderPicker.bind(this);
  }

  componentDidMount() {
    if (this.props.userData.shippingAddress) {
      const { shippingAddress } = this.props.userData;
      const { firstName, lastName, address, state, postalCode, phoneNumber } = this.state;

      const form = {
        firstName: {
          ...firstName,
          value: shippingAddress.firstName
        },
        lastName: {
          ...lastName,
          value: shippingAddress.lastName
        },
        address: {
          ...address,
          value: shippingAddress.address
        },
        state: {
          ...state,
          value: shippingAddress.state
        },
        postalCode: {
          ...postalCode,
          value: shippingAddress.postalCode
        },
        phoneNumber: {
          ...phoneNumber,
          value: shippingAddress.phoneNumber
        }
      };

      this.setState({ form: form });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loadingAddress && nextProps.loadingAddress !== this.props.loadingAddress) {
      return setTimeout(() => this.props.navigator.pop({ animated: true }), 100);
    }
  }

  render() {
    const { firstName, lastName, address, state, postalCode, phoneNumber } = this.state.form;
    const { userData, loadingAddress } = this.props;
    const formCompleted = firstName.value !== '' && lastName.value !== '' && address.value !== ''
      && state.value !== '' && postalCode.value !== '' && phoneNumber.value !== '';

    if (loadingAddress) {
      return <Loader />;
    }

    return (
      <View style={Styles.container}>
        <KeyboardAwareScrollView
          getTextInputRefs={() => Object.values(this.inputs)}
          scrollToInputAdditionalOffset={90}
        >
          <View>
            <View style={Styles.formContainer}>
              <View style={Styles.formRow}>
                <TextInput
                  ref={input => (this.inputs.firstName = input)}
                  style={Styles.formInput}
                  autoCorrect={false}
                  returnKeyType="next"
                  autoCapitalize="sentences"
                  clearButtonMode="while-editing"
                  keyboardAppearance="dark"
                  underlineColorAndroid="transparent"
                  onSubmitEditing={() => this.inputs.lastName.focus()}
                  value={firstName.value}
                  onChangeText={text => this._updateValue('firstName', text)}
                  selectionColor={Colors.durazno}
                  placeholder="First Name"
                  placeholderTextColor={Colors.paysandu}
                />
                <View style={Styles.formVerticalSeparator} />
                <TextInput
                  ref={input => (this.inputs.lastName = input)}
                  style={Styles.formInput}
                  autoCorrect={false}
                  returnKeyType="next"
                  autoCapitalize="sentences"
                  clearButtonMode="while-editing"
                  keyboardAppearance="dark"
                  underlineColorAndroid="transparent"
                  onSubmitEditing={() => this.inputs.address.focus()}
                  value={lastName.value}
                  onChangeText={text => this._updateValue('lastName', text)}
                  selectionColor={Colors.durazno}
                  placeholder="Last Name"
                  placeholderTextColor={Colors.paysandu}
                />
              </View>
              <View style={Styles.formSeparator} />
              <TextInput
                ref={input => (this.inputs.address = input)}
                style={Styles.formInput}
                autoCorrect={false}
                returnKeyType="next"
                autoCapitalize="sentences"
                clearButtonMode="while-editing"
                keyboardAppearance="dark"
                underlineColorAndroid="transparent"
                onSubmitEditing={() => this.inputs.postalCode.focus()}
                value={address.value}
                onChangeText={text => this._updateValue('address', text)}
                selectionColor={Colors.durazno}
                placeholder="Street Address"
                placeholderTextColor={Colors.paysandu}
              />
              <View style={Styles.formSeparator} />
              <View style={Styles.formRow}>
                <TextInput
                  ref={input => (this.inputs.postalCode = input)}
                  style={Styles.formInput}
                  autoCorrect={false}
                  returnKeyType="next"
                  clearButtonMode="while-editing"
                  keyboardAppearance="dark"
                  keyboardType="numeric"
                  autoCapitalize="sentences"
                  value={postalCode.value}
                  onChangeText={text => this._updateValue('postalCode', text)}
                  selectionColor={Colors.durazno}
                  underlineColorAndroid="transparent"
                  placeholder="Zip"
                  placeholderTextColor={Colors.paysandu}
                />
                <View style={Styles.formVerticalSeparator} />
                <TouchableOpacity
                  onPress={() => this.setState({ modal: 'state' }, Keyboard.dismiss)}
                  style={Styles.select}
                >
                  <Text style={[Styles.selectValue, !state.value ? Styles.placeholder : {}]}>
                    {state.value || 'State'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={Styles.formSeparator} />
              <TextInput
                ref={input => (this.inputs.phoneNumber = input)}
                style={Styles.formInput}
                autoCorrect={false}
                returnKeyType="next"
                clearButtonMode="while-editing"
                keyboardAppearance="dark"
                keyboardType="numeric"
                onSubmitEditing={this._submit}
                value={phoneNumber.value}
                onChangeText={text => this._updateValue('phoneNumber', text)}
                selectionColor={Colors.durazno}
                underlineColorAndroid="transparent"
                placeholder="Phone Number"
                placeholderTextColor={Colors.paysandu}
              />
            </View>
          </View>
          {this.state.modal && this._renderPicker(this.state.modal)}
        </KeyboardAwareScrollView>
        <View style={Styles.formSubmitContainer}>
          <ActionButton
            title="done"
            type={!formCompleted ? 'dark' : ''}
            onPress={this._submit}
          />
        </View>
      </View>
    );
  }

  _renderPicker(type) {
    return (
      <PickerModal
        onPressOutside={() => this.setState({ modal: null })}
        data={this.dataSource[type]}
        value={this.state.form[type].value}
        onValueChange={data => this._onModalValueChange(type, data)}
      />
    );
  }

  _onModalValueChange(type, data) {
    let { form } = this.state;
    form[type].value = data;
    this.setState({ form });
  }

  _updateValue(inputName, inputValue) {
    let { form } = this.state;

    form[inputName].value = inputValue;
    this.setState({ form });
  }

  _submit() {
    const { form } = this.state;
    let newForm = {};
    for (let key in form) {
      if (form[key].value === '') {
        this.props.navigator.showLightBox({
          screen: ScreenNames.GeofenceRestriction.id,
          title: '',
          style: {
           backgroundBlur: 'dark',
           backgroundColor: 'rgba(50, 50, 50, 0.2)'
          },
          passProps: {
            title: 'Error',
            message: 'Please complete all the fields',
            handleClose: () => this.props.navigator.dismissLightBox()
          }
        });
        return;
      } else if (key === 'state') {
        const stateIndex = statesUSA.findIndex(state => state.name === form[key].value);
        newForm[key] = stateIndex !== -1 ? statesUSA[stateIndex].abbreviation : form[key].value;
      } else {
        newForm[key] = form[key].value;
      }
    }
    this.props.addAddress({ shippingAddress: newForm });
  }
}

ShippingInformation.id = 'com.eSportsGlobalGamers.ShippingInformation';
ShippingInformation.title = 'Shipping';

const mapStateToProps = ({ product, user }) => {
  return {
    cart: product.cart,
    userData: user.userData,
    loadingAddress: user.loadingAddress
  };
};

const mapDispatchToProps = dispatch => ({
  addAddress: data => dispatch(UserActions.addAddress(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShippingInformation);
