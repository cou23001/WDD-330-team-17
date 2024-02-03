// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// helper to get parameter strings
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}


export function renderListWithTemplate(templateFn, parentElement, list, position = 'afterBegin', clear = false) {

  const htmlStrings = list.map(templateFn);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}


export function renderWithTemplate(templateFn, parentElement, data, callback) {

  parentElement.insertAdjacentHTML('afterBegin', templateFn);

  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// function to dynamically load the header and footer into a page
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const headerElement = document.querySelector("#main-header");
  const footerTemplate = await loadTemplate("/partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

  // Render the header and footer
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

export function calculateTotal(products) {
  let total = 0;
  products.forEach(element => {
    total += element.quantity * element.FinalPrice;
  });
  return total;
}

export function getCartCount() {
  const count = getLocalStorage("so-cart")?.length ?? 0;
  return count;
}

export function getSummary() {
  const items = getLocalStorage("so-cart");
  //console.log(items);
  return items;
}

export function calculateOrderDetails() {
  const products = getLocalStorage("so-cart");
  // Constants
  const salesTaxRate = 0.06;
  const shippingCostFirstItem = 10;
  const shippingCostAdditionalItem = 2;

  // Initialize variables for calculations
  let subtotal = 0;
  let shippingEstimate = 0;

  // Calculate Subtotal
  for (const product of products) {
      subtotal += product.quantity * parseFloat(product.FinalPrice);
  }

  // Calculate Shipping Estimate
  const totalItems = products.reduce((total, product) => total + product.quantity, 0);
  shippingEstimate = shippingCostFirstItem + (Math.max(totalItems - 1, 0) * shippingCostAdditionalItem);

  // Calculate Tax
  const tax = subtotal * salesTaxRate;

  // Calculate Order Total
  const orderTotal = subtotal + shippingEstimate + tax;

  // Return the results
  return {
      subtotal: subtotal.toFixed(2),
      shippingEstimate: shippingEstimate.toFixed(2),
      tax: tax.toFixed(2),
      orderTotal: orderTotal.toFixed(2),
  };
}

export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // setTimeout(function () {
  //   main.removeChild(alert);
  // }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}

