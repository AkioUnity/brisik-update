import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, TextInput, Text, TouchableOpacity } from 'react-native';
import Colors from '../../styles/Colors';
import Styles from './SearchBar.styles';
import * as Images from '../../utils/Images';
import MakeAlphaColor from '../../utils/MakeAlphaColor';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);
    this.clearText = this.clearText.bind(this);
  }

  render() {
    return (
      <View style={Styles.searchBarInputContainer}>
        <TextInput
          ref={ref => this._textInput = ref}
          placeholder={this.props.placeholder}
          autoCapitalize="none"
          placeholderTextColor={MakeAlphaColor(Colors.colonia, 50)}
          selectionColor={Colors.durazno}
          style={Styles.searchBarTextInput}
          returnKeyType="search"
          autoCorrect={false}
          underlineColorAndroid={'transparent'}
          onChangeText={this._onChange}
          value={this.props.defaultValue}
          {...this.props}
        />
        <Image style={Styles.searchBarIcon} source={Images.searchIcon} />
        {this.props.showClearBtn &&
          <TouchableOpacity style={Styles.clearSearchBtn} onPress={this.clearText}>
            <Text style={Styles.clearSearch}>{'cancel'.toUpperCase()}</Text>
          </TouchableOpacity>}
      </View>
    );
  }

  _onChange(value) {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(value);
    }
  }

  _handleSearchClear() {
    const cleared = '';

    if (typeof this.searchBar !== 'undefined' && typeof this.props.onChange === 'function') {
      this.props.onChange(cleared);
      this.searchBar.clear();
    }
  }

  clearText() {
    this._textInput.setNativeProps({text: ''});
  }
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

export default SearchBar;
