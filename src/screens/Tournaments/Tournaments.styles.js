import { StyleSheet, pixelRatio } from 'react-native';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const tabTextSize = pixelRatio > 2 ? 14 : 12;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.salto
  },
  sceneContent: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  tabText: {
    color: Colors.florida,
    fontFamily: Fonts.get('regular'),
    fontSize: tabTextSize,
    letterSpacing: 1.1
  },
  tabTextActive: {
    color: Colors.colonia,
    fontFamily: Fonts.get('regular'),
    fontSize: tabTextSize,
    letterSpacing: 1.1
  },
  tabBar: {
    backgroundColor: 'transparent',
    height: 40,
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    borderTopWidth: 2,
    borderColor: Colors.puntaDelEste
  },
  tab: {
    flex: 0,
    backgroundColor: 'transparent'
  },
  tabBarContainer: {
    flex: 1
  },
  scene: {
    flex: 1,
    marginTop: 50
  }
});

export default Styles;
