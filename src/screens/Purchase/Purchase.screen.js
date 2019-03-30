import React, { PureComponent } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment';
import PurchaseItem from '../../components/PurchaseItem/PurchaseItem';
import Styles from './Purchase.styles';
import Loader from '../../components/Loader/Loader';
import { SingleNavStyle, NavigationEventsHandler } from '../../utils/Navigator';
import * as ProductActions from '../../actions/Product/Product.actions';
import ActionButton from '../../components/ActionButton/ActionButton';
import { ScreenNames } from '../';
import * as Images from '../../utils/Images';

class Purchase extends PureComponent {
  static navigatorStyle = {
    ...SingleNavStyle,
    drawUnderTabBar: true
  };
  static navigatorButtons = {
    leftButtons: [{
      icon: Images.backButton,
      id: '@nav/editConfirm',
      disableIconTint: true
    }],
    rightButtons: []
  };

  constructor(props) {
    super(props);

    this.state = {
      coinList: [],
      amountUpward: false,
      dateUpward: false,
      categoryUpward: false
    };

    const navigatorEventsHandler = event =>
      NavigationEventsHandler({
        screen: this.constructor.id,
        navigator: props.navigator,
        event
      });
    props.navigator.setOnNavigatorEvent(navigatorEventsHandler);

    this._receivedPurchases = this._receivedPurchases.bind(this);
  }

  componentDidMount() {
    this.props.getPurchases();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.purchases) {
      this._receivedPurchases(nextProps.purchases);
    }
  }

  componentWillUnmount() {
    this.props.clearHistory();
  }

  render() {
    const { loading, user, listPage, purchases } = this.props;
    const { coinList, amountUpward, dateUpward, categoryUpward } = this.state;
    const isLastPage = listPage && parseInt(listPage.page) === parseInt(listPage.pages);

    if (!purchases && loading) {
      return <Loader />;
    }

    return (
      <View style={Styles.container}>
        <ScrollView>
          <Text style={Styles.title}>Current balance</Text>
          <View style={Styles.balanceContainer}>
            <Text style={Styles.historyTitle}>
              { `$${Math.floor(user.cash)}` }
            </Text>
          </View>
          {coinList && coinList.length !== 0
            ? <View style={{flex: 1}}>
                <View style={Styles.sectionHeader}>
                  <Text style={Styles.subTitle}>
                    {'Cash History'.toUpperCase()}
                  </Text>
                </View>
                {coinList.map((data, i) => <PurchaseItem {...data} key={i} style={Styles.item} />)}
                <View style={Styles.actions}>
                  {!isLastPage &&
                    <ActionButton
                      title="Load More"
                      style={Styles.loadmoreButton}
                      type="dark"
                      loading={loading}
                      onPress={() => {
                        this.props.getPurchases(this.state.page);
                      }}
                    />}
                </View>
              </View>
            : <View style={Styles.emptyContainer}>
                <Text style={Styles.emptyHistoryText}>
                  {'There is no history'}
                </Text>
              </View>}
        </ScrollView>
      </View>
    );
  }

  _receivedPurchases(purchases) {
    let { coinList } = this.state;
    const { listPage } = this.props;
    let amount = 0;

    coinList = purchases.map(item => {
      const isGame = item.desc.includes('match') || item.desc.includes('Challenge') ||
        item.desc.toLowerCase().includes('tournament');
      if (isGame) {
        amount = item.won === 0 ? item.lost * -1 : item.won;
      } else {
        amount = item.purchased;
      }

      return {
        createdDate: item.createdAt,
        category: isGame ? 'GAME' : 'PURCHASE',
        amount: amount
      };
    });
    this.setState({
      coinList,
      page: listPage && parseInt(listPage.page) + 1
    });
  }
}

Purchase.title = 'Cash History';
Purchase.id = 'com.eSportsGlobalGamers.Purchase';

const mapStateToProps = ({ user, product }) => {
  return {
    user: user.userData,
    purchases: product.purchases,
    loading: product.loadingPurchases,
    listPage: product.listPage
  };
};

const mapDispatchToProps = dispatch => ({
  getPurchases: page => dispatch(ProductActions.getPurchases(page)),
  clearHistory: () => dispatch(ProductActions.clearHistory())
});

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);
