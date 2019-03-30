import { StyleSheet, Dimensions, Platform } from 'react-native';

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
  subHeader: {
    height: 35,
    marginTop: 10,
    marginHorizontal: 15,
    backgroundColor: Colors.rosario,
    borderBottomWidth: 1,
    borderBottomColor: Colors.mercedes
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.salto,
    height: 40,
    paddingHorizontal: 10,
    borderTopColor: Colors.puntaDelEste,
    borderTopWidth: 1
  },
  tabText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 14,
    color: Colors.colonia,
    letterSpacing: 1,
    lineHeight: 18,
    marginRight: 5
  },
  page: {
    padding: 10,
    flex: 1
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  item: {
    marginBottom: 10
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadMoreBtn: {
    marginVertical: 10
  },
  searchBarTextInput: {
    height: Platform.select({
      ios: 30,
      android: 30
    }),
    color: Colors.colonia,
    fontSize: Platform.select({
      ios: 14,
      android: 16
    }),
    padding: 0,
    marginRight: 20
  },
  searchBarIcon: {
    position: 'absolute',
    right: 0,
    top: 3
  },
  categoryIcon: {
    width: 12,
    height: 7
  },
  legend: {
    textAlign: 'center',
    color: Colors.sanJose,
    fontSize: 18,
    fontFamily: Fonts.get('regular')
  },
  legendContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  categoriesContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 40,
    bottom: 40,
    zIndex: 1
  },
  listStyles: {
    width: Dimensions.get('window').width - 120,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1
  }
});

export default Styles;
