import { renderListWithTemplate } from './utils.mjs';

export function productCardTemplate(product) {

    return `<li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="Image of ">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">${product.ListPrice}</p>
      </a>
    </li>`
}
export function filterList(list) {
    let newList = [];
    let counter = 1;
    list.forEach(element => {
        if (counter != 3 && counter != 5) {
            newList.push(element);
        }
        counter++;
    });
    return newList;
}
export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        let list = await this.dataSource.getData();
        list = filterList(list);
        this.renderList(list);
    }
    renderList(productList) {
        renderListWithTemplate(productCardTemplate, this.listElement, productList);
    }

}