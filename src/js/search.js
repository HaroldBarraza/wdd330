import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const searchParams = new URLSearchParams(window.location.search);
const searchTerm = searchParams.get("search");

console.log("Search Term:", searchTerm);

const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList("Search Results", dataSource, element);

if (searchTerm) {
    searchProducts(searchTerm);
}

async function searchProducts(searchTerm) {
    try {
        const results = await dataSource.searchData(searchTerm);
        console.log("Search Results:", results);
        listing.renderList(results);
    } catch (error) {
        console.error("Error searching products:", error);
    }
}