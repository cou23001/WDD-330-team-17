import { getLocalStorage, alertMessage, removeAllAlerts } from './utils'; 
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
    const simplifiedItems = items.map((item) => {
        return {
          id: item.Id,
          price: item.FinalPrice,
          name: item.Name,
          quantity: 1,
        };
      });
      return simplifiedItems;
}
export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
  
    init() {
      this.list = getLocalStorage(this.key);
      this.calculateItemSummary();
    }
  
    calculateItemSummary() {
        const summaryElement = document.querySelector(
            this.outputSelector + " #cartTotal"
        );
        const itemNumElement = document.querySelector(
            this.outputSelector + " #num-items"
        );

        //Calculate the total of elements in shopping cart
        itemNumElement.innerText = this.list.reduce((sum, item) => { 
          return sum + item.quantity 
        }, 0);
        //Calculate the total of all the items in the cart
        const amounts = this.list.map((item) => item.FinalPrice * item.quantity);
        this.itemTotal = amounts.reduce((sum, item) => sum + item);
        summaryElement.innerText = "$" + this.itemTotal.toFixed(2);
    }

    calculateOrderTotal() {
        const totalItems = this.list.reduce((sum, item) => { 
          return sum + item.quantity
        }, 0);
        this.shipping = 10 + (totalItems - 1) * 2;
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.orderTotal = (
            parseFloat(this.itemTotal) +
            parseFloat(this.shipping) +
            parseFloat(this.tax)
        ).toFixed(2);
        this.displayOrderTotals();
    }
  
    displayOrderTotals() {
        // Display the order totals in the order summary page.
        const shipping = document.querySelector(this.outputSelector + " #shipping");
        const tax = document.querySelector(this.outputSelector + " #tax");
        const orderTotal = document.querySelector(
            this.outputSelector + " #orderTotal"
        );
        shipping.innerText = "$" + this.shipping.toFixed(2);
        tax.innerText = "$" + this.tax;
        orderTotal.innerText = "$" + this.orderTotal;
    }

    async checkout(form) {
        const formElement = document.forms["checkout"];

        const json = formDataToJSON(formElement);
        // add totals, and item details
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        
        try {
          const res = await services.checkout(json);
          // Clear the cart from local storage
          localStorage.removeItem('so-cart');
          location.assign("/checkout/success.html");
        } 
        catch (err) {
          removeAllAlerts();
          for (let message in err.message) {
            alertMessage(err.message[message]);
          }
          //console.log(err);
        }
    }
}