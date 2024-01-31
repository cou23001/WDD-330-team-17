import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import Alert from './Alert.mjs';

loadHeaderFooter();

const category = getParam('category');
const product = getParam('product')
const element = document.querySelector('.product-list');

const dataSource = new ProductData();

if (product === '' || product === null) {
    const listing = new ProductList(category, dataSource, element);
    listing.init();

} else {
    const listing = new ProductList(category, dataSource, element);
    listing.productsByName(product);
}

const listing = new ProductList(category, dataSource, element);
listing.init();

const alert = new Alert();
alert.init();