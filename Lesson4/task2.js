/*2. Продолжить работу с интернет-магазином:
a. В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
b. Реализуйте такие объекты.
c. Перенести функционал подсчета корзины на объектно-ориентированную базу.
*/

const Cart = {
    items: [],
    addToCart(good) {                                                   // добавляем товары в корзину
        this.items.push(good);
    },
    TotalPrice() {
        let total = 0;
        for (item in this.items) {                                      // проходим по всем объектам в корзине
            total += this.items[item].count * this.items[item].price;   // получаем стоимость и плюсуем к общей сумме
        }
        return this.totalCartPrice = total;                             // создаем параметр с общей суммой корзины
    }
};

function createGood(goodName, goodCount, goodPrice) {
    return {
        good: goodName,
        count: goodCount,
        price: goodPrice,
    }
}

const Apples = createGood('apples', 3, 50); // создаем объекты товаров
const Oranges = createGood('oranges', 2, 89);
Cart.addToCart(Apples); // добавляем товары в корзину
Cart.addToCart(Oranges);
Cart.TotalPrice(); // считаем общую стоимость корзины
console.log(Cart); // выводим корзину
