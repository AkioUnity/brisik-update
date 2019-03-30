import { StyleSheet, Platform } from 'react-native';

import Colors from '../../styles/Colors';

const Styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  contentCentered: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    backgroundColor: Colors.colonia,
    height: Platform.OS === 'ios' ? 200 : 100,
    width: 260,
    marginTop: 0,
    shadowColor: Colors.maldonado,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    elevation: 3
  },
  actionsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.colonia,
    height: 40,
    borderTopWidth: 1,
    borderTopColor: Colors.cerroLargo
  },
  actionsContainerButton: {
    flex: 1,
    height: 40,
    width: 250 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsContainerButtonText: {
    color: Colors.montevideo,
    textAlign: 'center'
  }
});

export default Styles;
