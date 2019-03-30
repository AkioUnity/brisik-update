import { StyleSheet, PixelRatio, Dimensions, Platform } from 'react-native';
import { GlobalStyles } from '../../styles/Globals';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: Colors.puntaDelEste,
    backgroundColor: Colors.montevideo
  },
  containerContent: {
    flex: 1
  },
  videoAttached: {
    position: 'absolute',
    width: 20,
    height: 20,
    right: 45,
    top: 20,
    zIndex: 9999
  },
  pageTitle: {
    padding: 0,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: GlobalStyles.generalMargin
  },
  pageSubtitle: {
    padding: 0,
    margin: 0,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pageTitleText: {
    textAlign: 'center',
    color: Colors.colonia,
    fontFamily: Fonts.get('regular'),
    fontSize: 22
  },
  friendText: {
    textAlign: 'center',
    color: Colors.cerroLargo,
    fontFamily: Fonts.get('regular'),
    fontSize: 22
  },
  gameContent: {
    width: Dimensions.get('window').width
  },
  detailContent: {
    flex: 0.6,
    justifyContent: 'center'
  },
  inputContent: {
    marginTop: 20
  },
  formRow: {
    flexDirection: 'row',
    height: 60,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.puntaDelEste
  },
  formRowLabel: {
    flex: 1,
    justifyContent: 'center'
  },
  formRowLabelText: {
    fontSize: 14,
    color: Colors.colonia,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.5
  },
  formRowInput: {
    flex: 1
  },
  formInput: {
    height: 35,
    backgroundColor: Colors.montevideo,
    color: Colors.sanJose,
    fontSize: 16,
    padding: 5,
    marginHorizontal: GlobalStyles.generalMargin
  },
  actionButton: {
    width: 150,
    height: 35
  },
  radioLabel: {
    fontSize: 20,
    color: Colors.colonia,
    fontFamily: Fonts.get('medium'),
    lineHeight: 30
  },
  searchBar: {
    backgroundColor: Colors.montevideo,
    marginHorizontal: 10,
    height: 35,
    marginBottom: 2
  },
  overShape: {
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute',
    top: 0,
    backgroundColor: 'transparent'
  },
  radioButtonWrap: {
    alignItems: 'center'
  },
  textInput: {
    color: Colors.colonia,
    height: 35,
    padding: 5,
    marginRight: 10,
    textAlign: 'right',
    fontFamily: Fonts.get('regular'),
    fontSize: 14,
    letterSpacing: 0.5,
    alignSelf: 'stretch'
  },
  scrollView: { flex: 1, alignSelf: 'stretch' },
  radioContainer: {
    flexDirection: 'row'
  },
  formRowCoins: {},
  inputChevron: {
    position: 'absolute',
    width: 10,
    height: 10,
    right: 0,
    top: 12
  },
  buttonContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 0.2
  },
  opponentInput: {
    padding: 5,
    paddingTop: 8,
    marginRight: 10,
    textAlign: 'right',
    alignSelf: 'stretch',
    color: Colors.paysandu,
    fontSize: 14,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.5
  },
  opponentInputSet: {
    color: Colors.colonia
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 45,
    borderWidth: 1,
    borderColor: Colors.seoul,
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 10
  },
  modalItemText: {
    fontFamily: Fonts.get('regular'),
    backgroundColor: 'transparent',
    fontSize: 16,
    letterSpacing: 1,
    color: Colors.montevideo
  },
  modalItemBtn: {
    backgroundColor: Colors.artigas,
    borderRadius: Platform.select({
      ios: 20,
      android: 40
    }),
    width: 80,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalItemBtnText: {
    color: Colors.colonia,
    fontFamily: Fonts.get('regular'),
    backgroundColor: 'transparent',
    fontSize: 11,
    letterSpacing: 1
  }
});

export default Styles;
