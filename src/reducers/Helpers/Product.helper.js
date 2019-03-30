import * as Utils from '../../utils/Utils';

export const checkCart = (state, data) => {
  const { product, quantity } = data;
  const cart = [].concat({ product: { ...product }, quantity });

  return {
    ...state,
    cart
  };
};

export const updateCart = (state, data) => {
  const { index, quantity } = data;
  const cart = state.cart.slice();
  const item = cart[index];
  item.quantity = quantity;
  return {
    ...state,
    cart
  };
};

export const removeCart = (state, data) => {
  if (data) {
    const { index } = data;
    const cart = state.cart.slice();
    cart.splice(index, 1);
    return {
      ...state,
      cart
    };
  } else {
    return {
      ...state,
      cart: []
    };
  }
};

export const setMyPurchases = (state, data) => {
  const purchases = state.purchases || [];
  const resultPurchases = purchases.concat(data.docs);
  return { ...state, listPage: data, purchases: resultPurchases };
};
