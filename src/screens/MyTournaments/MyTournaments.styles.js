import { StyleSheet, Dimensions } from 'react-native';
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
  categoryTitle: {
    color: Colors.colonia,
    opacity: 0.5,
    fontSize: 12,
    letterSpacing: 1.1,
    margin: 5
  },
  challengeBox: {
    backgroundColor: Colors.montevideo
  },
  listWrapper: {
    width: '100%',
    alignItems: 'center'
  },
  list: {
    width: '100%'
  },
  message: {
    color: Colors.colonia,
    textAlign: 'center',
    margin: 10
  },
  postButton: {
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  emptyContainer: {
    alignItems: 'center',
    height: Dimensions.get('window').height - 175,
    justifyContent: 'center'
  },
  emptyText: {
    color: Colors.paysandu,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    fontFamily: Fonts.get('light'),
    letterSpacing: 0.64
  },
  emptyButton: {
    height: 40,
    paddingHorizontal: 20,
    marginTop: 30
  }
});

export default Styles;
