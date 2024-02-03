const baseURL = import.meta.env.VITE_SERVER_URL;
//const baseURL = "http://server-nodejs.cit.byui.edu:3000/";


async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: 'servicesError', message: data };
  }
}

export default class ExternalServices {
  constructor(category) {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    // Mapping object for category capitalization

    const categoryMapping = {
      'tents': 'Tents',
      'backpacks': 'Backpacks',
      'sleeping-bags': 'Sleeping Bags',
      'hammocks': 'Hammocks'
    };


    // Convert category to proper capitalization
    let categoryName = category.toLowerCase(); // Convert to lowercase for case-insensitive matching
    categoryName = categoryMapping[categoryName] || categoryName;
    // Set breadcrumb text content
    document.getElementById("categoryLink").textContent = categoryName;
    //document.getElementById("categoryLinkw").textContent = categoryName;


    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);

    // Items per category for the breadcrumb
    let numberItems = data.Result.length;
    document.getElementById("qtyItems").textContent = '(' + numberItems + ' items)';
    //console.log(data.Result);


    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async checkout(cart) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cart),
    };
    return await fetch(baseURL + 'checkout/', options).then(convertToJson);
  }
}