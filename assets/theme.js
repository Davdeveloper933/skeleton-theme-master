// const mobMenuIcon = document.getElementById('mobileMenuIcon');
// const mobileMenu = document.querySelector('.mobile__menu');
// const mobileMenuCloseBtn = document.getElementById('expandedMenu');
// const prodForm = document.getElementById('productForm');
// const prodPrice = document.querySelector('.product__price__value');
// const cart_total_price = document.querySelector('.cart__subtotal__number');
// const item_count_num = document.querySelector('.item__count__val');
// const addCartBtn = document.getElementById('addToCart');

window.onload = function () {
    var selectors = {
        addToCartBtn: 'addToCart',
        product_select: 'productSelect',
        product_price: '.product__price__value',
        quantity: '.product__input__field',
        minus_btn: '.product__minus',
        plus_btn: '.product__plus',
        cart_item_count:".cart__items__count__value",
        cart_item:".cart__item",
        cart_item_price:".cart__item__price",
        cart_content:'.cart__content'
    }


    function CartPopup() {
        let self = this;
        // this.selectors = {
        //     cart_item_count:".cart__items__count__value",
        //     cart_test:".cart_test",
        //     cart_item:".cart__item"
        // }
        this.test = document.querySelector(selectors.cart_test);
        this.item_counter = document.querySelector(selectors.cart_item_count);
        this.cart_item = document.querySelector(selectors.cart_item);
        this.cart_item_price = document.querySelector(selectors.cart_item_price);
        this.cart_content = document.querySelector(selectors.cart_content);
        // // this.fetchCart = fetch('/cart.js');
        self.cart = {};
        this.getCart = async function () {
           let response = await fetch('/cart.js');
           let data = await response.json()
           return data;
           // fetch('/cart.js')
           //  .then(response => response.json())
           //  .then(cart => {
           //          self.cart = cart
           //      })
        }

        this.getCart()
            .then(cart => {
               self.cart = cart;
            })

        //
        // this.renderItems:function (cart) {
        //     cart.items.forEach((item,index) => {
        //         self.cart_item_price.textContent = item.price;
        //     })
        // }

        // this.renderCart: function (cart){
        //     let item_price = cart.items[cart.items.length-1].price;
        //     let price = Shopify.formatMoney(item_price,Shopify.money_format);
        //     self.test.textContent = cart.total_price;
        //     self.item_counter.textContent = cart.item_count;
        //     self.renderItems(cart)
        //     console.log(item_price)
        // }
            let buttons_list = document.querySelectorAll[0]('.clear')
            console.log(document.querySelectorAll('.clear'))
        }

        CartPopup.prototype.renderCart = function () {
            this.getCart()
                .then(cart => {
                    cart.items.forEach((item,index)=> {
                        this.cart_item.innerHTML = item.title
                    })
                })
        }


    var product = (function () {
        var data = {};
        var cart_popup = new CartPopup();
        data.item_counter = document.querySelector(selectors.cart_item_count);
        data.cart_item = document.querySelectorAll(selectors.cart_item);
        data.quantity = document.querySelector(selectors.quantity) || data.quantity;
        data.variant = document.getElementById(selectors.product_select) || data.variant;
        data.addCartBtn = document.getElementById(selectors.addToCartBtn) || data.addCartBtn;
        var addCartFetch = fetch('/cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'items': [
                    {
                        'id': data.variant.value,
                        'quantity': parseInt(data.quantity.value)
                    }
                ]
            })
        })

        methods = {
            clearCart:function () {
                fetch('/cart/clear.js',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        "token": "1d19a32178501c44ef2223d73c54d16d",
                        "note": null,
                        "attributes": {},
                        "total_price": 0,
                        "total_weight": 0,
                        "item_count": 0,
                        "items": [],
                        "requires_shipping": false
                    })
                })
            },
            addProduct:function () {
                fetch('/cart/add.js', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'items': [
                            {
                                'id': data.variant.value,
                                'quantity': parseInt(data.quantity.value)
                            }
                        ]
                    })
                })
            },
            addCart: function (onsuccess,onerror) {
                addCartFetch.then(onsuccess,onerror)
            },
            onSuccess:function (data) {
               methods.addProduct()
               cart_popup.renderCart()
            },
            onError:function (error) {
                return error
            },
            // addToCart:async function (id, quantity) {
            //   let response = await
            //         let data = await response.json();
            //         return data;
            //        // .then(response => response.json())
            //        // .then(data => {
            //        //             // // self.cart.count = parseInt(cart.item_count);
            //        //             // // self.cart.total_price = cart.total_price
            //        //             // data.test.textContent = cart.total_price
            //        //             // data.item_counter.textContent = cart.item_count
            //        //      cart_popup.renderCart()
            //        // })
            //
            // },
            onProductVariantChange: function (select) {
                // data.id = data.variant.value;
                document.querySelector(selectors.product_price).textContent =
                    select.options[select.selectedIndex].dataset.variant_price;
            },
            minusQty: function () {
                let qty = parseInt(data.quantity.value)
                if (qty > 1) {
                    qty -= 1;
                    document.querySelector(selectors.quantity).value = qty
                }
            },
            plusQty: function () {
                let qty = parseInt(data.quantity.value)
                qty += 1
                // console.log(quantity)
                document.querySelector(selectors.quantity).value = qty
            }
        }
            document.querySelector('.clear').addEventListener('click',function () {
                methods.clearCart()
            })
            data.variant.addEventListener('change', function () {
                methods.onProductVariantChange(this)
            })
            data.addCartBtn.addEventListener('click', function () {
                // methods.addToCart(data.variant.value, data.quantity)
                //     // .then(data => {
                //     //     cart_popup.getCart()
                //     //         .then(cart => {
                //     //             cart_popup.renderCart(cart)
                //     //         })
                //     // })
                // cart_popup.getCart()
                //     .then(cart => {
                //         cart_popup.renderCart(cart)
                //     })
                methods.addCart(methods.onSuccess,methods.onError)
            })
        data.addCartBtn.addEventListener('click', cart_popup.setContent)
            document.querySelector(selectors.plus_btn).addEventListener('click', methods.plusQty)
            document.querySelector(selectors.minus_btn).addEventListener('click', methods.minusQty)
    })()
// mobMenuIcon.addEventListener('click',() => {
//     mobileMenu.classList.remove('closed');
//     mobileMenu.classList.add('open')
// })
//
// mobileMenuCloseBtn.addEventListener('click',() => {
//     mobileMenu.classList.remove('open');
//     mobileMenu.classList.add('closed')
// })

    const swiper = new Swiper(".mySwiper", {
        spaceBetween: 16,
        slidesPerView: 3,
        navigation: {
            nextEl: ".thumb-button-next",
            prevEl: ".thumb-button-prev",
        },
        // freeMode: true,
        // watchSlidesVisibility: true,
        // watchSlidesProgress: true,
    })
    const swiper2 = new Swiper(".mySwiper2", {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: swiper,
        }
    })

    var Shopify = Shopify || {};
// ---------------------------------------------------------------------------
// Money format handler
// ---------------------------------------------------------------------------
    Shopify.money_format = "${{amount}}";
    Shopify.formatMoney = function (cents, format) {
        if (typeof cents == 'string') {
            cents = cents.replace('.', '');
        }
        var value = '';
        var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
        var formatString = (format || this.money_format);

        function defaultOption(opt, def) {
            return (typeof opt == 'undefined' ? def : opt);
        }

        function formatWithDelimiters(number, precision, thousands, decimal) {
            precision = defaultOption(precision, 2);
            thousands = defaultOption(thousands, ',');
            decimal = defaultOption(decimal, '.');

            if (isNaN(number) || number == null) {
                return 0;
            }

            number = (number / 100.0).toFixed(precision);

            var parts = number.split('.'),
                dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
                cents = parts[1] ? (decimal + parts[1]) : '';

            return dollars + cents;
        }

        switch (formatString.match(placeholderRegex)[1]) {
            case 'amount':
                value = formatWithDelimiters(cents, 2);
                break;
            case 'amount_no_decimals':
                value = formatWithDelimiters(cents, 0);
                break;
            case 'amount_with_comma_separator':
                value = formatWithDelimiters(cents, 2, '.', ',');
                break;
            case 'amount_no_decimals_with_comma_separator':
                value = formatWithDelimiters(cents, 0, '.', ',');
                break;
        }

        return formatString.replace(placeholderRegex, value);
    };

}