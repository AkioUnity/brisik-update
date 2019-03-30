import { StyleSheet, Dimensions } from 'react-native';

import MakeAlphaColor from '../../utils/MakeAlphaColor';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  friendsList: {
    flex: 1
  },
  friendsListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'relative',
    borderBottomWidth: 1,
    borderColor: Colors.puntaDelEste,
    height: 45
  },
  friendsListItemAvatar: {
    width: 30,
    height: 30
  },
  friendsListItemName: {
    backgroundColor: 'transparent',
    fontFamily: Fonts.get('regular'),
    fontSize: 14,
    color: Colors.colonia,
    marginLeft: 10,
    letterSpacing: 0.5,
    flex: 1
  },
  friendsListItemBtn: {
    paddingHorizontal: 10,
    position: 'absolute',
    right: 10
  },
  noContent: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noContentText: {
    fontFamily: Fonts.get('regular'),
    fontSize: 16,
    color: MakeAlphaColor(Colors.colonia, 60)
  },
  pendingText: {
    color: Colors.minas,
    fontSize: 20,
    fontFamily: Fonts.get('regular')
  },
  outlineButton: {
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
  outlineButtonText: {
    fontSize: 11,
    letterSpacing: 1,
    lineHeight: 25
  },
  postChallengeButton: {
    width: 35,
    height: 35,
    marginLeft: 10
  }
});

export default Styles;
