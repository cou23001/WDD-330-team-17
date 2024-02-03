import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  return `<li class="product-card">
  <a href="/product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Images.PrimaryMedium}"
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
    this.organizeByName = true;
    this.organizeByPrice = false;
  }
  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData(this.category);
    //console.log(this.category);
    // render the list
    if (this.organizeByName)
      this.renderList(this.sortByName(list));
    else if (this.organizeByPrice) {
      this.renderList(this.sortByPrice(list));
    }
    //set the title to the current category
    document.querySelector('.title').innerHTML = this.category;
  }
  isOrderByName() {
    this.organizeByName = true;
    this.organizeByPrice = false;
  }
  isOrderByPrice() {
    this.organizeByPrice = true;
    this.organizeByName = false;
  }
  sortByName(list) {
    return list.sort((a, b) => {
      if (a.Name > b.Name) {
        return 1;
      }
      if (a.Name < b.Name) {
        return -1;
      }
      return 0;
    });
  }
  sortByPrice(list) {
    return list.sort((a, b) => a.FinalPrice - b.FinalPrice);
  }
  // render after doing the first stretch
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
  async productsByName(name) {
    const list = await this.dataSource.getData(this.category);

    const searchList = list.filter(function (element) {
      return element.Name.includes(name);
    });

    if (searchList == '') {
      alert('No results found.')
    } else {
      this.renderList(searchList);
      document.querySelector('.title').innerHTML = this.category;
    }

  }
}

// render before doing the stretch
// renderList(list) {
//   const htmlStrings = list.map(productCardTemplate);
//   this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
// }
