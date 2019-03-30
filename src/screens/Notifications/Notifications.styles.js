import { StyleSheet } from 'react-native';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.montevideo,
    borderTopWidth: 1,
    borderTopColor: Colors.puntaDelEste
  },
  item: {
    alignSelf: 'stretch',
    height: 60,
    borderBottomColor: Colors.puntaDelEste,
    borderBottomWidth: 1
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
  friendsBox: {
    height: 45,
    backgroundColor: Colors.puntaDelEste,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  friendsText: {
    color: Colors.lasVegas,
    fontSize: 16,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.57,
    backgroundColor: 'transparent'
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
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
