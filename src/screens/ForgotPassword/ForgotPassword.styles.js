import { StyleSheet, Dimensions } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import { GlobalStyles } from '../../styles/Globals';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.montevideo,
    borderTopWidth: 1,
    borderTopColor: Colors.puntaDelEste,
    position: 'relative'
  },
  contentContainer: {
    height: Dimensions.get('window').height,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 40
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.florida
  },
  buttonContainer: {
    flex: 1,
    marginTop: 20
  },
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: Colors.florida,
    color: Colors.colonia,
    fontSize: 16,
    padding: 5,
    paddingLeft: 20
  },
  titleText: {
    color: Colors.sanJose,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: Fonts.get('regular'),
    marginVertical: 10
  },
  inputShape: {
    marginLeft: 13
  },
  title: {
    fontFamily: Fonts.get('regular'),
    color: Colors.paysandu,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 30
  },
  logo: {
    position: 'absolute',
    bottom: -70,
    left: -40
  },
  button: {
    height: 40
  }
});

export default Styles;
