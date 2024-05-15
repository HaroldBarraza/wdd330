import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const listing = new ProductList("Tents", dataSource, element);

listing.init();

async function searchProducts(searchTerm) {
    try {
        const results = await dataSource.searchData(searchTerm);
        element.innerHTML = "";
        listing.renderList(results);
    } catch (error) {
        console.error("Error searching products:", error);
    }
}