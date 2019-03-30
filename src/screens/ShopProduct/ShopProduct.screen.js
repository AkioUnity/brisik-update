import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import * as Images from '../../utils/Images';
import { connect } from 'react-redux';
import ShopProductImageGallery from '../../components/ShopProductImageGallery/ShopProductImageGallery';
import ShopProductCounter from '../../components/ShopProductCounter/ShopProductCounter';
import ActionButton from '../../components/ActionButton/ActionButton';
import * as ProductActions from '../../actions/Product/Product.actions';
import Styles from './ShopProduct.styles';
import { ScreenNames } from '../';
import { NavigationEventsHandler, ModalNavStyle2 } from '../../utils/Navigator';

class ShopProduct extends Component {
  static navigatorStyle = ModalNavStyle2;
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
      quantity: 1
    };

    const navigatorEventsHandler = (event) => NavigationEventsHandler({
      screen: this.constructor.id,
      navigator: props.navigator, event
    });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._handleQuantity = this._handleQuantity.bind(this);
    this._addToCart = this._addToCart.bind(this);
  }

  render() {
    const { item, user } = this.props;
    return (
      <View style={Styles.container}>
        <ScrollView style={Styles.content} contentContainerStyle={Styles.scrollContent}>
          { item.productImages && item.productImages.length > 1
            ?
              (
                <ShopProductImageGallery>
                  {
                    item.productImages.map((image, i) => <Image
                      style={Styles.image} source={{uri: image.replace(/^http:/, 'https:')}}
                      resizeMode="cover" key={i} />)
                  }
                </ShopProductImageGallery>
              )
            :
              (
                <Image
                  style={[Styles.image, Styles.imageWithoutDots]}
                  source={{uri: item.productImages[0].replace(/^http:/, 'https:')}}
                  resizeMode="cover" />
              )
          }
          <Text style={Styles.name}>{ item.name }</Text>
          <View style={Styles.price}>
            <View style={Styles.coinShape} />
            <Text style={Styles.priceText}>{item.coinvalue}</Text>
          </View>
          <View style={Styles.actions}>
            <View style={Styles.quantity}>
              <ShopProductCounter handleQuantity={(value) => this._handleQuantity(value)}/>
            </View>
            <ActionButton title="purchase" style={Styles.button}
              onPress={() => user 
                ? this._addToCart()
                : this.props.navigator.showModal({
                  screen: ScreenNames.SignIn.id,
                  title: ScreenNames.SignIn.title.toUpperCase()
                })} />
          </View>
          <View style={Styles.description}>
            <Text style={Styles.descriptionTitle}>{ 'product details'.toUpperCase() }</Text>
            <View style={Styles.descriptionTitleUnderline} />
            <Text style={Styles.descriptionText}>{ item.description }</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
                
  _addToCart() {
    const { quantity } = this.state;
    const { item } = this.props;
    this.props.addCart({product: item, quantity});
    this.props.setCartMessage();
    this.props.navigator.push({
      screen: ScreenNames.Cart.id,
      title: ScreenNames.Cart.title.toUpperCase(),
      animated: true,
      backButtonTitle: ''
    });
  }

  _handleQuantity(value) {
    this.setState({
      quantity: value
    });
  }
}

ShopProduct.title = 'Shop';
ShopProduct.id = 'com.eSportsGlobalGamers.ShopProduct';

const mapStateToProps = ({ user, product }) => {
  return {
    user: user.userData,
    products: product.products,
    loadingProducts: product.loadingProducts
  };
};

const mapDispatchToProps = dispatch => ({
  addCart: (data) => dispatch(ProductActions.addCart(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopProduct);