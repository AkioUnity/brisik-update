import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

class GoogleAnalytics {
  constructor() {
    this.tracker = new GoogleAnalyticsTracker('UA-116594209-1');
  }

  trackScreenView(screenId) {
    this.tracker.trackScreenView(screenId);
  }
}

const AnalyticsTracker = new GoogleAnalytics();

export default AnalyticsTracker;