import React from 'react';
import { View, Dimensions } from 'react-native';
import Carousel from 'react-native-looped-carousel';
import Colors from '../../styles/Colors';

const { width } = Dimensions.get('window');

const ShopProductImageGallery = ({ children }) => {
  return (
    <View style={{ width, height: width, marginBottom: 35 }}>
      <Carousel
        style={{ width, height: width }}
        bullets
        bulletStyle={{ backgroundColor: Colors.florida, width: 6, height: 6, borderWidth: 0, margin: 5 }}
        chosenBulletStyle={{ backgroundColor: Colors.cabo, width: 6, height: 6, margin: 5 }}
        bulletsContainerStyle={{ top: 40, left: -10 }}
        autoplay={false}
       >
        { children }
      </Carousel>
    </View>
  );
};

export default ShopProductImageGallery;