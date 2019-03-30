import * as types from '../actions/Product/Product.actionTypes';
import { checkCart, updateCart, removeCart, setMyPurchases } from './Helpers/Product.helper';

const initialState = {
  coins: null,
  loading: false,
  loadingCoin: false,
  loadingPurchases: false,
  loadingProducts: false,
  purchases: null,
  purchasedCoin: null,
  products: null,
  cart: [],
  loadingPurchasing: false,
  categories: null,
  loadingCard: false,
  cardReceived: false,
  listPage: null,
  shopLastPage: null,
  purchaseSuccess: false
};

export default function common(state = initialState, action = {}) {
  const { origin } = action;
  switch (action.type) {
    case types.STORE_SET_COINS:
      return {
        ...state,
        coins: action.data
      };
    case types.SET_LOADING:
      if (typeof origin === 'string') {
        if (origin === 'coin') {
          return {
            ...state,
            loadingCoin: true
          };
        }
        if (origin === 'purchases') {
          return {
            ...state,
            loadingPurchases: true
          };
        }
        if (origin === 'products') {
          return {
            ...state,
            loadingProducts: true
          };
        }
        if (origin === 'purchasing') {
          return {
            ...state,
            loadingPurchasing: true
          };
        }
        if (origin === 'card') {
          return {
            ...state,
            loadingCard: true
          };
        }
      }
      return {
        ...state,
        loading: true
      };
    case types.UNSET_LOADING:
      if (typeof origin === 'string') {
        if (origin === 'coin') {
          return {
            ...state,
            loadingCoin: false
          };
        }
        if (origin === 'purchases') {
          return {
            ...state,
            loadingPurchases: false
          };
        }
        if (origin === 'products') {
          return {
            ...state,
            loadingProducts: false
          };
        }
        if (origin === 'purchasing') {
          return {
            ...state,
            loadingPurchasing: false
          };
        }
        if (origin === 'card') {
          return {
            ...state,
            loadingCard: false
          };
        }
      }
      return {
        ...state,
        loading: false
      };
    case types.STORE_SET_PURCHASES: 
      return setMyPurchases(state, action.data);
    case types.STORE_SET_PURCHASED_COIN:
      return {
        ...state,
        purchasedCoin: action.data
      };
    case types.CLEAR_PRODUCT:
      return {
        ...state,
        purchasedCoin: null,
        loadingCoin: false
      };
    case types.STORE_SET_PRODUCTS:
      return {
        ...state,
        products: state.products ? state.products.docs.concat(action.data.docs) : action.data,
        shopLastPage: action.data
      };
    case types.STORE_ADD_CART:
      return checkCart(state, action.data);
    case types.STORE_UPDATE_CART:
      return updateCart(state, action.data);
    case types.STORE_REMOVE_CART:
      return removeCart(state, action.data);
    case types.STORE_CLEAR_CART:
      return {
        ...state,
        cart: []
      };
    case types.SET_SEARCHED_PRODUCTS:
      return {
        ...state,
        products: action.data.results.page === 1 ? action.data.results : state.products.docs.concat(action.data.results.docs)
      };
    case types.STORE_SET_CATEGORIES:
      return {
        ...state,
        categories: action.data
      };
    case types.STORE_SET_CARD:
      return {
        ...state,
        cardReceived: true
      };
    case types.STORE_UNSET_CARD:
      return {
        ...state,
        cardReceived: false
      };
    case types.STORE_CLEAR_HISTORY:
      return {
        ...state,
        purchases: null
      };
    case types.STORE_CART:
      return {
        ...state,
        cart: action.data
      };
    case types.STORE_PURCHASE_SUCCESS:
      return {
        ...state,
        purchaseSuccess: true
      };
    case types.STORE_RESET_PURCHASE_SUCCESS:
      return {
        ...state,
        purchaseSuccess: false
      };
    default:
      return state;
  }
}