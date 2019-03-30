import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Styles from './ChallengeRulesHTP.styles';

class ChallengeRulesHTP extends Component {
  constructor(props) {
    super(props);

    this.tabs = [{ key: 'RULES', legend: 'rules'.toUpperCase() }, { key: 'HTP', legend: 'how to play'.toUpperCase() }];

    this.state = {
      tab: 'RULES'
    };

    this._renderRules = this._renderRules.bind(this);
    this._renderHTP = this._renderHTP.bind(this);
  }

  render() {
    return (
      <View style={Styles.container}>
        {this._renderTabs()}
        {this.state.tab === 'RULES' ? this._renderRules() : this._renderHTP()}
      </View>
    );
  }

  _renderTabs() {
    const tabs = this.tabs.map(({ key, legend }, i) => {
      return (
        <TouchableOpacity
          style={[Styles.tab, this.state.tab === key ? Styles.tabActive : null]}
          onPress={() => {
            this._changeTab(key);
          }}
          key={i}
        >
          <Text style={Styles.tabText}>
            {legend}
          </Text>
        </TouchableOpacity>
      );
    });

    return (
      <View style={Styles.tabs}>
        {tabs}
      </View>
    );
  }

  _renderRules() {
    return (
      <Text style={Styles.text}>
        {this.props.rules || `No rules available`}
      </Text>
    );
  }

  _renderHTP() {
    return (
      <Text style={Styles.text}>
        {this.props.htp || `No description available`}
      </Text>
    );
  }

  _changeTab(tab) {
    this.setState({ tab });
  }
}

export default ChallengeRulesHTP;
