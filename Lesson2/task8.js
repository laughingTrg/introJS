/* * С помощью рекурсии организовать функцию возведения числа в степень. Формат: function
power(val, pow), где val — заданное число, pow –— степень.

*/

function power(val, pow) {
    if (pow === 0) {
        return 1;
    }
    return val * power(val, pow - 1)
}

console.log('5 в степени 3 = ' + power(5, 3));
console.log('3 в степени 5 = ' + power(3, 5));
console.log('2 в степени 8 = ' + power(2, 8));




