import { StyleSheet, PixelRatio } from 'react-native';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.montevideo
  },
  containerSectionWithoutUser: {
    padding: 15,
    paddingTop: 30,
    backgroundColor: Colors.rivera,
    justifyContent: 'center',
    alignItems: 'center'
  },
  legendText: {
    color: Colors.colonia,
    fontSize: PixelRatio.get() <= 2 ? 14 : 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: PixelRatio.get() <= 2 ? 5 : 10,
    marginHorizontal: PixelRatio.get() <= 2 ? 60 : 30
  },
  containerActionButtons: {
    flexDirection: 'row',
    marginTop: 30
  },
  actionButton: {
    flex: 1
  },
  firstActionButton: {
    marginRight: 10
  },
  containerSectionLink: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginVertical: 5
  },
  containerSectionLinkText: {
    color: Colors.colonia,
    fontFamily: Fonts.get('medium'),
    fontSize: 18
  },
  userAvatar: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  divider: {
    height: 1,
    backgroundColor: Colors.florida,
    marginVertical: 15
  },
  links: {
    marginVertical: 20
  },
  avatarContainer: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 30
  },
});

export default Styles;
