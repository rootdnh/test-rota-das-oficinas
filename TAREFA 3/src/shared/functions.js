function saveOnlocalStorage(setName, array) {
  let stringArray = JSON.stringify(array);
  localStorage.setItem(setName, stringArray);
 }
 
function clearlocalStorage(names) {
  let parseNames = names.trim().split(", ");
  parseNames.forEach((name) => {
   localStorage.removeItem(name);
  });
}

function getlocalStorageItems(getName) {
  let array = localStorage.getItem(getName);
  let jsonArray = JSON.parse(array);
  return jsonArray;
}

function renderCostumers() {
  const listCostumers = document.querySelector("#costumer-list");
  listCostumers.innerHTML = "";
  
  let getCostumers = getlocalStorageItems(costumerNameTolocalStorage);
  if (!!getCostumers) {
   getCostumers.forEach((costumer, index) => {
    listCostumers.innerHTML += `<span><strong>Cliente:</strong> ${costumer.name} <button  id="commom-button" onclick="deleteCostumer(${index})">Excluir</button></span><br>`;
   });
  }
}

function renderProducts() {
  const listProducts = document.querySelector("#product-list");
  listProducts.innerHTML = "";
 
  let getProducts = getlocalStorageItems(productNameTolocalStorage);
  if (!!getProducts) {
   getProducts.forEach((product, index) => {
    listProducts.innerHTML += `<span><strong>Produto:</strong> ${product.name}, <strong>R$</strong> ${product.price} <button id="commom-button" onclick="deleteProduct(${index})">Excluir</button></span><br>`;
   });
  }
}