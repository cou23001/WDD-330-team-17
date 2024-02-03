import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();

const myCheckout = new CheckoutProcess('so-cart', '.checkout-summary');
myCheckout.init();

document
  .querySelector("input[name='zip']")
  .addEventListener('blur', myCheckout.calculateOrderTotal.bind(myCheckout));

// listening for click on the button
document.querySelector('#checkoutSubmit').addEventListener('click', (e) => {
  e.preventDefault();

  myCheckout.checkout();
});
