import { StyleSheet, Dimensions } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.montevideo,
    borderTopWidth: 1,
    borderTopColor: Colors.puntaDelEste,
    padding: 15
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  item: {
    width: (Dimensions.get('window').width - 55) / 2,
    marginBottom: 10
  }
});

export default Styles;
