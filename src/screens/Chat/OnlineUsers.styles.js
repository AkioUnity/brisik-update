import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.talas,
    borderTopWidth: 1,
    borderTopColor: Colors.puntaDelEste
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.puntaDelEste
  },
  name: {
    color: Colors.colonia,
    fontSize: 16,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.57
  },
  searchBarContainer: {
    paddingVertical: 5,
    backgroundColor: Colors.soriano,
    shadowColor: Colors.soriano,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    elevation: 3
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
  playersData: {
    flex: 1
  },
  challengeBtn: {
    width: 35,
    height: 35
  },
  chatBtnContainer: {
    flex: 0.12
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    height: Dimensions.get('window').height - 205,
    justifyContent: 'center',
    backgroundColor: Colors.montevideo
  },
  emptyIcon: {
    marginBottom: 10
  },
  emptyText: {
    color: Colors.paysandu,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    fontFamily: Fonts.get('light'),
    letterSpacing: 0.64
  }
});

export default Styles;

