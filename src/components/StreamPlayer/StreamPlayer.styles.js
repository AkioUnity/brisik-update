import { StyleSheet, Dimensions } from 'react-native';

const aspect16_9 = .5625;

const playerSize = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').width * aspect16_9
};

export default StyleSheet.create({
  container: {
    ...playerSize
  },
  webView: {
    ...playerSize,
  }
});
