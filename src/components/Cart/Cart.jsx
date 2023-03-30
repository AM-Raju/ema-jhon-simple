import React from "react";
import "./Cart.css";

const Cart = ({ cart }) => {
  //or
  //   const cart = props.cart;
  //or
  // const {cart} = props.cart
  let totalPrice = 0;
  let totalShipping = 0;
  for (const product of cart) {
    totalPrice = totalPrice + product.price;
    totalShipping = totalShipping + product.shipping;
  }
  const tax = totalPrice * 0.7;
  const grandTotal = totalPrice + totalShipping + tax;
  return (
    <div className="cart">
      <h4>Order summary</h4>
      <p>Selected Items: {cart.length}</p>
      <p>Total Price: ${totalPrice}</p>
      <p>Shipping : ${totalShipping.toFixed(2)} </p>
      <p>Tax : ${tax.toFixed(2)}</p>
      <h6>Grand Total: ${grandTotal.toFixed(2)} </h6>
    </div>
  );
};

export default Cart;
