import { StyleSheet, Platform, PixelRatio } from 'react-native';

import Colors from '../../styles/Colors';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  checkboxWrapper: {
    flexDirection: 'row',
    marginVertical: 5
  },
  checkbox: {
    height: 20,
    width: 20,
    backgroundColor: Colors.colonia,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkboxSelected: {
    height: 16,
    width: 16,
    backgroundColor: Colors.durazno
  },
  checkboxLabelWrapper: {
    alignSelf: 'center',
    marginLeft: 7
  },
  checkboxLabel: {
    color: Colors.colonia,
    lineHeight: 20,
    fontSize: Platform.OS === 'ios' ? (PixelRatio.get() <= 2 ? 12 : 18) : PixelRatio.get() <= 2 ? 12.5 : 15
  }
});

export default Styles;
