// 1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.

function spisokSimpleNumbers(n) {
    S = [];
    S[1] = 0; // 1 - не простое число
    // заполняем решето единицами
    let counter = 2;
    while (counter <= n) {
        S[counter] = 1;
        counter++;
    }

    counter = 2;
    while (counter * counter <= n) {
        if (S[counter] == 1) {
            for (let l = counter * counter; l <= n; l += counter) {
                S[l] = 0;
            }
        }
        counter++;
    }
    return S;
}

function getSimpleNumbers(spisok) {
    for (let idx = 2; idx < spisok.length; idx++) {
        if (spisok[idx] == 1) {
            console.log(idx);
        }
    }
    return;
}

console.log(getSimpleNumbers(spisokSimpleNumbers(100)));