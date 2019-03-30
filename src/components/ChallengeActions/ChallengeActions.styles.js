import { StyleSheet } from 'react-native';
import { GlobalStyles } from '../../styles/Globals';
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';

const Styles = StyleSheet.create({
  actionButtonContainer: {
    flexDirection: 'row',
    margin: GlobalStyles.generalMargin,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 25
  },
  actionButton: {
    flex: 1
  },
  button: {
    flex: 1
  },
  firstMargin: {
    marginRight: GlobalStyles.generalMargin
  },
  cancelLabel: {
    fontSize: 12,
    color: Colors.paysandu,
    fontFamily: Fonts.get('regular'),
    backgroundColor: 'transparent',
    lineHeight: 16,
    textAlign: 'center'
  },
  bottomAtTop: {
    marginBottom: 12
  },
  button: {
    height: 34,
    width: 200,
    alignSelf: 'center'
  },
  buttonInline: {
    height: 34
  }
});

export default Styles;