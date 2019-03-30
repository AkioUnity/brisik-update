import { StyleSheet, Platform } from 'react-native';

import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: Platform.select({
      ios: 'transparent',
      android: 'rgba(50, 50, 50, 0.5)'
    })
  },
  title: {
    fontFamily: Fonts.get('regular'),
    fontSize: 20,
    color: Colors.maldonado,
    textAlign: 'center',
    backgroundColor: 'transparent',
    marginBottom: 10,
    letterSpacing: 0.5
  },
  legend: {
    textAlign: 'center',
    fontFamily: Fonts.get('light'),
    fontSize: 15,
    color: Colors.maldonado,
    justifyContent: 'center',
    letterSpacing: 0.19,
    lineHeight: 18,
    backgroundColor: 'transparent'
  },
  contentWrapper: {
    backgroundColor: Colors.colonia,
    padding: 25,
    width: 300
  },
  crossBtnContainer: {
    alignSelf: 'center'
  },
  verticalDivider: {
    height: 160
  },
  btnContainer: {
    marginTop: 15
  },
  btnContainerInline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  fullButton: {
    height: 40,
    marginVertical: 5
  },
  button: {
    height: 40,
    flex: 1,
    marginRight: 20
  },
  lastButton: {
    marginRight: 0
  },
  inputContainer: {
    position: 'relative'
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.seoul,
    height: 40,
    fontFamily: Fonts.get('regular'),
    fontSize: 14,
    letterSpacing: 0.5,
    backgroundColor: 'transparent',
    paddingLeft: 45
  },
  inputAddon: {
    position: 'absolute',
    top: 10,
    left: 10
  }
});

export default Styles;
