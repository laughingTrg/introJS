/*2. Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре. Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
a. Пустая корзина должна выводить строку «Корзина пуста»;
b. Наполненная должна выводить «В корзине: n товаров на сумму m рублей».
*/

const Cart = {
    items: [],
    totalCartPrice: null,
    addToCart(good) {                                                   // добавляем товары в корзину
        this.items.push(good);
    },

    getTotalPrice() {
        let total = 0;
        for (item in this.items) {                                      // проходим по всем объектам в корзине
            total += this.items[item].count * this.items[item].price;   // получаем стоимость и плюсуем к общей сумме
        }
        return this.totalCartPrice = total;                             // создаем параметр с общей суммой корзины
    },

    cartRender() {
        this.cartPlace = document.getElementById('cartPlace');
        cartHead = document.createElement('h2');
        cartHead.textContent = 'Корзина товаров';
        cartHead.setAttribute('id', 'cartHeading');
        this.cartPlace.append(cartHead);

        cartInfo = document.createElement('h4');
        cartInfo.setAttribute('id', 'cartInfo');
        if (this.items.length === 0) {
            cartInfo.textContent = 'Корзина пуста';
        } else {
            cartInfo.textContent = `В корзине: ${this.items.length} товаров на сумму ${this.totalCartPrice} рублей`;
        }
        this.cartPlace.append(cartInfo);
    }
};

function createGood(goodId, goodDesc, goodCount, goodPrice) {
    return {
        goodId: goodId,
        goodDesc: goodDesc,
        count: goodCount,
        price: goodPrice,
    }
}

const Apples = createGood('apples', 'Яблоки сезонные', 3, 50); // создаем объекты товаров
const Oranges = createGood('oranges', 'Апельсины Морокко', 2, 89);
Cart.addToCart(Apples);
Cart.addToCart(Oranges);
Cart.getTotalPrice(); // считаем общую стоимость корзины
console.log(Cart); // выводим корзину

Cart.cartRender();
