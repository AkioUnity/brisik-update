import { Platform } from 'react-native';

const Fonts = {
  get(fontName) {
    switch (fontName) {
      case 'regular':
        return Platform.OS === 'ios' ? 'Rubik-Regular' : 'rubik_regular';
      case 'medium':
        return Platform.OS === 'ios' ? 'Rubik-Medium' : 'rubik_medium';
      case 'bold':
        return Platform.OS === 'ios' ? 'Rubik-Bold' : 'rubik_bold';
      case 'light':
        return Platform.OS === 'ios' ? 'Rubik-Light' : 'rubik_light';
      default:
        break;
    }
  }
};

export default Fonts;