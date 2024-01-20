import ProductData from './ProductData.mjs';
import ProductListing from './ProductList.mjs';

const products = document.querySelector('.product-list');
const dataSource = new ProductData('tents');
const productList = new ProductListing('tents', dataSource, products);
productList.init();
