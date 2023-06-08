const productNameTolocalStorage = "products";
const costumerNameTolocalStorage = "costumers";
const payers = document.querySelector("#payers");
const modal = document.querySelector(".modal");
const listPayer = document.querySelector("#payers-list");
const invoices = document.querySelector("#invoice");
const invoiceMessage = document.querySelector("#invoice-message");
var getProducts = getlocalStorageItems(productNameTolocalStorage);
var costumers = getlocalStorageItems(costumerNameTolocalStorage);
var payersProduct = [];
var buttonPressedColor = "rgb(128, 0, 128)";
var currentProduct = 0;

window.addEventListener('pageshow', ()=>{
  listProducts();
  
})

function checkboxesAddListeners(){
  let checkbox = document.querySelectorAll('input[type="checkbox"]');
 
  checkbox.forEach((check, costumerId)=> {
    check.addEventListener('click', ()=>{
      (check.checked) ? addPercent(costumerId, true) : addPercent(costumerId, false);
    })
  })
}

function addPercent(costumerId, isChecked){
  let getCostumer = getlocalStorageItems(costumerNameTolocalStorage);
  getCostumer[costumerId].percent = isChecked
  costumers = getCostumer;
  saveOnlocalStorage(costumerNameTolocalStorage, getCostumer);
} 

function addCostumerToPay(productId, costumerId){
  let getButton = document.querySelector(`#costumer-${costumerId}`)
  let isExist = payersProduct.some(costumer => costumer.costumerId == costumerId)
  if(isExist){
    let style = getComputedStyle(getButton);
    if(style.backgroundColor == buttonPressedColor){ 
      getButton.style.backgroundColor = "white";
      payersProduct.splice(costumerId, 1);
  }else{
    getButton.style.backgroundColor = buttonPressedColor;
  }
  }else{
    payersProduct.push({costumerId, productId})
    getButton.style.backgroundColor = buttonPressedColor;
  }
  
  console.log(payersProduct)
}

function listProducts() {
  const listProducts = document.querySelector("#products-divider");

  listProducts.innerHTML = ""; 
  if(costumers.length <= 0){
    listProducts.innerHTML = `<h2>Adicione um cliente</h2> <button onclick="goToHome()">Voltar</button>`;
  }else if(getProducts.length <= 0){
    listProducts.innerHTML = `<h2>Adicione um produto</h2> <button onclick="goToHome()">Voltar</button>`;
  }else{
  getProducts = getlocalStorageItems(productNameTolocalStorage);
  if (!!getProducts) {
   getProducts.forEach((product, index) => {
    listProducts.innerHTML += `<span>Produto: ${product.name}, R$ ${product.price} <button id="purple-button" onclick="divider(${index})">Pagantes</button></span><br>`;
   });
  }
}
}

function divider(index){
  payersProduct = []
  currentProduct = index;
  payers.style.display = "flex"
  modal.style.display = "flex"
  

  listPayer.innerHTML = `
    <h4>Selecione o pagante e se vai pagar a taxa</h4>
    <span>PRODUTO: ${getProducts[index].name}</span> <span>PREÇO: ${getProducts[index].price}</span>
    <br/>
    ${costumers.map((costumer, i) => `
    <strong>Cliente:</strong> <button class="costumer-button" id="costumer-${i}" onclick="addCostumerToPay(${index}, ${i})">${costumer.name}</button>
    <label for="checkbox-${i}">10%?</label>
    <input id="checkbox-${i}" type="checkbox" ${costumer.percent ? 'checked' : ''}/>
    <br/>
    `).join("")}
    <br/>
    `;
    checkboxesAddListeners()
}

function calc() {
 if (payersProduct.length > 0) {
  let costumers = getlocalStorageItems(costumerNameTolocalStorage);
  let perPerson = +(getProducts[currentProduct].price / payersProduct.length).toFixed(2);
  payersProduct.forEach((costumer) => {
   if (costumers[costumer.costumerId].percent) {
    let sum = (perPerson * 0.1);
    costumers[costumer.costumerId].amount += perPerson + sum;
   } else {
    costumers[costumer.costumerId].amount += perPerson;
   }
  });
  getProducts.splice(currentProduct, 1);
  saveOnlocalStorage(productNameTolocalStorage, getProducts);
  saveOnlocalStorage(costumerNameTolocalStorage, costumers);
  payersProduct = [];
  listProducts();
  closeDivider();
  invoice();
 } else {
  alert("Selecione os pagadores");
 }
}

function invoice(){
  let costumer = getlocalStorageItems(costumerNameTolocalStorage);
  invoices.innerHTML = ""
  costumer.map((costumer) => {
    invoices.innerHTML += `
    <br><tr>Cliente: <td>${costumer.name}</td>  Total: <td>${costumer.amount}</td></tr><br>
    `;
  });
  if(getProducts.length <= 0){
    listProducts.innerHTML = "";
    saveOnlocalStorage(costumerNameTolocalStorage, []);
    invoices.innerHTML += `<h2 class="closedInvoice">CONTA FECHADA</h2>`;
  } 
}

function goToHome(){
  window.location.href = "/index.html";
}

function closeDivider(){
  payersProduct = [];
  payers.style.display = "none";
  modal.style.display = "none";
}