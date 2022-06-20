/*1. Продолжаем реализовывать модуль корзины:
a. Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы;
b. Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида.
*/

// !!! P.S. Больше ничего не успел по времени. Картинки добавил, думаю потом когда время будет доделаю 


const Cart = {
    settings: {
        cartPlace: 'cartPlace',
        cartHeading: 'cartHeading',
        cartInfo: 'cartInfo',
    },
    items: [],
    totalCartPrice: null,
    addToCart(good, count = 1) {                                                   // добавляем товары в корзину
        if (!this.prodExistCart(good.goodId)) {
            good.count = count;
            this.items.push(good);
        } else {
            good.count += 1;
        }
    },

    getTotalPrice() {
        let total = 0;
        for (let item in this.items) {                                      // проходим по всем объектам в корзине
            total += this.items[item].count * this.items[item].goodPrice;   // получаем стоимость и плюсуем к общей сумме
        }
        return this.totalCartPrice = total;                             // создаем параметр с общей суммой корзины
    },

    cartRender() {

        this.cartPlace = document.getElementById(this.settings.cartPlace);
        cartPlace.innerHTML = '';
        const cartHead = document.createElement('h2');
        cartHead.textContent = 'Корзина товаров';
        cartHead.setAttribute('id', this.settings.cartHeading);
        this.cartPlace.appendChild(cartHead);
        Cart.getTotalPrice();
        const cartInfo = document.createElement('h4');
        cartInfo.setAttribute('id', this.settings.cartInfo);
        if (this.items.length === 0) {
            cartInfo.textContent = 'Корзина пуста';
        } else {
            cartInfo.textContent = `В корзине: ${this.items.length} товаров на сумму ${this.totalCartPrice} рублей`;
        }
        this.cartPlace.append(cartInfo);
    },

    prodExistCart(id) {
        return this.findItemInCart(id);
    },

    findItemInCart(id) {
        const indexItem = this.items.findIndex((item) => {

            return item.goodId === Number(id);
        });
        return indexItem >= 0 ? true : false;
    },
};


const Products = {
    settings: {
        catalogPlace: 'catalog',
        cartHeading: 'cartHeading',
        catalogCardStyle: 'catalog-card',
        catalogCardNameStyle: 'catalog-card-name',
        catalogSeptStyle: 'catalog-sept',
        catalogCardPriceStyle: 'catalog-card-price',
        productBuyBtnStyle: 'product-buy-btn',
        prodCardImage: 'catalog-card-image',
        smallImgApples: 'images/apples/1.jpg',
    },
    items: [],
    catalogPlace: null,

    createGood(goodId, goodDesc, goodPrice, goodImgSrc) {
        return this.items.push({
            goodId: goodId,
            goodDesc: goodDesc,
            goodPrice: goodPrice,
            goodImgSrc: goodImgSrc,
        });
    },
    renderCatalog() {
        this.catalogPlace = document.getElementById(this.settings.catalogPlace);
        const prodCatalogHead = document.createElement('h2');
        prodCatalogHead.append('Наши товары');
        prodCatalogHead.classList.add(this.settings.cartHeading);
        this.catalogPlace.insertAdjacentElement('beforeBegin', prodCatalogHead);

        for (let item = 0; item < this.items.length; item++) {
            const prodCard = this.createCardContainer(this.settings.catalogCardStyle);
            const prodName = this.createCardName(this.settings.catalogCardNameStyle, item);
            const prodSept = this.createProdSept(this.settings.catalogSeptStyle);
            const prodPrice = this.createProdPrice(this.settings.catalogCardPriceStyle, item);
            const prodBuyBtn = this.createProdBuyBtn(this.settings.productBuyBtnStyle, item);

            const prodImage = this.createProdImage(this.settings.prodCardImage, item);
            prodImage.src = this.items[item].goodImgSrc + '1.jpg';
            prodCard.appendChild(prodImage);
            prodCard.append(prodName, prodSept, prodPrice, prodBuyBtn);
            this.catalogPlace.append(prodCard);
        }

    },

    createCardContainer(style) {
        const prodCard = document.createElement('div');
        prodCard.classList.add(style);
        return prodCard;
    },

    createCardName(style, item) {
        const prodName = document.createElement('h3');
        prodName.classList.add(style);
        prodName.textContent = `${this.items[item].goodDesc}`;
        return prodName;
    },

    createProdSept(style) {
        const prodSept = document.createElement('div');
        prodSept.classList.add(style);
        return prodSept;
    },

    createProdPrice(style, item) {
        const prodPrice = document.createElement('h4');
        prodPrice.classList.add(style);
        prodPrice.textContent = `${this.items[item].goodPrice} руб. за 1 кг`;
        return prodPrice;
    },

    createProdBuyBtn(style, item) {
        const prodBuyBtn = document.createElement('a');
        prodBuyBtn.classList.add(style);
        prodBuyBtn.dataset.id = this.items[item].goodId;
        prodBuyBtn.textContent = 'Купить';
        return prodBuyBtn;
    },

    createProdImage(style, item) {
        const prodImage = new Image();
        prodImage.classList.add(style);
        prodImage.src = this.items[item].goodImgSrc + '1.jpg';
        return prodImage;
    },

    initEventHandler() {
        this.catalogPlace.addEventListener('click', (event) => {
            this.clickByuBtnHandler(event);

        });

    },



    clickByuBtnHandler(event) {
        if (!this.isCorrectClick(event)) {
            return;
        };
        const prodIdToAdd = this.findItemToAdd(event.target.dataset.id);
        Cart.addToCart(Products.items[prodIdToAdd]);
        Cart.cartRender();

    },

    isCorrectClick(event) {
        return event.target.tagName === 'A';
    },

    findItemToAdd(id) {
        const indexItem = this.items.findIndex((item) => {

            return item.goodId === Number(id);
        });

        return indexItem;
    },

}



window.addEventListener('load', () => {
    Products.createGood(11, 'Яблоки сезонные', 50, 'images/apples/');
    Products.createGood(542, 'Апельсины Морокко', 89, 'images/oranges/');
    Products.createGood(36, 'Виноград Грузия', 250, 'images/grapes/');
    Products.renderCatalog();

    Cart.cartRender();

    Products.initEventHandler();
});
