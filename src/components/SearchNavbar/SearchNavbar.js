import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import * as userActions from '../../actions/User/User.actions';
import SearchBar from '../SearchBar/SearchBar';

import Styles from './SearchNavbar.styles';

class SearchNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: ''
    };

    this._updateSearchValue = this._updateSearchValue.bind(this);
    this._cancel = this._cancel.bind(this);
    this._submitSearch = this._submitSearch.bind(this);
  }

  render() {
    return (
      <View style={Styles.navBarContainer}>
        <View style={Styles.searchContainer}>
          <SearchBar
            placeholder="Search by Username"
            onChange={this._updateSearchValue}
            defaultValue={this.state.searchValue}
            onSubmitEditing={this._submitSearch}
          />
        </View>
        <TouchableOpacity style={Styles.button} onPress={this._cancel}>
          <Text style={Styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _updateSearchValue(value) {
    this.setState({ searchValue: value });
  }

  _cancel() {
    this.props.navigator.pop({ animated: true });
  }

  _submitSearch() {
    const { searchValue } = this.state;

    if (searchValue) {
      this.props.handleSearch(this.state.searchValue);
    }
  }
}

SearchNavbar.id = 'com.eSportsGlobalGamers.SearchNavbar';
SearchNavbar.title = 'SearchNavbar';

export default SearchNavbar;