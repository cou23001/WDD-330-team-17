import { getParam, loadHeaderFooter } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';

async function main() {
    loadHeaderFooter();
  
    const productId = getParam('product');
    const dataSource = new ExternalServices('tents');
  
    // Use 'await' inside an async function
    const data = await dataSource.findProductById(productId);
    const category = data.Category;
  
    // Set the category link dynamically
    const categoryLink = document.querySelector(".categoryLink");
    //console.log(categoryLink);
  
    if (categoryLink) {
      const anchorElement = document.createElement("a");
      anchorElement.href = `/product-listing/index.html?category=${category.toLowerCase()}`;
      anchorElement.textContent = category;
      categoryLink.appendChild(anchorElement);
    } else {
      console.error("Element with class 'categoryLink' not found.");
    }
  
    const product = new ProductDetails(productId, dataSource);
  
    // Use 'await' inside an async function
    await product.init();
  }
  
  // Call the async function
  main();