/* Реализовать четыре основные арифметические операции в виде функций с двумя параметрами. 
Обязательно использовать оператор return.
*/

function sum(num1, num2) {
    return num1 + num2
}

function mul(num1, num2) {
    return num1 * num2
}

function div(num1, num2) {
    return num1 / num2
}

function sub(num1, num2) {
    return num1 - num2
}

let a = Math.floor(Math.random() * 10);
console.log('Число а = ' + a);
let b = Math.floor(Math.random() * 10);
console.log('Число b = ' + b);

console.log(sum(a, b));
console.log(mul(a, b));
console.log(div(a, b));
console.log(sub(a, b));
