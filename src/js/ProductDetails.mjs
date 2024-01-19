import { getLocalStorage, setLocalStorage } from './utils.mjs';

function productDetailsTemplate(product) {
    return `<section class="product-detail">
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Image}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

// Create myCart variable to store an array of the elements in the cart
let myCart = [];

function checkCart() {
  // Check if the cart is not empty. If it's not empty, then push every element in the cart into the myCart array.
  // If it is empty, do nothing
  if (localStorage.getItem('so-cart') != null && localStorage.getItem('so-cart') != '') {
    let currentCart = getLocalStorage('so-cart');

    currentCart.forEach(element => {
      myCart.push(element);
    });
  } else {
    myCart = [];
  }
}

export default class ProductDetails {
    constructor(productId, dataSource) {
      this.productId = productId;
      this.product = { };
      this.dataSource = dataSource;
    }
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);

        this.renderProductDetails('main');

        document.getElementById('addToCart').addEventListener('click', this.addToCart.bind(this));
    }
    addToCart(product) {
        // Call checkCart function to check if the cart is empty
        checkCart();

        // Push the new product to the myCart array
        myCart.push(this.product);

        // Set the cart with the old products and the new product
        setLocalStorage('so-cart', myCart);

        // Empty the myCart array again for future use
        myCart = [];
    }
    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        element.insertAdjacentHTML('afterBegin', productDetailsTemplate(this.product));
    }
}