import { StyleSheet, Platform, PixelRatio } from 'react-native';

import MakeAlphaColor from '../../utils/MakeAlphaColor';
import Colors from '../../styles/Colors';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.montevideo,
    borderTopWidth: 1,
    borderTopColor: Colors.puntaDelEste
  },
  wrapper: {
    flex: 1
  },
  avatarContainer: {
  	alignItems: 'center',
  	padding: 20
  },
  avatarImage: {
  	width: 70,
  	height: 70
  },
  button: {
    height: 28,
    width: 180,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderTopWidth: 1,
    borderColor: Colors.cerroLargo,
    borderRadius: 20,
    marginTop: 15,
    elevation: 0
  },
  selectText: {
    fontSize: 11,
    letterSpacing: 1,
    lineHeight: 28
  },
  avatarLoaderContainer: {
    position: 'absolute',
    top: -5,
    right: 0,
    left: 0,
    bottom: 5,
    backgroundColor: MakeAlphaColor(Colors.talas, 6),
    borderRadius: Platform.select({
      ios: 50,
      android: 100
    }),
    overflow: 'hidden'
  },
  loaderContainer: {
    position: 'relative',
    width: 70,
    height: 70
  },
  sectionHeader: {
    height: 22,
    justifyContent: 'center',
    backgroundColor: Colors.talas,
    paddingLeft: 5
  },
  sectionHeaderText: {
    color: MakeAlphaColor(Colors.colonia, 50),
    fontSize: 12,
    letterSpacing: 1,
    backgroundColor: 'transparent'
  },
  sectionBody: {
    flex: 1,
    marginBottom: 20
  },
  passwordRow: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.puntaDelEste,
    paddingHorizontal: 15
  },
  passwordRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  passwordText: {
    color: Colors.colonia,
    fontSize: 14,
    backgroundColor: 'transparent',
    letterSpacing: 0.5,
    marginLeft: 10
  },
  personalWrapper: {
    maxHeight: 100
  },
  wrapperGamertags: {
    maxHeight: 200
  }
});

export default Styles;
