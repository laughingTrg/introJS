/*1. Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999, 
надо получить на выходе объект, в котором в соответствующих свойствах описаны 
единицы, десятки и сотни. Например, для числа 245 надо получить 
следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. 
Если число превышает 999, необходимо выдать соответствующее сообщение с помощью 
console.log и вернуть пустой объект.
*/

let number = prompt('Введите число от 0 до 999: ');

function convertNumber(number) {
    if (number.length > 3) {
        const nullObject = {};
        console.log('Вы ввели число больше 999');
        return nullObject;
    }
    const objectNumber = {
        'единицы': 0,
        'десятки': 0,
        'сотни': 0,
    };
    for (let idx = number.length - 1; idx >= 0; idx--) {
        if (parseInt(number[idx]) >= 0 && parseInt(number[idx]) < 10) {
            switch (idx) {
                case 0:
                    if (number.length > 2) {
                        objectNumber.сотни = parseInt(number[idx]);
                    } else if (number.length > 1) {
                        objectNumber.десятки = parseInt(number[idx]);
                    } else {
                        objectNumber.единицы = parseInt(number[idx]);
                    }
                    break;
                case 1:
                    if (number.length > 2) {
                        objectNumber.десятки = parseInt(number[idx]);
                    } else {
                        objectNumber.единицы = parseInt(number[idx]);
                    }
                    break;
                case 2:
                    objectNumber.единицы = parseInt(number[idx]);
                    break;
            }
        }
    }
    return objectNumber;
}

console.log(convertNumber(number));