function romanToArabic(roman) {
 const romanMap = {
  M: 1000,
  D: 500,
  C: 100,
  L: 50,
  X: 10,
  V: 5,
  I: 1,
 };

 let arabic = 0;
 let repetition = 1;
 //For para pegar os valores segundo os númeroes romanos
 for (let i = 0; i < roman.length; i++) {
  //Pegando símbolo e e seu valor
  let currentSymbol = roman[i];
  let currentValue = romanMap[currentSymbol];
  //Próximo símbolo e valor
  let nextSymbol = roman[i + 1];
  let nextValue = romanMap[nextSymbol];

  //Verificando repetição
  if (!!nextSymbol && (currentSymbol === nextSymbol)) {
   if (repetition >= 3) {
    return `<span style="color: red">O símbolo não pode se repetir mais que 3 vezes.</span>`;
   }
   repetition++;
  }

  //Verificando se é uma subtração, e se da match com os parametros de subtração
  if (!!nextValue && (nextValue > currentValue)) {
   if (repetition > 1) return;
   if (
    (currentSymbol === "I" && (nextSymbol === "V" || nextSymbol === "X")) ||
    (currentSymbol === "X" && (nextSymbol === "L" || nextSymbol === "C")) ||
    (currentSymbol === "C" && (nextSymbol === "D" || nextSymbol === "M"))
   ) {
    arabic += nextValue - currentValue;
    i++;
   } else {
    return `<span style="color: red">Verifique seu número romano</span>`;
   }
   //Se tudo der certo faz a soma
  } else {
   arabic += currentValue;
  }
 }
 return arabic;
}
