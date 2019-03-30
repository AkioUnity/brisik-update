import { StyleSheet, PixelRatio, Platform } from 'react-native';
import { GlobalStyles } from '../../styles/Globals';
import Colors from '../../styles/Colors';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.montevideo,
    borderTopWidth: 1,
    borderTopColor: Colors.puntaDelEste
  },
  containerContainer: {
    marginTop: 40,
    marginHorizontal: 40,
    alignItems: 'center'
  },
  formContainer: {
    marginTop: 50
  },
  formInput: {
    flex: 1,
    height: 40,
    backgroundColor: Colors.florida,
    color: Colors.colonia,
    fontSize: 16,
    padding: 5,
    paddingLeft: 20
  },
  formSeparator: {
    height: 10
  },
  formSubmitContainer: {
    marginTop: 20,
    marginBottom: 10,
    width: '100%'
  },
  formLegendText: {
    fontSize: 16,
    color: Colors.colonia,
    marginBottom: Platform.OS === 'ios' ? 5 : PixelRatio.get() <= 2 ? 60 : 5,
    textAlign: 'center'
  },
  logo: {
    marginTop: GlobalStyles.darkLogo
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.florida
  },
  inputShape: {
    marginLeft: 13
  },
  button: {
    height: 40
  }
});

export default Styles;
