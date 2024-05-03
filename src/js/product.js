import { getLocalStorage, setLocalStorage } from "/js/utils.mjs";
import ProductData from "../js/ProductData.mjs";
import { getParams } from "./utils.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  let currentCart = getLocalStorage("so-cart") || [];
  if (!Array.isArray(currentCart)) {
    currentCart = [];
  }
  currentCart.push(product);
  setLocalStorage("so-cart", currentCart);
}


async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

const productId = getParams('product')
console.log(dataSource.findProductById(productId))
