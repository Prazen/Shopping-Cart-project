export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  //Calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  //Calculate shipping price (If order is over Rs. 10000 then free, else Rs. 150 shipping)
  state.shippingPrice = addDecimals(state.itemsPrice > 10000 ? 0 : 150);

  //Calculate tax price (13% tax)
  state.taxPrice = addDecimals(Number((0.13 * state.itemsPrice).toFixed(2)));

  //Calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
