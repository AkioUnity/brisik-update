import BrisikApp from './src/app';
import { AppRegistry } from "react-native";

import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const eSportsGlobalGamers = BrisikApp();
AppRegistry.registerComponent("Brisik", () => eSportsGlobalGamers);
