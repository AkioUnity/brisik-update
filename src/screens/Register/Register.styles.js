import { StyleSheet, Platform } from 'react-native';
import { GlobalStyles } from '../../styles/Globals';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import MakeAlphaColor from '../../utils/MakeAlphaColor';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.montevideo,
    borderTopWidth: 1,
    borderTopColor: Colors.puntaDelEste,
    position: 'relative'
  },
  formContainer: {
    // padding: GlobalStyles.generalMargin,
    flex: 1,
    alignItems: 'center',
    // paddingHorizontal: 40,
    backgroundColor: 'transparent'
  },
  formGroupTitleText: {
    fontFamily: Fonts.get('regular'),
    color: Colors.colonia,
    fontSize: 22,
    textAlign: 'center',
    marginTop: 18
  },
  formGroupSubTitleText: {
    fontFamily: Fonts.get('regular'),
    color: Colors.paysandu,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10
  },
  formInputLabel: {
    fontSize: 16,
    color: Colors.colonia,
    marginBottom: 5
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
    marginBottom: Platform.OS === 'ios' ? 10 : 20,
    width: '100%'
  },
  formLegendText: {
    fontSize: 16,
    color: Colors.colonia,
    marginBottom: 5,
    textAlign: 'center',
    textDecorationLine: 'underline'
  },
  logo: {
    position: 'absolute',
    bottom: -90,
    left: -40
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
  inputMailShape: {
    marginLeft: 10
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15
  },
  step: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: Colors.paysandu,
    backgroundColor: 'transparent',
    borderRadius: Platform.select({
      ios: 5,
      android: 10
    }),
    marginHorizontal: 2.5,
    overflow: 'hidden'
  },
  stepActive: {
    backgroundColor: Colors.seoul,
    width: 10,
    height: 10
  },
  uploadWrapper: {
    alignItems: 'center',
    position: 'relative'
  },
  uploadButton: {
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderWidth: 1,
    borderColor: Colors.cerroLargo,
    borderRadius: 50,
    width: 180,
    height: 30,
    marginTop: 10
  },
  uploadButtonText: {
    fontSize: 11,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 1.1
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  loaderPicture: {
    position: 'absolute',
    width: 100,
    height: 100,
    backgroundColor: MakeAlphaColor(Colors.maldonado, 6),
    borderRadius: Platform.select({
      ios: 50,
      android: 100
    }),
    overflow: 'hidden'
  },
  terms: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  termsText: {
    color: Colors.colonia,
    fontSize: 12,
    fontFamily: Fonts.get('regular'),
    lineHeight: 16,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  termsLink: {
    color: Colors.colonia,
    fontSize: 12,
    fontFamily: Fonts.get('regular'),
    lineHeight: 16,
    textDecorationLine: 'underline',
    textAlign: 'center',
    backgroundColor: 'transparent',
    marginHorizontal: 5
  },
  button: {
    height: 40
  }
});

export default Styles;
