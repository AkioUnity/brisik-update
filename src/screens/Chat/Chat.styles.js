import { StyleSheet, Platform, Dimensions, StatusBar, PixelRatio } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const model = DeviceInfo.getModel();
let chatHeight = Dimensions.get('window').height - 110;


const d = Dimensions.get('window');
const isX = Platform.OS === 'ios' && (d.height > 800 || d.width > 800) ? true : false;

if (Platform.OS !== 'ios') {
  chatHeight -= StatusBar.currentHeight;
} else if ((model.toLowerCase().indexOf('iphone x') > -1) || isX) {
  chatHeight -= 40;
}


const isLowResolution = PixelRatio.get() <= 2;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.montevideo,
    position: 'relative'
  },
  chatList: {
    flex: 1,
    marginTop: 45,
    height: chatHeight,
    transform: [{ scaleY: -1 }]
  },
  chatListItemContainer: {
    paddingHorizontal: 15,
    paddingVertical: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    transform: [{ scaleY: -1 }],
    marginVertical: 5
  },
  chatListItemContainerSameSender: {
    paddingVertical: 0,
    justifyContent: 'flex-end'
  },
  chatListItemMessageContainer: {
    flex: 1,
    flexWrap: 'wrap'
  },
  chatListItemAvatarContainer: {
    height: 40,
    width: 40,
    marginRight: 5
  },
  chatListItemAvatarContainerWithoutAvatar: {
    height: 0,
    width: 45
  },
  chatListItemAvatar: {
    height: 35,
    width: 35,
    borderRadius: Platform.select({ ios: 17.5, android: 35 })
  },
  chatListItemAvatarAlignedRight: {
    marginLeft: 10
  },
  chatListItemUsername: {
    color: Colors.artigas,
    fontSize: 14,
    marginBottom: 3,
    backgroundColor: 'transparent',
    fontFamily: Fonts.get('regular')
  },
  chatListItemDate: {
    color: Colors.cerroLargo,
    fontSize: 12,
    letterSpacing: 0.5,
    backgroundColor: 'transparent',
    fontFamily: Fonts.get('regular')
  },
  chatListItemMessage: {
    color: Colors.colonia,
    fontSize: 14,
    letterSpacing: 0.4,
    backgroundColor: 'transparent',
    fontFamily: Fonts.get('regular')
  },
  chatListItemMessageAlignedRight: {
    marginLeft: 23,
    textAlign: 'right'
  },
  actionsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    backgroundColor: Colors.montevideo,
    borderTopWidth: 1,
    borderTopColor: Colors.puntaDelEste
  },
  textInputContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  textInput: {
    height: 34,
    backgroundColor: Colors.florida,
    color: Colors.colonia,
    fontSize: 14,
    paddingVertical: 5,
    paddingLeft: 10,
    fontFamily: Fonts.get('regular')
  },
  textInputSubmitButtonContainer: {
    width: 64,
    maxHeight: 34,
    bottom: 0,
    top: Platform.select({
      ios: isLowResolution ? 0 : -1,
      android: isLowResolution ? 0 : -0.1
    })
  },
  textInputSubmitButtonDisabled: {
    opacity: 0.5
  },
  onlineContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: Colors.puntaDelEste
  },
  onlineAmount: {
    color: Colors.lasVegas,
    fontSize: 16,
    letterSpacing: 0.57,
    fontFamily: Fonts.get('regular')
  },
  chevronRight: {
    marginRight: 3
  },
  chatListItemMessageWithoutAvatar: {
    marginRight: 45
  },
  chatListItemAvatarContainerAlignedRight: {
    marginRight: 0
  },
  chatHeader: {
    height: 55,
    width: '100%'
  }
});

export default Styles;
