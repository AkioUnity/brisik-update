import React from 'react';
import { View, Text } from 'react-native';

import { NavigationEventsHandler, ModalNavStyle2 } from '../../utils/Navigator';

import Styles from './Faq.styles';

class Faq extends React.PureComponent {
  static navigatorStyle = ModalNavStyle2;

  constructor(props) {
    super(props);

    const navigatorEventsHandler = (event) => NavigationEventsHandler({
      screen: this.constructor.id,
      navigator: props.navigator, event
    });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);
  }

  render() {
    const { title, text } = this.props;

    return (
      <View style={Styles.container}>
        <Text style={Styles.questionTitle}>{ title }</Text>
        <Text style={Styles.questionText}>{ text.join('\n') }</Text>
      </View>
    );
  }
}

Faq.id = 'com.eSportsGlobalGamers.Faq';
Faq.title = 'FAQ';

export default Faq;
