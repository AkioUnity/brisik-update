import { StyleSheet, PixelRatio, Platform } from 'react-native';
import { GlobalStyles } from '../../styles/Globals';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.soriano
  },
  topShadow: {
    shadowColor: Colors.maldonado,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    elevation: 3,
    height: 10,
    position: 'absolute',
    top: -10,
    right: 0,
    left: 0
  },
  containerContainer: {
    marginTop: 30,
    margin: GlobalStyles.generalMargin
  },
  formContainer: {
    marginTop: 50
  },
  formInputLabel: {
    fontSize: 16,
    color: Colors.colonia,
    marginBottom: 5,
    marginTop: 10
  },
  formInput: {
    fontFamily: Fonts.get('regular'),
    height: 35,
    backgroundColor: Colors.montevideo,
    color: Colors.sanJose,
    fontSize: 16,
    padding: 5
  },
  formSeparator: {
    marginVertical: 10
  },
  formSubmitContainer: {
    marginTop: 50,
    marginBottom: 20
  },
  formLegendText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 16,
    color: Colors.colonia,
    marginBottom: Platform.OS === 'ios' ? 5 : PixelRatio.get() <= 2 ? 60 : 5,
    textAlign: 'center',
    textDecorationLine: 'underline'
  }
});

export default Styles;
