import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { ScreenNames } from '../';
import { connect } from 'react-redux';
import ShopProduct from '../../components/ShopProduct/ShopProduct';
import Loader from '../../components/Loader/Loader';
import * as ProductActions from '../../actions/Product/Product.actions';
import * as CommonActions from '../../actions/Common/Common.actions';
import Styles from './Shop.styles';
import Colors from '../../styles/Colors';
import { NavigationEventsHandler, ModalNavStyle2 } from '../../utils/Navigator';
import * as Images from '../../utils/Images';
import ActionButton from '../../components/ActionButton/ActionButton';
import Alert from '../../components/Alert/Alert';
import Categories from '../../components/ShopCategories/ShopCategories';

class Shop extends Component {
  static navigatorStyle = ModalNavStyle2;
  static navigatorButtons = {};

  constructor(props) {
    super(props);

    this.state = {
      searchName: '',
      filter: '',
      showCategories: false
    };

    const navigatorEventsHandler = (event) => NavigationEventsHandler({
      screen: this.constructor.id,
      navigator: props.navigator, event
    });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._updateValue = this._updateValue.bind(this);
    this._submit = this._submit.bind(this);
    this._setCategory = this._setCategory.bind(this);
    this._showProducts = this._showProducts.bind(this);
    this._setCartMessage = this._setCartMessage.bind(this);
    this._toggleCategories = this._toggleCategories.bind(this);
  }

  componentDidMount() {
    if (!this.props.products) {
      this.props.getProducts();
      this.props.getCategories();
    }
  }

  render() {
    const { loadingProducts, user, cart, lastpage, products } = this.props;
    const { filter, showCategories } = this.state;
    const isLastPage = lastpage && parseInt(lastpage.page) === lastpage.pages;

    if (!products || loadingProducts) {
      return <Loader />;
    }

    return (
      <View style={Styles.container}>
        <View style={Styles.header}>
          <TouchableOpacity style={Styles.categories} onPress={this._toggleCategories}>
            <Text style={Styles.tabText}>{ filter === '' ? 'Categories'.toUpperCase() : filter.toUpperCase() }</Text>
            <Image source={Images.chevronDownRed} style={Styles.categoryIcon}/>
          </TouchableOpacity>
        </View>
        {showCategories &&
          <Categories
            contentContainerStyle={Styles.categoriesContainer}
            setCategory={this._setCategory}
            filter={filter}
            navigator={this.props.navigator}
            listStyles={Styles.listStyles}
            closeModal={this._toggleCategories}
          />
        }
        <ScrollView style={Styles.page}>
          { this._showProducts() }
          { !isLastPage && 
            <ActionButton title="Load More" style={Styles.loadmoreButton} type='dark' loading={loadingProducts}
              onPress={() => {
                this.props.getProducts(parseInt(lastpage.page)+1);
              }} />}
        </ScrollView>
      </View>
    );
  }

  _toggleCategories() {
    this.setState({ showCategories: !this.state.showCategories });
  }

  _submit() {
    this.props.searchProduct(this.state.searchName);
  }
  
  _updateValue(inputValue) {
    this.setState({ searchName: inputValue });
  }

  _showProducts() {
    const { products } = this.props;
    const { filter } = this.state;
    if (!products) {
      return null;
    }
    return(
      <View style={Styles.content}>
          { products.docs.map((item, i) => {
            return (
              (item.category !== 'coins' && (item.category === filter || filter === ''))
              ? <TouchableOpacity key={i} style={Styles.item} 
                  onPress={() => 
                    this.props.navigator.push({
                      screen: ScreenNames.ShopProduct.id,
                      title: ScreenNames.ShopProduct.title.toUpperCase(),
                      backButtonTitle: '',
                      passProps: {
                        setCartMessage: this._setCartMessage,
                        item
                      }
                    })
                  }
                >
                  <ShopProduct {...item} />
                </TouchableOpacity>
              : null 
            );
          })}
        {
          products.docs.length < 1 &&
            <View style={Styles.legendContainer}>
              <Text style={Styles.legend}>
                No products was found for your search
              </Text>
            </View>
        }
      </View>
    );
  }

  _setCategory(category) {
    this.setState({
      filter: category
    });
  }

  _setCartMessage() {
    this.props.setErrorMessage({ show: true, message: 'Added to cart succesfully!' });
  }
}

Shop.title = 'Shop';
Shop.id = 'com.eSportsGlobalGamers.Shop';

const mapStateToProps = ({ user, product, common }) => {
  return {
    user: user.userData,
    products: product.products,
    cart: product.cart,
    loadingProducts: product.loadingProducts,
    lastpage: product.shopLastPage,
    errorMessage: common.errorMessage
  };
};

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(ProductActions.getProducts()),
  getCategories: () => dispatch(ProductActions.getCategories()),
  searchProduct: (data) => dispatch(ProductActions.search(data)),
  setErrorMessage: (data) => dispatch(CommonActions.setErrorMessage(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
