import { StyleSheet, pixelRatio, Platform } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import MakeAlphaColor from '../../utils/MakeAlphaColor';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.montevideo,
    borderTopWidth: 1,
    borderTopColor: Colors.puntaDelEste
  },
  scrollView: {
    flex: 1
  },
  list: {
    alignItems: 'center'
  },
  noCoinText: {
    textAlign: 'center',
    fontFamily: Fonts.get('regular'),
    fontSize: 25,
    color: Colors.sanJose,
    marginTop: 100
  },
  newAddress: {
    marginTop: 15
  },
  newTitle: {
    textAlign: 'center',
    fontFamily: Fonts.get('regular'),
    fontSize: 20,
    color: Colors.sanJose
  },
  label: {
    fontFamily: Fonts.get('regular'),
    fontSize: 18,
    color: Colors.sanJose
  },
  action: {
    margin: 15
  },
  payButton: {
    padding: 15
  },
  imageContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  image: {
    marginHorizontal: 10
  },
  cardNameText: {
    fontFamily: Fonts.get('regular'),
    fontSize: pixelRatio > 2 ? 20 : 18,
    textAlign: 'center',
    color: Colors.colonia
  },
  cardText: {
    fontFamily: Fonts.get('bold'),
    fontSize: pixelRatio > 2 ? 20 : 18,
    textAlign: 'center',
    color: Colors.colonia
  },
  cardsList: {
    alignItems: 'center',
    marginVertical: 20
  },
  emptyText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 20,
    textAlign: 'center',
    color: Colors.mercedes
  },
  nameTitleText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 20,
    textAlign: 'center',
    color: Colors.colonia
  },
  nameText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 15,
    color: Colors.colonia,
    marginVertical: 10
  },
  emptyCardContainer: {
    backgroundColor: Colors.soriano,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    paddingVertical: 45
  },
  cardInfoContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  cardContainer: {
    flex: 1
  },
  cardTextContainer: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  sectionHeader: {
    height: 22,
    backgroundColor: Colors.talas,
    justifyContent: 'center',
    paddingLeft: 5
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: Fonts.get('regular'),
    color: MakeAlphaColor(Colors.colonia, 50),
    backgroundColor: 'transparent',
    letterSpacing: 1
  },
  item: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomColor: Colors.puntaDelEste,
    borderBottomWidth: 1
  },
  itemData: {
    flex: 1
  },
  itemCardName: {
    color: Colors.colonia,
    fontSize: 14,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.5,
    backgroundColor: 'transparent'
  },
  itemCardDescription: {
    color: Colors.colonia,
    fontSize: 14,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.5,
    backgroundColor: 'transparent'
  },
  tickContainer: {
    width: 20,
    height: 20,
    borderRadius: Platform.OS === 'ios' ? 10 : 20,
    backgroundColor: Colors.colonia,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemDataIcons: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10
  }
});

export default Styles;
