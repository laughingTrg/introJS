/* Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), 
где arg1, arg2 — значения аргументов, operation — строка с названием операции. 
В зависимости от переданного значения выполнить одну из арифметических операций 
(использовать функции из пункта 5) и вернуть полученное значение (применить switch).
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

function mathOperation(arg1, arg2, operation) {
    console.log('Аргументы операции ' + operation + ': ' + arg1 + ' ' + arg2);
    switch (operation) {
        case 'Сложение':
            return sum(arg1, arg2);
        case 'Вычитание':
            return sub(arg1, arg2);
        case 'Умножение':
            return mul(arg1, arg2);
        case 'Деление':
            return div(arg1, arg2);
    }
}

console.log(mathOperation(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), 'Сложение'));
console.log(mathOperation(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), 'Вычитание'));
console.log(mathOperation(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), 'Умножение'));
console.log(mathOperation(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), 'Деление'));
