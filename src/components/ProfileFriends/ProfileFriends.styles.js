import { StyleSheet, Platform, PixelRatio } from 'react-native';

import MakeAlphaColor from '../../utils/MakeAlphaColor';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 50
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
  userSearchResult: {
    backgroundColor: Colors.montevideo,
    height: 300
  },
  overShape: {
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute',
    top: 0,
    backgroundColor: 'transparent'
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 18,
    position: 'relative',
    borderBottomWidth: 1,
    borderColor: Colors.puntaDelEste,
    height: 45
  },
  itemTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  itemText: {
    backgroundColor: 'transparent',
    fontFamily: Fonts.get('regular'),
    fontSize: 14,
    color: Colors.artigas,
    marginLeft: 10,
    letterSpacing: 0.5,
    flex: 1
  }
});

export default Styles;
