// @flow
import React, { PureComponent } from 'react';
import { View, WebView } from 'react-native';

import Styles from './StreamPlayer.styles';

type Props = {
  source: String,
  onLoad: Function
};

export default class StreamPlayer extends PureComponent<Props> {
  static defaultProps = {
    onLoad: () => {}
  };

  render() {
    return (
      <View style={Styles.container}>
        <WebView
          ref={(ref) => this.webView = ref}
          source={{uri: this.props.source}}
          style={Styles.webView}
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          scrollEnabled={false}
          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
          onNavigationStateChange ={this.onShouldStartLoadWithRequest}
          injectedJavaScript={noScaleJS}
          onLoad={this.props.onLoad}
        />
    </View>
    );
  }

  onShouldStartLoadWithRequest = (navigator) => {
    if (navigator.url.indexOf(this.props.source) !== -1) {
      return true;
    }

    this.webView.stopLoading();
    return false;
  }
}

const noScaleJS = `
  const meta = document.createElement('meta');
  meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0');
  meta.setAttribute('name', 'viewport');
  document.getElementsByTagName('head')[0].appendChild(meta);
`;
