import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Styles from './BuyCoinsItem.styles';

class BuyCoinsItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageWidth: 0,
      imageHeight: 0
    };
  }

  render() {
    return (
      <View style={Styles.container} onLayout={(event) => {
        this.setState({
          imageWidth: event.nativeEvent.layout.width,
          imageHeight: event.nativeEvent.layout.height-60});
      }}>
        <Image style={[Styles.image, {width: this.state.imageWidth, height: this.state.imageHeight}]}
          source={{ uri: this.props.productImageUrl.replace(/^http:/, 'https:') }} resizeMode="cover" />
        <View style={Styles.textContainer}>
          <Text style={Styles.text}>
            { `${this.props.coinreward} coins` } 
          </Text>
          <Text style={Styles.priceText}>${this.props.price}</Text>
        </View>
      </View>
    );
  }
}

export default BuyCoinsItem;
