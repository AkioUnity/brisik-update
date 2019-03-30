import { StyleSheet } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.montevideo
  },
  wrapper: {
    flex: 1,
    width: '80%',
    maxHeight: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative'
  },
  logo: {
    marginBottom: 20
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center'
  },
  label: {
    color: Colors.colonia
  },
  button: {
    width: '100%',
    marginBottom: 20
  },
  buttonWhite: {
    backgroundColor: Colors.colonia,
    borderColor: Colors.colonia,
    marginBottom: 0,
    marginTop: 10
  },
  buttonWhiteText: {
    color: Colors.montevideo
  }
});

export default Styles;