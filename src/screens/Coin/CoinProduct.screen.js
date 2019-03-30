import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { SingleNavStyle, NavigationEventsHandler } from '../../utils/Navigator';
import ActionButton from '../../components/ActionButton/ActionButton';
import Styles from './CoinProduct.styles';
import { ScreenNames } from '../';

class CoinProduct extends Component {
  static navigatorStyle = SingleNavStyle;

  constructor(props) {
    super(props);
    
    const navigatorEventsHandler = (event) => NavigationEventsHandler({
      screen: this.constructor.id,
      navigator: props.navigator, event
    });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);
  }

  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.topShadow} />
        <ScrollView style={Styles.content} contentContainerStyle={Styles.scrollContent}>
          <Text style={Styles.name} resizeMode="contain">{ this.props.name.toUpperCase() }</Text>
          <View style={Styles.imageContainer}>
            <Image style={Styles.image} resizeMode="contain" 
              source={{ uri: this.props.productImageUrl.replace(/^http:/, 'https:') }}/>
          </View>
          <View style={Styles.price}>
          <Text style={Styles.priceText}>U$D {this.props.price}</Text>
          </View>
          <View style={Styles.description}>
            <Text style={Styles.descriptionTitle}>{ 'Product Description'.toUpperCase() }</Text>
            <Text style={Styles.descriptionText}>{ this.props.description }</Text>
          </View>
        </ScrollView>
        <View style={Styles.actions}>
          <ActionButton title="Buy now" style={Styles.button} 
            onPress={() => {
              this.props.navigator.push({
                screen: ScreenNames.Checkout.id,
                title: ScreenNames.Checkout.title,
                backButtonTitle: '',
                animated: true,
                passProps: {productId: this.props._id, stack: this.props.stack}
              });}} />
        </View>
      </View>
    );
  }
}

CoinProduct.title = 'Detail';
CoinProduct.id = 'com.eSportsGlobalGamers.CoinProduct';

export default connect()(CoinProduct);