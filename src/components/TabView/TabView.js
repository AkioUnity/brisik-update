import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Styles from './TabView.styles';

const TabView = props => {
  const { tabs, onPress, selected, activeLabel } = props;

  return (
    <View style={Styles.tabContainer}>
      {tabs.map((tab, i) => {
        const isSelected = selected === tab.key;

        return (
          <TouchableOpacity
            style={[Styles.tab, isSelected && Styles.activeTab]}
            onPress={() => onPress(tab, i)}
            key={`tabView_${i}`}>
            <Text style={[Styles.tabLabel, isSelected && activeLabel ? activeLabel : {}]}>
              {tab.title.toUpperCase()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabView;