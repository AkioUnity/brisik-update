import { StyleSheet } from 'react-native';

import Colors from '../../styles/Colors';

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    height: 40,
    alignItems: 'center',
    backgroundColor: Colors.salto,
    borderTopWidth: 1,
    borderTopColor: Colors.puntaDelEste
  },
  tab: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent'
  },
  activeTab: {
    borderBottomColor: Colors.durazno
  },
  tabLabel: {
    color: Colors.colonia,
    fontSize: 14,
    textAlign: 'center',
    letterSpacing: 1
  }
});

export default styles;
