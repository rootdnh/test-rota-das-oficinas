function convert() {
 const result = document.querySelector("#result");
 const numberInput = document.querySelector("#input-number");
 const number = numberInput.value.trim();
 const errorMessage = document.querySelector("#errorMessage");

 //check if null
 if (number === "") {
  errorMessage.style.display = "block";
  numberInput.style.border = "solid 1px red";
  return;
 } else {
  errorMessage.style.display = "none";
  numberInput.style.border = "solid 1px black";
 }

 if (/^\d+$/.test(number)) {
  if (number >= 0 && number <= 3999) {
   const convertedRoman = arabicToRoman(number);
   result.innerHTML = `<h2>${convertedRoman}</h2>`;
  } else {
   result.innerHTML = `<h2 style="color: red">O valor está fora do intervalo...</h2>`;
  }
 } else if (/^[IVXLCDM]+$/.test(number)) {
  const convertedArabic = romanToArabic(number);
  if(convertedArabic) {result.innerHTML = `<h2>${convertedArabic}</h2>`}else{
    result.innerHTML = `<h2 style="color: red">Entrada inválida, entre com um valor romano ou arábico...</h2>`;
  };

 } else {
  result.innerHTML = `<h2 style="color: red">Entrada inválida, entre com um valor romano ou arábico...</h2>`;
 }
}
