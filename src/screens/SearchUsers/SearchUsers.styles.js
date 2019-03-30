import {
  StyleSheet,
  PixelRatio,
} from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import Utils from '../../utils/Utils';

const Styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    borderTopWidth: 2,
    borderColor: Colors.puntaDelEste,
    paddingTop: 5
  },
  container: {
    flex: 1,
    paddingTop: 5
  },
  searchContainer: {
    width: '95%'
  },
  searchBar: {
    marginBottom: 2
  },
  buttonContainer: {
    backgroundColor: Colors.maldonado,
    margin: 15
  },
  listContainer: {
    flex: 1,
    backgroundColor: Colors.soriano,
  },
  listView: {
    flex: 1
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'relative',
    borderBottomWidth: 1,
    borderColor: Colors.puntaDelEste,
    height: 45
  },
  avatar: {
    width: 30,
    height: 30
  },
  name: {
    backgroundColor: 'transparent',
    fontFamily: Fonts.get('regular'),
    fontSize: 14,
    color: Colors.colonia,
    marginLeft: 10,
    letterSpacing: 0.5,
    flex: 1
  },
  button: {
    position: 'absolute',
    height: 25,
    width: 80,
    right: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderTopWidth: 1,
    borderColor: Colors.cerroLargo,
    borderRadius: 20,
    elevation: 0
  },
  searchResultText:{
    backgroundColor: 'transparent',
    fontFamily: Fonts.get('regular'),
    fontSize: 14,
    color: Colors.colonia,
    marginLeft: 10,
    letterSpacing: 0.5,
    textAlign: 'center',
    marginTop: 20
  },
  selectText: {
    fontSize: 11,
    letterSpacing: 1,
    lineHeight: 25
  },
  pendingText: {
    fontFamily: Fonts.get('bold'),
    fontSize: 15,
    color: Colors.pasoDeLosToros,
    textAlign: 'center'
  },
  friendListText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: 1,
    backgroundColor: Colors.talas,
    paddingHorizontal: 10,
    paddingVertical: 3
  }
});

export default Styles;