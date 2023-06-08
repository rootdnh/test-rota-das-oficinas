var products = [];
var costumers = [];
const productNameTolocalStorage = "products";
const costumerNameTolocalStorage = "costumers";

const btAddProduct = document.querySelector("#add-product");
const btAddCostumer = document.querySelector("#add-costumer");

document.addEventListener("DOMContentLoaded", (event) => {
 //clearlocalStorage("products, costumers") //use if you need
 renderProducts();
 renderCostumers();
});

btAddCostumer.addEventListener("click", function (event) {
 addCostumer();
});

btAddProduct.addEventListener("click", function (event) {
 addProduct();
});

function goToPay() {
 window.location.href = "/src/pages/divider.html";
}

function deleteCostumer(index){
  let listCostumers = getlocalStorageItems(costumerNameTolocalStorage);
  listCostumers.splice(index, 1);
  saveOnlocalStorage(costumerNameTolocalStorage, listCostumers);
  renderCostumers();
}

function deleteProduct(index){
  let listProducts = getlocalStorageItems(productNameTolocalStorage);
  listProducts.splice(index, 1);
  saveOnlocalStorage(productNameTolocalStorage, listProducts);
  renderProducts();
}

function addCostumer() {
 const costumer = document.querySelector("#costumer").value.trim();
 var getList = JSON.parse(localStorage.getItem(costumerNameTolocalStorage));

 if (!!costumer && costumer.length > 0) {
  if(!(!!getList)){
    saveOnlocalStorage(costumerNameTolocalStorage, []);
  }
  let cost = {
   name: costumer,
   percent: false,
   amount: 0
  };
  costumers = getlocalStorageItems(costumerNameTolocalStorage);
  costumers.push(cost);
  saveOnlocalStorage(costumerNameTolocalStorage, costumers);
  renderCostumers();
 } else {
  alert("Não deixe nenhum campo vazio");
 }
}

function addProduct() {
  const prod = document.querySelector("#product").value.trim();
  const prodPrice = document.querySelector("#product-price").value.trim();
  let getList = JSON.parse(localStorage.getItem(productNameTolocalStorage));
 
  if (!!prod && prod.length > 0 && prodPrice.length > 0 && !!prodPrice) {
   if (!(!!getList)) {
    saveOnlocalStorage(productNameTolocalStorage, []);
   }
    let product = {
     name: prod,
     price: parseFloat(prodPrice.replace(",", ".")),
     payers: 0
    };
 
    products = getlocalStorageItems(productNameTolocalStorage);
    products.push(product);
    saveOnlocalStorage(productNameTolocalStorage, products);
    renderProducts();
   
  } else {
   alert("Não deixe nenhum campo vazio");
  }
 }
 