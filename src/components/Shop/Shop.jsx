import React, { useEffect, useState } from "react";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const savedCart = [];
    // Step1: Get id of the added product.
    for (const id in storedCart) {
      // Step 2: Get product from Product state by using id
      const addedProduct = products.find((product) => product.id === id);
      // Step 3: Setting product quantity from localStorage to added product.
      // Note: This condition is used to avoid error while loading empty products.
      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        // Step 4: Add addedProduct into an savedCart.
        savedCart.push(addedProduct);
      }
    }
    // Step 5: Set the savedCart into state cart variable
    setCart(savedCart);
  }, [products]);

  const handleAddToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product.id);
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product product={product} key={product.id} handleAddToCart={handleAddToCart}></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
