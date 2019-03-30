import { StyleSheet } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden'
  },
  userAvatar: {
    width: 50,
    height: 50,
    marginHorizontal: 10
  },
  messageWrapper: {
    flex: 1,
    height: '100%',
    paddingTop: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.puntaDelEste
  },
  message: {
    flex: 1
  },
  messageSender: {
    color: Colors.colonia,
    fontSize: 15,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.5,
    backgroundColor: 'transparent',
    marginBottom: 3
  },
  messageSenderUnread: {
    color: Colors.artigas
  },
  messageText: {
    flex: 1,
    color: Colors.seoul,
    fontSize: 14,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.4,
    lineHeight: 17,
    backgroundColor: 'transparent'
  },
  dateText: {
    color: Colors.cerroLargo,
    fontSize: 12,
    fontFamily: Fonts.get('regular'),
    letterSpacing: 0.5,
    backgroundColor: 'transparent'
  }
});

export default Styles;