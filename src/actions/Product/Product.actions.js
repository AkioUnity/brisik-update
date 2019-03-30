import * as types from './Product.actionTypes';

export const getCoins = () => {
  return {
    type: types.SAGAS_COINS_GET
  };
};

export const setLoading = origin => {
  return {
    type: types.SET_LOADING,
    origin
  };
};

export const unsetLoading = origin => {
  return {
    type: types.UNSET_LOADING,
    origin
  };
};

export const setCoins = (data) => {
  return {
    type: types.STORE_SET_COINS,
    data
  };
};

export const createStripeCustomer = (data) => {
  return {
    type: types.SAGAS_CREATE_STRIPE_CUSTOMER,
    data
  };
};

export const updateCardInfo = (data) => {
  return {
    type: types.SAGAS_UPDATE_CARD_INFO,
    data
  };
};

export const createDeposit = (data, cb) => {
  return {
    type: types.SAGAS_CREATE_DEPOSIT,
    data,
    cb
  };
};

export const createWithdraw = (data, cb) => {
  return {
    type: types.SAGAS_CREATE_WITHDRAW,
    data, 
    cb
  };
};


export const retrievecardinfo = (data) => {

  return {
    type: types.SAGAS_GET_STRIPE_CARD,
    data
  };
};

export const payWithCard = (data) => {
  return {
    type: types.SAGAS_PAY_WITH_CARD,
    data
  };
};

export const getPurchases = (data) => {
  return {
    type: types.SAGAS_GET_PURCHASES,
    data
  };
};

export const setPurchases = (data) => {
  return {
    type: types.STORE_SET_PURCHASES,
    data
  };
};

export const setPurchasedCoin = (data) => {
  return {
    type: types.STORE_SET_PURCHASED_COIN,
    data
  };
};

export const clearProduct = () => {
  return {
    type: types.CLEAR_PRODUCT
  };
};

export const getProducts = (data) => {
  return {
    type: types.SAGAS_GET_PRODUCTS,
    data
  };
};

export const setProducts = (data) => {
  return {
    type: types.STORE_SET_PRODUCTS,
    data
  };
};

export const addCart = (data) => {
  return {
    type: types.STORE_ADD_CART,
    data
  };
};

export const updateCart = (data) => {
  return {
    type: types.STORE_UPDATE_CART,
    data
  };
};

export const removeCart = (data) => {
  return {
    type: types.STORE_REMOVE_CART,
    data
  };
};

export const purchaseProducts = (data) => {
  return {
    type: types.SAGAS_PURCHASE_PRODUCTS,
    data
  };
};

export const clearCart = () => {
  return {
    type: types.STORE_CLEAR_CART
  };
};

export const search = (data) => {
  return {
    type: types.SAGAS_SEARCH,
    data
  };
};

export const setSearchedProducts = data => {
  return {
    type: types.SET_SEARCHED_PRODUCTS,
    data
  };
};

export const getCategories = () => {
  return {
    type: types.SAGAS_GET_CATEGORIES
  };
};

export const setCategories = (data) => {
  return {
    type: types.STORE_SET_CATEGORIES,
    data
  };
};

export const setCard = () => {
  return {
    type: types.STORE_SET_CARD
  };
};

export const unsetCard = () => {
  return {
    type: types.STORE_UNSET_CARD
  };
};

export const clearHistory = () => {
  return {
    type: types.STORE_CLEAR_HISTORY
  };
};

export const storeCart = (data) => {
  return {
    type: types.STORE_CART,
    data
  };
};

export const setPurchaseSuccess = () => {
  return {
    type: types.STORE_PURCHASE_SUCCESS
  };
};

export const resetPurchaseSuccess = () => {
  return {
    type: types.STORE_RESET_PURCHASE_SUCCESS
  };
};
