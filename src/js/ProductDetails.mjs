import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { alertMessage } from './utils.mjs';

//console.log(alertMessage);

function productDetailsTemplate(product) {
    
  const extraImages = product.Images.ExtraImages;
  if (extraImages == '') {
    return `<section class="product-detail" <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      <img
        class="divider"
        src="${product.Images.PrimaryLarge}"
        alt="${product.NameWithoutBrand}"
      />
      <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
      <marquee class="product-card__discount" scrollamount='15'direction='right'>🚩Discount: 20% ($${(product.FinalPrice * 0.2).toFixed(2)})🚩</marquee>
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">
      ${product.DescriptionHtmlSimple}
      </p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div></section>`;
  } else {
    const imageSources = extraImages.map( (image) => {

      const imageElement = `<img class="divider" src="${image.Src}" alt="${product.NameWithoutBrand}"/>`;
      return imageElement;
    });

    const imageElements = imageSources.join('\n');

    return `<section class="product-detail" <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <div class="carousel-container">
        <div class="carousel-slide">
            <img
            class="divider"
            src="${product.Images.PrimaryLarge}"
            alt="${product.NameWithoutBrand}"/>
            ${imageElements}
        </div>
        <button id="prevBtn">&#10094;</button>
        <button id="nextBtn">&#10095;</button>
    </div>
    <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
    <marquee class="product-card__discount" scrollamount='15'direction='right'>🚩Discount: 20% ($${(product.FinalPrice * 0.2).toFixed(2)})🚩</marquee>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
  };
  
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
function updateQuantity(id) {
  if (myCart.length != 0) {
    let productItem = myCart.find(item => item.Id == id);

    if (productItem.quantity != null) {
      updateCart(productItem);
      return productItem.quantity + 1;
    }
  }
  return 1;

}
function updateCart(itemToRemove) {
  const newCart = myCart.filter(item => item !== itemToRemove);
  myCart = newCart;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {

    this.product = await this.dataSource.findProductById(this.productId);

    console.log(this.product);

    this.renderProductDetails('main');

    document.getElementById('addToCart').addEventListener('click', this.addToCart.bind(this));
  }
  addToCart() {
    // Call checkCart function to check if the cart is empty
    checkCart();
    // Push the new product to the myCart array
    myCart.push(this.product);
    this.product.quantity = updateQuantity(this.product.Id);

    // Set the cart with the old products and the new product
    setLocalStorage('so-cart', myCart);

    // Empty the myCart array again for future use
    myCart = [];

    // Alert user that the product was added
    alertMessage(`${this.product.Name} was added to your cart successfully!`)
  }
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      'afterBegin', 
      productDetailsTemplate(this.product)
    );
  }
}