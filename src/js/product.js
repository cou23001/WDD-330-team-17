import ProductData from './ProductData.mjs';
import { getParams } from './utils.mjs';
import ProductDetails from './ProductDetails.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const productId = getParams('product');
const dataSource = new ProductData();

const product = new ProductDetails(productId, dataSource);
product.init();