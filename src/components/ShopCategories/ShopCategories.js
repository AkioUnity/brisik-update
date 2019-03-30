import React, { Component } from 'react';
import { Text, TouchableHighlight, ScrollView, View, Animated, Image } from 'react-native';
import { connect } from 'react-redux';

import * as Images from '../../utils/Images';
import Styles from './ShopCategories.styles';

class ShopCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fadeIn: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeIn,
      {
        toValue: 1,
        duration: 115
      }
    ).start();
  }

  render() {
    const { categories, filter, contentContainerStyle, listStyles } = this.props;

    return (
      <Animated.View style={[contentContainerStyle, { opacity: this.state.fadeIn }]}>
        <View style={Styles.overlay} />
        <ScrollView style={[Styles.scrollView, listStyles]}>
          { categories
            ? categories.map((item, key) => 
              item.label !== 'coins'
              ? <TouchableHighlight 
                  style={Styles.item}
                  key={key}
                  onPress={()=> filter === item.label ? this._closeModal('') : this._closeModal(item.label)} 
                  underlayColor="rgba(255,255,255,0)"
                >
                  <View style={Styles.categoryWrapper}>
                    <Text style={Styles.itemText}>{item.label}</Text>
                    {filter === item.label && <Image source={Images.categorySelected} resizeMode="contain" />}
                  </View>
                </TouchableHighlight>
              : null)
            : null
          }
          { !!filter &&
            <TouchableHighlight 
              style={Styles.item}
              onPress={() => this._closeModal('')}
              underlayColor="rgba(255,255,255,0)"
            >
              <View style={Styles.categoryWrapper}>
                <Text style={[Styles.itemText, Styles.itemTextBold]}>{ 'clear all' }</Text>
              </View>
            </TouchableHighlight> }
        </ScrollView>
      </Animated.View>
    );
  }

  _closeModal(category) {
    this.props.setCategory(category);
    this.props.closeModal();
  }
}

const mapStateToProps = ({ user, product }) => {
  return {
    user: user.userData,
    categories: product.categories
  };
};

export default connect(mapStateToProps, null)(ShopCategories);