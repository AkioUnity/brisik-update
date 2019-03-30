import React, { Component } from 'react';
import { Text, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { SingleNavStyle, ModalNavButtons, NavigationEventsHandler } from '../../utils/Navigator';
import { chevronRight, backButton } from '../../utils/Images';
import { ScreenNames } from '../../screens';
import { Faqs } from '../../utils/Utils';
import Styles from './FaqMenu.styles';

class FaqMenu extends Component {
  static navigatorStyle = SingleNavStyle;
  static navigatorButtons = ModalNavButtons;

  constructor(props) {
    super(props);

    this.faqs = [...Faqs];

    const navigatorEventsHandler = (event) => NavigationEventsHandler({
      screen: this.constructor.id,
      navigator: props.navigator, event
    });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._navigateToFaq = this._navigateToFaq.bind(this);
  }

  render() {
    return (
      <SafeAreaView style={Styles.scrollView}>
        <ScrollView style={Styles.scrollView}>
          {this.faqs.map((faq, i) => {
            const onPress = () => this._navigateToFaq(faq);

            return (
              <TouchableOpacity key={i} style={Styles.item} onPress={onPress}>
                <Text style={Styles.itemText}>{faq.question}</Text>
                <Image source={chevronRight} resizeMode="contain" />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }

  _navigateToFaq(faq) {
    this.props.navigator.push({
      screen: ScreenNames.Faq.id,
      title: ScreenNames.Faq.title.toUpperCase(),
      backButtonTitle: '',
      navigatorButtons: {
        leftButtons: [{
          icon: backButton,
          id: '@nav/editConfirm',
          disableIconTint: true
        }],
        rightButtons: []
      },
      passProps: {
        title: faq.question,
        text: faq.answer
      }
    });
  }
}

FaqMenu.id = 'com.eSportsGlobalGamers.FaqMenu';
FaqMenu.title = 'FAQ';

export default connect()(FaqMenu);