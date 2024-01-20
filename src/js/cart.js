import { getLocalStorage, calculateTotal } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  if (cartItems != null) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    DisplayCartTotal(cartItems);
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
  } else {
    document.querySelector('.product-list').innerHTML = '<p>No items added</p>';
    HideCartTotal();
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
</li>`;

  return newItem;
}
function DisplayCartTotal(cartItems) {
  let cartFooter = document
    .querySelector('.cart-footer')
    .classList.remove('hide');
  let cartTotal = document.querySelector('.cart-total');
  cartTotal.innerHTML = '';
  let total = calculateTotal(cartItems);
  cartTotal.innerHTML = `Total Price is: <strong>$${total}</strong>`;
}
function HideCartTotal() {
  let cartFooter = document.querySelector('.cart-footer').classList.add('hide');
}
renderCartContents();
