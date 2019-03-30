import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { SingleNavStyle, NavigationEventsHandler } from '../../utils/Navigator';
import BuyCoinsItem from '../../components/BuyCoinsItem/BuyCoinsItem';
import * as ProductActions from '../../actions/Product/Product.actions';
import Loader from '../../components/Loader/Loader';
import { ScreenNames } from '../';
import Styles from './BuyCoins.styles';

class BuyCoins extends Component {
  static navigatorStyle = SingleNavStyle;

  constructor(props) {
    super(props);

    const navigatorEventsHandler = (event) => NavigationEventsHandler({
      screen: this.constructor.id,
      navigator: props.navigator, event
    });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);
  }

  componentWillMount() {
    this.props.getCoins();
  }

  render() {
    if (this.props.loading || !this.props.coins) {
      return <Loader />;
    }
    return (
      <View style={Styles.container}>
        <ScrollView style={Styles.page}>
          <View style={Styles.content}>
            { this.props.coins.map((item, i) => {
              return (
                <TouchableOpacity key={i} style={Styles.item} 
                  onPress={() => {
                    this.props.navigator.push({
                      screen: ScreenNames.CoinsCart.id,
                      title: ScreenNames.CoinsCart.title.toUpperCase(),
                      backButtonTitle: '',
                      passProps: {
                        coinPack: { ...item }
                      }
                    });
                  }}>
                  <BuyCoinsItem {...item} />
                </TouchableOpacity>
              );
            }) }
          </View>
        </ScrollView>
      </View>
    );
  }
}

BuyCoins.title = 'Buy Coins';
BuyCoins.id = 'com.eSportsGlobalGamers.BuyCoins';

const mapStateToProps = ({ product }) => {
  return {
    coins: product.coins,
    loading: product.loading
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCoins: () => dispatch(ProductActions.getCoins())
});


export default connect(mapStateToProps, mapDispatchToProps)(BuyCoins);
