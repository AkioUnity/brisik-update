import { StyleSheet, Platform, PixelRatio } from 'react-native';

import MakeAlphaColor from '../../utils/MakeAlphaColor';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import { GlobalStyles } from '../../styles/Globals';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  containerTopSection: {
    alignSelf: 'stretch'
  },
  containerBottomSection: {
    flex: 1
  },
  contentOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: MakeAlphaColor(Colors.maldonado, 8),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerUserInfo: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: -40
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  userInfoItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userInfoItemText: {
    paddingTop: Platform.select({
      ios: PixelRatio.get() <= 2 ? 3 : 2,
      android: PixelRatio.get() <= 2 ? 6 : 2
    }),
    fontFamily: Fonts.get('medium'),
    color: Colors.colonia,
    fontSize: PixelRatio.get() <= 2 ? 20 : 25
  },
  userInfoItemTextLeft: {
    fontFamily: Fonts.get('regular'),
    fontSize: PixelRatio.get() <= 2 ? 20 : 25,
    color: Colors.minas
  },
  userInfoItemTextRight: {
    fontFamily: Fonts.get('regular'),
    fontSize: PixelRatio.get() <= 2 ? 25 : 30
  },
  userInfoLeftIcon: {
    marginLeft: 5
  },
  userInfoRightIcon: {
    marginLeft: 0,
    marginTop: 7
  },
  containerSectionWithMargin: {
    marginVertical: 20
  },
  sectionDark: {
    backgroundColor: Colors.soriano
  },
  sectionTitle: {
    borderColor: Colors.tranqueras,
    borderBottomWidth: 1,
    paddingVertical: 5
  },
  sectionTitleText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 22,
    color: Colors.colonia,
    textAlign: 'center'
  },
  sectionBody: {
    paddingBottom: 15
  },
  sectionText: {
    fontSize: 14,
    color: Colors.colonia,
    textAlign: 'center',
    paddingVertical: 30,
    paddingHorizontal: 50,
    lineHeight: 17
  },
  sectionContent: {
    padding: 20
  },
  sectionContentRow: {
    flexDirection: 'row',
    marginHorizontal: Platform.OS === 'ios' ? 20 : 40
  },
  sectionContentRowText: {
    fontFamily: Fonts.get('medium'),
    fontSize: 18,
    color: Colors.colonia,
    textAlign: 'left',
    flex: 1
  },
  sectionContentRowSecondaryText: {
    fontFamily: Fonts.get('bold'),
    fontSize: 18,
    color: Colors.colonia,
    textAlign: 'right',
    flex: 0.4,
    marginLeft: 25
  },
  searchBarContainer: {
    flex: 1,
    paddingVertical: 10,
    shadowColor: Colors.maldonado,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    backgroundColor: Colors.montevideo,
    elevation: 3
  },
  searchBarResults: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30
  },
  searchBar: {
    backgroundColor: Colors.montevideo,
    paddingBottom: 5,
    marginBottom: 2
  },
  editBtn: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancelBioBtn: {
    position: 'absolute',
    left: 10,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  information: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20
  },
  placeholder: {
    fontFamily: Fonts.get('regular'),
    color: MakeAlphaColor(Colors.sanJose, 4)
  },
  userSearchResult: {
    backgroundColor: Colors.montevideo,
    height: 300
  },
  noContent: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noContentText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 16,
    color: MakeAlphaColor(Colors.colonia, 60)
  },
  bioInput: {
    height: 100,
    backgroundColor: Colors.soriano,
    margin: 10,
    padding: 10,
    color: Colors.colonia,
    fontSize: 14,
    textAlign: 'center'
  },
  saveButton: {
    fontFamily: Fonts.get('regular'),
    fontSize: 16,
    color: MakeAlphaColor(Colors.colonia, 90)
  },
  cancelBioButtonText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 16,
    color: MakeAlphaColor(Colors.tranqueras, 90)
  },
  userInfoItemTextMediaId: {
    fontFamily: Fonts.get('bold'),
    fontSize: 18,
    textAlign: 'right',
    flex: 1,
    color: Colors.sanJose,
    paddingRight: 5
  },
  itemValue: {
    fontFamily: Fonts.get('medium'),
    fontSize: 18,
    textAlign: 'right',
    flex: 1,
    color: Colors.sanJose,
    paddingRight: 5
  },
  item: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'stretch',
    marginHorizontal: Platform.OS === 'ios' ? 40 : 60,
    alignItems: 'center',
    height: 40,
    marginVertical: 5
  },
  itemTitle: {
    fontFamily: Fonts.get('medium'),
    fontSize: 18,
    width: 130,
    textAlign: 'left',
    color: Colors.sanJose
  },
  itemValueEditable: {
    backgroundColor: Colors.soriano,
    fontFamily: Fonts.get('regular')
  },
  wrapper: {
    flex: 1
  },
  sectionHeader: {
    backgroundColor: Colors.talas,
    height: 22,
    justifyContent: 'center',
    paddingLeft: 5
  },
  sectionHeaderText: {
    fontSize: 12,
    fontFamily: Fonts.get('regular'),
    color: MakeAlphaColor(Colors.colonia, 50),
    backgroundColor: 'transparent',
    letterSpacing: 1
  },
  containerTopSection: {
    alignSelf: 'stretch',
    padding: 20
  },
  containerBottomSection: {
    flex: 1
  },
  tabBar: {
    top: 0,
    height: 40,
    backgroundColor: Colors.soriano,
    shadowColor: Colors.maldonado,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    elevation: 3
  },
  tabBarItemText: {
    textAlign: 'center',
    fontFamily: Fonts.get('medium'),
    fontSize: Platform.select({
      ios: PixelRatio.get() <= 2 ? 14 : 18,
      android: 12
    }),
    color: Colors.colonia
  },
  tabBarItemTextSelected: {
    color: Colors.tranqueras
  },
  tabBarContent: {
    marginTop: 50
  },
  avatarContainer: {
    width: 70,
    height: 70
  },
  avatarImage: {
    width: 70,
    height: 70,
    borderRadius: Platform.select({
      ios: 35,
      android: 70
    }),
    overflow: 'hidden'
  },
  avatarPhotoCameraIcon: {
    bottom: 10,
    position: 'absolute',
    right: 10,
    marginLeft: -10
  },
  avatarLoaderContainer: {
    position: 'absolute',
    top: 7,
    right: 7,
    left: 7,
    bottom: 7,
    backgroundColor: MakeAlphaColor(Colors.maldonado, 6),
    borderRadius: Platform.select({
      ios: 50,
      android: 100
    }),
    overflow: 'hidden'
  },
  coverLoaderContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: MakeAlphaColor(Colors.maldonado, 6),
    overflow: 'hidden',
    zIndex: 99999
  },
  contentOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: MakeAlphaColor(Colors.maldonado, 8),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerUserInfo: {
    marginTop: 5,
    flex: 1
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  userInfoItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userInfoItemText: {
    paddingTop: Platform.select({
      ios: PixelRatio.get() <= 2 ? 3 : 2,
      android: PixelRatio.get() <= 2 ? 6 : 2
    }),
    fontFamily: Fonts.get('medium'),
    color: Colors.colonia,
    fontSize: PixelRatio.get() <= 2 ? 20 : 25
  },
  userInfoItemTextLeft: {
    fontFamily: Fonts.get('regular'),
    fontSize: PixelRatio.get() <= 2 ? 20 : 25,
    color: Colors.minas
  },
  userInfoItemTextRight: {
    fontFamily: Fonts.get('regular'),
    fontSize: PixelRatio.get() <= 2 ? 20 : 25
  },
  userInfoLeftIcon: {
    marginLeft: 5
  },
  userInfoRightIcon: {
    marginLeft: 0,
    marginTop: 7
  },
  containerSectionWithMargin: {
    marginVertical: 20
  },
  sectionDark: {
    backgroundColor: Colors.soriano
  },
  sectionTitle: {
    borderColor: Colors.tranqueras,
    borderBottomWidth: 1,
    paddingVertical: 5
  },
  sectionTitleText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 22,
    color: Colors.colonia,
    textAlign: 'center'
  },
  sectionText: {
    fontSize: 14,
    color: Colors.colonia,
    textAlign: 'center',
    paddingVertical: 30,
    paddingHorizontal: 50,
    lineHeight: 17
  },
  sectionContent: {
    padding: 20
  },
  sectionContentRow: {
    flexDirection: 'row',
    marginHorizontal: Platform.OS === 'ios' ? 20 : 40
  },
  sectionContentRowText: {
    fontFamily: Fonts.get('medium'),
    fontSize: 18,
    color: Colors.colonia,
    textAlign: 'left',
    flex: 1
  },
  sectionContentRowSecondaryText: {
    fontFamily: Fonts.get('bold'),
    fontSize: 18,
    color: Colors.colonia,
    textAlign: 'right',
    flex: 0.4,
    marginLeft: 25
  },
  searchBarContainer: {
    flex: 1,
    paddingVertical: 10,
    shadowColor: Colors.maldonado,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    backgroundColor: Colors.montevideo,
    elevation: 3
  },
  searchBarResults: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30
  },
  searchBar: {
    backgroundColor: Colors.montevideo,
    paddingBottom: 5,
    marginBottom: 2
  },
  information: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20
  },
  item: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'stretch',
    marginHorizontal: Platform.OS === 'ios' ? 40 : 60
  },
  itemTitle: {
    fontFamily: Fonts.get('medium'),
    fontSize: 18,
    width: 130,
    textAlign: 'left',
    color: Colors.sanJose,
    lineHeight: 40
  },
  itemValue: {
    fontFamily: Fonts.get('bold'),
    fontSize: 18,
    textAlign: 'right',
    flex: 1,
    height: 40,
    color: Colors.sanJose,
    alignSelf: 'flex-end',
    paddingHorizontal: 3,
    marginBottom: 3
  },
  itemValueEditable: {
    backgroundColor: Colors.soriano,
    fontFamily: Fonts.get('regular')
  },
  placeholder: {
    fontFamily: Fonts.get('regular'),
    fontStyle: 'italic',
    color: MakeAlphaColor(Colors.sanJose, 4)
  },
  userSearchResult: {
    backgroundColor: Colors.montevideo,
    height: 300
  },
  bottomButtons: {
    flexDirection: 'row',
    margin: GlobalStyles.generalMargin,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  bottomButton: {
    flex: 1
  },
  firstMargin: {
    marginRight: GlobalStyles.generalMargin
  },
  removeText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 20,
    color: Colors.tranqueras,
    margin: GlobalStyles.generalMargin,
    textAlign: 'center'
  },
  username: {
    color: Colors.colonia,
    fontSize: 24,
    fontFamily: Fonts.get('regular'),
    backgroundColor: 'transparent',
    letterSpacing: 1.19
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  locationText: {
    color: Colors.paysandu,
    fontSize: 13,
    fontFamily: Fonts.get('regular'),
    backgroundColor: 'transparent',
    letterSpacing: 0.72
  },
  locationIcon: {
    marginRight: 5
  },
  ratingsContainer: {
    marginTop: 10
  },
  ratingRow: {
    flexDirection: 'row'
  },
  ratingValue: {
    color: Colors.mercedes,
    marginRight: 5,
    fontSize: 14,
    fontFamily: Fonts.get('regular'),
    backgroundColor: 'transparent',
    letterSpacing: 0.58
  },
  ratingStatic: {
    fontSize: 14,
    fontFamily: Fonts.get('regular'),
    backgroundColor: 'transparent',
    letterSpacing: 0.58,
    color: Colors.paysandu
  },
  coinsContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end'
  },
  amountWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  coinShape: {
    width: 8,
    height: 8,
    borderRadius: Platform.OS === 'ios' ? 4 : 8,
    backgroundColor: Colors.minas,
    marginRight: 5
  },
  coinAmount: {
    color: Colors.fiat,
    fontSize: 28,
    fontFamily: Fonts.get('regular'),
    backgroundColor: 'transparent',
    textAlign: 'right'
  },
  row: {
    flexDirection: 'row'
  },
  button: {
    height: 28,
    width: 120,
    right: 0,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderTopWidth: 1,
    borderColor: Colors.cerroLargo,
    borderRadius: 20,
    marginBottom: 10,
    elevation: 0
  },
  selectText: {
    fontSize: 11,
    letterSpacing: 1,
    backgroundColor: 'transparent',
    flex: 1,
    lineHeight: 28
  },
  challengeItem: {
    backgroundColor: Colors.montevideo
  },
  buttonsContainer: {
    position: 'absolute',
    right: 20,
    bottom: 0,
    top: 20
  },
  buttonAdd: {
    backgroundColor: Colors.artigas,
    borderWidth: 0,
    borderTopWidth: 0
  },
  buttonChallenge: {
    backgroundColor: Colors.lasVegas,
    borderWidth: 0,
    borderTopWidth: 0
  },
  buttonChat: {
    borderColor: Colors.colonia 
  },
  eloTableHeader: {
    backgroundColor: MakeAlphaColor(Colors.talas, 40),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  eloTableHeading: {
    fontFamily: Fonts.get('light'),
    fontSize: 10,
    letterSpacing: 0.42,
    color: Colors.colonia,
    backgroundColor: 'transparent'
  },
  eloTableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: Colors.puntaDelEste
  },
  eloTableItem: {
    color: Colors.artigas,
    fontSize: 13,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.43,
    backgroundColor: 'transparent'
  },
  eloTableItemGame: {
    color: Colors.colonia
  },
  eloTableItemCentered: {
    textAlign: 'center'
  },
  eloTableItemBold: {
    fontFamily: Fonts.get('medium')
  },
  loadmoreButton: {
    height: 34,
    width: 180,
    marginTop: 20,
    alignSelf: 'center'
  }
});

export default Styles;
