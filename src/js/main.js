import { getLocalStorage, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

function getCategory() {
  const category = document.getElementsByName('category');

  for (var i = 0; i < category.length; i++) {
    if (category[i].checked) {
      //console.log("Checked value:", category[i].value);
      return category[i].value;
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('product-search');
  const searchInput = document.getElementById('product');

  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const selectedCategory = getCategory();
    const query = searchInput.value.trim();
    window.location.href = `product-listing/index.html?category=${selectedCategory}&product=${query}`;

    // const dataSource = new ExternalServices();

    // const listing = new ProductList(selectedCategory, dataSource, element);
    // listing.productsByName(query);
  });
});
