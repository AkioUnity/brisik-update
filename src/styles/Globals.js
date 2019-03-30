import { PixelRatio } from 'react-native';

export const pixelRatio = PixelRatio.get();

export const GlobalStyles = {
  generalMargin: pixelRatio > 2 ? 20 : 15,
  darkLogo: 80
};