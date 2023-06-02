function arabicToRoman(num) {
 const romanMap = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
 };

 let roman = "";
 //Verifica o num até encontrar um que ele seja maior, aí atribuí o simbolo e subtrai do num,
 //repete para o valor que restou no num partindo do index que o for parou.
 for (let key in romanMap) {
  while (num >= romanMap[key]) {
   roman += key;
   num -= romanMap[key];
  }
 }

 return roman;
}
