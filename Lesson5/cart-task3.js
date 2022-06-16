/*3. Сделать так, чтобы товары в каталоге выводились при помощи JS:
a. Создать массив товаров (сущность Product);
b. При загрузке страницы на базе данного массива генерировать вывод из него. 
HTML-код должен содержать только div id=”catalog” без вложенного кода. 
Весь вид каталога генерируется JS.
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

// 3 Задание

const Products = {
    items: [],
    catalogPlace: null,
    createGood(goodId, goodDesc, goodCount, goodPrice) {
        return this.items.push({
            goodId: goodId,
            goodDesc: goodDesc,
            count: goodCount,
            price: goodPrice,
        });
    },
    renderCatalog() {
        this.catalogPlace = document.getElementById('catalog');
        prodCatalogHead = document.createElement('h2');
        prodCatalogHead.append('Наши товары');
        prodCatalogHead.setAttribute('class', 'cartHeading');
        this.catalogPlace.insertAdjacentElement('beforeBegin', prodCatalogHead);
        for (let item = 0; item < this.items.length; item++) {
            prodCard = document.createElement('div');
            prodCard.setAttribute('class', 'catalog-card');
            prodCard.setAttribute('id', 'prod-card');
            prodName = document.createElement('h3');
            prodName.setAttribute('class', 'catalog-card-name');
            prodName.textContent = `${this.items[item].goodDesc}`;
            prodSept = document.createElement('div');
            prodSept.setAttribute('class', 'catalog-sept');
            prodPrice = document.createElement('h4');
            prodPrice.setAttribute('class', 'catalog-card-price');
            prodPrice.textContent = `${this.items[item].price} руб. за 1 кг`;
            this.catalogPlace.append(prodCard);
            prodCard.append(prodName);
            prodCard.append(prodSept);
            prodCard.append(prodPrice);
        }

    },
}

Products.createGood(11, 'Яблоки сезонные', 3, 50);
Products.createGood(542, 'Апельсины Морокко', 2, 89);
Products.createGood(36, 'Виноград Грузия', 1, 250);
Products.renderCatalog();
// const Apples = createGood('apples', 'Яблоки сезонные', 3, 50); // создаем объекты товаров
// const Oranges = createGood('oranges', 'Апельсины Морокко', 2, 89);
Cart.addToCart(Products.items[0]);
Cart.addToCart(Products.items[1]);
Cart.addToCart(Products.items[2]);
Cart.getTotalPrice(); // считаем общую стоимость корзины
console.log(Cart); // выводим корзину

Cart.cartRender();
