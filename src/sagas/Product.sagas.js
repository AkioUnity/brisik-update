import { Alert, AsyncStorage } from 'react-native';
import { call, put, takeEvery, select, all, fork } from 'redux-saga/effects';
import { product as ProductActions, productTypes, user as userActions } from '../actions';
import * as CommonActions from '../actions/Common/Common.actions';
import { getSessionToken, getCart } from './Selectors';
import RESTClient from '../utils/RESTClient';
import { encodeJSONToQueryString } from '../utils/Utils';

function* getCoins() {
  try {
    yield put(ProductActions.setLoading());
    const coins = yield call(RESTClient.Product.coins);
    yield put(ProductActions.setCoins(coins.data));
    yield put(ProductActions.unsetLoading());
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      console.warn('CATCH - ', JSON.stringify(e));
    }
  }
}

function* createStripeCustomer({ data }) {
  yield put(ProductActions.setLoading('card'));
  const cardData = {
    'card[number]': data.card.number.replace(/\s/g, ''),
    'card[exp_month]': parseInt(data.card.month),
    'card[exp_year]': parseInt(data.card.year),
    'card[cvc]': data.card.cvc
  };
  const stringForm = encodeJSONToQueryString(cardData);
  let result = yield call(RESTClient.User.stripeCustomer, stringForm);
  if (!result.error) {
    try {
      const token = yield select(getSessionToken);
      if (data.onUpdate) {
        yield call(RESTClient.User.updateCardInfo, token, result.id, data.card.name);
      } else {
        yield call(RESTClient.User.createStripeCustomer, token, result.id, data.card.name);
      }
      const cardInfo = yield call(RESTClient.User.retrievecardinfo, token);
      yield put(userActions.setCardInfo(cardInfo.data));
      yield put(userActions.getUserInfo(token));
      yield put(ProductActions.unsetLoading('card'));
      yield put(ProductActions.setCard());
    } catch (e) {
      if (e === 'jwt expired') {
        yield put(CommonActions.handleTokenExpired());
      } else {
        Alert.alert('Error', JSON.stringify(e));
        yield put(ProductActions.unsetLoading('card'));
      }
    }
  } else {
    if(result.error){
      let message = result.error.message || result.error.code || 'Some Error Occured';
      Alert.alert(message);
    }else{
      let message = 'Some Error Occured';
      Alert.alert(message);
    }
    
    yield put(ProductActions.unsetLoading('card'));
  }
}

function* updateStripeCustomer({ data }) {
  yield put(ProductActions.setLoading('card'));
  const cardData = {
    'card[number]': null,
    'card[exp_month]': null,
    'card[exp_year]': null,
    'card[cvc]': null
  };
  if(data.card.number){
    cardData['card[number]'] = data.card.number.replace(/\s/g, '');
  }
  if(data.card.month){
    cardData['card[exp_month]'] = parseInt(data.card.month);
  }
  if(data.card.year){
    cardData['card[exp_year]'] = parseInt(data.card.year);
  }
  if(data.card.cvc){
    cardData['card[cvc]'] = data.card.cvc;
  }

  const stringForm = encodeJSONToQueryString(cardData);
  let result = yield call(RESTClient.User.stripeCustomer, stringForm);
  if (!result.error) {
    try {
      const token = yield select(getSessionToken);
      // if (data.onUpdate) {
      //   yield call(RESTClient.User.updateCardInfo, token, result.id, data.card.name);
      // } else {
      //   yield call(RESTClient.User.createStripeCustomer, token, result.id, data.card.name);
      // }
      yield call(RESTClient.User.updateCardInfo, token, result.id, data.card.name);
      const cardInfo = yield call(RESTClient.User.retrievecardinfo, token);
      yield put(userActions.setCardInfo(cardInfo.data));
      yield put(userActions.getUserInfo(token));
      yield put(ProductActions.unsetLoading('card'));
      yield put(ProductActions.setCard());
    } catch (e) {
      if (e === 'jwt expired') {
        yield put(CommonActions.handleTokenExpired());
      } else {
        Alert.alert('Error', JSON.stringify(e));
        yield put(ProductActions.unsetLoading('card'));
      }
    }
  } else {
    if(result.error){
      let message = result.error.message || result.error.code || 'Some Error Occured';
      Alert.alert(message);
    }else{
      let message = 'Some Error Occured';
      Alert.alert(message);
    }
    
    yield put(ProductActions.unsetLoading('card'));
  }
}

function* retrievecardinfo( ) {
  yield put(ProductActions.setLoading('card'));

  const token = yield select(getSessionToken);
  let result = yield call(RESTClient.User.retrievecardinfo, token);

  if (!result.error) {
    try {
      yield put(userActions.setCardInfo(result.data));
      yield put(ProductActions.setCard());
      yield put(ProductActions.unsetLoading('card'));
    } catch (e) {
      if (e === 'jwt expired') {
        yield put(CommonActions.handleTokenExpired());
      } else {
        Alert.alert('Error', JSON.stringify(e));
        yield put(ProductActions.unsetLoading('card'));
      }
    }
  } else {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      //handle error
      Alert.alert('Error', result.error.message);
      yield put(ProductActions.unsetLoading('card'));
    }
  }
}

function* createDeposit({ data, cb}) {
  let { amount } = data;
  try{
    amount = parseInt(amount);
  }catch(e){
   
    return;
  }
  yield put(ProductActions.setLoading('deposit'));

  const token = yield select(getSessionToken);
  let result = yield call(RESTClient.User.deposit, token, amount);
  if (!result.error) {
    try {
      // yield put(userActions.setCardInfo(result.data));
      yield put(ProductActions.unsetLoading('deposit'));
      yield put(userActions.getUserInfo(token));
      
      if (cb) {
        cb();
      }
    
    } catch (e) {
      if (e === 'jwt expired') {
        yield put(CommonActions.handleTokenExpired());
      } else {
        Alert.alert('Error', JSON.stringify(e));
        yield put(ProductActions.unsetLoading('deposit'));
      }
    }
  } else {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      //handle error
      Alert.alert('Error', result.error.message);
      yield put(ProductActions.unsetLoading('deposit'));
    }
  }
}

function* createWithdraw({ data, cb }) {
  let { amount, email } = data;
  try{
    amount = parseInt(amount);
  }catch(e){
   
    return;
  }
  yield put(ProductActions.setLoading('withdraw'));

  const token = yield select(getSessionToken);
  let result = yield call(RESTClient.User.withdraw, token, {amount, email});
  if (!result.error) {
    try {
      // yield put(userActions.setCardInfo(result.data));
      yield put(ProductActions.unsetLoading('withdraw'));
      yield put(userActions.getUserInfo(token));
      
      if (cb) {
        cb();
      }

    } catch (e) {
      if (e === 'jwt expired') {
        yield put(CommonActions.handleTokenExpired());
      } else {
        Alert.alert('Error', JSON.stringify(e));
        yield put(ProductActions.unsetLoading('withdraw'));
      }
    }
  } else {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      //handle error
      Alert.alert('Error', result.error.message);
      yield put(ProductActions.unsetLoading('withdraw'));
    }
  }
}

function* payWithCard({ data }) {
  const token = yield select(getSessionToken);
  yield put(ProductActions.setLoading('coin'));
  try {
    const result = yield call(RESTClient.Product.buyCoins, data, token);
    yield put(ProductActions.setPurchasedCoin(result.data));
    yield put(ProductActions.unsetLoading('coin'));
    yield put(userActions.getUserInfo(token));
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      yield put(ProductActions.unsetLoading('coin'));
      Alert.alert('Error', JSON.stringify(e));
      console.warn('CATCH - ', JSON.stringify(e));
    }
  }
}

function* getPurchase({ data }) {
  const token = yield select(getSessionToken);
  yield put(ProductActions.setLoading('purchases'));
  try {
    const result = yield call(RESTClient.User.coinHistory, token, data);
    yield put(ProductActions.setPurchases(result.data));
    yield put(ProductActions.unsetLoading('purchases'));
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      yield put(ProductActions.unsetLoading('purchases'));
      Alert.alert('Error', JSON.stringify(e));
      console.warn('CATCH - ', JSON.stringify(e));
    }
  }
}

function* getProducts({ data }) {
  try {
    yield put(ProductActions.setLoading('products'));
    const result = yield call(RESTClient.Product.getProducts, data);
    yield put(ProductActions.setProducts(result.data));
    yield put(ProductActions.unsetLoading('products'));
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    }
    console.warn('CATCH - ', JSON.stringify(e));
  }
}

function* purchaseProducts({ data }) {
  yield put(ProductActions.setLoading('purchasing'));
  const token = yield select(getSessionToken);
  try {
    yield call(RESTClient.Product.purchaseProduct, data, token);
    yield put(userActions.getUserInfo(token));
    yield put(ProductActions.clearCart());
    yield put(ProductActions.unsetLoading('purchasing'));
    yield put(ProductActions.setPurchaseSuccess());
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      yield put(ProductActions.unsetLoading('purchasing'));
      Alert.alert('Error', JSON.stringify(e));
      console.warn('CATCH - ', JSON.stringify(e));
    }
  }
}

function* search({ data }) {
  try {
    yield put(ProductActions.setLoading('products'));
    const result = yield call(RESTClient.Product.search, data);
    yield put(ProductActions.setSearchedProducts({ results: result.data }));
    yield put(ProductActions.unsetLoading('products'));
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    } else {
      console.warn('CATCH - ', JSON.stringify(e));
      yield put(ProductActions.unsetLoading('products'));
    }
  }
}

function* getCategories() {
  try {
    const result = yield call(RESTClient.Product.getCategories);
    yield put(ProductActions.setCategories(result.data));
  } catch (e) {
    if (e === 'jwt expired') {
      yield put(CommonActions.handleTokenExpired());
    }
    console.warn('CATCH - ', JSON.stringify(e));
  }
}

function* saveCartIntoStorage() {
  const cart = yield select(getCart);
  yield call(AsyncStorage.setItem, '@CART', JSON.stringify(cart));
}

function* removeCartIntoStorage() {
  yield call(AsyncStorage.removeItem, '@CART');
}

function* loadCart() {
  const cart = yield AsyncStorage.getItem('@CART');

  if (cart) {
    yield put(ProductActions.storeCart(JSON.parse(cart)));
  }
}

export default function* CommonSagas() {
  yield all([
    fork(loadCart),
    takeEvery(productTypes.SAGAS_COINS_GET, getCoins),
    takeEvery(productTypes.SAGAS_CREATE_STRIPE_CUSTOMER, createStripeCustomer),
    takeEvery(productTypes.SAGAS_UPDATE_CARD_INFO, updateStripeCustomer),
    takeEvery(productTypes.SAGAS_PAY_WITH_CARD, payWithCard),
    takeEvery(productTypes.SAGAS_GET_PURCHASES, getPurchase),
    takeEvery(productTypes.SAGAS_GET_PRODUCTS, getProducts),
    takeEvery(productTypes.SAGAS_PURCHASE_PRODUCTS, purchaseProducts),
    takeEvery(productTypes.SAGAS_SEARCH, search),
    takeEvery(productTypes.SAGAS_GET_CATEGORIES, getCategories),
    takeEvery(productTypes.STORE_ADD_CART, saveCartIntoStorage),
    takeEvery(productTypes.STORE_UPDATE_CART, saveCartIntoStorage),
    takeEvery(productTypes.STORE_REMOVE_CART, removeCartIntoStorage),
    takeEvery(productTypes.SAGAS_GET_STRIPE_CARD, retrievecardinfo),
    takeEvery(productTypes.SAGAS_CREATE_DEPOSIT, createDeposit),
    takeEvery(productTypes.SAGAS_CREATE_WITHDRAW, createWithdraw),
  ]);
}
