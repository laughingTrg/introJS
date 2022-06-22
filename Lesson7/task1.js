/*1. Реализовать страницу корзины:
a. Добавить возможность не только смотреть состав корзины, но и редактировать его, 
обновляя общую стоимость или выводя сообщение «Корзина пуста».

2. На странице корзины:
a. Сделать отдельные блоки «Состав корзины», «Адрес доставки», «Комментарий»;
b. Сделать эти поля сворачиваемыми;
c. Заполнять поля по очереди, то есть давать посмотреть состав корзины, внизу которого есть 
кнопка «Далее». Если нажать ее, сворачивается «Состав корзины» и открывается «Адрес доставки» 
и так далее.
*/

// Частично все портянкой написано, но я просто торопился, чтоб успеть сдать ) Думаю смысл я уловил)

const settings = {
    cartPlace: 'cartPlace',
    cartHeading: 'cartHeading',
    cartInfo: 'cartInfo',
    catalogPlace: 'catalog',
    cartHeading: 'cartHeading',
    catalogCardStyle: 'catalog-card',
    catalogCardNameStyle: 'catalog-card-name',
    catalogSeptStyle: 'catalog-sept',
    catalogCardPriceStyle: 'catalog-card-price',
    productBuyBtnStyle: 'product-buy-btn',
    prodCardImage: 'catalog-card-image',
    smallImgApples: 'images/apples/1.jpg',

    rusPostId: 'rusPost',
    rusPostName: 'Почта России',
    boxberryPostID: 'Boxberry',
    boxberryPostName: 'Boxberry',
    vipPostId: 'vipPost',
    vipPostName: 'Vip-Post',
    postInfo: null,
    commentBox: null,
    commentBoxId: 'commentBox',

};


const Cart = {
    settings,
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

    removeFromCart(good) {
        good.count === 1 ? this.items.splice(this.findItemToAdd, 1) : good.count -= 1;
    },

    getItemPrice(item) {
        return item.count * item.goodPrice;
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
        this.cartPlace.innerHTML = '';
        // create h2,
        const cartHead = document.createElement('h2');
        cartHead.textContent = 'Корзина товаров';
        cartHead.setAttribute('id', this.settings.cartHeading);
        this.cartPlace.appendChild(cartHead);
        //create h4
        const cartInfo = document.createElement('h4');
        cartInfo.setAttribute('id', this.settings.cartInfo);
        if (this.items.length === 0) {
            cartInfo.textContent = 'Корзина пуста';
        } else {
            this.getTotalPrice();
            this.renderProdInCart(this.cartPlace, this.items);
            cartInfo.textContent = `В корзине: ${this.items.length} товаров на сумму ${this.totalCartPrice} рублей`;
        }
        this.cartPlace.appendChild(cartInfo);
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

    renderProdInCart(container, items) {
        for (let item of items) {
            const trElem = document.createElement('tr');
            trElem.dataset.id = 'cartgood';
            const tdNameElem = document.createElement('td');
            tdNameElem.textContent = `${item.goodDesc.toUpperCase()}`;

            const tdCountElem = document.createElement('td');
            tdCountElem.textContent = `${item.count} кг.`;
            const tdPriceElem = document.createElement('td');
            tdPriceElem.textContent = `на сумму ${this.getItemPrice(item)} руб.`;

            const tdBuyBtnElem = document.createElement('td');
            tdBuyBtnElem.textContent = 'Добавить';
            tdBuyBtnElem.classList.add('product-buy-btn');
            tdBuyBtnElem.dataset.id = item.goodId;
            tdBuyBtnElem.dataset.type = 'add';

            const tdSellBtnElem = document.createElement('td');
            tdSellBtnElem.textContent = 'Убавить';
            tdSellBtnElem.classList.add('product-buy-btn');
            tdSellBtnElem.dataset.id = item.goodId;
            tdSellBtnElem.dataset.type = 'remove';

            trElem.appendChild(tdNameElem);
            trElem.appendChild(tdCountElem);
            trElem.appendChild(tdPriceElem);
            trElem.appendChild(tdBuyBtnElem);
            trElem.appendChild(tdSellBtnElem);
            container.appendChild(trElem);

        }
        const nextBtn = document.createElement('a');
        nextBtn.classList.add('product-buy-btn');
        nextBtn.textContent = 'Далее';
        nextBtn.dataset.id = 'next';
        container.appendChild(nextBtn);
    },

    initEventHandler() {
        this.cartPlace.addEventListener('click', (event) => {
            this.clickCartBtnItem(event);

        });

    },

    clickCartBtnItem(event) {
        if (!this.isCorrectClick(event)) {
            return;
        }
        if (event.target.dataset.id === 'next') { //nodeName
            this.slideCartToPost();
        } else {
            const prodIdToAddRemove = this.findItemToAdd(event.target.dataset.id);
            event.target.dataset.type === 'add' ? this.addToCart(this.items[prodIdToAddRemove]) : this.removeFromCart(this.items[prodIdToAddRemove])
            this.cartRender();
        }

    },

    isCorrectClick(event) {

        return event.target.dataset.id ? true : false;
    },

    findItemToAdd(id) {
        return this.items.findIndex((item) => {

            return item.goodId === Number(id);
        });


    },

    slideCartToPost() {
        const trHide = document.getElementsByTagName('tr');
        for (const trElem of trHide) {
            trElem.setAttribute('display', 'none');
        }
        this.cartRenderHide();
        this.initPostInfo();

    },

    cartRenderHide() {
        this.cartPlace = document.getElementById(this.settings.cartPlace);
        this.cartPlace.innerHTML = '';
        // create h2,
        const cartHead = document.createElement('h2');
        cartHead.textContent = 'Корзина товаров';
        cartHead.setAttribute('id', this.settings.cartHeading);
        this.cartPlace.appendChild(cartHead);
        //create h4
        const cartInfo = document.createElement('h4');
        cartInfo.setAttribute('id', this.settings.cartInfo);
        if (this.items.length === 0) {
            cartInfo.textContent = 'Корзина пуста';
        } else {
            this.getTotalPrice();
            cartInfo.textContent = `В корзине: ${this.items.length} товаров на сумму ${this.totalCartPrice} рублей`;
        }
        this.cartPlace.appendChild(cartInfo);
    },

    initPostInfo() {
        if (!(this.settings.postInfo === null)) {
            erasePostInfo();
        }

        this.settings.postInfo = document.createElement('div');
        this.settings.postInfo.setAttribute('id', 'postInfo');
        this.settings.postInfo.classList.add('post-info');
        this.cartPlace.insertAdjacentElement('afterend', this.settings.postInfo);

        const postInfoHead = document.createElement('h2');
        postInfoHead.classList.add(this.settings.cartHeading);
        postInfoHead.textContent = 'Выберете способ доставки';
        this.settings.postInfo.appendChild(postInfoHead);

        this.settings.postInfo.appendChild(this.renderCheckPost(this.settings.rusPostName, this.settings.rusPostId));
        this.settings.postInfo.appendChild(this.renderCheckPost(this.settings.boxberryPostName, this.settings.boxberryPostID));
        this.settings.postInfo.appendChild(this.renderCheckPost(this.settings.vipPostName, this.settings.vipPostId));

        const nextBtn = document.createElement('a');
        nextBtn.classList.add('product-buy-btn');
        nextBtn.textContent = 'Далее';
        nextBtn.dataset.id = 'post-next';
        this.settings.postInfo.appendChild(nextBtn);

        this.initPostEventHandler();
    },

    erasePostInfo() {
        this.settings.postInfo.innerHTML = '';
        this.settings.postInfo = null;
    },

    renderCheckPost(postname, postid) {
        const postCheck = document.createElement('input');
        postCheck.setAttribute('type', 'checkbox');
        postCheck.setAttribute('id', postid);

        const labelPostCheck = document.createElement('label');
        labelPostCheck.setAttribute('for', postid);
        labelPostCheck.textContent = postname;
        labelPostCheck.appendChild(postCheck);
        return labelPostCheck;
    },

    initPostEventHandler() {
        this.settings.postInfo.addEventListener('click', (event) => {
            this.clickPostNextBtnItem(event);

        });

    },

    clickPostNextBtnItem(event) {
        if (!this.isCorrectClickPost(event)) {
            return;
        }
        this.postInfoHide();
        this.initCommentBox(this.settings.commentBox);
    },

    isCorrectClickPost(event) {
        return event.target.tagName === 'A';
    },

    postInfoHide() {
        this.erasePostInfo();
        this.settings.postInfo = document.createElement('div');
        this.settings.postInfo.setAttribute('id', 'postInfo');
        this.settings.postInfo.classList.add('post-info');
        this.cartPlace.insertAdjacentElement('afterend', this.settings.postInfo);
        const postInfoHead = document.createElement('h2');
        postInfoHead.classList.add(this.settings.cartHeading);
        postInfoHead.textContent = 'Выберете способ доставки';
        this.settings.postInfo.appendChild(postInfoHead);
    },

    initCommentBox(container) {
        container = document.createElement('div');
        container.setAttribute('id', 'postInfo');
        container.classList.add('comment-box');
        this.settings.postInfo.insertAdjacentElement('afterend', container);

        const commentBoxHead = document.createElement('h2');
        commentBoxHead.classList.add(this.settings.cartHeading);
        commentBoxHead.textContent = 'Оставьте комментарий к заказу';
        container.appendChild(commentBoxHead);

        const coomentInput = document.createElement('textarea');
        coomentInput.setAttribute('cols', 50);
        coomentInput.setAttribute('rows', 5);
        coomentInput.setAttribute('id', this.settings.commentBoxId);
        container.appendChild(coomentInput);

        const commentBtnBox = document.createElement('div');
        const coomentBtn = document.createElement('input');
        coomentBtn.setAttribute('type', 'submit');
        coomentBtn.setAttribute('id', this.settings.commentBoxId);
        commentBtnBox.appendChild(coomentBtn);
        container.appendChild(commentBtnBox);
    },

};


const Products = {
    settings,
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
        }
        const prodIdToAdd = this.findItemToAdd(event.target.dataset.id);
        Cart.addToCart(Products.items[prodIdToAdd]);
        Cart.cartRender();
        if (!(this.settings.postInfo === null)) {
            Cart.erasePostInfo();
        }

    },

    isCorrectClick(event) {
        return event.target.tagName === 'A';
    },

    findItemToAdd(id) {
        return this.items.findIndex((item) => {

            return item.goodId === Number(id);
        });


    },

};

window.addEventListener('load', () => {
    Products.createGood(11, 'Яблоки сезонные', 50, 'images/apples/');
    Products.createGood(542, 'Апельсины Морокко', 89, 'images/oranges/');
    Products.createGood(36, 'Виноград Грузия', 250, 'images/grapes/');
    Products.renderCatalog();

    Cart.cartRender();

    Products.initEventHandler();
    Cart.initEventHandler();
});
