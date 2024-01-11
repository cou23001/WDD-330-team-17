import { setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

function addProductToCart(product) {
  // current local storage
  let cart = JSON.parse(localStorage.getItem("so-cart"));
  
  // Check if array or initialize
  if (!Array.isArray(cart)) {
    cart = [];
  }
  // Add product
  cart.push(product);

  // Update the cart
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
