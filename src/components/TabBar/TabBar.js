import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import Styles from './TabBar.styles';

const TabBar = ({ tabs, action, active }) => {
  return (
    <View style={Styles.container}>
      { renderTabs(tabs, action, active) }
    </View>
  );
};

function renderTabs(tabs, action, active) {
  return tabs.map(({ key, legend }) => {
    const activeStyle = active === key ? Styles.tabActiveText : {};

    return (
      <TouchableOpacity onPress={() => { action(key); } } key={key} style={Styles.tab}>
        <Text style={[Styles.tabText, activeStyle]}>
          { legend.toUpperCase() }
        </Text>
      </TouchableOpacity>
    );
  });
}

TabBar.propTypes = {
  tabs: PropTypes.array.isRequired,
  action: PropTypes.func.isRequired,
  active: PropTypes.string
};

export default TabBar;