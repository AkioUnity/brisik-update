import { StyleSheet, Platform, PixelRatio } from 'react-native';
import { GlobalStyles } from '../../styles/Globals';
import MakeAlphaColor from '../../utils/MakeAlphaColor';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.montevideo,
    borderBottomWidth: 1,
    borderBottomColor: Colors.puntaDelEste,
    marginBottom: 49
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
  locationText: {
    color: Colors.paysandu,
    fontSize: 13,
    fontFamily: Fonts.get('regular'),
    backgroundColor: 'transparent',
    letterSpacing: 0.72
  },
  ratingsContainer: {
    marginTop: 5
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
    alignItems: 'flex-end'
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
    color: Colors.minas,
    fontSize: 28,
    fontFamily: Fonts.get('regular'),
    backgroundColor: 'transparent',
    textAlign: 'right'
  },
  row: {
    flexDirection: 'row'
  },
  button: {
    position: 'absolute',
    height: 28,
    width: 120,
    right: 0,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderTopWidth: 1,
    borderColor: Colors.cerroLargo,
    borderRadius: 20
  },
  selectText: {
    fontSize: 11,
    letterSpacing: 1
  },
  modalContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 250
  },
  buttonsContainer: {
    backgroundColor: MakeAlphaColor(Colors.florida, 95),
    padding: 10
  },
  modalBtn: {
    backgroundColor: Colors.cerroLargo,
    height: 45,
    width: '100%',
    borderRadius: 10,
    borderTopWidth: 0,
    marginBottom: 7
  },
  modalBtnText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 16,
    color: Colors.colonia,
    backgroundColor: 'transparent',
    letterSpacing: 1
  },
  modalBtnCancel: {
    backgroundColor: Colors.puntaDelEste,
    marginBottom: 0
  },
  unfriend: {
    marginBottom: 2,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  blockFriend: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  }
});

export default Styles;
