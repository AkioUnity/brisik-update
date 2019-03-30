import { StyleSheet } from 'react-native';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabText: {
    color: Colors.montevideo,
    fontFamily: Fonts.get('regular'),
    fontSize: 20
  },
  tabTextActive: {
    color: Colors.tranqueras,
    fontFamily: Fonts.get('regular'),
    fontSize: 20
  },
  tabBar: {
    backgroundColor: Colors.colonia,
    height: 40,
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    shadowColor: Colors.maldonado,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    elevation: 3
  },
  tab: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  tabBarContainer: {
    flex: 1
  },
  scene: {
    flex: 1,
    marginTop: 35
  },
  sceneContent: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
});

export default Styles;