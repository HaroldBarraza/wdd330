import ProductListing from "../ProductList.mjs";
import ProductListing from "../ProductList.mjs";
const tents = 'tents.json';

async function getProductData(){
    try{
        const response = await fetch(tents);
        if (!response.ok){
            throw new Error('could not file json')
        }
        const data = await response.json();
        return data;
    }
    catch (error){
        console.error('Error loaing prodict data:',error);
        return null;
    }
}

getProductData()
    .then(product =>{
        console.log(product);
    });


const category = 'tents';
const dataSourge = {
    async getData(){
        return[
        {id: 1, name: 'tent 1'},
        {id: 2, name: 'tent 2'},
        {id: 3, name: 'tent 3'}
        ];
    }
};

const listElement = document.getElementById('productList');

const productListing = new ProductListing (category, dataSourge, listElement);

productListing.init()
    .then(products => {
        console.log(products);
    })
    .catch(error => {
        console.error('Fail to optain the product list', error);
    });