/* 2(3). С этого урока начинаем работать с функционалом интернет-магазина. Предположим, есть сущность корзины. 
Нужно реализовать функционал подсчета стоимости корзины в зависимости от находящихся в ней товаров.
Товары в корзине хранятся в массиве. Задачи:
a. Организовать такой массив для хранения товаров в корзине;
b. Организовать функцию countBasketPrice, которая будет считать стоимость корзины.
*/

let goodsBasket = [];

function addBasket(good, count, price) {
    goodsBasket.push([good, count, price]);
}

function countBasketPrice(goods) {
    let totalPrice = 0;
    for (item in goods) {
        totalPrice += goods[item][1] * goods[item][2];
    }
    return totalPrice;
}

addBasket('apples', 1, 48);
addBasket('oranges', 2, 89);

console.log(`Summ of your basket: ${countBasketPrice(goodsBasket)}`);
