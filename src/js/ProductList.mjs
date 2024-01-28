import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="Image of ${product.NameWithoutBrand}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">${product.FinalPrice}</p>
    </a></li>`;
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        const productList = await this.dataSource.getData(this.category);
        //console.log(productList);

        // render list and display it
        this.renderList(productList);

        document.querySelector('.title').innerHTML = this.category;
    }
    renderList(productList) {
        // render the list using the renderListWithTemplate function from the utils.mjs module
        renderListWithTemplate(productCardTemplate, this.listElement, productList);
    }
    // filterList(list) {
        
    //     const filteredList = list.filter((item) => 
    //         item.Id == '880RR' || item.Id == '985RF' || item.Id == '985PR' || item.Id == '344YJ');

    //     return filteredList;
    // }
}