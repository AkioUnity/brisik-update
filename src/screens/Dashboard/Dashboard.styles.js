import { StyleSheet } from 'react-native';
import { pixelRatio } from '../../styles/Globals';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const tabTextSize = pixelRatio > 2 ? 16 : 14;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.montevideo,
    marginTop: 5
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
  sceneContent: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  tabText: {
    color: Colors.colonia,
    fontFamily: Fonts.get('bold'),
    fontSize: tabTextSize
  },
  tabTextActive: {
    color: Colors.tranqueras,
    fontFamily: Fonts.get('bold'),
    fontSize: tabTextSize
  },
  tabBar: {
    backgroundColor: 'transparent',
    height: 30,
    position: 'absolute',
    top: 0,
    alignItems: 'center'
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
    marginTop: 35
  },
  tabShadow: {
    opacity: 0
  }
});

export default Styles;