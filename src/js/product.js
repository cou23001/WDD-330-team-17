import { setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

function addProductToCart(product) {
  // Get the existing cart from local storage
  let cart = JSON.parse(localStorage.getItem("so-cart"));
  
  // Ensure cart is an array or initialize an empty array
  if (!Array.isArray(cart)) {
    cart = [];
  }
  // Add the new product to the cart
  cart.push(product);

  // Update the cart in local storage
  localStorage.setItem("so-cart", JSON.stringify(cart));
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
