import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const screenWidth = window.innerWidth;
  let imageSize;

    // Determine the appropriate image size based on screen width
    if (screenWidth < 600) {
        imageSize = "PrimarySmall";
    } else if (screenWidth < 1200) {
        imageSize = "PrimaryMedium";
    } else {
        imageSize = "PrimaryLarge";
    }

  return `<li class="product-card">
  <a href="/product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Images[imageSize]}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price">$${product.FinalPrice}</p></a>
</li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData(this.category);
    // render the list
    this.renderList(list);
    //set the title to the current category
    document.querySelector(".title").innerHTML = this.category;
  }
  // render after doing the first stretch
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
  async productsByName(name) {
    const list = await this.dataSource.getData(this.category);

    const searchList = list.filter(function(element) {
      return element.Name.includes(name);
    });

    if (searchList == '') {
      alert('No results found.')
    } else {
      this.renderList(searchList);
      document.querySelector(".title").innerHTML = this.category;
    }
    
  }
  }

  // render before doing the stretch
  // renderList(list) {
  //   const htmlStrings = list.map(productCardTemplate);
  //   this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
  // }
