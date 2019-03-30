import { StyleSheet, Dimensions } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const { width } = Dimensions.get('window');

const Styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    paddingTop: 10
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
  scrollContent: {
    paddingBottom: 30
  },
  imageContainer: {
    backgroundColor: Colors.colonia,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: width - 50,
    width: width - 50,
    backgroundColor: Colors.colonia
  },
  name: {
    fontFamily: Fonts.get('regular'),
    fontSize: 24,
    color: Colors.sanJose,
    textAlign: 'center',
    paddingVertical: 2
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.panDeAzucar
  },
  priceText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 38,
    color: Colors.sanJose,
  },
  priceCoin: {
    marginTop: 3
  },
  descriptionTitle: {
    fontFamily: Fonts.get('regular'),
    textAlign: 'center',
    fontSize: 22,
    color: Colors.sanJose,
    paddingVertical: 15
  },
  descriptionText: {
    marginHorizontal: 30,
    color: Colors.sanJose
  },
  actions: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  quantity: {
    flex: 1,
    marginHorizontal: 10
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    alignSelf: 'flex-end'
  },
  quantityTitle: {
    fontFamily: Fonts.get('regular'),
    textAlign: 'center',
    fontSize: 16,
    color: Colors.sanJose,
  }
});

export default Styles;