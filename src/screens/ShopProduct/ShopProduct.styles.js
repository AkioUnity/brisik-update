import { StyleSheet, Dimensions } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import MakeAlphaColor from '../../utils/MakeAlphaColor';

const { width } = Dimensions.get('window');

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1,
    backgroundColor: Colors.montevideo,
    borderTopColor: Colors.puntaDelEste,
    padding: 10
  },
  content: {
    flex: 1
  },
  scrollContent: {
    paddingBottom: 30
  },
  image: {
    width,
    height: width
  },
  name: {
    fontFamily: Fonts.get('regular'),
    fontSize: 17,
    color: Colors.colonia,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  priceText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 15,
    color: Colors.minas,
  },
  coinShape: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginRight: 5,
    backgroundColor: Colors.minas
  },
  descriptionTitle: {
    fontFamily: Fonts.get('regular'),
    fontSize: 12,
    color: MakeAlphaColor(Colors.colonia, 50),
    letterSpacing: 1,
    lineHeight: 12
  },
  descriptionText: {
    color: Colors.colonia,
    fontSize: 14,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.5,
    lineHeight: 16
  },
  actions: {
    paddingBottom: 20,
    alignItems: 'center'
  },
  quantity: {
    flex: 1,
    marginVertical: 20,
    width: '23%'
  },
  button: {
    flex: 1,
    height: 40,
    width: 280,
    alignSelf: 'center'
  },
  descriptionTitleUnderline: {
    height: 1,
    backgroundColor: Colors.puntaDelEste,
    marginTop: 3,
    marginBottom: 8
  },
  description: {
    marginTop: 20
  },
  imageWithoutDots: {
    marginBottom: 20
  }
});

export default Styles;