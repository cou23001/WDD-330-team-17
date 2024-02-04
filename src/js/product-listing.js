import { loadHeaderFooter, getParam } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import Alert from './Alert.mjs';

loadHeaderFooter();

const category = getParam('category');
const product = getParam('product');
const element = document.querySelector('.product-list');
const orderControls = document.querySelector('.controls');

const dataSource = new ExternalServices();
const listing = new ProductList(category, dataSource, element);
if (product === '' || product === null) {
  listing.init();
} else {
  listing.productsByName(product);
}

listing.init();

const alert = new Alert();
alert.init();

orderControls.addEventListener('change', (e) => {
  if (e.target.value == 'price') {
    listing.isOrderByPrice();
  } else {
    listing.isOrderByName();
  }
  listing.init();
});
