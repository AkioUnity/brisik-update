import { StyleSheet } from 'react-native';

import Colors from '../../styles/Colors';

const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  circularProgressContainer: {
    backgroundColor: 'transparent'
  },
  withShadow: {
    shadowColor: Colors.maldonado,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5
  }
});

export default Styles;
